'use client';

import Day1 from './days/Day1';
import Day2 from './days/Day2';
import Day3 from './days/Day3';
import Day4 from './days/Day4';
import Day5 from './days/Day5';

export default function DayContent({ dayId, profile, state, onUpdate }) {
  if (dayId === 1) return <Day1 profile={profile} state={state} onUpdate={onUpdate} />;
  if (dayId === 2) return <Day2 profile={profile} state={state} onUpdate={onUpdate} />;
  if (dayId === 3) return <Day3 profile={profile} state={state} onUpdate={onUpdate} />;
  if (dayId === 4) return <Day4 profile={profile} state={state} onUpdate={onUpdate} />;
  if (dayId === 5) return <Day5 profile={profile} state={state} onUpdate={onUpdate} />;
  return null;
}

// Helper hook for marking tasks done from within content
export function useTaskMark(state, onUpdate) {
  return (id) => {
    if (state.tasks?.[id]) return;
    onUpdate({ ...state, tasks: { ...state.tasks, [id]: true } });
  };
}
