import { connectDB } from '../../lib/db.js';
import User from '../../models/User.js';
import { verifyToken } from '../../lib/jwt.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');
  try {
    await connectDB();
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).send('Unauthorized');
    const payload = verifyToken(token);
    if (!payload?.sub) return res.status(401).send('Unauthorized');
    const user = await User.findById(payload.sub);
    if (!user) return res.status(404).send('User not found');
    res.status(200).json({ id: user._id.toString(), email: user.email, name: user.name || '' });
  } catch (err) {
    console.error('Me error', err);
    res.status(500).send('Server error');
  }
}
