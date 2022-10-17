<template>
  <div class="checkbox">
    <input type="checkbox" :id="id" :name="name"
           :required="required" :disabled="disabled" :checked="internalChecked"
           :value="value" @change="sendEvent($event)" class="checkbox-input">
    <label :for="id" class="checkbox-label">
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
      borderColor: 'grey'
    }
  },
  computed: {
    internalChecked (): boolean {
      if (this.modelValue === undefined) return this.checked
      return this.modelValue
    }
  },
  methods: {
    sendEvent (event: Event) {
      const checkbox = (event.target as HTMLInputElement)
      this.$emit('update:modelValue', checkbox.checked)
      this.$emit('input', checkbox.checked)
      this.borderColor = checkbox.checked ? 'blue' : 'grey'
    }
  },
  mounted () {
    if (this.internalChecked) this.borderColor = 'blue'
  }
})
</script>

<style scoped lang="scss">

.checkbox-input {
  display: none;
}

.checkbox {
  display: inline-block;
  margin: 5px;
  flex: 1 1 0;
}

.checkbox-label {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  box-sizing: border-box;
  border: v-bind(borderColor) 1px solid;
  border-radius: 8px;
  user-select: none;
}

</style>
