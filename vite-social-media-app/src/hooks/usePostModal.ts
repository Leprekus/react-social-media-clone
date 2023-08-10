import { create } from 'zustand'

interface PostModalStore {
    isOpen: boolean;
    Open: () => void;
    Close: () => void;


}

const usePostModal = create<PostModalStore>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),

}))
export default usePostModal