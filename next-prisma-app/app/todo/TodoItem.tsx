'use client';

import type { Todo } from '@prisma/client';
import { toggleTodo, deleteTodo } from './actions';
import { startTransition } from 'react';

type Props = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className='flex items-center gap-2'>
      <button
        onClick={() => {
          startTransition(async () => {
            onToggle(todo.id);

            const fd = new FormData();
            fd.append('id', String(todo.id));
            fd.append('completed', String(todo.completed));
            await toggleTodo(fd);
          });
        }}
      >
        <input type='checkbox' checked={todo.completed} readOnly />
        <span className={todo.completed ? 'line-through' : ''}>
          {todo.title}
        </span>
      </button>

      <button
        className='text-red-500 text-sm'
        onClick={async () => {
          onDelete(todo.id); // ✅ 即時削除

          const fd = new FormData();
          fd.append('id', String(todo.id));
          await deleteTodo(fd);
        }}
      >
        削除
      </button>
    </li>
  );
}
