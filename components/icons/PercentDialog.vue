<template>
  <v-dialog v-model="dialog">
    <v-card rounded="xl">
      <v-card-title style="justify-content: center">
        Выручка составляет
      </v-card-title>
      <v-card-text style="padding: 20px 24px 50px">
        <v-row dense>
          <v-col cols="3">
            <v-btn @click="dec" style="height: 100%">
              <v-icon> mdi-minus </v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-text-field
              v-model="value"
              hide-details
              dense
              outlined
              label="Выручка"
              placeholder="%"
              type="number"
              append-icon="mdi-percent-outline"
              color="white"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn @click="inc" style="height: 100%">
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn block @click="dialog = false"> Готово </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Dialog from '@/mixins/dialog'

export default {
  props: {
    percent: {
      type: Number,
      default: null,
    },
    step: {
      type: Number,
      default: 10,
    },
  },
  mixins: [Dialog],
  computed: {
    value: {
      get() {
        return this.percent
      },
      set(value) {
        this.$emit('update:percent', value)
      },
    },
  },
  methods: {
    inc() {
      const oldValue = isNaN(parseInt(this.value)) ? 0 : parseInt(this.value)
      this.value = oldValue + this.step
    },
    dec() {
      const oldValue = isNaN(parseInt(this.value)) ? 0 : parseInt(this.value)
      this.value = oldValue - this.step
    },
  },
}
</script>
