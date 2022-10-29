<template>
  <div id="distance-input">
    <the-parameters-distance-input-point v-for="(point, index) in points" :key="index" :id="index"
                                         :x="point.point[0]" :y="point.point[1]" :label="point.label"
                                         @remove-point="removePoint" @update-label="updateLabel"/>
    <button class="add-button" @click="createPoint">
      <font-awesome-icon icon="fa-solid fa-plus" :style="{color: 'green'}"/>
      {{ $t('parameters.point.add') }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheParametersDistanceInputPoint from '@/components/TheParametersDistanceInputPoint.vue'
import { mapActions, mapState } from 'pinia'
import { usePointsStore } from '@/stores/points'

export default defineComponent({
  name: 'TheParametersDistanceInput',
  components: { TheParametersDistanceInputPoint },
  computed: {
    ...mapState(usePointsStore, ['points'])
  },
  methods: {
    ...mapActions(usePointsStore, {
      storeRemovePoint: 'removePoint',
      storeCreatePoint: 'createPoint',
      storeUpdatePoint: 'updatePoint'
    }),
    removePoint (id: number) {
      this.storeRemovePoint(id)
    },
    createPoint () {
      this.storeCreatePoint({
        label: this.$t('parameters.point.label') + ' ' + (this.points.length + 1),
        point: []
      })
    },
    updateLabel (id: number, label: string) {
      this.storeUpdatePoint(id, {
        label: label,
        point: this.points[id].point
      })
    }
  }
})
</script>

<style scoped lang="scss">
#distance-input {
  display: flex;
  flex-direction: column;
}

.add-button {
  padding: 4px 6px;
  background-color: white;
  border-radius: 4px;
  border: 1px darkgray solid;
  cursor: pointer;
  margin: 2px 4px;
}
</style>
