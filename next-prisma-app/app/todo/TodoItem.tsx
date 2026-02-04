'use client';

import { useOptimistic } from 'react';
import { deleteTodo } from './actions';

export function TodoItem({ todo }) {
  const [optimisticTodo, removeOptimistic] = useOptimistic(
    todo,
    (_state, _action: void) => null,
  );

  if (!optimisticTodo) return null;

  return (
    <form
      action={async () => {
        removeOptimistic();

        const formData = new FormData();
        formData.append('id', String(todo.id));

        await deleteTodo(formData);
      }}
    >
      <span>{todo.title}</span>
      <button type='submit' className='text-red-500 text-sm'>
        削除
      </button>
    </form>
  );
}
