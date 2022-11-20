import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', {
  state: () => ({
    title: '',
    message: '',
    advice: '',
    isError: false
  }),
  actions: {
  }
})
