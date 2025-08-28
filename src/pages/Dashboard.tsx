import React, { useState } from 'react';
import { Task } from '@/types';
import { Header } from '@/components/Header';
import { TaskList } from '@/components/TaskList';
import { TaskForm } from '@/components/TaskForm';
import { FloatingActionButton } from '@/components/FloatingActionButton';

export const Dashboard: React.FC = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsTaskFormOpen(false);
    setEditingTask(null);
  };

  const handleCreateTask = () => {
    setIsTaskFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCreateTask={handleCreateTask} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Your Tasks
            </h2>
            <p className="text-muted-foreground text-lg">
              Stay organized and boost your productivity 🚀
            </p>
          </div>
          
          <TaskList onEditTask={handleEditTask} onCreateTask={handleCreateTask} />
        </div>
      </main>
      
      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleCreateTask} />
      
      <TaskForm 
        isOpen={isTaskFormOpen} 
        onClose={handleCloseForm}
        editTask={editingTask}
      />
    </div>
  );
};