import { prisma } from '@/lib/prisma';
import { addTodo, toggleTodo, deleteTodo } from './actions';

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

      <ul className='mt-4 space-y-2'>
        {todos.map((todo) => (
          <li key={todo.id} className='flex items-center gap-2'>
            <form action={toggleTodo}>
              <input type='hidden' name='id' value={todo.id} />
              <input
                type='hidden'
                name='completed'
                value={String(todo.completed)}
              />
              <button type='submit'>{todo.completed ? '☑' : '☐'}</button>
            </form>

            <span
              className={todo.completed ? 'line-through text-gray-400' : ''}
            >
              {todo.title}
            </span>

            {/* delete */}
            <form action={deleteTodo}>
              <input type='hidden' name='id' value={todo.id} />
              <button
                type='submit'
                className='text-red-500 hover:underline ml-2'
              >
                削除
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
