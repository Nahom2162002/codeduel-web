import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from './mongodb';
import User from '@/models/User';

export async function getUserFromRequest(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; tokenVersion?: number };
    await connectDB();
    const user = await User.findById(decoded.userId);
    if (!user) return null;

    // Tokens issued before this field existed carry no tokenVersion claim —
    // treat that as version 0 (the schema default) so existing sessions keep
    // working. A password reset bumps the stored version, which immediately
    // invalidates every token minted before that point, old-format or not.
    const tokenVersion = decoded.tokenVersion ?? 0;
    if (tokenVersion !== (user.tokenVersion ?? 0)) return null;

    return user;
  } catch {
    return null;
  }
}