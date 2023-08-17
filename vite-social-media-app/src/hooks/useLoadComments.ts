import { create } from 'zustand'

interface LoadCommentsStore {
    id: string | null;
    setId: (id: string) => void;
    removeId: () => void;

}

const useLoadComments = create<LoadCommentsStore>((set) => ({
    id: null,
    setId: (id:string) => set({ id }),
    removeId: () => set({ id: null })

}))
export default useLoadComments