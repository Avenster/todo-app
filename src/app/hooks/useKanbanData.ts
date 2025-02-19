import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { setInitialTasks } from '../store/features/kanbanSlice';
import { Task } from '../types';

const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch('https://dummyjson.com/todos');
  const data = await response.json();
  
  return data.todos.map((todo: any) => {
    // Ensure ID is a string from the start
    const taskId = String(todo.id);
    
    return {
      id: taskId,
      title: todo.todo,
      description: todo.todo,
      priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
      dueDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Todo',
      assignee: 'Avenster'
    };
  });
};

export const useKanbanData = () => {
  const dispatch = useAppDispatch();
  
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  useEffect(() => {
    if (tasks) {
      // Log tasks before dispatching for debugging
      console.log('Fetched tasks:', tasks);
      dispatch(setInitialTasks(tasks));
    }
  }, [tasks, dispatch]);

  return { isLoading, error };
};