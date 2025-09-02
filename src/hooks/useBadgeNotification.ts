import { create } from 'zustand';
import type { Badge } from '../domain/types';

interface BadgeNotificationState {
  newBadge: Badge | null;
  isVisible: boolean;
  showBadgeNotification: (badge: Badge) => void;
  closeBadgeNotification: () => void;
}

export const useBadgeNotification = create<BadgeNotificationState>((set) => ({
  newBadge: null,
  isVisible: false,
  showBadgeNotification: (badge: Badge) => set({ 
    newBadge: badge, 
    isVisible: true 
  }),
  closeBadgeNotification: () => set({ 
    newBadge: null, 
    isVisible: false 
  }),
}));
