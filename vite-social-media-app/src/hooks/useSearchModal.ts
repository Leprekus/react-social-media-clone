import { create } from 'zustand'

interface SearchModalStore {
    isOpen: boolean;
    Open: () => void;
    Close: () => void;


}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),

}))
export default useSearchModal