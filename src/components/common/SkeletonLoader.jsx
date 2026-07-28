import React from 'react';

export const SkeletonCard = ({ height = 'h-64' }) => {
  return (
    <div className={`glass-panel p-6 ${height} flex flex-col justify-between rounded-2xl border border-slate-800`}>
      <div className="space-y-3">
        <div className="w-12 h-12 rounded-xl bg-slate-800" />
        <div className="w-3/4 h-5 rounded bg-slate-800" />
        <div className="w-full h-3 rounded bg-slate-800/80" />
        <div className="w-5/6 h-3 rounded bg-slate-800/80" />
      </div>
      <div className="flex gap-2">
        <div className="w-16 h-6 rounded-full bg-slate-800" />
        <div className="w-16 h-6 rounded-full bg-slate-800" />
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export const SkeletonLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
        <div className="w-6 h-6 rounded-lg bg-indigo-500" />
      </div>
      <span className="text-xs text-indigo-400 font-mono font-semibold">
        Loading Data & Services...
      </span>
    </div>
  );
};