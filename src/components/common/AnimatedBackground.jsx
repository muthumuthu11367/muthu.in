import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const AnimatedBackground = () => {
  const { theme } = useTheme();

  if (!theme.bgMeshAnimation) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle Moonlit Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 dark:opacity-20" />
    </div>
  );
};