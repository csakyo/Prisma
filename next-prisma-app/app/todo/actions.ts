// app/todos/actions.ts
'use server';

import { prisma } from '@/lib/prisma';

export async function addTodo(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title) return;

  await prisma.todo.create({
    data: {
      title,
      userId: 1, // 仮ログイン
    },
  });
}
