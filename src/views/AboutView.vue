<template>
  <div class="about" >
    <h1>This is an about page</h1>
    <div id="testetts">
      <app-checkbox name="check1" :checked="checked1" @input="(res) => this.checked1 = res">
        <font-awesome-icon icon="fa-solid fa-house" size="1x"/>
      </app-checkbox>
      <app-checkbox id="check2" name="check2" v-model="checked2">
        <font-awesome-icon icon="fa-solid fa-house" size="2x"/>
      </app-checkbox>
      <app-checkbox id="check3" name="check3" v-model="checked3">
        <font-awesome-icon icon="fa-solid fa-house" size="3x"/>
      </app-checkbox>
    </div>
    <button @click="checked1 = !checked1">Change</button>

    1 : {{checked1}} | 2 : {{checked2}} | 3 : {{checked3}}
    <br><br><br>
    <app-checkbox name="check1" :checked="checked1" @input="(res) => this.checked1 = res">
      <font-awesome-icon icon="fa-solid fa-house" size="1x"/>
    </app-checkbox>
    <app-checkbox id="check2" name="check2" v-model="checked2">
      <font-awesome-icon icon="fa-solid fa-house" size="2x"/>
    </app-checkbox>
    <app-checkbox id="check3" name="check3" v-model="checked3">
      <font-awesome-icon icon="fa-solid fa-house" size="3x"/>
    </app-checkbox>
    <br><br><br>
    <button @click="getData">Get</button>
    <div style="max-height: 50px; overflow: scroll">{{dataGet}}</div>
    <button @click="postData">Post</button>
    <div style="max-height: 50px; overflow:scroll;">{{dataPost}}</div>
    <!--    <app-slider :min="-100" :max="100" :step="30"
                    :second-value="0"
                    @input="e => console.log(e)" v-model:value.lazy="value" v-model:second-value.lazy="secondValue"
                    />
        -&#45;&#45; {{value}} | {{secondValue}} -&#45;&#45;
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
    &lt;!&ndash;    :range="[{value: 0, label: 'Begin'}, {value: '25'}, {value: '35'}, {value: 50, label: 'Middle'}, {value: 75}, { value: 100, label: 'End'}]"&ndash;&gt;
        <app-slider :range="[{value: -10}, {value: 50}, {value: 100}]"/>
        <input type="range" v-model="test"
               min="0" max="100" step="30" >
        <input type="range" v-model="test"
               min="0" max="100" step="30" >
        <input type="range" @change="x => log('changé')" @input="x => log('input')"
               min="0" max="100" step="30"
               v-model="secondValue5">
        {{secondValue5}}-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSlider from '@/components/AppSlider.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'
import axios from 'axios'

export default defineComponent({
  components: {
    AppCheckbox
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
      secondValue5: 20,
      dataGet: {},
      dataPost: {},
      checked1: undefined,
      checked2: false,
      checked3: true
    }
  },
  methods: {
    getData () {
      axios.get('http://localhost:5000/helloworld').then(response => { this.dataGet = response.data })
    },
    postData () {
      axios.post('http://localhost:5000/helloworld').then(response => { this.dataPost = response.data })
    }
  }
})
</script>

<style scoped lang="scss">
#testetts {
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
}
</style>
