import { create } from 'zustand'

interface EditProfileModalStore {
    isOpen: boolean;
    Open: () => void;
    Close: () => void;


}

const useEditProfileModal = create<EditProfileModalStore>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),

}))
export default useEditProfileModal