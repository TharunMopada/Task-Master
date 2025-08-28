import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, CheckCircle2, Clock, ListTodo } from 'lucide-react';

interface EmptyStateProps {
  filter: 'all' | 'pending' | 'completed';
  onCreateTask?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ filter, onCreateTask }) => {
  const getEmptyStateContent = () => {
    switch (filter) {
      case 'all':
        return {
          icon: <ListTodo className="h-16 w-16 text-muted-foreground/50" />,
          title: "No tasks yet",
          description: "You're all set! Start by adding a task and boost your productivity",
          emoji: "🚀",
          showCTA: true
        };
      case 'pending':
        return {
          icon: <Clock className="h-16 w-16 text-warning/50" />,
          title: "No pending tasks",
          description: "Great job! You've completed all your pending tasks",
          emoji: "🎉",
          showCTA: false
        };
      case 'completed':
        return {
          icon: <CheckCircle2 className="h-16 w-16 text-success/50" />,
          title: "No completed tasks",
          description: "Complete some tasks to see them here",
          emoji: "💪",
          showCTA: false
        };
      default:
        return {
          icon: <ListTodo className="h-16 w-16 text-muted-foreground/50" />,
          title: "No tasks",
          description: "Start organizing your tasks",
          emoji: "📝",
          showCTA: true
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="text-center py-16 px-4">
      {/* Animated illustration container */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-card to-card-hover rounded-2xl p-8 mx-auto w-fit border border-border/50">
          {content.icon}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto space-y-4">
        <h3 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          {content.title}
          <span className="text-2xl">{content.emoji}</span>
        </h3>
        
        <p className="text-muted-foreground text-lg leading-relaxed">
          {content.description}
        </p>

        {content.showCTA && onCreateTask && (
          <div className="pt-4">
            <Button
              onClick={onCreateTask}
              size="lg"
              className="gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-elegant font-semibold px-8"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Task
            </Button>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-accent/20 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};