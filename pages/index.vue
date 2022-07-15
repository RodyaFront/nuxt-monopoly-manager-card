<template>
  <div class="main-page">
    <div class="main-page__top">
      <div class="top__section">
        <glass-card @click="productsDialog = !productsDialog">
          <template #icon>
            <garage-icon />
          </template>
          <template #data>
            <c-table
              :items="getProductsInventoryTableFormat.items"
              :headers="getProductsInventoryTableFormat.headers"
            />
          </template>
        </glass-card>
      </div>
      <div class="top__section actions">
        <glass-card @click="actionsDialog = !actionsDialog">
          <template #icon>
            <pie-graphic />
          </template>
          <template #data>
            <c-table
              :items="getInventoryTableFormat.items"
              :headers="getInventoryTableFormat.headers"
            />
          </template>
        </glass-card>
      </div>
    </div>
    <v-row class="main-page__bottom" dense>
      <v-col cols="12">
        <v-row dense>
          <v-col cols="3">
            <v-btn
              block
              class="main-action-button advertising"
              @click="handleClickActionCard('advertising')"
            >
              <div class="main-action-button__icon">
                <advertising-icon />
              </div>
              <div class="main-action-button__text">реклама</div>
            </v-btn>
          </v-col>
          <v-col cols="3"> </v-col>
          <v-col cols="3"> </v-col>
          <v-col cols="3">
            <v-btn
              block
              class="main-action-button clear"
              @click="handleClickActionCard('clear')"
            >
            </v-btn>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="3">
            <v-btn
              block
              class="main-action-button premium"
              @click="handleClickActionCard('premium')"
            >
              <div class="main-action-button__icon">
                <premium-icon />
              </div>
              <div class="main-action-button__text">премия</div>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn
              block
              class="main-action-button tax"
              @click="handleClickActionCard('tax')"
            >
              <div class="main-action-button__icon">
                <tax-icon />
              </div>
              <div class="main-action-button__text">налог</div>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn
              block
              class="main-action-button vacation"
              @click="handleClickActionCard('vacation')"
            >
              <div class="main-action-button__icon">
                <vacation-icon />
              </div>
              <div class="main-action-button__text">отпуск</div>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn
              block
              class="main-action-button blackPR"
              @click="handleClickActionCard('black-pr')"
            >
              <div class="main-action-button__icon">
                <black-pr-icon />
              </div>
              <div class="main-action-button__text">черный-PR</div>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row dense>
          <v-col cols="6" class="big-button-wrapper" ref="imageButtonWrapper">
            <image-button
              :model-value="imageDialog"
              @update:modelValue="imageDialog = $event"
            />
          </v-col>
          <v-col
            cols="6"
            class="big-button-wrapper"
            ref="bankAccountButtonWrapper"
          >
            <bank-account-button
              :model-value="bankAccountDialog"
              @update:modelValue="bankAccountDialog = $event"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <image-dialog
      :model-value="imageDialog"
      @update:modelValue="imageDialog = $event"
    />
    <bank-account-dialog
      :model-value="bankAccountDialog"
      @update:modelValue="bankAccountDialog = $event"
    />
    <div class="advertising-overlay">
      <advertising-dialog
        :model-value="advertisingDialog"
        @update:modelValue="advertisingDialog = $event"
      ></advertising-dialog>
    </div>
    <div class="actions-overlay">
      <actions-dialog
        :model-value="actionsDialog"
        @update:modelValue="actionsDialog = $event"
      />
    </div>
    <div class="products-overlay">
      <product-dialog
        :model-value="productsDialog"
        @update:modelValue="productsDialog = $event"
      />
    </div>
    <agree-dialog
      :model-value="agreeDialogModel"
      @update:modelValue="agreeDialogModel = $event"
    >
      <template #title>
        <div class="d-flex align-center justify-center">
          Очистить все данные?
        </div>
      </template>
      <template #actions>
        <div class="d-flex align-center justify-end" style="width: 100%">
          <v-btn color="red" text @click="disagree" class="mr-4"> Назад </v-btn>
          <v-btn color="green" @click="agree">Очистить</v-btn>
        </div>
      </template>
    </agree-dialog>
  </div>
</template>

