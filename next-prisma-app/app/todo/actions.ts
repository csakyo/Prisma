'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title) return;

  await prisma.todo.create({
    data: {
      title,
      userId: 1, // 仮ログイン
    },
  });
  revalidatePath('/todos');
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
