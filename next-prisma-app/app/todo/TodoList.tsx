'use client';

import { useTransition } from 'react';
import { toggleTodo, deleteTodo } from './actions';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  userId: number;
};

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export function TodoList({ todos, setTodos }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className='flex items-center gap-2 p-3'>
          {/* チェック */}
          <button
            onClick={() => {
              startTransition(() => {
                // ① UI更新（完全にローカル）
                setTodos((prev) =>
                  prev.map((t) =>
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
                setTodos((prev) => prev.filter((t) => t.id !== todo.id));

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
