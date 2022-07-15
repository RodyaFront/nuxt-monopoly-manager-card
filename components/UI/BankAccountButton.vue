<template>
  <v-btn
    height="95"
    block
    class="main-page__bank-account-button"
    @click="dialog = !dialog"
  >
    <div class="button__main">
      <div class="button__amount">
        <c-float-up :items="getBankAccountHistory" :postfix="symbols.euro" />
        {{ getBankAccount | localeNumber }} {{ symbols.euro }}
      </div>
    </div>
    <span class="button__tooltip">Банк</span>
  </v-btn>
</template>

<script>
import ImageIcon from '@/components/icons/ImageIcon'
import Dialog from '@/mixins/dialog'
import BankAccount from '@/mixins/bankAccount'
import { SYMBOLS } from '@/utils/defaultData'
import CFloatUp from '@/components/UI/CFloatUp'

export default {
  components: { CFloatUp, ImageIcon },
  mixins: [Dialog, BankAccount],
  data: () => ({
    symbols: SYMBOLS,
  }),
}
</script>
