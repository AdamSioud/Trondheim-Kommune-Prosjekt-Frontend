<template>
  <div id="theParameters">
    <h1>{{ $t("parameters.title") }}</h1>
    <div id="parameters-wrapper">
      <div id="parameters" ref="divParameters">
        <app-slider :min="0" :max="100" :step="1"
        />
        Active : {{ active }} | Visible : {{ visible }}

        <app-menu-collapse title="test 1" color="#C4DFAA"
                           v-model="active" v-model:visible="visible">
          <div style="text-align: center">
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
              <li>Option 4</li>
              <li>Option 5</li>
              <li>Option 6</li>
              <li>Option 7</li>
            </ul>
          </div>
        </app-menu-collapse>
        <app-menu-collapse title="test 2" color="#98A8F8">
          <div style="text-align: center">
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
              <li>Option 4</li>
              <li>Option 5</li>
              <li>Option 6</li>
              <li>Option 7</li>
            </ul>
          </div>
        </app-menu-collapse>
        <app-menu-collapse title="test 3" color="#FFDBA4">
          <div style="text-align: center">
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
              <li>Option 4</li>
              <li>Option 5</li>
              <li>Option 6</li>
              <li>Option 7</li>
            </ul>
          </div>
        </app-menu-collapse>
        <app-menu-collapse title="test 4" color="#FFB3B3">
          <div style="text-align: center">
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
              <li>Option 4</li>
              <li>Option 5</li>
              <li>Option 6</li>
              <li>Option 7</li>
            </ul>
          </div>
        </app-menu-collapse>
        <app-menu-collapse title="test 4" color="#FFB3B3">
          <div style="text-align: center">
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
              <li>Option 4</li>
              <li>Option 5</li>
              <li>Option 6</li>
              <li>Option 7</li>
            </ul>
          </div>
        </app-menu-collapse>
        <app-menu-collapse title="test 4" color="#FFB3B3">
          <div style="text-align: center">
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
              <li>Option 4</li>
              <li>Option 5</li>
              <li>Option 6</li>
              <li>Option 7</li>
            </ul>
          </div>
        </app-menu-collapse>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSlider from '@/components/AppSlider.vue'
import AppMenuCollapse from '@/components/AppMenuCollapse.vue'

export default defineComponent({
  name: 'TheParameters',
  components: {
    AppSlider,
    AppMenuCollapse
  },
  data () {
    return {
      value: 10,
      active: false,
      visible: false
    }
  },
  mounted () {
    // console.log(window.innerHeight - 100)
    // this.maxHeight = window.innerHeight - 100
    // window.addEventListener('resize', () => { this.maxHeight = window.innerHeight - 110 })
  }
})
</script>

<style scoped lang="scss">
#theParameters {
  background: indianred;
}

@media only screen and (min-width: 768px) {
  #theParameters {
    height: 100%;
    width: 250px;
    display: flex;
    flex-direction: column;
  }

  #parameters-wrapper {
    flex-grow: 1;
    position: relative;
  }

  #parameters {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
}
</style>
