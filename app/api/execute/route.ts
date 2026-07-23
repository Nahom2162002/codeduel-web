import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Judge0 language IDs
const LANGUAGE_IDS: Record<string, number> = {
    python: 71,
    javascript: 63,
    java: 62,
    cpp: 54
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        const { code, language, testCases } = await req.json();

        if (!code || !language || !testCases) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders });
        }

        const languageId = LANGUAGE_IDS[language];
        if (!languageId) {
            return NextResponse.json({ error: 'Unsupported language' }, { status: 400, headers: corsHeaders });
        }

        // Run each test case
        const results = await Promise.all(
            testCases.map(async (testCase: any) => {
                const stdin = JSON.stringify(testCase.input);
                const expectedOutput = JSON.stringify(testCase.expectedOutput);

                // Submit to Judge0
                const submitRes = await fetch(
                    `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
                            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                        },
                        body: JSON.stringify({
                            source_code: code,
                            language_id: languageId,
                            stdin,
                            expected_output: expectedOutput,
                            cpu_time_limit: 5,
                            memory_limit: 128000
                        })
                    }
                );

                const result = await submitRes.json();

                return {
                    passed: result.status?.id === 3, // 3 = Accepted
                    status: result.status?.description,
                    stdout: result.stdout,
                    stderr: result.stderr,
                    time: result.time,
                    memory: result.memory,
                    expectedOutput
                };
            })
        );

        const passed = results.filter(r => r.passed).length;
        const total = results.length;

        return NextResponse.json({
            results,
            passed,
            total,
            allPassed: passed === total
        }, { headers: corsHeaders });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}