'use client';

import { useState } from 'react';

type Props = {
  onAdd: (todo: any) => void;
  onSubmit: (formData: FormData) => Promise<void>;
};

export function AddTodoForm({ onAdd, onSubmit }: Props) {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        setError(null);

        // 仮Todoを即追加
        onAdd({
          id: Math.random(),
          title: formData.get('title'),
          completed: false,
        });

        try {
          await onSubmit(formData);
        } catch {
          // ❗ 失敗を伝えるだけ
          setError('追加に失敗しました');
        }
      }}
    >
      <input name='title' />
      <button>追加</button>

      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </form>
  );
}
