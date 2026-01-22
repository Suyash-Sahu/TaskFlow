'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { useToast } from '@/components/providers/ToastProvider';
import TaskList from '@/components/tasks/TaskList';
import TaskFilters from '@/components/tasks/TaskFilters';
import Button from '@/components/ui/Button';
import FloatingActionButton from '@/components/ui/FloatingActionButton';

export default function TasksPage() {
  const { filteredTasks, filters, setFilters, deleteTask, isLoading } = useTasks();
  const { showToast } = useToast();

  const handleDelete = (id: string) => {
    deleteTask(id);
    showToast('Task has been removed successfully.', 'success');
  };

  return (
    <main className="flex-1 bg-[var(--background)] text-[var(--text-primary)] px-6 sm:px-8 lg:px-12">
      
      {/* ✅ PAGE VERTICAL RHYTHM */}
      <div className="flex flex-col gap-16">

        {/* ---------------- Header ---------------- */}
        <section className="flex items-start justify-between gap-8 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Tasks
            </h1>
            <p className="text-[var(--text-secondary)]">
              Manage and organize all your tasks
            </p>
          </div>

          <Link href="/tasks/new">
            <Button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-500/20">
              <Plus className="h-4 w-4" />
              <span>New Task</span>
            </Button>
          </Link>
        </section>

        {/* ---------------- Search & Filters ---------------- */}
        <section
          className="
            flex flex-col gap-6
            [&_input]:h-12
            [&_input]:px-4
            [&_input]:text-base
          "
        >
          <TaskFilters
            filters={filters}
            onFiltersChange={setFilters}
          />
        </section>

        {/* ---------------- Tasks Grid ---------------- */}
        <section>
          <TaskList
            tasks={filteredTasks}
            onDelete={handleDelete}
            viewMode="grid"
            isLoading={isLoading}
          />
        </section>

      </div>

      {/* ---------------- Floating Action Button ---------------- */}
      <FloatingActionButton href="/tasks/new" />
    </main>
  );
}
