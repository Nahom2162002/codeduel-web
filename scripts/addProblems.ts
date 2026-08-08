import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Problem from '../models/Problem';
import { problems } from './seedProblems';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI!;

// Unlike seedProblems.ts (which wipes the whole collection and reassigns every
// _id — breaking problemId references on any existing Duel documents), this
// upserts by title so it's safe to re-run against the full problems array,
// regardless of category — existing titles are left untouched ($setOnInsert
// only applies on insert).
async function addProblems() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    let added = 0;
    let skipped = 0;
    for (const problem of problems) {
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
