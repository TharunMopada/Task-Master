import React from 'react';
import { Task, TaskFilter, TaskSort } from '@/types';
import { TaskCard } from './TaskCard';
import { EmptyState } from './EmptyState';
import { AnimatedCounter } from './AnimatedCounter';
import { useTask } from '@/contexts/TaskContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown, ListTodo, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskListProps {
  onEditTask?: (task: Task) => void;
  onCreateTask?: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({ onEditTask, onCreateTask }) => {
  const { 
    filteredAndSortedTasks, 
    filter, 
    setFilter, 
    sort, 
    setSort,
    tasks 
  } = useTask();

  const getFilterStats = () => {
    const total = tasks.length;
    const pending = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;
    return { total, pending, completed };
  };

  const stats = getFilterStats();

  const getFilterConfig = (filterType: TaskFilter) => {
    switch (filterType) {
      case 'all':
        return {
          label: 'All',
          className: 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100',
          activeClassName: 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100'
        };
      case 'pending':
        return {
          label: 'Pending',
          className: 'hover:bg-orange-100 hover:text-orange-900 dark:hover:bg-orange-900/20 dark:hover:text-orange-100',
          activeClassName: 'bg-orange-200 text-orange-900 dark:bg-orange-900/30 dark:text-orange-100'
        };
      case 'completed':
        return {
          label: 'Completed',
          className: 'hover:bg-green-100 hover:text-green-900 dark:hover:bg-green-900/20 dark:hover:text-green-100',
          activeClassName: 'bg-green-200 text-green-900 dark:bg-green-900/30 dark:text-green-100'
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-elegant">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/20">
              <ListTodo className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Tasks</p>
              <p className="text-3xl font-bold text-foreground">
                <AnimatedCounter value={stats.total} />
              </p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-border/50 hover:border-warning/30 transition-all duration-300 hover:shadow-elegant">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-4">
            <div className="p-3 rounded-full bg-warning/20">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-foreground">
                <AnimatedCounter value={stats.pending} />
              </p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-border/50 hover:border-success/30 transition-all duration-300 hover:shadow-elegant">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-4">
            <div className="p-3 rounded-full bg-success/20">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Completed</p>
              <p className="text-3xl font-bold text-foreground">
                <AnimatedCounter value={stats.completed} />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters and Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-6 p-6 glass-effect rounded-xl border border-border/50">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Filter:</span>
          </div>
          <div className="flex space-x-2">
            {(['all', 'pending', 'completed'] as TaskFilter[]).map((filterOption) => {
              const config = getFilterConfig(filterOption);
              const isActive = filter === filterOption;
              
              return (
                <Button
                  key={filterOption}
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilter(filterOption)}
                  className={cn(
                    "px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105",
                    isActive ? config.activeClassName : config.className,
                    isActive && "shadow-md"
                  )}
                >
                  {config.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold text-foreground">Sort by:</span>
          <Select value={sort} onValueChange={(value) => setSort(value as TaskSort)}>
            <SelectTrigger className="w-[160px] border-border/50 hover:border-primary/30 transition-colors">
              <SelectValue />
              <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </SelectTrigger>
            <SelectContent className="border-border/50">
              <SelectItem value="deadline">📅 Deadline</SelectItem>
              <SelectItem value="priority">⚡ Priority</SelectItem>
              <SelectItem value="created">🕒 Created</SelectItem>
              <SelectItem value="title">📝 Title</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Task List with Animations */}
      <div className="space-y-4">
        {filteredAndSortedTasks.length === 0 ? (
          <EmptyState filter={filter} onCreateTask={onCreateTask} />
        ) : (
          <div className="space-y-4">
            {filteredAndSortedTasks.map((task, index) => (
              <div
                key={task.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TaskCard 
                  task={task} 
                  onEdit={onEditTask || (() => {})} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};