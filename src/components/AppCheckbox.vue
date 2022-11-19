<template>
  <div class="checkbox">
    <input type="checkbox" :id="id" :name="name"
           :required="required" :disabled="disabled" :checked="internalChecked"
           :value="value" @change="sendEvent($event)" class="checkbox-input">
    <label :for="id" :class="{'checkbox-label': true, selected: isChecked}">
      <slot></slot>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppCheckbox',
  props: {
    id: {
      type: String,
      default: () => {
        return 'checkbox-id-' + Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
      }
    },
    name: {
      type: String
    },
    modelValue: {
      type: Boolean,
      default: undefined
    },
    value: {
      type: String
    },
    checked: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'input'],
  data () {
    return {
      isChecked: false
    }
  },
  computed: {
    internalChecked (): boolean {
      if (this.modelValue === undefined) return this.checked
      return this.modelValue
    }
  },
  watch: {
    internalChecked: {
      handler (newValue) {
        this.isChecked = this.internalChecked
      },
      immediate: true
    }
  },
  methods: {
    sendEvent (event: Event) {
      const checkbox = (event.target as HTMLInputElement)
      this.$emit('update:modelValue', checkbox.checked)
      this.$emit('input', checkbox.checked)
      this.isChecked = checkbox.checked
    }
  }
})
</script>

<style scoped lang="scss">
.checkbox-input {
  display: none;
}

.checkbox {
  display: inline-block;
}

.checkbox-label {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  box-sizing: border-box;
  border: grey 3px solid;
  border-radius: 8px;
  @include user-select-custom(none);
}

.selected {
  border-color: $input-secondary
}

</style>
