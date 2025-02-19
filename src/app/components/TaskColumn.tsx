import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import type { Column, Task } from '../types';
import { Plus } from 'lucide-react';

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ column, tasks, onTaskClick }) => {
  // Debug log to verify column ID
  console.log('Column props:', { columnId: column.id, title: column.title, tasksCount: tasks.length });

  return (
    <div className="rounded-lg p-4 w-full">
      <div className='flex flex-row items-center justify-between'>
        <h2 className="text-lg font-semibold">{column.title}</h2>
        <Plus className='h-4 w-4 text-gray-400'/>
      </div>
      
      <Droppable droppableId={String(column.id)}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[145px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-green-200/10 outline-2 outline-offset-2 outline-dashed outline-green-300 rounded-lg' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable 
                key={String(task.id)}
                draggableId={String(task.id)}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                  >
                    <TaskCard
                      task={task}
                      onClick={() => onTaskClick(String(task.id))}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;