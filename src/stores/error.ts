import { defineStore } from 'pinia'
import { Point } from '@/type'

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
