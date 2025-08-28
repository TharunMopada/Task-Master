import React, { useState } from 'react';
import { AuthForm } from '@/components/AuthForm';

export const Auth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
            TaskMaster
          </h1>
          <p className="text-muted-foreground">
            Your intelligent task management companion
          </p>
        </div>
        
        <AuthForm 
          mode={mode} 
          onToggleMode={() => setMode(mode === 'login' ? 'register' : 'login')} 
        />
      </div>
    </div>
  );
};