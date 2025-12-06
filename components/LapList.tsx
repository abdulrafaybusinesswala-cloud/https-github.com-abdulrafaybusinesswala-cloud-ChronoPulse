import React from 'react';
import { formatTime } from '../utils/timeUtils';

interface LapListProps {
  laps: number[];
}

export const LapList: React.FC<LapListProps> = ({ laps }) => {
  if (laps.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 italic">
        No laps recorded yet.
      </div>
    );
  }

  return (
    <ul className="space-y-1">
      {laps.map((lapTime, index) => {
        const lapNumber = laps.length - index;
        // Calculate split time (difference from previous lap)
        // Since laps are reversed (newest first), prev lap is actually index + 1
        const prevLapTotal = laps[index + 1] || 0;
        const splitTime = lapTime - prevLapTotal; 
        
        // Note: In standard stopwatch logic, "Lap" usually captures the CURRENT duration since start.
        // Usually you also want the "Split" duration (duration of just that lap).
        // Since we are storing total accumulators in `laps`, we calculate the difference.
        // Wait, simpler logic: If we just push `time` to laps, `laps[0]` is current total.
        // The "lap duration" is `laps[index] - laps[index+1]`.

        const currentTotal = lapTime;
        const previousTotal = laps[index + 1] || 0;
        const lapDuration = currentTotal - previousTotal;

        return (
          <li 
            key={lapNumber} 
            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <span className="text-slate-500 font-mono w-8">#{String(lapNumber).padStart(2, '0')}</span>
            <span className="text-slate-300 font-mono">
                {/* For standard "Lap" time (duration of this specific lap) */}
                {formatTime(lapDuration)}
            </span>
             <span className="text-slate-500 text-xs font-mono border border-slate-800 px-2 py-0.5 rounded">
                Total: {formatTime(currentTotal)}
            </span>
          </li>
        );
      })}
    </ul>
  );
};