<template>
  <div class="card">
    <div class="title">
      <div class="name">{{ $t(name) }}</div>
      <div class="checkbox"> Insert checkbox</div>
    </div>
    <div class="diagram">
      <AppDiagram :chart-data="chartData"></AppDiagram>
    </div>
    <!--    <div class="text"> {{ text }}</div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppDiagram from '@/components/AppDiagram.vue'

export default defineComponent({
  name: 'AppCard',
  components: { AppDiagram },
  props: {
    name: {
      type: String,
      default: 'Title'
    },
    text: {
      type: String,
      default: 'This is an example text'
    },
    properties: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  computed: {
    chartData () {
      const chartData = [['Population', 'Quantity']]
      console.log(this.properties)
      for (const property in this.properties) {
        chartData.push([property as string, this.properties[property].quantity as string])
      }
      console.log(chartData)
      return chartData
    }
  }
})
</script>

<style scoped lang="css">
.card {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.diagram {
  grid-area: 3 / 2 / 13 / 8;
}

.title {
  grid-area: 1 / 3 / 3 / 9;
  display: flex;
  flex-flow: row wrap;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 4px;
}

.name {
  font-weight: bold;
}

</style>