<script>
import ImageIcon from '@/components/icons/ImageIcon'
import Image from '@/mixins/image'
import EraseIcon from '@/components/icons/EraseIcon'
import ImageDialog from '@/components/image/ImageDialog'
import ImageButton from '@/components/UI/ImageButton'
import BankAccountButton from '@/components/UI/BankAccountButton'
import BankAccountDialog from '@/components/UI/BankAccountDialog'
import PremiumIcon from '@/components/icons/PremiumIcon'
import TaxIcon from '@/components/icons/TaxIcon'
import VacationIcon from '@/components/icons/VacationIcon'
import BlackPrIcon from '@/components/icons/BlackPrIcon'
import AdvertisingIcon from '@/components/icons/AdvertisingIcon'
import BankAccount from '@/mixins/bankAccount'
import { CONSTANTS } from '@/utils/defaultData'
import GlassCard from '@/components/UI/GlassCard'
import GarageIcon from '@/components/icons/GarageIcon'
import PieGraphic from '@/components/icons/PieGraphicIcon'
import ActionsDialog from '@/components/UI/ActionsDialog'
import ProductDialog from '@/components/UI/ProductDialog'
import ProductsControl from '@/mixins/ProductsControl'
import ActionsControl from '@/mixins/ActionsControl'
import AgreeDialogMixin from '@/mixins/AgreeDialogMixin'
import AgreeDialog from '@/components/UI/AgreeDialog'
export default {
  name: 'IndexPage',
  mixins: [
    Image,
    BankAccount,
    ProductsControl,
    ActionsControl,
    AgreeDialogMixin,
  ],
  components: {
    AgreeDialog,
    ProductDialog,
    ActionsDialog,
    PieGraphic,
    GarageIcon,
    GlassCard,
    AdvertisingIcon,
    BlackPrIcon,
    VacationIcon,
    TaxIcon,
    PremiumIcon,
    BankAccountDialog,
    BankAccountButton,
    ImageButton,
    ImageDialog,
    EraseIcon,
    ImageIcon,
  },
  data: () => ({
    imageDialog: false,
    bankAccountDialog: false,
    advertisingDialog: false,
    actionsDialog: false,
    productsDialog: false,
    shakeImageTimeout: null,
    bankAccountTimeout: null,
  }),
  watch: {
    getBankAnimation(className) {
      if (className === '') {
        return
      }
      this.doBankAnimation(className)
      this.$store.commit('bankAccount/setAnimation', '')
    },
    getImageAnimation(className) {
      if (className === '') {
        return
      }
      this.doImageAnimation(className)
      this.$store.commit('image/setAnimation', '')
    },
  },
  computed: {
    getBankAnimation() {
      return this.$store.getters['bankAccount/animation']
    },
    getImageAnimation() {
      return this.$store.getters['image/animation']
    },
  },
  methods: {
    doImageAnimation(className) {
      clearTimeout(this.shakeImageTimeout)

      this.$refs.imageButtonWrapper.classList.add(className)

      this.shakeImageTimeout = setTimeout(() => {
        this.$refs.imageButtonWrapper.classList.remove(className)
      }, 820)
    },
    doBankAnimation(className) {
      clearTimeout(this.bankAccountTimeout)

      this.$refs.bankAccountButtonWrapper.classList.add(className)

      this.bankAccountTimeout = setTimeout(() => {
        this.$refs.bankAccountButtonWrapper.classList.remove(className)
      }, 820)
    },
    getPremium() {
      const image = this.getImage

      if (image <= 0) {
        this.doImageAnimation('shake')
        return
      }

      const premium = CONSTANTS.PREMIUM * parseInt(image)

      this.$store.dispatch('bankAccount/increaseBankAccount', {
        value: premium,
      })
    },
    payTax() {
      const bankAccount = parseInt(this.getBankAccount)

      if (!bankAccount > 0) {
        return
      }

      const tax = (bankAccount / 100) * CONSTANTS.TAX

      this.$store.dispatch('bankAccount/decreaseBankAccount', { value: tax })
    },
    doBlackPR() {
      const image = this.getImage

      if (image < 0) {
        const fixedImage = parseInt(String(image).replaceAll('-', ''))
        const revenue = fixedImage * CONSTANTS.BLACK_PR

        this.$store.dispatch('bankAccount/increaseBankAccount', {
          value: revenue,
        })

        return
      }

      if (image >= 0) {
        this.$store.dispatch('image/decreaseImage', { value: 1 })
      }
    },
    goToVacation() {
      this.$store.dispatch('bankAccount/decreaseBankAccount', { value: 1000 })
      this.$store.dispatch('image/decreaseImage', { value: 1 })
    },
    async handleClickActionCard(type) {
      // premium / advertising / vacation / tax / black-pr
      if (type === 'premium') {
        this.getPremium()
      }
      if (type === 'advertising') {
        this.advertisingDialog = !this.advertisingDialog
      }
      if (type === 'vacation') {
        this.goToVacation()
      }
      if (type === 'tax') {
        this.payTax()
      }
      if (type === 'black-pr') {
        this.doBlackPR()
      }
      if (type === 'clear') {
        if (!(await this.open())) {
          return
        }

        this.$store.commit('bankAccount/setBankAccount', 10000)
        this.$store.commit('bankAccount/setDebt', 0)
        this.$store.commit('image/setImage', 0)
        this.$store.commit('productsControl/setInventory', [])
        this.$store.commit('actionsControl/setInventory', [])
      }
    },
  },
}
</script>
