<template>
  <c-dialog :model-value="dialog" @update:modelValue="dialog = $event">
    <div class="advertising-modal">
      <div class="advertising-modal__inner">
        <div
          :class="`advertising-modal__actions ${dialog ? 'appear' : 'hide'}`"
        >
          <v-btn
            class="action__item green-variant"
            @click="handleGetAvertising(1, 1500)"
          >
            <div class="action__body">
              <div class="action__icon">
                <flyers-icon />
              </div>
              <div class="action__text">
                <div class="text__name">Партия флаеров</div>
                <div class="text__cards">
                  <div class="card__item image">+1</div>
                  <div class="card__item money">-1500{{ symbol }}</div>
                </div>
              </div>
            </div>
          </v-btn>
          <v-btn
            class="action__item yellow-variant"
            @click="handleGetAvertising(3, 2900)"
          >
            <div class="action__body">
              <div class="action__icon">
                <billboard-icon />
              </div>
              <div class="action__text">
                <div class="text__name">Рекламный баннер</div>
                <div class="text__cards">
                  <div class="card__item image">+3</div>
                  <div class="card__item money">-2900{{ symbol }}</div>
                </div>
              </div>
            </div>
          </v-btn>
          <v-btn
            class="action__item red-variant"
            @click="handleGetAvertising(6, 5500)"
          >
            <div class="action__body">
              <div class="action__icon">
                <computer-xtablet-icon />
              </div>
              <div class="action__text">
                <div class="text__name">Собственный сайт</div>
                <div class="text__cards">
                  <div class="card__item image">+6</div>
                  <div class="card__item money">-5500{{ symbol }}</div>
                </div>
              </div>
            </div>
          </v-btn>
        </div>
      </div>
    </div>
  </c-dialog>
</template>

<script>
import Dialog from '@/mixins/dialog'
import CDialog from '@/components/UI/CDialog'
import FlyersIcon from '@/components/icons/FlyersIcon'
import { SYMBOLS } from '@/utils/defaultData'
import BillboardIcon from '@/components/icons/BillboardIcon'
import ComputerXtabletIcon from '@/components/icons/ComputerXtabletIcon'

export default {
  components: { ComputerXtabletIcon, BillboardIcon, FlyersIcon, CDialog },
  mixins: [Dialog],
  data: () => ({
    symbol: SYMBOLS.euro,
  }),
  methods: {
    handleGetAvertising(image, cost) {
      this.$store.dispatch('image/increaseImage', { value: image })
      this.$store.dispatch('bankAccount/decreaseBankAccount', { value: cost })
      this.dialog = false
    },
  },
}
</script>

<style scoped></style>
