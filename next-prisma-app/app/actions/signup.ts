'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function signUp(email: string, password: string) {
  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashed,
    },
  });
}
