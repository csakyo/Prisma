'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title') as string;

  if (!title?.trim()) {
    throw new Error('Title is required');
  }

  await prisma.todo.create({
    data: {
      title: title.trim(),
      userId: parseInt(session.user.id),
    },
  });

  revalidatePath('/todo');
}

export async function toggleTodo(id: number, nextCompleted: boolean) {
  await prisma.todo.update({
    where: { id },
    data: {
      completed: nextCompleted,
    },
  });
}

export async function deleteTodo(id: number) {
  await prisma.todo.delete({
    where: { id },
  });
}
