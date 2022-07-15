export default {
  computed: {
    getBankAccount() {
      return this.$store.getters['bankAccount/bankAccount']
    },
    getBankAccountHistory() {
      return this.$store.getters['bankAccount/bankAccountHistory']
    },
    getDebt() {
      return this.$store.getters['bankAccount/debt']
    },
  },
  methods: {
    decreaseBankAccount(value) {
      this.$store.dispatch('bankAccount/decreaseBankAccount', { value })
    },
    increaseBankAccount(value) {
      this.$store.dispatch('bankAccount/increaseBankAccount', { value })
    },
  },
}
