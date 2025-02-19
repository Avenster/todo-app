import React from 'react';
import { Task } from '../types';
import { MoreHorizontal, Calendar, User } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  provided?: any; 
  onClick: () => void;
  isDragging?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, isDragging }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/20 text-red-500';
      case 'Medium':
        return 'bg-orange-500/20 text-orange-500';
      case 'Low':
        return 'bg-green-500/20 text-green-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div
      className={`
        bg-[#2A2A2A] 
        mt-4 
        rounded-lg 
        p-4 
        cursor-pointer 
        hover:bg-[#333]
        transition-all
        ${isDragging ? 'shadow-[0_0_0_2px_#22c55e] shadow-lg scale-105' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-white">{task.title}</h3>
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal size={16} />
        </button>
      </div>
      
      <div className="text-sm text-gray-400 mb-3">{task.taskId}</div>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={14} />
            <span className="text-xs">{formatDate(task.dueDate)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <User size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">{task.assignee}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;