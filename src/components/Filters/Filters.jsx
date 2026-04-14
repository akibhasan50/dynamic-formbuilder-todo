import { use } from 'react';
import { FilterContext } from '../../context/FilterContext';
import styles from './Filters.module.css';

export default function Filters({ users, totalResults }) {
  const { filters, setFilters, resetFilters } = use(FilterContext);

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset page on filter change
    }));
  };

  const hasActiveFilters = filters.userId || filters.status || filters.search;

  return (
    <div>
      <div className={styles.filtersBar} id="todo-filters">
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="filter-search">Search</label>
          <input
            id="filter-search"
            type="text"
            className={styles.filterInput}
            placeholder="Search todos..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="filter-user">User</label>
          <select
            id="filter-user"
            className={styles.filterSelect}
            value={filters.userId}
            onChange={(e) => handleChange('userId', e.target.value)}
          >
            <option value="">All Users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="filter-status">Status</label>
          <select
            id="filter-status"
            className={styles.filterSelect}
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className={styles.actions}>
          {hasActiveFilters && (
            <button
              className={styles.clearBtn}
              onClick={resetFilters}
              id="clear-filters-btn"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      <p className={styles.resultCount}>
        Showing <strong>{totalResults}</strong> todo{totalResults !== 1 ? 's' : ''}
        {hasActiveFilters && ' (filtered)'}
      </p>
    </div>
  );
}
