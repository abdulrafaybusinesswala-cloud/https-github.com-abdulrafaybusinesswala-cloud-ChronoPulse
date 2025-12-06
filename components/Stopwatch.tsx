import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Flag, History } from 'lucide-react';
import { Button } from './Button';
import { getTimeComponents } from '../utils/timeUtils';
import { LapList } from './LapList';

export const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  
  const startTimeRef = useRef<number>(0);
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);

  const animate = useCallback((timestamp: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = timestamp - previousTimeRef.current;
      setTime((prevTime) => prevTime + deltaTime);
    }
    previousTimeRef.current = timestamp;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isRunning) {
      previousTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, animate]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((prevLaps) => [time, ...prevLaps]);
  };

  const { minutes, seconds, milliseconds } = getTimeComponents(time);

  return (
    <div className="flex flex-col items-center w-full max-w-lg">
      {/* Time Display */}
      <div className="relative mb-12 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-slate-900 rounded-full border-4 border-slate-800 flex items-center justify-center shadow-2xl">
           {/* Inner Ring Glow */}
           <div className={`absolute inset-4 rounded-full border border-slate-700/50 ${isRunning ? 'animate-pulse' : ''}`}></div>
           
           <div className="flex flex-col items-center z-10">
             <div className="flex items-baseline font-mono text-slate-100 tabular-nums leading-none tracking-tighter">
                <span className="text-6xl sm:text-7xl font-bold">{minutes}</span>
                <span className="text-2xl sm:text-3xl text-slate-500 mx-1">:</span>
                <span className="text-6xl sm:text-7xl font-bold">{seconds}</span>
             </div>
             <div className="mt-2 text-3xl sm:text-4xl font-mono text-indigo-400 font-bold tabular-nums">
                .{milliseconds}
             </div>
           </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-8 w-full justify-center">
        {!isRunning ? (
          <Button onClick={handleStart} variant="primary" icon={<Play size={20} className="fill-current" />}>
            Start
          </Button>
        ) : (
          <Button onClick={handleStop} variant="danger" icon={<Pause size={20} className="fill-current" />}>
            Stop
          </Button>
        )}

        <Button 
          onClick={handleLap} 
          variant="secondary" 
          disabled={!isRunning && time === 0}
          icon={<Flag size={18} />}
          title="Lap"
        >
          Lap
        </Button>

        <Button 
          onClick={handleReset} 
          variant="ghost" 
          disabled={time === 0}
          icon={<RotateCcw size={18} />}
          title="Reset"
        >
          Reset
        </Button>
      </div>

      {/* Laps */}
      <div className="w-full bg-slate-900/50 rounded-2xl border border-slate-800 backdrop-blur-sm overflow-hidden flex flex-col max-h-64 sm:max-h-80">
        <div className="p-4 border-b border-slate-800 flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase tracking-wider">
          <History size={16} />
          <span>Lap History</span>
          <span className="ml-auto bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full text-xs">
            {laps.length}
          </span>
        </div>
        <div className="overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <LapList laps={laps} />
        </div>
      </div>
    </div>
  );
};