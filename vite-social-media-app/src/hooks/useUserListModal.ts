import { create } from 'zustand'

interface UserListModalStore {
    isOpen: boolean;
    Open: () => void;
    Close: () => void;
    ids: string[] | null;
    setIds: (ids: string[]) => void;
    removeIds: () => void;


}

const useUserListModal = create<UserListModalStore>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
    ids: null,
    setIds: (ids: string[]) => set({ ids }),
    removeIds: () => set({ ids: null })

}))
export default useUserListModal

