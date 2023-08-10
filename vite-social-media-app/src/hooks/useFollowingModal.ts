import { create } from 'zustand'

interface FollowingModalStore {
    isOpen: boolean;
    Open: () => void;
    Close: () => void;


}

const useFollowingModal = create<FollowingModalStore>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),

}))
export default useFollowingModal