import { createContext, useState, useCallback } from 'react';
import { saveFilters, getFilters } from '../utils/storage';

export const FilterContext = createContext(null);

const DEFAULT_FILTERS = {
  userId: '',
  status: '',
  search: '',
  page: 1,
};

export function FilterProvider({ children }) {
  const [filters, setFiltersState] = useState(() => {
    const saved = getFilters();
    return saved ? { ...DEFAULT_FILTERS, ...saved } : DEFAULT_FILTERS;
  });

  const setFilters = useCallback((updater) => {
    setFiltersState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveFilters(next);
      return next;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    saveFilters(DEFAULT_FILTERS);
  }, []);

  return (
    <FilterContext value={{ filters, setFilters, resetFilters }}>
      {children}
    </FilterContext>
  );
}
