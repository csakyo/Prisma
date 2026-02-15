'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData: FormData) {
  const title = formData.get('title') as string;

  // throw new Error('DBエラー（実験用）');

  if (!title) return;

  await prisma.todo.create({
    data: {
      title,
      userId: 1, // 仮ログイン
    },
  });
  revalidatePath('/todos');
}

export async function toggleTodo(formData: FormData) {
  const id = Number(formData.get('id'));
  const completed = formData.get('completed') === 'true';

  await prisma.todo.update({
    where: { id },
    data: {
      completed: !completed,
    },
  });
  revalidatePath('/todos');
}

export async function deleteTodo(formData: FormData) {
  console.log('🗑 deleteTodo called');

  const id = Number(formData.get('id'));

  if (!id) return;

  await prisma.todo.delete({
    where: { id },
  });
}
