'use client';

import { createContext, useContext } from 'react';

export interface MergeBgState {
  active: boolean;
}

export const MergeBgContext = createContext<MergeBgState>({ active: false });

export const useMergeBg = () => useContext(MergeBgContext);
