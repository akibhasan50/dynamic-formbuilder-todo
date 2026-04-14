import { use, useMemo } from 'react';
import { FilterContext } from '../../context/FilterContext';
import { useTodos } from '../../hooks/useTodos';
import Filters from '../../components/Filters/Filters';
import TodoItem from '../../components/TodoItem/TodoItem';
import Pagination from '../../components/Pagination/Pagination';
import styles from './TodoList.module.css';

const ITEMS_PER_PAGE = 10;

export default function TodoList() {
  const { todos, users, isLoading, isError, error } = useTodos();
  const { filters, setFilters } = use(FilterContext);

  // Apply filters
  const filteredTodos = useMemo(() => {
    let result = todos;

    // Filter by user
    if (filters.userId) {
      result = result.filter((t) => String(t.userId) === String(filters.userId));
    }

    // Filter by status
    if (filters.status === 'completed') {
      result = result.filter((t) => t.completed);
    } else if (filters.status === 'pending') {
      result = result.filter((t) => !t.completed);
    }

    // Filter by search
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(query));
    }

    return result;
  }, [todos, filters.userId, filters.status, filters.search]);

  // Pagination
  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(filters.page || 1, totalPages || 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTodos = filteredTodos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.page} id="todo-list-page">
      <div className={styles.header}>
        <h1 className={styles.title}>Todo List</h1>
        <p className={styles.subtitle}>
          Browse and filter todos from JSONPlaceholder API
        </p>
      </div>

      {/* Filters */}
      {!isLoading && !isError && (
        <Filters users={users} totalResults={filteredTodos.length} />
      )}

      {/* Loading */}
      {isLoading && (
        <div className={styles.skeleton}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.skeletonItem} />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className={styles.error}>
          <div className={styles.errorTitle}>Failed to load todos</div>
          <p className={styles.errorMsg}>{error?.message || 'Unknown error occurred'}</p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && paginatedTodos.length === 0 && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📋</div>
          <p className={styles.emptyText}>No todos match your filters</p>
        </div>
      )}

      {/* Todo List */}
      {!isLoading && !isError && paginatedTodos.length > 0 && (
        <>
          <div className={styles.todoList}>
            {paginatedTodos.map((todo, idx) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={startIndex + idx + 1}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
