'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function createTodo(title: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  return prisma.todo.create({
    data: {
      title,
      userId: parseInt(session.user.id),
    },
  });
}
