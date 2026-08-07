import { anthropic } from '@/lib/anthropic';

// Used by /api/practice/hint for the escalating-specificity hint Claude gives
// while tutoring a user through a problem.
const LEVEL_INSTRUCTIONS: Record<number, string> = {
    1: 'Give a high-level nudge: name the general pattern or technique that applies here (e.g. "this is a sliding window problem"), and briefly say why. Do not describe the steps to implement it.',
    2: 'Give a more specific direction: what data structure(s) or algorithmic idea to use and roughly how they fit together. Do not write code or pseudocode.',
    3: 'Give a near-solution walkthrough: the concrete steps to implement, in prose, in enough detail that a stuck user could code it from your description. Still do not write actual code.'
};

export const MAX_HINT_LEVEL = 3;

export async function generateHint(problem: any, hintNumber: 1 | 2 | 3): Promise<string> {
    const prompt = `You are a coding tutor helping a student who is stuck on this problem:

Title: ${problem.title}
Description: ${problem.description}
Constraints:
${problem.constraints.join('\n')}
Examples:
${problem.examples.map((e: any) => `Input: ${e.input}\nOutput: ${e.output}`).join('\n\n')}

${LEVEL_INSTRUCTIONS[hintNumber]}

Respond with 2-4 sentences, directly addressed to the student. No markdown, no code.`;

    const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }]
    });

    const content = message.content[0];
    return content.type === 'text' ? content.text.trim() : 'Unable to generate a hint right now.';
}
