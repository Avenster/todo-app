'use client'
import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../hooks';
import { moveTask } from '../store/features/kanbanSlice';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal';
import { Plus, Filter, ArrowUpDown } from 'lucide-react';
import { useKanbanData } from '../hooks/useKanbanData';

const KanbanBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { columns, columnOrder, tasks } = useAppSelector((state) => state.kanban);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  
  const { isLoading, error } = useKanbanData();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // Debug log
    console.log('Drag end result:', {
      draggableId,
      source,
      destination,
      availableColumns: Object.keys(columns)
    });

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(moveTask({
      taskId: String(draggableId),
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

  if (isLoading) {
    return <div className="min-h-full bg-black text-white p-6">Loading tasks...</div>;
  }

  if (error) {
    return <div className="min-h-full bg-black text-white p-6">Error loading tasks: {error.message}</div>;
  }

  // Debug log to verify column state
  console.log('Current columns state:', {
    columnOrder,
    columnsAvailable: Object.keys(columns),
    taskCount: Object.keys(tasks).length
  });

  return (
    <div className="min-h-full bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Design Sprint</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-3 py-2 bg-[#242424] rounded-md">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#242424] rounded-md">
            <ArrowUpDown size={16} />
            Sort
          </button>
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
            const columnTasks = column.taskIds
            .map(taskId => tasks[taskId])
              .filter(Boolean);

            return (
              <TaskColumn
                key={columnId}
                column={column}
                tasks={columnTasks}
                onTaskClick={(taskId) => {
                  setSelectedTask(String(taskId));
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
    </div>
  );
};

export default KanbanBoard;