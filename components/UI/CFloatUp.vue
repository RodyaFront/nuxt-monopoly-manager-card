<template>
  <div :class="`float-up ${!show ? 'hidden' : ''}`">
    <div
      v-for="(item, index) in items"
      ref="floatItem"
      :key="index"
      :class="`float-up__item ${
        item.type === types.DECREASE ? 'negative' : ''
      }`"
    >
      {{ item.type === types.DECREASE ? '-' : '+'
      }}{{ item.value | localeNumber }}
      {{ postfix }}
    </div>
  </div>
</template>

<script>
import { TYPES } from '@/utils/defaultData'

export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
    postfix: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    types: TYPES,
    TIMEOUT: 1000,
    timeout: null,
  }),
  watch: {
    items() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$refs.floatItem.forEach((elem) => elem.remove())
      }, this.TIMEOUT)
    },
  },
}
</script>
