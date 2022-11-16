<template>
  <div id="the-details" v-if="zoneData !== null && display">
<!--    <div v-if="properties === null" style="font-size: 3rem; text-align: center">Click on zone to display information</div>-->
      <div id="the-details-header">
        <h2 id="the-details-zone-name">{{ zoneData?.zoneName }}</h2>
        <font-awesome-icon id="the-details-close" class="fa-xl" icon="fa-solid fa-plus"
                           transform="rotate-45" @click="closeDetails"/>
      </div>
      <div id="the-details-information">
<!--        <template v-if="counterOfChartsNotReady > 0">ça charge</template>-->
<!--        <template v-else-if="counterOfChartsNotReady < 0">Error</template>-->
<!--        <template v-else>-->
          <AppCard v-for="(property, key) in properties" :key="key"
                   :name="'details.' + key" :text="String(property)" :properties="property"
                   @chart-ready="chartReady">
          </AppCard>
<!--        </template>-->
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppCard from '@/components/AppCard.vue'
import { ZoneData } from '@/type'

export default defineComponent({
  name: 'TheDetails',
  components: { AppCard },
  props: {
    zoneData: {
      type: Object as PropType<ZoneData | null>,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {
      display: false,
      counterOfChartsNotReady: this.zoneData ? Object.keys(this.zoneData).length : -1
    }
  },
  computed: {
    properties () {
      if (this.zoneData === null) return null
      const { zoneName, ...properties } = this.zoneData
      return properties
    }
  },
  watch: {
    zoneData () {
      this.display = true
      this.counterOfChartsNotReady = this.zoneData ? Object.keys(this.zoneData).length : -1
    }
  },
  methods: {
    closeDetails () {
      this.display = false
    },
    chartReady () {
      console.log('oui')
      this.counterOfChartsNotReady--
    }
  }
})
</script>

<style scoped lang="scss">
#the-details {
  background-color:rgb(121, 174, 204);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#the-details-information {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
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
  #the-details{
    height: 250px;
    color: black;
    align-items: stretch;
    margin-top: 1em;
  }

  #the-details-header {
    display: flex;
    position: relative;
    justify-content: center;
  }

  #the-details-zone-name{
    font-size: 1.5rem;
  }

  #the-details-close {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
}
</style>
