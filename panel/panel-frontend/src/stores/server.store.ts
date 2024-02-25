import { setPassport } from '@/apis/base'
import axios from 'axios'
import { defineStore } from 'pinia'

export interface ServerStoreItem {
  passport: string
  backend: string
  common: string
  shop?: string
  forum?: string
  access_token?: string
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
      if (!this.servers[name]) throw new Error('Server not found')
      setPassport(
        axios.create({
          timeout: 10000,
          baseURL: this.servers[name].passport,
          headers: {
            'Content-Type': 'application/json'
          }
        }),
        name
      )
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
    },
    setAccessToken(token: string) {
      if (this.active && this.servers[this.active]) {
        this.servers[this.active].access_token = token
        window.localStorage.setItem(`access_token_${this.active}`, token)
      }
    }
  },
  persist: true
})
