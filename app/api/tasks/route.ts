import { NextRequest, NextResponse } from 'next/server';
import { Task } from '@/lib/types';
import { getTasksFromStorage, saveTasksToStorage } from '@/lib/data';

export async function GET() {
  try {
    const tasks = getTasksFromStorage();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tasks = getTasksFromStorage();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: body.title,
      description: body.description || '',
      status: body.status || 'todo',
      priority: body.priority || 'medium',
      dueDate: body.dueDate || undefined,
      tags: body.tags || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedTasks = [newTask, ...tasks];
    saveTasksToStorage(updatedTasks);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

