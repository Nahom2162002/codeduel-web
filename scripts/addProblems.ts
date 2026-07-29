import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Problem from '../models/Problem';
import { problems } from './seedProblems';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI!;

// Unlike seedProblems.ts (which wipes the whole collection and reassigns every
// _id — breaking problemId references on any existing Duel documents), this
// only adds the newer categories, upserting by title so it's safe to re-run.
const NEW_CATEGORIES = ['binary-search', 'stacks', 'greedy', 'bit-manipulation', 'hash-table', 'two-pointers', 'heap', 'sliding-window', 'matrix', 'sorting', 'union-find', 'topological-sort', 'simulation', 'counting', 'shortest-path', 'number-theory', 'bitmask', 'recursion', 'geometry', 'divide-and-conquer', 'game-theory'];

async function addProblems() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const toAdd = problems.filter(p => NEW_CATEGORIES.includes(p.category));

    let added = 0;
    let skipped = 0;
    for (const problem of toAdd) {
        // Atomic upsert-by-title (title now has a unique index too) instead of a
        // separate findOne-then-create — closes the race window that let two
        // concurrent/overlapping runs both insert the same problem.
        const result = await Problem.updateOne(
            { title: problem.title },
            { $setOnInsert: problem },
            { upsert: true }
        );
        if (result.upsertedCount > 0) added++;
        else skipped++;
    }

    console.log(`Added ${added} new problems, skipped ${skipped} already present.`);

    await mongoose.disconnect();
    console.log('Done!');
}

addProblems().catch(console.error);
