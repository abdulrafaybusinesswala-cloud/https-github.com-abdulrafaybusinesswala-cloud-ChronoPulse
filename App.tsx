import React from 'react';
import { Stopwatch } from './components/Stopwatch';
import { Clock } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-4 sm:p-8">
      <header className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 text-indigo-400">
          <Clock className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">ChronoPulse</span>
        </div>
      </header>

      <main className="w-full max-w-md mx-auto z-0 flex flex-col items-center">
        <Stopwatch />
      </main>
      
      <footer className="absolute bottom-4 text-slate-600 text-sm">
        Precision Timing Tool
      </footer>
    </div>
  );
};

export default App;