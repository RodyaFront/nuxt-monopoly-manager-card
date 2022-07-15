<template>
  <div
    :class="{ 'custom-overlay': 1, active: dialog }"
    @click="handleClickOutside"
  >
    <div class="custom-overlay__content">
      <slot />
    </div>
  </div>
</template>

<script>
import Dialog from '@/mixins/dialog'

export default {
  mixins: [Dialog],
  methods: {
    handleClickOutside(event) {
      if (!event.target.closest('.custom-overlay__content')) {
        this.dialog = !this.dialog
      }
    },
  },
}
</script>
