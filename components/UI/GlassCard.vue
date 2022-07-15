<template>
  <v-btn class="glass-card" @click="$emit('click')">
    <div class="glass-card__inner">
      <div class="glass-card__logo">
        <slot name="icon" />
      </div>
      <div class="glass-card__data">
        <slot name="data" />
      </div>
    </div>
  </v-btn>
</template>

<script>
export default {}
</script>
