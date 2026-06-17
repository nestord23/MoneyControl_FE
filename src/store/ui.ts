import { create } from 'zustand';

export type ModalType = 'gasto' | 'ingreso' | 'deuda' | 'categoria' | null;

export interface EditingItem {
  type: 'categoria' | 'gasto' | 'ingreso' | 'prestamo';
  id: number;
}

interface UIState {
  sidebarOpen: boolean;
  modalOpen: ModalType;
  editingItem: EditingItem | null;
  toastMessage: string | null;
  toastType: 'success' | 'error' | null;
  toggleSidebar: () => void;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  setEditingItem: (item: EditingItem | null) => void;
  showToast: (message: string, type: 'success' | 'error') => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  modalOpen: null,
  editingItem: null,
  toastMessage: null,
  toastType: null,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  openModal: (modal) => set({ modalOpen: modal }),
  closeModal: () => set({ modalOpen: null, editingItem: null }),
  setEditingItem: (item) => set({ editingItem: item }),
  showToast: (message, type) => set({ toastMessage: message, toastType: type }),
  hideToast: () => set({ toastMessage: null, toastType: null }),
}));
