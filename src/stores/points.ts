import { defineStore } from 'pinia'
import { Point } from '@/type'

export const usePointsStore = defineStore('points', {
  state: () => ({
    points: [
      {
        label: 'test 1',
        point: [63.4279799, 10.3888638]
      },
      {
        label: 'test 2',
        point: [63.426155, 10.464222]
      },
      {
        label: 'test 3',
        point: [63.408581, 10.403129]
      }
    ] as Point[],
    idPointToAdd: -1,
    isAddingPoint: false
  }),
  actions: {
    createPoint (point: Point) {
      this.points.push(point)
    },
    removePoint (id: number) {
      this.points.splice(id, 1)
    },
    updatePoint (id: number, point: Point) {
      this.points[id] = point
    },
    addingPoint (id: number) {
      this.idPointToAdd = id
      this.isAddingPoint = !this.isAddingPoint
    }
  }
})
