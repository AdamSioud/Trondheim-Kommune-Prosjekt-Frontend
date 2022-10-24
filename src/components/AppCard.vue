<template>
    <div class="card">
        <div class="title">{{name}}</div>
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
grid-column-gap: 0px;
grid-row-gap: 0px;
}
.diagram { grid-area: 4 / 1 / 13 / 6;}
.title { grid-area: 1 / 1 / 4 / 9; font-weight: bold;}
.text { grid-area: 4 / 6 / 13 / 9; font-size: small;}

</style>
