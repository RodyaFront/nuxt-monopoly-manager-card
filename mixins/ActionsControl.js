import { SYMBOLS } from '@/utils/defaultData'

export default {
  computed: {
    getActionsInventory() {
      return this.$store.getters['actionsControl/inventory']
    },
    getInventoryTableFormat() {
      const data = this.$store.getters['actionsControl/inventory']
      const output = {
        headers: ['Акция', '%', 'Стоимость'],
        items: [],
      }

      data.forEach((row) => {
        output.items.push([
          row.name,
          row.amount + '%',
          parseInt(row.amount) * parseInt(row.actionCost) + ` ${SYMBOLS.euro}`,
        ])
      })

      return output
    },
  },
}
