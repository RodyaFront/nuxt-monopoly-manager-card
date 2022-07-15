<template>
  <v-dialog v-model="dialog" class="agree-dialog">
    <v-card rounded="xl">
      <v-card-title>
        <slot name="title" />
      </v-card-title>
      <v-card-text>
        <slot />
      </v-card-text>
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Dialog from '@/mixins/dialog'

export default {
  mixins: [Dialog],
}
</script>
