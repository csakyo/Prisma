import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { TodoList } from './TodoList';
import { addTodo } from './actions';

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
      {/* 🔥 ここに追加フォーム */}
      <form action={addTodo} className='rounded p-4'>
        <input
          name='title'
          className='border border-gray-300 rounded px-2 py-1'
        />
        <button
          type='submit'
          className='border border-blue-500 bg-blue-500 text-white rounded px-4 py-1 ml-2 hover:bg-blue-600'
        >
          追加
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
}
