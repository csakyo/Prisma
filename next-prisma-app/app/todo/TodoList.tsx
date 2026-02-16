'use client';

import { useOptimistic, startTransition } from 'react';
import type { Todo } from '@prisma/client';
import { addTodo } from './actions';
import { AddTodoForm } from './AddTodoForm';

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useOptimistic(
    initialTodos,
    (state, action: { type: 'add'; todo: Todo }) => {
      return [action.todo, ...state];
    },
  );

  return (
    <>
      <AddTodoForm
        onAdd={(todo) =>
          startTransition(() => {
            setTodos({ type: 'add', todo });
          })
        }
        onSubmit={addTodo}
      />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}
