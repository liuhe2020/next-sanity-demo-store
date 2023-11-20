'use client';

import useRouteStore from '@/store/route-store';
import { usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

export default function RouteHistoryProvider({ children }: { children: ReactNode }) {
  const path = process.env.NEXT_PUBLIC_DOMAIN + usePathname();
  const { routes, setRoutes } = useRouteStore();

  useEffect(() => {
    setRoutes({ previousRoute: routes.currentRoute, currentRoute: path });
  }, [path]);

  return <>{children}</>;
}
