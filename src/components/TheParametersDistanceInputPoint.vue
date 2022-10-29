<template>
  <div class="input-point">
    <input type="text" :value="label" @change="$emit('updateLabel', id, $event.target.value)">
    <button class="input-button" @click="isMarkerPlaced ? $emit('showPosition', x, y) : emitAddingNewMarker">
      <font-awesome-icon v-if="isMarkerPlaced" icon="fa-solid fa-location-crosshairs"/>
      <font-awesome-layers v-else>
        <font-awesome-icon icon="fa-solid fa-location-dot"/>
        <font-awesome-icon icon="fa-solid fa-plus" transform="shrink-6 right-8 down-6"/>
      </font-awesome-layers>
    </button>
    <button v-if="isMarkerPlaced" class="input-button" @click="$emit('removePoint', id)">
      <font-awesome-icon icon="fa-solid fa-xmark" :style="{color: 'red'}"/>
    </button>
    <!--    {{x}} | {{y}} | {{label}} | {{id}}-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePointsStore } from '@/stores/points'
import { mapActions } from 'pinia'

export default defineComponent({
  name: 'TheParametersDistanceInputPoint',
  props: {
    x: {
      type: Number,
      default: Number.NaN
    },
    y: {
      type: Number,
      default: Number.NaN
    },
    label: {
      type: String
    },
    id: {
      type: Number,
      default: Number.NaN
    }
  },
  emits: ['showPosition', 'removePoint', 'updateLabel'],
  computed: {
    isMarkerPlaced () {
      return !Number.isNaN(this.x) && !Number.isNaN(this.y)
    }
  },
  methods: {
    ...mapActions(usePointsStore, ['toggleIsAddingPoint']),
    emitAddingNewMarker () {
      this.toggleIsAddingPoint()
      document.addEventListener('click', () => {
        this.toggleIsAddingPoint()
      })
    }
  }
})
</script>

<style scoped lang="scss">
.input-point {
  display: flex;
}

.input-point > * {
  margin: 3px;
}

.input-point > input {
  flex: 1;
}

.input-button {
  background-color: white;
  border-radius: 4px;
  border: 1px darkgray solid;
  cursor: pointer;
  padding: 4px;
  flex: 0 0 30px;
}
</style>
