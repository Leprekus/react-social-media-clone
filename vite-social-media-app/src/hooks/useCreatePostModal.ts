import { create } from 'zustand'

interface CreatePostModalStore {
    isOpen: boolean;
    Open: () => void;
    Close: () => void;
}

const useCreatePostModal = create<CreatePostModalStore>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),

}))
export default useCreatePostModal