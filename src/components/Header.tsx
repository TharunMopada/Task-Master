import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { UserAvatar } from '@/components/UserAvatar';
import { LogOut, Plus, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onCreateTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateTask }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 glass-effect backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="group">
              <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 cursor-pointer">
                TaskMaster
              </h1>
            </button>
            <div className="hidden sm:flex items-center space-x-3">
              <UserAvatar user={user} size="sm" />
              <div className="text-sm">
                <span className="text-muted-foreground">Welcome, </span>
                <span className="font-medium text-foreground">
                  {user?.name || user?.email?.split('@')[0] || 'User'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-accent transition-smooth"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              onClick={onCreateTask}
              className="gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-105 font-semibold shadow-elegant"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">New Task</span>
              <span className="sm:hidden">Add</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={logout}
              className="hover:bg-destructive hover:text-destructive-foreground transition-smooth"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};