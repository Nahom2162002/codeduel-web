import mongoose from 'mongoose';
import Problem from '../models/Problem';
import { problems } from './seedProblems';

const MONGODB_URI = process.env.MONGODB_URI!;

// Unlike seedProblems.ts (which wipes the whole collection and reassigns every
// _id — breaking problemId references on any existing Duel documents), this
// only adds the newer categories, upserting by title so it's safe to re-run.
const NEW_CATEGORIES = ['binary-search', 'stacks'];

async function addProblems() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const toAdd = problems.filter(p => NEW_CATEGORIES.includes(p.category));

    let added = 0;
    let skipped = 0;
    for (const problem of toAdd) {
        const existing = await Problem.findOne({ title: problem.title });
        if (existing) {
            skipped++;
            continue;
        }
        await Problem.create(problem);
        added++;
    }

    console.log(`Added ${added} new problems, skipped ${skipped} already present.`);

    await mongoose.disconnect();
    console.log('Done!');
}

addProblems().catch(console.error);
