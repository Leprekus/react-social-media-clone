import { create } from 'zustand'

interface FollowersModalStore {
    isOpen: boolean;
    Open: () => void;
    Close: () => void;


}

const useFollowersModal = create<FollowersModalStore>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),

}))
export default useFollowersModal