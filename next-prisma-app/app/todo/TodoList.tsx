'use client';

import { useState, useTransition } from 'react';
import { toggleTodo, deleteTodo } from './actions';

export function TodoList({ todos }: any) {
  const [isPending, startTransition] = useTransition();

  // 🔥 useStateにする
  const [localTodos, setLocalTodos] = useState(todos);

  return (
    <ul>
      {localTodos.map((todo: any) => (
        <li key={todo.id} className='flex items-center gap-2 p-3'>
          {/* チェック */}
          <button
            onClick={() => {
              startTransition(() => {
                // ① UI更新（完全にローカル）
                setLocalTodos((prev: any) =>
                  prev.map((t: any) =>
                    t.id === todo.id ? { ...t, completed: !t.completed } : t,
                  ),
                );

                // ② サーバー
                toggleTodo(todo.id, !todo.completed);
              });
            }}
          >
            <input type='checkbox' checked={todo.completed} readOnly />
            <span
              className={todo.completed ? 'line-through text-gray-400' : ''}
            >
              {todo.title}
            </span>
          </button>

          {/* 削除 */}
          <button
            onClick={() => {
              startTransition(() => {
                setLocalTodos((prev: any) =>
                  prev.filter((t: any) => t.id !== todo.id),
                );

                deleteTodo(todo.id);
              });
            }}
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}
