import React from "react";

interface GridSectionProps {
  children: React.ReactNode;
  className?: string; // Optional additional class names
}

const GridSection: React.FC<GridSectionProps> = ({ children, className }) => {
  const baseClass =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2 mb-2";
  return <div className={`${baseClass} ${className || ""}`}>{children}</div>;
};

export default GridSection;
