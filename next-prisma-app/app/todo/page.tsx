import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { TodoContainer } from './TodoContainer';

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const todos = await prisma.todo.findMany({
    where: { userId: parseInt(session.user.id) },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className='text-2xl font-black'>Todo</h1>
      <TodoContainer initialTodos={todos} />
    </div>
  );
}
