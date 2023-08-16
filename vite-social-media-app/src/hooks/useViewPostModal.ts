import { create } from 'zustand'

interface ViewPostModalStore {
    isOpen: boolean;
    Open: () => void;
    Close: () => void;
    id: string | null;
    setId: (id: string) => void;
    removeId: () => void;


}

const useViewPostModal = create<ViewPostModalStore>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
    id: null,
    setId: (id:string) => set({ id }),
    removeId: () => set({ id: null })

}))
export default useViewPostModal