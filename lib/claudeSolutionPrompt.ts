export function buildSolutionPrompt(problem: any, language: string): string {
    return `You are an expert competitive programmer. Solve this coding problem in ${language}.

Problem: ${problem.title}

Description:
${problem.description}

Constraints:
${problem.constraints.join('\n')}

Examples:
${problem.examples.map((e: any) => `Input: ${e.input}\nOutput: ${e.output}`).join('\n\n')}

Write ONLY the solution function body in ${language}. No imports, no main function, no stdin/stdout handling — just the function implementation. Use this exact function signature:

${problem.starterCode[language]}

No explanation, no markdown, just the raw function code.`;
}
