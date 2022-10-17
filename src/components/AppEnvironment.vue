<template>
  <div>
    <app-slider :min="0" :max="5" :step="1"
                v-model:value="internalWeight"/>
    {{internalWeight}}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppSlider from '@/components/AppSlider.vue'
import { EnvironmentInput } from '@/type'

export default defineComponent({
  name: 'AppEnvironment',
  components: { AppSlider },
  props: {
    environmentInput: {
      type: Object as PropType<EnvironmentInput>,
      default: () => {
        return {
          weight: 0
        }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  data () {
    return {
      internalWeight: this.environmentInput?.weight ? this.environmentInput.weight : 0
    }
  },
  watch: {
    internalWeight (newWeight) {
      this.update('weight', newWeight)
    }
  },
  methods: {
    update (key: string, value: string[] | number) {
      this.$emit('change', { ...this.environmentInput, [key]: value })
    }
  }

})
</script>

<style scoped lang="scss">

</style>
