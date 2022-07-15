<template>
  <c-dialog :model-value="dialog" @update:modelValue="dialog = $event">
    <div
      class="bank-account__wrapper"
      :style="{
        transform: dialog ? 'translateY(0)' : 'translateY(calc(100% + 15px))',
      }"
    >
      <v-row dense>
        <v-col cols="12">
          <div class="plastic__card bank-color">
            <div class="bank-account__card">
              <div class="card__inner">
                <div>
                  <div class="card__head">
                    <div class="card__bank-account-value">
                      <c-float-up
                        :items="getBankAccountHistory"
                        :postfix="symbol"
                        :show="dialog"
                      />
                      {{ getBankAccount | localeNumber }} {{ symbol }}
                    </div>
                    <div class="card__visa-icon">
                      <visa-icon />
                    </div>
                  </div>
                  <div class="card__mock-card-number">
                    <span>4225</span>
                    <span>
                      <mock-numbers-icon />
                    </span>
                    <span>
                      <mock-numbers-icon />
                    </span>
                    <span>
                      <mock-numbers-icon />
                    </span>
                  </div>
                </div>
                <div class="card__footer">
                  <div class="card__footer-text">monopoly card</div>
                  <div class="card__date">09/24</div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <div :class="`bank-account__debt-wrapper ${getDebt > 0 ? 'appear' : ''}`">
        <div class="bank-account__debt">
          <v-row>
            <v-col cols="2">
              <v-icon large>mdi-alert</v-icon>
            </v-col>
            <v-col class="d-flex align-center">
              Ваш долг составляет
              <span class="debt-value ml-4">{{ getDebt }} {{ symbol }}</span>
            </v-col>
          </v-row>
        </div>
      </div>
      <v-row
        dense
        :class="`bank-account__control ${
          currentMode === MODES.withdraw ? 'withdraw' : 'to-up'
        }`"
      >
        <v-col cols="12">
          <v-row :class="{ 'small-buttons-animation': dialog }" dense>
            <v-col cols="3">
              <v-btn block @click="makeTransaction(50)" class="small-btn">
                50 {{ symbol }}</v-btn
              >
            </v-col>
            <v-col cols="3">
              <v-btn block @click="makeTransaction(100)" class="small-btn">
                100 {{ symbol }}</v-btn
              >
            </v-col>
            <v-col cols="3">
              <v-btn block @click="makeTransaction(200)" class="small-btn">
                200 {{ symbol }}</v-btn
              >
            </v-col>
            <v-col cols="3">
              <v-btn block @click="makeTransaction(500)" class="small-btn">
                500 {{ symbol }}</v-btn
              >
            </v-col>
          </v-row>
          <v-row :class="{ 'small-buttons-animation': dialog }" dense>
            <v-col cols="6">
              <v-btn block @click="makeTransaction(1000)" class="small-btn">
                1000 {{ symbol }}</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn block @click="makeTransaction(5000)" class="small-btn">
                5000 {{ symbol }}</v-btn
              >
            </v-col>
          </v-row>
          <v-row :class="{ 'big-buttons-animation': dialog }" dense>
            <v-col cols="6">
              <v-btn
                block
                class="withdraw-button big-btn"
                @click="setMode(MODES.withdraw)"
              >
                Снять
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                class="to-up-button big-btn"
                @click="setMode(MODES.toUp)"
              >
                Пополнить
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </c-dialog>
</template>

<script>
import Image from '@/mixins/image'
import EraseIcon from '@/components/icons/EraseIcon'
import Dialog from '@/mixins/dialog'
import CFloatUp from '@/components/UI/CFloatUp'
import CDialog from '@/components/UI/CDialog'
import { SYMBOLS } from '@/utils/defaultData'
import BankAccount from '@/mixins/bankAccount'
import VisaIcon from '@/components/icons/VisaIcon'
import MockNumbersIcon from '@/components/icons/MockNumbersIcon'

export default {
  components: { MockNumbersIcon, VisaIcon, CDialog, CFloatUp, EraseIcon },
  mixins: [Image, Dialog, BankAccount],
  data: () => ({
    symbol: SYMBOLS.euro,
    MODES: {
      withdraw: 'withdraw',
      toUp: 'toUp',
    },
    currentMode: null,
  }),
  methods: {
    setMode(mode) {
      this.currentMode = mode
    },
    makeTransaction(value) {
      if (this.currentMode === this.MODES.withdraw) {
        this.$store.dispatch('bankAccount/decreaseBankAccount', { value })
        return
      }
      this.$store.dispatch('bankAccount/increaseBankAccount', { value })
    },
  },
}
</script>
