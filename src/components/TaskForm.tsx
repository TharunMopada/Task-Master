import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useTask } from '@/contexts/TaskContext';
import { useToast } from '@/hooks/use-toast';
import { Task, TaskPriority } from '@/types';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  editTask?: Task | null;
}

export const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, editTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const { addTask, updateTask } = useTask();
  const { toast } = useToast();

  // Pre-fill form when editing
  React.useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setDatetime(editTask.datetime);
      setDeadline(editTask.deadline);
      setPriority(editTask.priority);
    } else {
      // Reset form when not editing
      setTitle('');
      setDescription('');
      setDatetime('');
      setDeadline('');
      setPriority('medium');
    }
  }, [editTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (editTask) {
      // Update existing task
      updateTask(editTask.id, {
        title: title.trim(),
        description: description.trim(),
        datetime: datetime || '',
        deadline,
        priority,
      });

      toast({
        title: "Task Updated",
        description: "Your task has been successfully updated!",
      });
    } else {
      // Create new task
      addTask({
        title: title.trim(),
        description: description.trim(),
        datetime: datetime || '',
        deadline,
        priority,
        completed: false,
      });

      toast({
        title: "Task Created",
        description: "Your task has been successfully added!",
      });
    }

    // Reset form
    setTitle('');
    setDescription('');
    setDatetime('');
    setDeadline('');
    setPriority('medium');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md shadow-elegant border-border/50 glass-effect">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl gradient-primary bg-clip-text text-transparent font-bold">
            {editTask ? 'Edit Task' : 'Create New Task'}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 h-auto text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="transition-smooth focus:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="transition-smooth focus:ring-primary/50 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="datetime" className="text-foreground">
                  Start Time
                </Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                  className="transition-smooth focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-foreground">
                  Deadline <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="deadline"
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="transition-smooth focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as TaskPriority)}>
                <SelectTrigger className="transition-smooth focus:ring-primary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-priority-low"></div>
                      <span>Low Priority</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-priority-medium"></div>
                      <span>Medium Priority</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-priority-high"></div>
                      <span>High Priority</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 gradient-primary hover:opacity-90 transition-smooth font-semibold"
              >
                <Plus className="mr-2 h-4 w-4" />
                {editTask ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};