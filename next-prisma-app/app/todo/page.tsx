import { prisma } from '@/lib/prisma';
import { TodoContainer } from './TodoContainer';

export default async function Page() {
  const todos = await prisma.todo.findMany({
    where: { userId: 1 },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-black mb-4'>Todo</h1>
      <TodoContainer initialTodos={todos} />
    </div>
  );
}
