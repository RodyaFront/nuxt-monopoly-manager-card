<template>
  <v-btn
    height="95"
    block
    class="main-page__image-button"
    @click="dialog = !dialog"
  >
    <div class="button__main">
      <c-float-up :items="getImageHistory" />
      <div class="button__amount">{{ getImage }}</div>
      <div class="button__icon">
        <image-icon />
      </div>
    </div>
    <span class="button__tooltip">Имидж</span>
  </v-btn>
</template>

<script>
import ImageIcon from '@/components/icons/ImageIcon'
import Dialog from '@/mixins/dialog'
import Image from '@/mixins/image'
import CFloatUp from '@/components/UI/CFloatUp'

export default {
  components: { CFloatUp, ImageIcon },
  mixins: [Dialog, Image],
}
</script>
