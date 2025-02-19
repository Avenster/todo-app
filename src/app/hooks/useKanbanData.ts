
'use client'
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { setInitialTasks } from '../store/features/kanbanSlice';
import { Task } from '../types';

const getRandomStatus = (): Status => {
    const statuses: Status[] = ['Todo', 'In Progress', 'In Review', 'Done'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  
  const fetchTasks = async (): Promise<Task[]> => {
    try {
      const response = await fetch('https://dummyjson.com/todos');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      
      const data = await response.json();
      
      return data.todos.map((todo: any) => ({
        id: String(todo.id),
        title: todo.todo,
        description: todo.todo,
        priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        dueDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: todo.completed ? 'Done' : getRandomStatus(),
        assignee: 'Avenster'
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  };
  
  export const useKanbanData = () => {
    const dispatch = useAppDispatch();
    
    const { data: tasks, isLoading, error } = useQuery({
      queryKey: ['tasks'],
      queryFn: fetchTasks,
    });
  
    useEffect(() => {
      if (tasks) {
        dispatch(setInitialTasks(tasks));
      }
    }, [tasks, dispatch]);
  
    return { isLoading, error };
  };