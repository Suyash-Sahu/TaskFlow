import { Task } from './types';

const STORAGE_KEY = 'task-management-tasks';

export function getTasksFromStorage(): Task[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading tasks from storage:', error);
  }
  
  // Return default mock data if no storage data exists
  return getDefaultTasks();
}

export function saveTasksToStorage(tasks: Task[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to storage:', error);
  }
}

function getDefaultTasks(): Task[] {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  return [
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the task management dashboard including setup instructions, API documentation, and user guide.',
      status: 'in-progress',
      priority: 'high',
      dueDate: tomorrow.toISOString(),
      tags: ['documentation', 'important'],
      createdAt: yesterday.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      id: '2',
      title: 'Design user interface mockups',
      description: 'Create high-fidelity mockups for all pages including dashboard, task list, and task details pages.',
      status: 'completed',
      priority: 'urgent',
      dueDate: yesterday.toISOString(),
      tags: ['design', 'ui'],
      createdAt: new Date(yesterday.getTime() - 86400000).toISOString(),
      updatedAt: yesterday.toISOString(),
    },
    {
      id: '3',
      title: 'Implement dark mode toggle',
      description: 'Add theme switching functionality with system preference detection and smooth transitions.',
      status: 'completed',
      priority: 'medium',
      tags: ['feature', 'ui'],
      createdAt: new Date(yesterday.getTime() - 172800000).toISOString(),
      updatedAt: yesterday.toISOString(),
    },
    {
      id: '4',
      title: 'Add task filtering and search',
      description: 'Implement advanced filtering by status, priority, and date range with real-time search functionality.',
      status: 'in-progress',
      priority: 'high',
      dueDate: nextWeek.toISOString(),
      tags: ['feature', 'search'],
      createdAt: yesterday.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      id: '5',
      title: 'Write unit tests',
      description: 'Create comprehensive test suite covering all components and utility functions.',
      status: 'todo',
      priority: 'medium',
      dueDate: nextWeek.toISOString(),
      tags: ['testing', 'quality'],
      createdAt: new Date(now.getTime() - 3600000).toISOString(),
      updatedAt: new Date(now.getTime() - 3600000).toISOString(),
    },
    {
      id: '6',
      title: 'Optimize performance',
      description: 'Implement code splitting, lazy loading, and optimize bundle size for better performance.',
      status: 'todo',
      priority: 'low',
      tags: ['performance', 'optimization'],
      createdAt: new Date(now.getTime() - 7200000).toISOString(),
      updatedAt: new Date(now.getTime() - 7200000).toISOString(),
    },
  ];
}

