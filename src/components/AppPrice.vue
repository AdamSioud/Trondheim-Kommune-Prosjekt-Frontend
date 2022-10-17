<template>
  <div>
    <div id="price-checkbox">
      <app-checkbox id="small" name="small" v-model="small"
                    :disabled="disabled">
        <div class="wrapper-checkbox-content">
          <div class="wrapper-checkbox-content-icon">
            <font-awesome-icon icon="fa-solid fa-house" size="xs"/>
          </div>
          <div>small</div>
        </div>
      </app-checkbox>
      <app-checkbox id="medium" name="medium" v-model="medium"
                    :disabled="disabled">
        <div class="wrapper-checkbox-content">
          <div class="wrapper-checkbox-content-icon">
            <font-awesome-icon icon="fa-solid fa-house" size="lg"/>
          </div>
          <div>medium</div>
        </div>
      </app-checkbox>
      <app-checkbox id="big" name="big" v-model="big"
                    :disabled="disabled">
        <div class="wrapper-checkbox-content">
          <div class="wrapper-checkbox-content-icon">
            <font-awesome-icon icon="fa-solid fa-house" size="2xl"/>
          </div>
          <div>big</div>
        </div>
      </app-checkbox>
    </div>
    <app-slider v-model:value="internalBudget"/>
    {{ internalBudget }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppSlider from '@/components/AppSlider.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'
import { PriceInput } from '@/type'
import { removeItem } from '@/helpers/utils'

export default defineComponent({
  name: 'AppPrice',
  components: { AppSlider, AppCheckbox },
  props: {
    priceInput: {
      type: Object as PropType<PriceInput>,
      default: () => {
        return {
          selected: [],
          budget: 0
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
      small: (this.priceInput && this.priceInput.selected.indexOf('small') !== -1),
      medium: (this.priceInput && this.priceInput.selected.indexOf('medium') !== -1),
      big: (this.priceInput && this.priceInput.selected.indexOf('big') !== -1),
      internalBudget: this.priceInput?.budget ? this.priceInput?.budget : 0,
      internalSelected: this.priceInput?.selected ? [...this.priceInput?.selected] : [],
      internalPriceInput: { ...this.priceInput }
    }
  },
  watch: {
    small (isSmall) {
      if (isSmall) this.internalSelected.push('small')
      else removeItem(this.internalSelected, 'small')
      this.update('selected', this.internalSelected)
    },
    medium (isMedium) {
      if (isMedium) this.internalSelected.push('medium')
      else removeItem(this.internalSelected, 'medium')
      this.update('selected', this.internalSelected)
    },
    big (isBig) {
      if (isBig) this.internalSelected.push('big')
      else removeItem(this.internalSelected, 'big')
      this.update('selected', this.internalSelected)
    },
    internalBudget (newBudget) {
      this.update('budget', newBudget)
    }
  },
  methods: {
    update (key: string, value: string[] | number) {
      this.$emit('change', { ...this.priceInput, [key]: value })
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
