// backend/controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Mock user data (in production, use a database)
const hashPassword = (plainTextPassword) => bcrypt.hashSync(plainTextPassword, 10);

const users = [
  { username: 'testUser', password: hashPassword('test123'), role: 'erphysician' },
  { username: 'testUser2', password: hashPassword('test123'), role: 'nurse' },
  { username: 'testUser3', password: hashPassword('test123'), role: 'administrator' },
];

// Login function
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.json({ token, user });
};
