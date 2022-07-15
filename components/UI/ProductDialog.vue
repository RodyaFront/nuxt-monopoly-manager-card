<template>
  <c-dialog :model-value="dialog" @update:modelValue="dialog = $event">
    <div :class="`products-dialog ${dialog ? 'show' : 'hidden'}`">
      <div class="products-dialog__table-card">
        <c-table
          :headers="getProductsInventoryTableFormat.headers"
          :items="getProductsInventoryTableFormat.items"
          :actions="true"
        >
          <template #action="{ item }">
            <v-btn icon small @click="sellItem(item)">
              <cart-icon fill="white" fill-opacity="0.5" />
            </v-btn>
          </template>
        </c-table>
        <div class="products-dialog__actions">
          <v-row dense>
            <v-col cols="8">
              <v-btn block @click="sellAll" class="sell-all">
                Продать всё
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                block
                @click="setPercent"
                class="percent"
                style="flex-direction: column"
              >
                <div v-if="parseInt(sellPercent) !== 0 && sellPercent !== null">
                  {{ parseInt(sellPercent) > 0 ? '+' : '' }}{{ sellPercent }}
                </div>
                <v-icon large>mdi-percent-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="products-dialog__bottom-part">
        <div class="sections-name">Доступные товары</div>
        <template v-if="getActionsInventory.length > 0">
          <div
            v-for="product in getActionsInventory"
            class="products-dialog__product"
          >
            <div class="product__to-up-btn">
              <v-btn @click="toUpItem(product)" icon>
                <box-icon />
              </v-btn>
            </div>
            <div class="product__name">{{ product.name }}</div>
            <div class="product__info">
              <v-row dense no-gutters class="d-flex align-center">
                <v-col>
                  <span>Цена</span> {{ product.productCost }} {{ symbol }} шт.
                </v-col>
                <v-col class="d-flex">
                  <span>Кол. во</span> {{ product.amount }}
                </v-col>
                <v-col cols="2" class="d-flex justify-end">
                  {{ product.productCost * product.amount }} {{ symbol }}
                </v-col>
              </v-row>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="products-dialog__placeholder">
            Нет доступных товаров...
          </div>
        </template>
      </div>
    </div>
    <agree-dialog
      :model-value="agreeDialogModel"
      @update:modelValue="agreeDialogModel = $event"
    >
      <template #title>
        <div class="d-flex align-center justify-center">
          {{ agreeDialogContent.title }}
        </div>
      </template>
      <template #default>
        {{ agreeDialogContent.text }}

        <div v-if="agreeDialogContent.revenue" class="agree-dialog__revenue">
          <small>Выручка:</small> {{ agreeDialogContent.revenue }} {{ symbol }}
        </div>
      </template>
      <template #actions>
        <div class="d-flex align-center justify-end" style="width: 100%">
          <v-btn color="red" text @click="disagree" class="mr-4">
            {{ agreeDialogContent.cancel }}
          </v-btn>
          <v-btn color="green" @click="agree">{{
            agreeDialogContent.agree
          }}</v-btn>
        </div>
      </template>
    </agree-dialog>
    <percent-dialog
      :model-value="percentDialog"
      @update:modelValue="percentDialog = $event"
      :percent="sellPercent"
      @update:percent="sellPercent = $event"
    />
  </c-dialog>
</template>

<script>
import Dialog from '@/mixins/dialog'
import CDialog from '@/components/UI/CDialog'
import { ACTIONS, SYMBOLS } from '@/utils/defaultData'
import BankAccount from '@/mixins/bankAccount'
import AgreeDialog from '@/components/UI/AgreeDialog'
import AgreeDialogMixin from '@/mixins/AgreeDialogMixin'
import ProductsControl from '@/mixins/ProductsControl'
import BoxIcon from '@/components/icons/BoxIcon'
import ActionsControl from '@/mixins/ActionsControl'
import CartIcon from '@/components/icons/CartIcon'
import PercentDialog from '@/components/icons/PercentDialog'

