import { connectDB } from '../../lib/db.js';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import { signToken } from '../../lib/jwt.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  try {
    await connectDB();
    const { email, password, name } = req.body || {};
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
    if (password.length < 6) {
      return res.status(400).send('Password must be at least 6 characters');
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).send('Email already registered');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, name });
    const token = signToken({ sub: user._id.toString() });
    res.status(201).json({
      token,
      user: { id: user._id.toString(), email: user.email, name: user.name || '' },
    });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).send('Server error');
  }
}
