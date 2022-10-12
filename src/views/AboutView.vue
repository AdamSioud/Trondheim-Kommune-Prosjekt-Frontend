<template>
  <div class="about" >
    <h1>This is an about page</h1>
    <app-slider :min="-100" :max="100" :step="30"
                :second-value="0"
                @input="e => console.log(e)" v-model:value.lazy="value" v-model:second-value.lazy="secondValue"
                />
    --- {{value}} | {{secondValue}} ---
    <app-slider :min="-100" :max="100" :step="30"
                v-model:value="value"
                />
    <hr>
    <app-slider :min="-100" :max="100" :step="1"
                v-model:value.lazy="value1" v-model:second-value.lazy="secondValue1"
                />
    <p style="font-style: italic"><b>{{ value1 }} | {{ secondValue1 }}</b></p>
    <app-slider :min="-100" :max="100" :step="1"
                :value="0"
                />
    <hr>
    <app-slider :min="0" :max="100" :step="1"
                :value="5"
                />
    <app-slider :min="0" :max="1" :step="0.1"
                :value="0.52"
                />
    <app-slider :min="-1" :max="1" :step="0.1"
                :value="0.52"
                />
    <hr>
    <app-slider :min="0" :max="100" :step="1"
                :value="0" :range="[{value: 0, label: 'Begin'}, {value: '25'}, {value: '35'}, {value: 50, label: 'Middle'}, {value: 75}, { value: 100, label: 'End'}]"
                />
    <app-slider :min="-100" :max="200" :step="5"
                :value="0" :range="[{value: 0, label: 'Begin'}, {value: '25'}, {value: '38'}, {value: 50, label: 'Middle'}, {value: 75}, { value: 100, label: 'End'}]"
                />
    <app-slider :min="-100" :max="200" :step="5"
                :value="0" :second-value="50" :range="[{value: 0, label: 'Begin'}, {value: '25'}, {data: '25'}, {value: 50, label: 'Middle'}, {value: 75}, { value: 100, label: 'End'}]"
                />
    <hr>
<!--    :range="[{value: 0, label: 'Begin'}, {value: '25'}, {value: '35'}, {value: 50, label: 'Middle'}, {value: 75}, { value: 100, label: 'End'}]"-->
    <app-slider :range="[{value: -10}, {value: 50}, {value: 100}]"/>
    <input type="range" v-model="test"
           min="0" max="100" step="30" >
    <input type="range" v-model="test"
           min="0" max="100" step="30" >
    <input type="range" @change="x => log('changé')" @input="x => log('input')"
           min="0" max="100" step="30"
           v-model="secondValue5">
    {{secondValue5}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSlider from '@/components/AppSlider.vue'

export default defineComponent({
  components: {
    AppSlider
  },
  data () {
    return {
      value: 0,
      secondValue: 0,
      test: 0,
      value1: -50,
      secondValue1: 0,
      value2: 0,
      secondValue2: 0,
      value3: 0,
      secondValue3: 0,
      value4: 0,
      secondValue4: 0,
      value5: 0,
      secondValue5: 20
    }
  },
  methods: {
    log (x: string) {
      console.log(x)
    }
  }
})
</script>
