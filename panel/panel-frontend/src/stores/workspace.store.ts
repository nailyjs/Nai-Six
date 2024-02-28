import type { LoggingDataUserSchema } from '@/views/Workspace/validator/Index.validator'
import { defineStore } from 'pinia'
import type { z } from 'zod'

export const enum TabType {
  Shop = 'shop',
  Passport = 'passport',
  Forum = 'forum',
  Workspace = 'workspace'
}

namespace Tab {
  export interface TabBaseOptions {
    name: string
  }
  export interface TabShopOptions extends TabBaseOptions {
    type: TabType.Shop
    activeMenu: string
  }

  export interface TabPassportOptions extends TabBaseOptions {
    type: TabType.Passport
    activeMenu: string
  }

  export interface TabForumOptions extends TabBaseOptions {
    type: TabType.Forum
    activeMenu: string
  }

  export interface TabWorkspaceOptions extends TabBaseOptions {
    type: TabType.Workspace
  }
}

export type OperationTabOptions = Tab.TabShopOptions | Tab.TabPassportOptions | Tab.TabForumOptions
type TabOptions = OperationTabOptions | Tab.TabWorkspaceOptions
type PageType = TabOptions['type']

interface WorkspaceState {
  tabs: TabOptions[]
  activeTab: string
  activeUser: z.infer<typeof LoggingDataUserSchema> | null
}

export const useWorkspaceStore = defineStore('naily_workspace', {
  state: (): WorkspaceState => {
    return {
      tabs: [{ name: '工作台', type: TabType.Workspace }],
      activeTab: '工作台',
      activeUser: null
    }
  },
  actions: {
    haveTab(name: string): boolean {
      return this.tabs.find((tab) => tab.name === name) !== undefined
    },
    getActiveTab(): TabOptions {
      return this.tabs.find((tab) => tab.name === this.activeTab) as TabOptions
    },
    addNewTab(name: string, type: PageType, activeMenu?: string): void {
      if (this.haveTab(name)) {
        const newTabName = `${name} - ${this.tabs.length - 1}`
        this.addNewTab(newTabName, type)
        this.activeTab = newTabName
      } else {
        // @ts-expect-error
        this.tabs.push({ name, type, activeMenu })
        this.activeTab = name
      }
    },
    removeTab(name: string): void {
      const index = this.tabs.findIndex((tab) => tab.name === name)
      const isNowActive = this.activeTab === name
      this.tabs.splice(index, 1)
      if (this.activeTab === name) {
        this.activeTab = this.tabs[index - 1].name
      }
      if (isNowActive) {
        this.activeTab = this.tabs[index - 1].name
      }
    },
    setActiveTabName(oldName: string, newName: string): void {
      if (oldName === newName) return
      const index = this.tabs.findIndex((tab) => tab.name === oldName)
      this.tabs[index].name = newName
      this.activeTab = newName
    },
    setUserInfo(user: z.infer<typeof LoggingDataUserSchema>) {
      this.activeUser = user
    },
    setActiveMenu(name: string): void {
      const activeTab = this.getActiveTab()
      if (activeTab.type === TabType.Workspace) return
      activeTab.activeMenu = name

      const index = this.tabs.findIndex((tab) => tab.name === activeTab.name)
      this.tabs[index] = activeTab
    },
    getActiveMenu(): string {
      const activeTab = this.getActiveTab()
      if (activeTab.type === TabType.Workspace) return ''
      return activeTab.activeMenu
    }
  },
  persist: true
})
