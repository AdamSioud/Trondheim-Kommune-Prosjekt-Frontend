<template>
    <GChart
    class="chart"
    type="ColumnChart"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script lang="ts">

import { GChart } from 'vue-google-charts'

export default {
  name: 'AppDiagram',
  data () {
    return {

      chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 800, 400, 200],
        ['2015', 920, 460, 250],
        ['2016', 660, 720, 300]
      ],
      chartOptions: {
        height: 143,
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017'
        }
      }
    }
  },
  components: {
    GChart
  }
}
</script>

<style scoped lang="css">
.chart{
    max-height: 1px;
}
</style>
