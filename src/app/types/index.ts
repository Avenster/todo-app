export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  taskId: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  status: string;
  assignee: string;
}
export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface KanbanState {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}