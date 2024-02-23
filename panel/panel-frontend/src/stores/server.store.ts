import { defineStore } from 'pinia'

export interface ServerStoreItem {
  passport: string
  backend: string
  common: string
  shop?: string
  forum?: string
}

interface ServerStoreState {
  servers: Record<string, ServerStoreItem>
  active: string | null
}

export const useServerStore = defineStore('server-store', {
  state: (): ServerStoreState => {
    return {
      servers: {},
      active: null
    }
  },
  actions: {
    getCurrentServer() {
      if (this.active) {
        return this.servers[this.active]
      } else return null
    },
    setActiveServer(name: string) {
      this.active = name
    },
    addServer(name: string, server: ServerStoreItem) {
      this.servers[name] = server
    },
    removeServer(name: string) {
      delete this.servers[name]
    },
    getServer(name: string) {
      return this.servers[name]
    },
    getServerList() {
      return Object.keys(this.servers)
    }
  },
  persist: true
})
