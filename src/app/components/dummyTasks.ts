import { Task } from '../types';

export const dummyTasks: Task[] = [
  {
    id: '1',
    taskId: '1',
    title: 'Task 1 - High Priority',
    description: 'Dummy task with high priority',
    priority: 'High',
    dueDate: '2025-02-20',
    status: 'Todo',
    assignee: 'Alice'
  },
  {
    id: '2',
    taskId: '2',
    title: 'Task 2 - Medium Priority',
    description: 'Dummy task with medium priority',
    priority: 'Medium',
    dueDate: '2025-02-22',
    status: 'Backlog',
    assignee: 'Bob'
  },
  {
    id: '3',
    taskId: '3',
    title: 'Task 3 - Low Priority',
    description: 'Dummy task with low priority',
    priority: 'Low',
    dueDate: '2025-02-25',
    status: 'In Progress',
    assignee: 'Charlie'
  },
  {
    id: '4',
    taskId: '4',
    title: 'Task 4 - Medium Priority',
    description: 'Another dummy task',
    priority: 'Medium',
    dueDate: '2025-02-23',
    status: 'Review',
    assignee: 'Dana'
  }
];