export default {
  components: { PercentDialog, CartIcon, BoxIcon, AgreeDialog, CDialog },
  mixins: [
    Dialog,
    BankAccount,
    ProductsControl,
    ActionsControl,
    AgreeDialogMixin,
  ],
  data: () => ({
    symbol: SYMBOLS.euro,
    singleItemRevenue: null,
    agreeDialogContent: {
      title: '',
      text: '',
      cancel: '',
      revenue: '',
      agree: '',
    },
    items: [
      ['ТВ-Компания', 10, 3000],
      ['Строительная фирма', 51, 30600],
      ['Авиакомпания', 20, 4000],
    ],
    headers: ['Акция', '%', 'Стоимость'],
    autocompleteItems: ACTIONS,
    selectedAction: null,
    amountOfActions: 0,
    sellPercent: null,
    agreeDialogModel: false,
    percentDialog: false,
    toUpDialogContent: {
      title: 'В инвентарь?',
      text: 'Переместить продукт в инвентарь что-бы позде продать его клиенту.',
      cancel: 'Отмена',
      agree: 'Да!',
    },
  }),
  computed: {
    getRevenue() {
      const productsSumArr = this.getProductsInventoryTableFormat.items.map(
        (i) => parseInt(i[1])
      )

      const fixedSellPercent = this.sellPercent || 0

      let revenue = productsSumArr.reduce(function (a, b) {
        return a + b
      })

      if (fixedSellPercent > 0 || fixedSellPercent < 0) {
        const negativePercent = String(fixedSellPercent)[0] === '-'
        const fixedPercent = parseInt(String(fixedSellPercent).replace('-', ''))

        const percent = (revenue / 100) * fixedPercent

        if (negativePercent) {
          revenue = revenue - percent
        } else {
          revenue = revenue + percent
        }
      }

      return revenue
    },
    getPrice() {
      if (this.selectedAction !== null) {
        return (
          parseInt(this.selectedAction.actionCost) * (this.amountOfActions || 0)
        )
      }
      return ''
    },
  },
  methods: {
    sellDialogContent() {
      return {
        title: 'Продать товар?',
        text: 'После продажи стоимость товара будет зачислена вам на счет.',
        revenue: this.singleItemRevenue,
        cancel: 'Отмена',
        agree: 'Продать!',
      }
    },
    sellAllDialogContent() {
      return {
        title: 'Продать всё?',
        text: 'Все продукты на складе будут проданы по выставленному проценту.',
        cancel: 'Назад',
        revenue: this.getRevenue,
        agree: 'Продать!',
      }
    },
    async sellAll() {
      if (!(await this.agreeModal(this.sellAllDialogContent()))) {
        return
      }

      const productsSumArr = this.getProductsInventoryTableFormat.items.map(
        (i) => parseInt(i[1])
      )

      let revenue = productsSumArr.reduce(function (a, b) {
        return a + b
      })

      const fixedSellPercent = this.sellPercent || 0

      if (fixedSellPercent > 0 || fixedSellPercent < 0) {
        const negativePercent = String(fixedSellPercent)[0] === '-'
        const fixedPercent = parseInt(String(fixedSellPercent).replace('-', ''))

        const percent = (revenue / 100) * fixedPercent

        if (negativePercent) {
          revenue = revenue - percent
        } else {
          revenue = revenue + percent
        }
      }

      this.$store.dispatch('bankAccount/increaseBankAccount', {
        value: revenue,
      })

      this.getProductsInventoryTableFormat.items.forEach(([name]) => {
        const id = ACTIONS.find((i) => i.name === name).id

        this.$store.dispatch('productsControl/pullFromInventoryById', id)
      })

      this.sellPercent = null
    },
    setPercent() {
      this.percentDialog = !this.percentDialog
    },
    async agreeModal({ title, text, cancel, agree, revenue = null }) {
      this.agreeDialogContent.title = title
      this.agreeDialogContent.text = text
      this.agreeDialogContent.cancel = cancel
      this.agreeDialogContent.agree = agree
      this.agreeDialogContent.revenue = revenue
      return await this.open()
    },
    async sellItem([name, cost]) {
      let revenue = parseInt(cost)

      const fixedSellPercent = this.sellPercent || 0

      const negativePercent = String(fixedSellPercent)[0] === '-'
      const fixedPercent = parseInt(String(fixedSellPercent).replace('-', ''))

      const percent = (revenue / 100) * fixedPercent

      if (negativePercent) {
        revenue = revenue - percent
      } else {
        revenue = revenue + percent
      }

      this.singleItemRevenue = revenue

      if (!(await this.agreeModal(this.sellDialogContent()))) {
        return
      }

      const id = ACTIONS.find((i) => i.name === name).id

      this.$store.dispatch('productsControl/pullFromInventoryById', id)
      this.$store.dispatch('bankAccount/increaseBankAccount', {
        value: revenue,
      })
    },
    async toUpItem(product) {
      if (!(await this.agreeModal(this.toUpDialogContent))) {
        return
      }

      const alreadyHaveThisProduct = this.getProductsInventory.find(
        (item) => item.id === product.id
      )

      if (alreadyHaveThisProduct !== undefined) {
        await this.$store.dispatch('productsControl/increaseAmount', {
          id: product.id,
          amount: product.amount,
        })
        this.$forceUpdate()
        return
      }

      await this.$store.dispatch('productsControl/addToInventory', product)
    },
  },
}
</script>

<style scoped></style>
