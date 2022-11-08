<template>
  <div id="theDetails">
    <div v-if="properties === null">Click on zone to display information</div>
    <template v-else>
      <AppCard class="card-body" v-for="(property, key) in properties" :key="key"
               :name="'details.' + key" :text="String(property)" :properties="property">
      </AppCard>
    </template>
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
    }
  },
  computed: {
    properties () {
      if (this.zoneData === null) return null
      const { zoneName, ...properties } = this.zoneData
      return properties
    }
  }
})
</script>

<style scoped lang="scss">
#theDetails {
  background-color:rgb(121, 174, 204);
  display: flex;
  flex-flow: row wrap;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}

.card-body{
  background: rgba(26, 8, 8, 0.34);
  width: 14rem;
  height: 12rem;
  border-radius: 10px;
  padding: 1px;
  color: rgb(249, 249, 249);
  font-size: 1em;
  margin: auto;
}

@media only screen and (min-width: 768px) {
  #theDetails{
    height: 300px;
    color: white;

  }
}
</style>
