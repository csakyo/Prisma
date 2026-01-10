import { getTodos } from './actions';

export default async function TodoPage() {
  const userId = 1; // 仮ログイン
  const todos = await getTodos(userId);

  return (
    <div>
      <h1>Todo</h1>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            {todo.completed ? '✅' : '⬜️'} {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
