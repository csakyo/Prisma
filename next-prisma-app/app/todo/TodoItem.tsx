'use client';

import { useOptimistic } from 'react';
import { toggleTodo } from './actions';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export function TodoItem({ todo }: { todo: Todo }) {
  const [optimisticTodo, toggleOptimistic] = useOptimistic(todo, (state) => ({
    ...state,
    completed: !state.completed,
  }));

  return (
    <form
      action={async () => {
        toggleOptimistic({ completed: !optimisticTodo.completed });
        const formData = new FormData();
        formData.append('id', String(todo.id));
        formData.append('completed', String(todo.completed));
        await toggleTodo(formData);
      }}
    >
      <button className='flex items-center gap-2'>
        <input type='checkbox' checked={optimisticTodo.completed} readOnly />
        <span
          className={
            optimisticTodo.completed ? 'line-through text-gray-400' : ''
          }
        >
          {optimisticTodo.title}
        </span>
      </button>
    </form>
  );
}
