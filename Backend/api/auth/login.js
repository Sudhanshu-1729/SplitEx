import { connectDB } from '../../lib/db.js';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import { signToken } from '../../lib/jwt.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  try {
    await connectDB();
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).send('Invalid credentials');
    const token = signToken({ sub: user._id.toString() });
    res.status(200).json({
      token,
      user: { id: user._id.toString(), email: user.email, name: user.name || '' },
    });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).send('Server error');
  }
}
