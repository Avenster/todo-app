import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KanbanState, Task } from '../../types';

const initialState: KanbanState = {
  tasks: {},
  columns: {
    backlog: {
      id: 'backlog',
      title: 'Backlog',
      taskIds: [],
    },
    todo: {
      id: 'todo',
      title: 'Todo',
      taskIds: [],
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      taskIds: [],
    },
    review: {
      id: 'review',
      title: 'Review',
      taskIds: [],
    },
    done: {
      id: 'done',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['backlog', 'todo', 'inProgress', 'review', 'done'],
};

const getColumnId = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    backlog: 'backlog',
    todo: 'todo',
    'in progress': 'inProgress',
    review: 'review',
    done: 'done',
  };

  return statusMap[status.toLowerCase()] || 'todo';
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    setInitialTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = {};
      Object.values(state.columns).forEach((column) => {
        column.taskIds = [];
      });

      action.payload.forEach((task) => {
        const taskId = String(task.id);
        state.tasks[taskId] = { ...task, id: taskId };

        const columnId = getColumnId(task.status);
        if (!state.columns[columnId].taskIds.includes(taskId)) {
          state.columns[columnId].taskIds.push(taskId);
        }
      });
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      const oldTask = state.tasks[task.id];

      if (!oldTask) {
        state.tasks[task.id] = task;
        const columnId = getColumnId(task.status);
        if (!state.columns[columnId].taskIds.includes(task.id)) {
          state.columns[columnId].taskIds.push(task.id);
        }
        return;
      }

      if (oldTask.status !== task.status) {
        const oldColumnId = getColumnId(oldTask.status);
        const newColumnId = getColumnId(task.status);

        state.columns[oldColumnId].taskIds = state.columns[
          oldColumnId
        ].taskIds.filter((id) => id !== task.id);

        if (!state.columns[newColumnId].taskIds.includes(task.id)) {
          state.columns[newColumnId].taskIds.push(task.id);
        }
      }

      state.tasks[task.id] = task;
    },
    moveTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        source: { droppableId: string; index: number };
        destination: { droppableId: string; index: number };
      }>
    ) => {
      const { taskId, source, destination } = action.payload;

      const sourceTaskIds = Array.from(
        state.columns[source.droppableId].taskIds
      );
      sourceTaskIds.splice(source.index, 1);
      state.columns[source.droppableId].taskIds = sourceTaskIds;

      const destTaskIds = Array.from(
        state.columns[destination.droppableId].taskIds
      );
      destTaskIds.splice(destination.index, 0, taskId);
      state.columns[destination.droppableId].taskIds = destTaskIds;

      if (state.tasks[taskId]) {
        state.tasks[taskId].status =
          state.columns[destination.droppableId].title;
      }
    },
  },
});

export const { setInitialTasks, moveTask, updateTask } = kanbanSlice.actions;
export default kanbanSlice.reducer;

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