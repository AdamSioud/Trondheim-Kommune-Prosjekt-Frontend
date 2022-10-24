<template>
  <div>The Details</div>
  <div id="theDetails">
    <!-- <slot></slot> -->
    <AppCard class="card-body" v-for="card in cards" :key="card.id">
    </AppCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppCard from '@/components/AppCard.vue'

export default defineComponent({
  name: 'TheDetails',
  data () {
    return {
      cards: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 }
      ]
    }
  },
  components: { AppCard }
})
</script>

<style scoped lang="scss">
#theDetails {
  background: mediumseagreen;
  display: flex;
  flex-flow: row wrap;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}

.card-body{
  background: white;
  width: 18rem;
  height: 12rem;
  border-radius: 20px;
  margin-top: 15px;
  padding: 5px;
  color: black;
  font-size: 3em;
}
@media only screen and (min-width: 768px) {
  #theDetails{
    height: 150px;
    overflow: scroll;
    color: black;
  }
}
</style>
