'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

type TaskStatus = 'todo' | 'in-progress' | 'completed';
type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

interface TaskFormData {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
}

interface TaskFormProps {
  initialData?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function TaskForm({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData.title ?? '');
  const [description, setDescription] = useState(initialData.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(initialData.status ?? 'todo');
  const [priority, setPriority] = useState<TaskPriority>(initialData.priority ?? 'medium');
  const [dueDate, setDueDate] = useState(initialData.dueDate ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: dueDate || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">

      {/* ---------------- Title ---------------- */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-300">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 
                     px-4 py-2.5 text-white placeholder:text-zinc-500
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* ---------------- Description ---------------- */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-300">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a detailed description..."
          rows={4}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 
                     px-4 py-2.5 text-white placeholder:text-zinc-500 resize-none
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* ---------------- Status & Priority ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-300">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 
                       px-4 py-2.5 text-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-300">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 
                       px-4 py-2.5 text-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* ---------------- Due Date (NO ICON) ---------------- */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-300">
          Due Date
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 
                     px-4 py-2.5 text-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     appearance-none"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'textfield',
          }}
        />
      </div>

      {/* ---------------- Actions ---------------- */}
      <div className="flex items-center justify-between pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-medium text-zinc-400 hover:text-white transition"
        >
          ← Cancel
        </button>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 
                     hover:from-indigo-600 hover:to-purple-600"
        >
          {isLoading ? 'Saving...' : 'Save Task'}
        </Button>
      </div>

    </form>
  );
}
