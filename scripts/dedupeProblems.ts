import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Problem from '../models/Problem';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI!;

// One-off cleanup for duplicate titles created before Problem.title had a
// unique index. For each duplicated title, keeps the oldest document
// (earliest createdAt / lowest _id) and deletes the rest.
async function dedupeProblems() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const duplicates = await Problem.aggregate([
        { $sort: { _id: 1 } },
        { $group: { _id: '$title', ids: { $push: '$_id' }, count: { $sum: 1 } } },
        { $match: { count: { $gt: 1 } } }
    ]);

    let removed = 0;
    for (const dup of duplicates) {
        const [, ...extraIds] = dup.ids; // keep the first (oldest), drop the rest
        await Problem.deleteMany({ _id: { $in: extraIds } });
        removed += extraIds.length;
        console.log(`"${dup._id}": kept 1, removed ${extraIds.length} duplicate(s)`);
    }

    if (duplicates.length === 0) {
        console.log('No duplicate titles found.');
    } else {
        console.log(`Done — removed ${removed} duplicate document(s) total.`);
    }

    await mongoose.disconnect();
}

dedupeProblems().catch(console.error);
