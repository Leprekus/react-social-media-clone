import { create } from 'zustand'

interface ViewPostModalStore {
    isOpen: boolean;
    Open: () => void;
    Close: () => void;
    id: string | null;
    username: string | null
    setId: (id: string) => void;
    setUsername: (username: string) => void;
    removeId: () => void;
    removeUsername: () => void


}

const useViewPostModal = create<ViewPostModalStore>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
    id: null,
    username: null,
    setId: (id: string) => set({ id }),
    setUsername: (username: string) => set({ username }),
    removeId: () => set({ id: null }),
    removeUsername: () => set({ username: null }),
}))
export default useViewPostModal

