// app/todos/page.tsx
import { prisma } from '@/lib/prisma';
import { TodoList } from './TodoList';

export default async function Page() {
  const todos = await prisma.todo.findMany({
    where: { userId: 1 },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className='text-2xl font-black'>Todo</h1>
      <TodoList initialTodos={todos} />
    </div>
  );
}
