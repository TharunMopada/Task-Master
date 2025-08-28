export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  datetime: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
  userId: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskFilter = 'all' | 'pending' | 'completed';
export type TaskSort = 'deadline' | 'priority' | 'created' | 'title';