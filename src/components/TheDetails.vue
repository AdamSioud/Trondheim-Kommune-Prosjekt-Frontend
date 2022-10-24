<template>
  <div>The Details</div>
  <div id="theDetails">
    <!-- <slot></slot> -->
    <AppCard class="card-body" v-for="card in cards" :key="card.id"
    :name="card.id" :text="card.text">
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
        { id: 'Price', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...' },
        { id: 'Age', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...' },
        { id: 'Noise', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...' },
        { id: 'Safety', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...' },
        { id: 'Well-being', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...' }
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
