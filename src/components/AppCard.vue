<template>
    <div class="card">
        <div class="title">
          <div class="name">{{name}}</div>
          <div class="checkbox"> Insert checkbox </div>
        </div>
        <div class="diagram">
            <AppDiagram></AppDiagram>
        </div>
        <div class="text"> {{text}}</div>
      </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppDiagram from './AppDiagram.vue'

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
.diagram { grid-area: 4 / 1 / 13 / 6;}
.title { grid-area: 1 / 1 / 4 / 9; display: flex;
  flex-flow: row wrap;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;}
.text { grid-area: 4 / 6 / 13 / 9; font-size: small;}

.checkbox{font-size: large;}

.name{font-weight: bold;}

</style>
