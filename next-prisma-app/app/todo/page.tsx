import { prisma } from '@/lib/prisma';
import { TodoList } from './TodoList';
import { addTodo } from './actions';

export default async function Page() {
  const todos = await prisma.todo.findMany({
    where: { userId: 1 },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className='text-2xl font-black'>Todo</h1>
      {/* 🔥 ここに追加フォーム */}
      <form action={addTodo}>
        <input name='title' />
        <button type='submit'>追加</button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
}
