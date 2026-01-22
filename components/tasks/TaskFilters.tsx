'use client';

import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { TaskFilters as Filters, TaskStatus, TaskPriority } from '@/lib/types';
import { useDebounce } from '@/hooks/useDebounce';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface TaskFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export default function TaskFilters({
  filters,
  onFiltersChange,
  viewMode = 'grid',
  onViewModeChange,
}: TaskFiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFiltersChange({ ...filters, search: debouncedSearch || undefined });
    }
  }, [debouncedSearch]);

  const statusOptions: TaskStatus[] = ['todo', 'in-progress', 'completed'];
  const priorityOptions: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

  const statusLabels: Record<TaskStatus, string> = {
    todo: 'Todo',
    'in-progress': 'In Progress',
    completed: 'Completed',
  };

  const priorityLabels: Record<TaskPriority, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  };

  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      status: undefined,
      priority: undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters = filters.status || filters.priority || filters.search;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* ---------------- Search + View Toggle ---------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Search */}
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>


      </div>

      {/* ---------------- Filters ---------------- */}
      <div className="flex flex-wrap items-center gap-4 p-5 sm:p-6 rounded-xl border border-zinc-700/50 bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-800/40 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-medium text-zinc-300">
            Filters
          </span>
        </div>

        {/* Status */}
        <select
          value={filters.status || ''}
          onChange={(e) =>
            handleFilterChange('status', e.target.value || undefined)
          }
          className="px-3 py-1.5 text-xs bg-zinc-800/50 border border-zinc-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500/50 text-white hover:border-zinc-600 transition-colors"
        >
          <option value="">All Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>

        {/* Priority */}
        <select
          value={filters.priority || ''}
          onChange={(e) =>
            handleFilterChange('priority', e.target.value || undefined)
          }
          className="px-3 py-1.5 text-xs bg-zinc-800/50 border border-zinc-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500/50 text-white hover:border-zinc-600 transition-colors"
        >
          <option value="">All Priority</option>
          {priorityOptions.map((priority) => (
            <option key={priority} value={priority}>
              {priorityLabels[priority]}
            </option>
          ))}
        </select>

        {/* Sort Order */}
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            handleFilterChange(
              'sortOrder',
              filters.sortOrder === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          {filters.sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
        </Button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button size="sm" variant="ghost" onClick={clearFilters}>
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
