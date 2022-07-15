<template>
  <c-dialog :model-value="dialog" @update:modelValue="dialog = $event">
    <div
      class="plastic__card image-color"
      :style="{
        transform: dialog ? 'translateY(0)' : 'translateY(calc(100% + 10px))',
      }"
    >
      <div class="card__close-btn">
        <v-icon @click="dialog = !dialog" :color="`#4d0707`">
          mdi-close
        </v-icon>
      </div>
      <div class="card__erase-btn">
        <v-btn icon @click="resetImage">
          <erase-icon />
        </v-btn>
      </div>
      <div class="card__inner">
        <div class="card__info">
          <div class="info__tooltip">Ваш имидж</div>
          <div class="info__value">
            <c-float-up :items="getImageHistory" :show="dialog" />
            {{ getImage }}
          </div>
        </div>
        <div class="card__actions">
          <v-row dense>
            <v-col>
              <v-btn block class="negative" @click="decreaseImage(3)">-3</v-btn>
            </v-col>
            <v-col>
              <v-btn block class="negative" @click="decreaseImage(2)">-2</v-btn>
            </v-col>
            <v-col>
              <v-btn block class="negative" @click="decreaseImage(1)">-1</v-btn>
            </v-col>
            <v-col>
              <v-btn block class="positive" @click="increaseImage(1)">+1</v-btn>
            </v-col>
            <v-col>
              <v-btn block class="positive" @click="increaseImage(2)">+2</v-btn>
            </v-col>
            <v-col>
              <v-btn block class="positive" @click="increaseImage(3)">+3</v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </c-dialog>
</template>

<script>
import Image from '@/mixins/image'
import EraseIcon from '@/components/icons/EraseIcon'
import Dialog from '@/mixins/dialog'
import CFloatUp from '@/components/UI/CFloatUp'
import CDialog from '@/components/UI/CDialog'

export default {
  components: { CDialog, CFloatUp, EraseIcon },
  mixins: [Image, Dialog],
}
</script>
