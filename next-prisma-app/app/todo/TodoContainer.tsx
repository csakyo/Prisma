'use client';

import { useState } from 'react';
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
  const [error, setError] = useState<string | null>(null);

  const handleAddTodo = async (formData: FormData) => {
    setError(null);
    const title = formData.get('title') as string;

    if (!title?.trim()) {
      setError('タイトルを入力してください');
      return;
    }

    // 楽観的UI更新: 仮のTodoを即座に追加
    const optimisticTodo: Todo = {
      id: Date.now(), // 一時的なID
      title,
      completed: false,
      createdAt: new Date(),
      userId: 0, // ダミー
    };

    setTodos((prev) => [optimisticTodo, ...prev]);

    try {
      // サーバーアクションを実行
      await addTodo(formData);

      // フォームをリセット
      const form = document.querySelector('form') as HTMLFormElement;
      form?.reset();
    } catch (err) {
      // エラー時は楽観的に追加したTodoを削除
      setTodos((prev) => prev.filter((t) => t.id !== optimisticTodo.id));
      setError('追加に失敗しました');
    }
  };

  return (
    <>
      {/* 追加フォーム */}
      <form action={handleAddTodo} className='rounded p-4'>
        <input
          name='title'
          className='border border-gray-300 rounded px-2 py-1'
          placeholder='新しいTodoを入力'
        />
        <button
          type='submit'
          className='border border-blue-500 bg-blue-500 text-white rounded px-4 py-1 ml-2 hover:bg-blue-600'
        >
          追加
        </button>
        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
      </form>

      {/* Todoリスト */}
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
}
