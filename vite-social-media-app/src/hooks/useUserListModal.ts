import { create } from 'zustand'
import { User } from '../../typings';

interface UserListModalStore {
    isOpen: boolean;
    Open: () => void;
    Close: () => void;
    users: User[] | null;
    setUsers: (users: User[]) => void;
    removeUsers: () => void;


}

const useUserListModal = create<UserListModalStore>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
    users: null,
    setUsers: (users: User[]) => set({ users }),
    removeUsers: () => set({ users: null })

}))
export default useUserListModal

