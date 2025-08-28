import React from 'react';
import { Task } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTask } from '@/contexts/TaskContext';
import { CheckCircle2, Circle, Trash2, Clock, Calendar, Edit3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { toggleTaskComplete, deleteTask } = useTask();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'gradient-priority-high';
      case 'medium': return 'gradient-priority-medium';
      case 'low': return 'gradient-priority-low';
      default: return 'bg-secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOverdue = new Date(task.deadline) < new Date() && !task.completed;

  return (
    <Card className={cn(
      "group w-full shadow-card border-border/50 transition-all duration-300 hover:shadow-elegant hover:border-primary/30 hover:scale-[1.02] cursor-pointer",
      task.completed && "opacity-60 hover:opacity-80",
      isOverdue && !task.completed && "border-destructive/50 hover:border-destructive/70"
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleTaskComplete(task.id)}
              className="p-0 h-auto hover:bg-transparent group/checkbox"
            >
              {task.completed ? (
                <CheckCircle2 className="h-6 w-6 text-success transition-all duration-300 group-hover/checkbox:scale-110" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground hover:text-primary transition-all duration-300 group-hover/checkbox:scale-110" />
              )}
            </Button>
            
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-semibold text-lg text-foreground transition-all duration-300",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                  {task.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="p-2 h-auto text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-full"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteTask(task.id)}
              className="p-2 h-auto text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300 rounded-full"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="flex items-center space-x-3">
            <Badge className={cn(
              "text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 hover:scale-105", 
              getPriorityColor(task.priority)
            )}>
              {task.priority === 'high' && '🔥'} 
              {task.priority === 'medium' && '⚡'} 
              {task.priority === 'low' && '🌱'} 
              {task.priority.toUpperCase()}
            </Badge>
            
            {isOverdue && !task.completed && (
              <Badge variant="destructive" className="text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
                ⚠️ OVERDUE
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2 px-2 py-1 rounded-md bg-muted/30">
              <Clock className="h-3 w-3" />
              <span className="font-medium">{formatTime(task.datetime)}</span>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 rounded-md bg-muted/30">
              <Calendar className="h-3 w-3" />
              <span className="font-medium">{formatDate(task.deadline)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};