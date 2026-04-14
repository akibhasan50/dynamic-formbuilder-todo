import { useQuery } from '@tanstack/react-query';
import { fetchTodos, fetchUsers } from '../api/todoApi';

export function useTodos() {
  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const users = usersQuery.data ?? [];

  // Build userId → userName map
  const userMap = {};
  users.forEach((user) => {
    userMap[user.id] = user.name;
  });

  // Enrich todos with user names
  const todos = (todosQuery.data ?? []).map((todo) => ({
    ...todo,
    userName: userMap[todo.userId] || `User ${todo.userId}`,
  }));

  return {
    todos,
    users,
    isLoading: todosQuery.isLoading || usersQuery.isLoading,
    isError: todosQuery.isError || usersQuery.isError,
    error: todosQuery.error || usersQuery.error,
  };
}
