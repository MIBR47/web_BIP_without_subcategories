import { create } from 'zustand';
import { ProductResponse, Categories } from '@/types';

type PreviewData = ProductResponse | Categories;

interface PreviewModalStore {
  isOpen: boolean;
  data?: PreviewData;
  onOpen: (data: PreviewData) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: PreviewData) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: undefined }), // Ensure no additional updates
}));

export default usePreviewModal;
