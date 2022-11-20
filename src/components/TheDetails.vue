<template>
  <div id="the-details" v-if="zoneData !== null && display">
    <div id="the-details-header">
      <h2 id="the-details-zone-name">{{ zoneData?.zoneName }}</h2>
      <font-awesome-icon id="the-details-close" class="fa-xl" icon="fa-solid fa-plus"
                         transform="rotate-45" @click="closeDetails"/>
    </div>
    <div id="the-details-information">
      <app-card v-for="(property, key) in data" :key="key" :title="'details.' + key + '.title'">
        <g-chart class="chart" :type="property.type" :data="property.data"
                 :options="property.option" :settings="{ packages: ['corechart'], language: 'no' }"></g-chart>
      </app-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppCard from '@/components/AppCard.vue'
import { ConfigDetails, JSONObject, ZoneData } from '@/type'
import { GChart } from 'vue-google-charts'
import configDetails from '../assets/config/config_details.json'

export default defineComponent({
  name: 'TheDetails',
  components: {
    AppCard,
    GChart
  },
  props: {
    zoneData: {
      type: Object as PropType<ZoneData>,
      default: () => {
        return {}
      }
    },
    generalData: {
      type: Object as PropType<JSONObject>,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      configDetails: JSON.parse(JSON.stringify(configDetails)) as ConfigDetails,
      display: false,
      counterOfChartsNotReady: Object.keys(configDetails).length
    }
  },
  computed: {
    data () {
      const res: JSONObject = {}
      for (const configDetailsKey in this.configDetails) {
        const card: JSONObject = {}
        let data: (string | number)[][] = []
        const headConfig = this.configDetails[configDetailsKey].head

        data = data.concat([this.generateHeader(headConfig)])
        data = data.concat(this.generateData(configDetailsKey))
        const genData = this.generateGeneralData(configDetailsKey)
        if (genData.length > 0) data = data.concat(genData)

        card.type = this.configDetails[configDetailsKey].chartType
        card.option = this.configDetails[configDetailsKey].chartOption !== undefined ? this.configDetails[configDetailsKey].chartOption as JSONObject : {}
        card.data = data
        res[configDetailsKey] = card
      }
      return res
    }
  },
  watch: {
    zoneData () {
      this.display = true
      this.counterOfChartsNotReady = this.zoneData ? Object.keys(this.zoneData).length : -1
    }
  },
  methods: {
    generateHeader (headConfig: string | string[]): string[] {
      const head = ['data']
      if (Array.isArray(headConfig)) {
        for (const value of headConfig) {
          head.push(this.$t(value))
        }
      } else {
        head.push(this.$t(headConfig))
      }
      return head
    },
    generateData (configDetailsKey: string): (string | number)[][] {
      const data: (string | number)[][] = []
      const dataConfig = this.configDetails[configDetailsKey].data
      if (dataConfig) {
        for (const dataKey in dataConfig) {
          const row: (string | number)[] = [this.$t(dataKey)]
          for (const property of dataConfig[dataKey]) {
            row.push(((this.zoneData[configDetailsKey] as JSONObject)[property] as JSONObject)[this.configDetails[configDetailsKey].propertyName] as number)
          }
          data.push(row)
        }
      } else {
        for (const zoneDataKey in this.zoneData[configDetailsKey] as JSONObject) {
          data.push([zoneDataKey, ((this.zoneData[configDetailsKey] as JSONObject)[zoneDataKey] as JSONObject)[this.configDetails[configDetailsKey].propertyName] as number])
        }
      }
      return data
    },
    generateGeneralData (configDetailsKey: string): (string | number)[][] {
      const data = []
      if (this.configDetails[configDetailsKey].compareToGeneralData && typeof this.configDetails[configDetailsKey].generalDataPropertyName !== 'undefined') {
        for (const zoneDataKey in this.zoneData[configDetailsKey] as JSONObject) {
          if (this.configDetails[configDetailsKey].generalDataPropertyName as string in ((this.zoneData[configDetailsKey] as JSONObject)[zoneDataKey] as JSONObject)) {
            data.push([this.$t('details.generalData'), ((this.generalData[configDetailsKey] as JSONObject)[zoneDataKey] as JSONObject)[this.configDetails[configDetailsKey].generalDataPropertyName as string] as number])
          }
        }
      }
      return data
    },
    closeDetails () {
      this.display = false
    },
    chartReady () {
      this.counterOfChartsNotReady--
    }
  }
})
</script>

<style scoped lang="scss">
#the-details {
  background-color: rgb(121, 174, 204);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#the-details-information {
  //display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  white-space: nowrap;
}

//.card-body{
//  background: rgba(26, 8, 8, 0.34);
//  width: 14rem;
//  height: 12rem;
//  border-radius: 10px;
//  padding: 1px;
//  color: rgb(249, 249, 249);
//  font-size: 1em;
//}

@media only screen and (min-width: 768px) {
  #the-details {
    height: 250px;
    color: black;
    align-items: stretch;
    margin-top: 1em;
  }

  #the-details-header {
    display: flex;
    position: relative;
    justify-content: center;
    margin-bottom: 10px;
  }

  #the-details-zone-name {
    font-size: 1.5rem;
    font-weight: bold;
  }

  #the-details-close {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }

  .chart {
    height: 160px;
    border-radius: 10px;
    overflow: hidden;
  }
}

// TODO: Delete

#the-details-information {
  flex-wrap: nowrap;
  overflow: hidden;
  overflow-x: auto;
}
</style>
