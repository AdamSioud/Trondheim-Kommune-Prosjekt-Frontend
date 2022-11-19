<template>
  <div id="modal-background" v-if="isError">
    <div id="modal">
      <h3 id="modal-title">{{ title }}</h3>
      <div id="modal-content">
        <div id="modal-message">{{ message }}</div>
        <div v-if="advice !== ''" id="modal-advice">{{ $t('error.modal.advice') }} {{ advice }}</div>
      </div>
      <div id="modal-actions">
        <button @click="confirm">{{ $t('error.modal.ok') }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapWritableState } from 'pinia'
import { useErrorStore } from '@/stores/error'

export default defineComponent({
  name: 'AppModal',
  computed: {
    ...mapWritableState(useErrorStore, ['isError', 'title', 'message', 'advice'])
  },
  methods: {
    confirm () {
      this.isError = false
      this.advice = ''
    }
  }
})
</script>

<style scoped lang="scss">
#modal-background {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

#modal {
  max-width: 500px;
  min-width: 300px;
  padding: 20px 30px;
  background-color: $background-secondary;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

#modal-title {
  padding: 10px 0;
  font-size: 2rem;
  border-bottom: 2px solid gray;
}

#modal-content {
  display: flex;
  flex-direction: column;
  margin: 15px 0;

  #modal-message {
    font-size: 1.1rem;
  }

  #modal-advice {
    padding: 10px 20px;
    margin-top: 10px;
    background: $background-primary;
    border-radius: 10px;
    align-self: flex-end;
    color: black;
  }
}

#modal-actions {
  border-top: 2px solid gray;
  padding-top: 10px;

  button {
    padding: 5px 10px;
    background-color: #79aecc;
    border-radius: 5px;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
  }
}
</style>
