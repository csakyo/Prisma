import { prisma } from '@/lib/prisma';
import { addTodo, toggleTodo } from './actions';

export default async function Page() {
  const todos = await prisma.todo.findMany({
    where: { userId: 1 },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className='text-2xl font-black'>Todo</h1>

      <form action={addTodo}>
        <input
          type='text'
          name='title'
          placeholder='やることを書く'
          className='border h-10'
        />
        <button
          type='submit'
          className='ml-2 px-4 py-2 bg-blue-500 text-white rounded'
        >
          追加
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className='flex items-center gap-2'>
            <form action={toggleTodo}>
              <input type='hidden' name='id' value={todo.id} />
              <input
                type='hidden'
                name='completed'
                value={String(todo.completed)}
              />

              <button type='submit' className='flex items-center gap-2'>
                {/* 見た目用 */}
                <input type='checkbox' checked={todo.completed} readOnly />
                <span
                  className={todo.completed ? 'line-through text-gray-400' : ''}
                >
                  {todo.title}
                </span>
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
