import { SYMBOLS } from '@/utils/defaultData'

export default {
  computed: {
    getProductsInventory() {
      return this.$store.getters['productsControl/inventory']
    },
    getProductsInventoryTableFormat() {
      const data = this.$store.getters['productsControl/inventory']
      const output = {
        headers: ['Продукт', 'Стоимость'],
        items: [],
      }

      data.forEach((row) => {
        output.items.push([
          row.name,
          parseInt(row.amount) * parseInt(row.productCost) + ` ${SYMBOLS.euro}`,
        ])
      })

      return output
    },
  },
}
