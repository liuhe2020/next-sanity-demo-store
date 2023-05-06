import bcrypt from 'bcryptjs';
import client from '../../utils/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Not allowed');

  const existingUser = await client.fetch(
    `*[_type == "user" && email == '${req.body.email}'][0]`
  );

  if (existingUser) return res.status(409).send('User already exist');

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = {
    _type: 'user',
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  const createUser = await client.create(newUser);

  if (createUser) return res.status(200).send('New user created');
  res.status(400).send('Failed to register user to database');
}
