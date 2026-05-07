'use client';

import { useState, useTransition } from 'react';
import { TodoList } from './TodoList';
import { addTodo } from './actions';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  userId: number;
};

type Props = {
  initialTodos: Todo[];
};

export function TodoContainer({ initialTodos }: Props) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [isPending, startTransition] = useTransition();

  const handleAddTodo = async (formData: FormData) => {
    const title = formData.get('title') as string;
    if (!title?.trim()) return;

    // 楽観的UI更新: 仮のTodoを即座に追加
    const optimisticTodo: Todo = {
      id: Date.now(), // 一時的なID
      title,
      completed: false,
      createdAt: new Date(),
      userId: 1,
    };

    setTodos((prev) => [optimisticTodo, ...prev]);

    // フォームをリセット
    const form = document.querySelector('form') as HTMLFormElement;
    form?.reset();

    // サーバーアクションを実行
    startTransition(async () => {
      await addTodo(formData);
    });
  };

  return (
    <>
      {/* 追加フォーム */}
      <form action={handleAddTodo} className='mb-4 flex gap-2'>
        <input
          name='title'
          className='border border-gray-300 rounded px-3 py-2 flex-1'
          placeholder='新しいTodoを入力'
        />
        <button
          type='submit'
          disabled={isPending}
          className='border border-blue-500 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 disabled:bg-blue-300'
        >
          {isPending ? '追加中...' : '追加'}
        </button>
      </form>

      {/* Todoリスト */}
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
}
