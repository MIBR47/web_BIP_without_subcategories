'use client';
import React, { createContext, useState, useContext } from 'react';

interface FilterContextProps {
  filterType: string;
  setFilterType: (filterType: string) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  return (
    <FilterContext.Provider value={{ filterType, setFilterType }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
