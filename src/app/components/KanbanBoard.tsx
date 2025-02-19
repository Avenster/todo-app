'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../hooks';
import { moveTask, setInitialTasks } from '../store/features/kanbanSlice';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal';
import FilterModal, { FilterCriteria } from './FilterModal';
import SortModal from './SortModal';
import { Plus, SlidersVertical, ChevronDown, ArrowUpDown } from 'lucide-react';
import { dummyTasks } from './dummyTasks';
import { Task } from '../types';

const KanbanBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { columns, columnOrder, tasks } = useAppSelector((state) => state.kanban);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({ priority: '', dueDate: '' });
  const [sortCriteria, setSortCriteria] = useState<string>('');

  // Initialize dummy tasks if not already initialized
  useEffect(() => {
    if (Object.keys(tasks).length === 0) {
      dispatch(setInitialTasks(dummyTasks));
    }
  }, [dispatch, tasks]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    dispatch(moveTask({
      taskId: draggableId,
      source: {
        droppableId: source.droppableId,
        index: source.index,
      },
      destination: {
        droppableId: destination.droppableId,
        index: destination.index,
      },
    }));
  };

  // Filter tasks based on chosen criteria
  const filterTasks = (tasksArray: Task[]): Task[] => {
    return tasksArray.filter(task => {
      const matchesPriority = filterCriteria.priority ? task.priority === filterCriteria.priority : true;
      const matchesDueDate = filterCriteria.dueDate ? task.dueDate === filterCriteria.dueDate : true;
      return matchesPriority && matchesDueDate;
    });
  };

  // Sort tasks based on sort criteria
  const sortTasks = (tasksArray: Task[]): Task[] => {
    if (sortCriteria === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return [...tasksArray].sort((a, b) => {
        return (
          (priorityOrder[a.priority as keyof typeof priorityOrder] || 999) - 
          (priorityOrder[b.priority as keyof typeof priorityOrder] || 999)
        );
      });
    }
    if (sortCriteria === 'dueDate') {
      return [...tasksArray].sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    }
    return tasksArray;
  };

  return (
    <div className="bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-row justify-center gap-10 items-center">
          <h1 className="text-2xl font-bold">Design Sprint</h1>
          <button 
            className="flex items-center gap-2 px-5 py-1 bg-gray-400/10 border border-white/10 rounded-md"
            onClick={() => setIsFilterOpen(true)}
          >
            <SlidersVertical size={16} />
            Filter
            <ChevronDown className="text-gray-400" size={16} />
          </button>
          <button 
            className="flex items-center gap-2 px-5 py-1 bg-gray-400/10 border border-white/10 rounded-md"
            onClick={() => setIsSortOpen(true)}
          >
            <ArrowUpDown size={16} />
            Sort
            <ChevronDown className="text-gray-400" size={16} />
          </button>
        </div>
        <div className="flex gap-4">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-green-300/70 rounded-md"
            onClick={() => {
              setSelectedTask(null);
              setIsModalOpen(true);
            }}
          >
            <Plus size={16} />
            Add Task
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-5 gap-4">
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            let columnTasks = column.taskIds
              .map((taskId) => tasks[taskId])
              .filter(Boolean) as Task[];

            // Apply filtering and sorting to the tasks in each column
            columnTasks = filterTasks(columnTasks);
            columnTasks = sortTasks(columnTasks);

            return (
              <TaskColumn
                key={column.id}
                column={column}
                tasks={columnTasks}
                onTaskClick={(taskId) => {
                  setSelectedTask(taskId);
                  setIsModalOpen(true);
                }}
              />
            );
          })}
        </div>
      </DragDropContext>

      {isModalOpen && (
        <TaskModal
          taskId={selectedTask}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
        />
      )}

      <FilterModal 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={(criteria) => setFilterCriteria(criteria)}
      />

      <SortModal 
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        onApply={(sortBy) => setSortCriteria(sortBy)}
      />
    </div>
  );
};

export default KanbanBoard;