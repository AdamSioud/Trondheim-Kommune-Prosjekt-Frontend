<template>
    <GChart
    type="ColumnChart"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script lang="ts">

import { GChart } from 'vue-google-charts'

export default {
  name: 'TestSVG',
  data () {
    return {

      chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
      chartOptions: {
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

<!-- <style scoped lang="css">
.test-svg{
    display: block;
    margin: auto;
    text-align:center;

}
</style> -->
