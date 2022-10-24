<template>
    <div class="card">
        <div class="title">Title</div>
        <div class="diagram">
            <TestSVG></TestSVG>
        </div>
        <div class="text"> Text</div>
      </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TestSVG from './TestSVG.vue'

export default defineComponent({
  name: 'AppCard',
  components: { TestSVG }
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
.diagram { grid-area: 4 / 1 / 13 / 6; background-color: green;}
.title { grid-area: 1 / 1 / 4 / 9; background-color: blue;}
.text { grid-area: 4 / 6 / 13 / 9; background-color: yellow;}

</style>
