<template>
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
        { id: 'Price', text: '' },
        { id: 'Age', text: '' },
        { id: 'Noise', text: '' },
        { id: 'Safety', text: '' },
        { id: 'Well-being', text: '' }
      ]
    }
  },
  components: { AppCard }
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
