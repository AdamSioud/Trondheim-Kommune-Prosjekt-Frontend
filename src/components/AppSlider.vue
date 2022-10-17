<template>
  <div class="slider">
    <div ref="rangeSlider" id="range-slider">
      <div ref="one" id="range-slider-thumb-one"
           @mousedown="moveStart" @touchstart="moveStart"></div>
      <div ref="include" id="range-slider-include" ></div>
      <div ref="two" id="range-slider-thumb-two" v-if="isTwoInput()"
           @mousedown="moveStart" @touchstart="moveStart"></div>
    </div>
    <div id="slider-values">
      <span class="range-values" v-for="(item, index) of internalRange" :key="index"
            :style="{left: (getPosFromValue(item.value) !== 0 ? getPosFromValue(item.value) : this.padding) + 'px'}">
        <span class="range-values-labels" :style="{left: (index === internalRange.length - 1) ? '2px' : '0', transform: 'translate(' + (index === internalRange.length - 1 ? '-100%' : index === 0 ? '-2px' : '-50%') + ',0)' }">{{ item.label }}</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { closestArrayValue, closestRangeValue, isInRange, isNumber, lengthDecimal } from '@/helpers/utils'

interface IRangeObject {
  value: number,
  label?: string
}

// TODO: 09/10/2022 Add validation and don't display component ?
// TODO: 09/10/2022 Add customisation (style et others)
export default defineComponent({
  name: 'AppSlider',
  props: {
    range: {
      type: Array,
      default: null,
      validator: (arr: IRangeObject[]) => {
        let isCorrect = true
        for (const obj of arr) {
          if (!('value' in obj) || !isNumber(obj.value)) {
            isCorrect = false
            console.error("The 'range' property should be an array containing objects : {value: number, label?: string}")
            break
          }
        }
        return isCorrect
      }
    },
    value: {
      type: Number,
      default: Number.NaN
    },
    valueModifiers: {
      default: () => ({})
    },
    secondValue: {
      type: Number,
      default: Number.NaN
    },
    secondValueModifiers: {
      default: () => ({})
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    }
  },
  emits: ['inputValue', 'changeValue', 'update:value', 'inputSecondValue', 'changeSecondValue', 'update:secondValue'],
  data () {
    return {
      isMoving: false,
      size: 0,
      offset: 0,
      padding: 1,
      target: {},
      currentValueOne: this.value,
      internalValueTwo: this.secondValue,
      lengthDecimalStep: lengthDecimal(this.step)
    }
  },
  computed: {
    internalRange (): IRangeObject[] | null {
      if (!this.range) return null
      const range = []
      for (const obj of this.range) {
        const object = obj as IRangeObject
        if (('value' in object) && isNumber(object.value) && isInRange(this.min, this.max, this.step, object.value)) {
          range.push(object)
        }
      }
      if (range.length === 0) return null
      return range
    },
    internalMin (): number {
      if (this.internalRange) {
        return Math.min(...this.internalRange.map(x => Number(x.value)))
      }
      return this.min
    },
    internalMax () {
      if (this.internalRange) {
        return Math.max(...this.internalRange.map(x => Number(x.value)))
      }
      const mult = Math.pow(10, this.lengthDecimalStep)
      const max = this.max * mult
      return (max - ((max - (this.min * mult)) % (this.step * mult))) / mult
    },
    internalValueOne: {
      get (): number {
        if (Number.isNaN(this.currentValueOne)) return (this.max + this.min) * 0.5
        return this.currentValueOne
      },
      set (newValue: number) {
        this.currentValueOne = newValue
      }
    }
  },
  watch: {
    min: {
      handler (newMin) {
        if (newMin > this.max) {
          console.log('The minimum has to be lower than the maximum')
          // throw new TypeError('test')
        }
      },
      immediate: true
    },
    max (newMax) {
      if (newMax < this.min) {
        console.log('The maximum has to be bigger than the minimum')
      }
    },
    value (newValue) {
      this.setPosition(this.$refs.one as HTMLElement, this.getPosFromValue(newValue))
    },
    secondValue (newValue) {
      this.setPosition(this.$refs.two as HTMLElement, this.getPosFromValue(newValue))
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.addListeners()
      this.refresh()
    })
  },
  beforeUnmount () {
    this.removeListeners()
  },
  methods: {
    addListeners () {
      document.addEventListener('touchmove', this.moving, { passive: false })
      document.addEventListener('touchend', this.moveEnd, { passive: false })
      document.addEventListener('mousemove', this.moving)
      document.addEventListener('mouseup', this.moveEnd)
      document.addEventListener('mouseleave', this.moveEnd)
      window.addEventListener('resize', this.refresh)
    },
    removeListeners () {
      window.removeEventListener('resize', this.refresh)
      document.removeEventListener('touchmove', this.moving)
      document.removeEventListener('touchend', this.moveEnd)
      document.removeEventListener('mousemove', this.moving)
      document.removeEventListener('mouseup', this.moveEnd)
      document.removeEventListener('mouseleave', this.moveEnd)
    },
    moveStart (e: MouseEvent | TouchEvent) {
      this.isMoving = true
      this.target = e.target as HTMLElement
      document.body.classList.toggle('moving', true)
    },
    moving (e: MouseEvent | TouchEvent) {
      if (this.isMoving) {
        e.preventDefault()

        let input: MouseEvent | Touch
        if (e instanceof MouseEvent) input = e
        else if (e instanceof TouchEvent && e.targetTouches.length > 0) input = (e as TouchEvent).targetTouches[0]
        else return

        this.setPosition(this.target as HTMLElement, this.getInputPos(input))
      }
    },
    moveEnd () {
      this.isMoving = false
      document.body.classList.toggle('moving', false)
      if (this.target === this.$refs.one) {
        this.$emit('changeValue', this.internalValueOne)
        if ('lazy' in this.valueModifiers) this.$emit('update:value', this.internalValueOne)
      } else {
        this.$emit('changeSecondValue', this.internalValueTwo)
        if ('lazy' in this.secondValueModifiers) this.$emit('update:secondValue', this.internalValueTwo)
      }
    },
    setPosition (element: HTMLElement, position: number) {
      if (this.isTwoInput()) {
        this.setPositionTwoInputs(element, position)
      } else {
        this.setPositionOneInput(element, position)
      }
    },
    setPositionOneInput (element: HTMLElement, position: number) {
      let isPosSet = false
      let value = 0
      if (position < 0) {
        position = this.getPosFromValue(this.internalMin)
        value = this.internalMin
        isPosSet = true
      } else if (position > this.size) {
        position = this.getPosFromValue(this.internalMax)
        value = this.internalMax
        isPosSet = true
      }
      if (!isPosSet) {
        value = (this.internalRange) ? closestArrayValue(this.internalRange.map(x => Number(x.value)), this.getValueFromPos(position)) : closestRangeValue(this.internalMin, this.internalMax, this.step, this.getValueFromPos(position))
        position = this.getPosFromValue(value)
      }
      if (value !== this.internalValueOne) {
        this.$emit('inputValue', value)
        if (!('lazy' in this.valueModifiers)) this.$emit('update:value', value)
      }
      this.internalValueOne = value

      element.style.left = `${position}px`
      this.setInclude(0, position)
    },
    setPositionTwoInputs (element: HTMLElement, position: number) {
      const one = this.$refs.one as HTMLElement
      const two = this.$refs.two as HTMLElement
      const posOneValue = this.getPosFromValue(this.internalValueOne)
      const posTwoValue = this.getPosFromValue(this.internalValueTwo)
      let value = 0
      let widthInclude = 0
      let posInclude = 0
      if (element === one) {
        if (position > posTwoValue) {
          position = posTwoValue
          value = this.internalValueTwo
        } else if (position < 0) {
          position = this.getPosFromValue(this.internalMin)
          value = this.internalMin
        } else {
          value = (this.internalRange) ? closestArrayValue(this.internalRange.map(x => Number(x.value)), this.getValueFromPos(position)) : closestRangeValue(this.internalMin, this.internalMax, this.step, this.getValueFromPos(position))
          position = this.getPosFromValue(value)
        }
        if (value !== this.internalValueOne) {
          this.$emit('inputValue', value)
          if (!('lazy' in this.valueModifiers)) this.$emit('update:value', value)
        }
        this.internalValueOne = value
        widthInclude = posTwoValue - position
        posInclude = position
      } else if (element === two) {
        if (position < posOneValue) {
          position = posOneValue
          value = this.internalValueOne
        } else if (position > this.size) {
          position = this.getPosFromValue(this.internalMax)
          value = this.internalMax
        } else {
          value = (this.internalRange) ? closestArrayValue(this.internalRange.map(x => Number(x.value)), this.getValueFromPos(position)) : closestRangeValue(this.internalMin, this.internalMax, this.step, this.getValueFromPos(position))
          position = this.getPosFromValue(value)
        }
        this.internalValueTwo = value
        if (value !== this.internalValueTwo) {
          this.$emit('inputSecondValue', value)
          if (!('lazy' in this.secondValueModifiers)) this.$emit('update:secondValue', value)
        }
        widthInclude = position - posOneValue
        posInclude = posOneValue
      }

      element.style.left = `${position}px`
      this.setInclude(posInclude, widthInclude)
    },
    setInclude (position: number, width: number) {
      const include = this.$refs.include as HTMLElement
      include.style.left = `${position}px`
      include.style.width = `${width}px`
    },
    getInputPos (e: MouseEvent | Touch): number {
      return e.clientX - this.offset
    },
    getValueFromPos (pos: number): number {
      const multiplier = Math.pow(10, this.lengthDecimalStep)
      return Math.round(((pos * (this.max - this.min) / this.size) + this.min) * multiplier) / multiplier
    },
    getPosFromValue (value: number): number {
      return ((value - this.min) * this.size) / (this.max - this.min)
    },
    isTwoInput () {
      return !Number.isNaN(this.secondValue) && !Number.isNaN(this.value)
    },
    refresh () {
      const rangeSlider = (this.$refs.rangeSlider as HTMLDivElement)
      this.size = rangeSlider.clientWidth - (this.padding * 2)
      this.offset = rangeSlider.getBoundingClientRect().left + this.padding
      if (this.isTwoInput()) {
        if (this.internalValueOne > this.internalValueTwo) {
          if (this.internalRange && !this.internalRange.map(x => Number(x.value)).includes(this.internalValueOne)) {
            this.internalValueTwo = closestArrayValue(this.internalRange.map(x => Number(x.value)), this.internalValueOne)
          } else if (!this.internalRange && !isInRange(this.internalMin, this.internalMax, this.step, this.internalValueOne)) {
            this.internalValueTwo = closestRangeValue(this.internalMin, this.internalMax, this.step, this.internalValueOne)
          } else this.internalValueTwo = this.internalValueOne
        }
        this.setPosition(this.$refs.two as HTMLElement, this.getPosFromValue(this.internalValueTwo))
      }
      this.setPosition(this.$refs.one as HTMLElement, this.getPosFromValue(this.internalValueOne))
    }
  }
})
</script>

<style scoped lang="scss">
.slider {
  margin: 10px;
}

#slider-values {
  margin-top: 1px;
  position: relative;
}

#range-slider {
  background-color: gray;
  height: 4px;
  border-radius: 10px;
  position: relative;
}

#range-slider-thumb-one,
#range-slider-thumb-two{
  position: absolute;
  height: 20px;
  width: 20px;
  background: white;
  border-radius: 50%;
  transform: translate(-50%,-40%);
  z-index: 1;
  border: #0366d6 solid 6px;
  box-sizing: border-box;
  cursor: pointer;
}

#range-slider-include {
  height: 100%;
  background: #0366d6;
  width: 80%;
  left: 10%;
  position: absolute;
  border-radius: 10px;
}

.range-values {
  position: absolute;
  width: 1px;
  height: 5px;
  background-color: black;
}

.range-values-labels {
  text-align: center;
  position: absolute;
  top: 6px;
}
</style>

<style lang="scss">
.moving {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
