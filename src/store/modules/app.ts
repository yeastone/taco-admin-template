import { defineStore } from 'pinia'
import { store } from '@/store'
export const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        sidebarExpand: true,
    }),
    getters: {},
    actions: {
        SET_SIDEBAR_EXPAND(status: boolean) {
            this.sidebarExpand = status
        },
    },
})

export function useAppStoreHook() {
    return useAppStore(store)
}
