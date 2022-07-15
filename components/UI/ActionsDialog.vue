<template>
  <c-dialog :model-value="dialog" @update:modelValue="dialog = $event">
    <div :class="`actions-dialog ${dialog ? 'show' : 'hidden'}`">
      <div class="actions-dialog__table-card">
        <c-table
          :headers="getInventoryTableFormat.headers"
          :items="getInventoryTableFormat.items"
          :actions="true"
        >
          <template #action="{ item }">
            <v-btn icon small @click="sellItem(item)">
              <cart-icon fill="black" fill-opacity="0.5" />
            </v-btn>
          </template>
        </c-table>
      </div>
      <div class="actions-dialog__bottom-part">
        <div class="sections-name">Покупка акций</div>
        <div class="actions-dialog__show-section">
          <v-row no-gutters dense>
            <v-col cols="12">
              <v-autocomplete
                v-model="selectedAction"
                :items="autocompleteItems"
                dense
                hide-details
                outlined
                prepend-icon="mdi-magnify"
                item-text="name"
                clearable
                return-object
                label="Акция"
                color="white"
                placeholder="Поиск"
                :menu-props="{ transition: 'slide-x-transition' }"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="mt-4">
              <v-row no-gutters dense>
                <v-col cols="5">
                  <v-text-field
                    v-model="amountOfActions"
                    hide-details
                    dense
                    outlined
                    block
                    type="number"
                    label="Кол.во"
                    color="white"
                    prepend-icon="mdi-percent-outline"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex align-center justify-end" cols="4">
                  {{ getPrice | localeNumber }} {{ symbol }}
                </v-col>
                <v-col class="d-flex justify-end">
                  <v-btn
                    @click="buyAction"
                    color="green"
                    elevation="0"
                    style="height: 100%"
                  >
                    <v-icon>mdi-gavel</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
    <agree-dialog
      :model-value="agreeDialogModel"
      @update:modelValue="agreeDialogModel = $event"
    >
      <template #title>Вы уверены?</template>
      <template #default>
        После продажи стоимость купленных акций зачислится вам на банковский
        счет, а сама акция пропадет из инвентаря.
      </template>
      <template #actions>
        <div class="d-flex align-center justify-end" style="width: 100%">
          <v-btn color="red" text @click="disagree" class="mr-4"> Нет </v-btn>
          <v-btn color="green" @click="agree">Да</v-btn>
        </div>
      </template>
    </agree-dialog>
  </c-dialog>
</template>

<script>
import Dialog from '@/mixins/dialog'
import CDialog from '@/components/UI/CDialog'
import { ACTIONS, SYMBOLS } from '@/utils/defaultData'
import BankAccount from '@/mixins/bankAccount'
import ActionsControl from '@/mixins/ActionsControl'
import AgreeDialog from '@/components/UI/AgreeDialog'
import AgreeDialogMixin from '@/mixins/AgreeDialogMixin'
import CartIcon from '@/components/icons/CartIcon'

export default {
  components: { CartIcon, AgreeDialog, CDialog },
  mixins: [Dialog, BankAccount, ActionsControl, AgreeDialogMixin],
  data: () => ({
    symbol: SYMBOLS.euro,
    autocompleteItems: ACTIONS,
    selectedAction: null,
    amountOfActions: null,
    agreeDialogModel: false,
  }),
  computed: {
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
    handleGetAvertising(image, cost) {
      this.$store.dispatch('image/increaseImage', { value: image })
      this.$store.dispatch('bankAccount/decreaseBankAccount', { value: cost })
      this.dialog = false
    },
    async sellItem([name, amount, cost]) {
      if (!(await this.open())) {
        return
      }

      const deletedActionData = ACTIONS.find((i) => i.name === name)
      const revenue = cost

      this.$store.dispatch(
        'actionsControl/pullFromInventoryById',
        deletedActionData.id
      )
      this.$store.dispatch('bankAccount/increaseBankAccount', {
        value: revenue,
      })
    },
    resetFields() {
      this.selectedAction = null
      this.amountOfActions = null
    },
    buyAction() {
      if (
        this.selectedAction === null ||
        this.amountOfActions === 0 ||
        this.amountOfActions === null
      ) {
        return
      }

      const actionsCost = this.getPrice

      const alreadyHaveThisAction = this.getActionsInventory.find(
        (item) => item.id === this.selectedAction.id
      )

      if (alreadyHaveThisAction !== undefined) {
        this.$store.dispatch('actionsControl/increaseAmount', {
          id: this.selectedAction.id,
          amount: this.amountOfActions,
        })

        this.$store.dispatch('bankAccount/decreaseBankAccount', {
          value: actionsCost,
        })

        this.resetFields()

        return
      }

      if (this.getBankAccount >= actionsCost) {
        const boughtAction = {
          ...this.selectedAction,
          amount: parseInt(this.amountOfActions),
        }

        this.$store.dispatch('actionsControl/addToInventory', boughtAction)
        this.$store.dispatch('bankAccount/decreaseBankAccount', {
          value: actionsCost,
        })

        this.resetFields()
      }
    },
  },
}
</script>

<style scoped></style>
