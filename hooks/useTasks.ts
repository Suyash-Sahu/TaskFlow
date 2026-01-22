'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Task, TaskFilters } from '@/lib/types';
import { getTasksFromStorage, saveTasksToStorage } from '@/lib/data';
import { filterAndSortTasks } from '@/lib/utils';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedTasks = getTasksFromStorage();
    setTasks(storedTasks);
    setIsLoading(false);
  }, []);

  const saveTasks = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
    saveTasksToStorage(newTasks);
  }, []);

  const addTask = useCallback(
    (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newTask: Task = {
        ...task,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedTasks = [newTask, ...tasks];
      saveTasks(updatedTasks);
      return newTask;
    },
    [tasks, saveTasks]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      const updatedTasks = tasks.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      );
      saveTasks(updatedTasks);
      return updatedTasks.find(t => t.id === id);
    },
    [tasks, saveTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      const updatedTasks = tasks.filter(task => task.id !== id);
      saveTasks(updatedTasks);
    },
    [tasks, saveTasks]
  );

  const filteredTasks = useMemo(
    () => filterAndSortTasks(tasks, filters),
    [tasks, filters]
  );

  return {
    tasks,
    filteredTasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    isLoading,
  };
}

