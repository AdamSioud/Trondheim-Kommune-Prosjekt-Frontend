<template>
  <div>
    <div id="price-checkbox">
      <app-checkbox id="0-17" name="0-17" v-model="age017"
                    :disabled="disabled">
        <div class="wrapper-checkbox-content">
          <div class="wrapper-checkbox-content-icon">
            <font-awesome-icon icon="fa-solid fa-child" size="xl"/>
          </div>
          <div>0-17</div>
        </div>
      </app-checkbox>
      <app-checkbox id="18-34" name="18-34" v-model="age1834"
                    :disabled="disabled">
        <div class="wrapper-checkbox-content">
          <div class="wrapper-checkbox-content-icon">
            <font-awesome-icon icon="fa-solid fa-person" size="xl"/>
          </div>
          <div>18-34</div>
        </div>
      </app-checkbox>
      <app-checkbox id="35-66" name="35-66" v-model="age3566"
                    :disabled="disabled">
        <div class="wrapper-checkbox-content">
          <div class="wrapper-checkbox-content-icon">
            <font-awesome-icon icon="fa-solid fa-person" size="xl"/>
          </div>
          <div>35-66</div>
        </div>
      </app-checkbox>
      <app-checkbox id="67+" name="67+" v-model="age67"
                      :disabled="disabled">
        <div class="wrapper-checkbox-content">
          <div class="wrapper-checkbox-content-icon">
            <font-awesome-icon icon="fa-solid fa-person-cane" size="xl"/>
          </div>
          <div>67+</div>
        </div>
      </app-checkbox>
    </div>
    <app-slider v-model:value="internalPercent"/>
    {{ internalPercent }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppSlider from '@/components/AppSlider.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'
import { AgeInput } from '@/type'
import { removeItem } from '@/helpers/utils'

export default defineComponent({
  name: 'AppAge',
  components: { AppSlider, AppCheckbox },
  props: {
    ageInput: {
      type: Object as PropType<AgeInput>,
      default: () => {
        return {
          selected: [],
          percent: 0
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
      age017: (this.ageInput && this.ageInput.selected.indexOf('0-17') !== -1),
      age1834: (this.ageInput && this.ageInput.selected.indexOf('18-34') !== -1),
      age3566: (this.ageInput && this.ageInput.selected.indexOf('35-66') !== -1),
      age67: (this.ageInput && this.ageInput.selected.indexOf('67+') !== -1),
      internalPercent: this.ageInput?.percent ? this.ageInput?.percent : 0,
      internalSelected: this.ageInput?.selected ? [...this.ageInput?.selected] : []
    }
  },
  watch: {
    age017 (isAge017) {
      if (isAge017) this.internalSelected.push('0-17')
      else removeItem(this.internalSelected, '0-17')
      this.update('selected', this.internalSelected)
    },
    age1834 (isAge1834) {
      if (isAge1834) this.internalSelected.push('18-34')
      else removeItem(this.internalSelected, '18-34')
      this.update('selected', this.internalSelected)
    },
    age3566 (isAge3566) {
      if (isAge3566) this.internalSelected.push('35-66')
      else removeItem(this.internalSelected, '35-66')
      this.update('selected', this.internalSelected)
    },
    age67 (isAge67) {
      if (isAge67) this.internalSelected.push('67+')
      else removeItem(this.internalSelected, '67+')
      this.update('selected', this.internalSelected)
    },
    internalPercent (newPercent) {
      this.update('percent', newPercent)
    }
  },
  methods: {
    update (key: string, value: string[] | number) {
      this.$emit('change', { ...this.ageInput, [key]: value })
    }
  }
})
</script>

<style scoped lang="scss">
#price-checkbox {
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
}

.wrapper-checkbox-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.wrapper-checkbox-content-icon {
  flex-grow: 1;
  display: flex;
  align-items: center;
}
</style>
