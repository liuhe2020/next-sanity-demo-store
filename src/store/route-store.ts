'use client';
import { create } from 'zustand';

const useRouteStore = create<RoutesStore>((set) => ({
  routes: {
    previousRoute: '',
    currentRoute: '',
  },

  setRoutes: (routes) => set(() => ({ routes })),
}));

export default useRouteStore;
