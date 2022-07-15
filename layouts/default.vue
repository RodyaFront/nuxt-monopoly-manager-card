<template>
  <v-app dark>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'DefaultLayout',
  created() {
    this.initCookies()
  },
  mounted() {
    window.onbeforeunload = () => {
      this.saveGameData()
    }
    setInterval(() => {
      this.saveGameData()
    }, 5000)
  },
  methods: {
    initCookies() {
      const gameData = Cookies.get('game-data')
        ? JSON.parse(Cookies.get('game-data'))
        : {}

      const exist = Object.keys(gameData).length > 0

      if (exist) {
        this.$store.commit('bankAccount/setBankAccount', gameData.money)
        this.$store.commit('bankAccount/setDebt', gameData.debt)
        this.$store.commit('image/setImage', gameData.image)
        this.$store.commit('productsControl/setInventory', gameData.products)
        this.$store.commit('actionsControl/setInventory', gameData.actions)
      }
    },
    saveGameData() {
      const money = this.$store.getters['bankAccount/bankAccount']
      const debt = this.$store.getters['bankAccount/debt']
      const image = this.$store.getters['image/image']
      const products = this.$store.getters['productsControl/inventory']
      const actions = this.$store.getters['actionsControl/inventory']

      const gameData = {
        money,
        debt,
        image,
        products,
        actions,
      }

      Cookies.set('game-data', JSON.stringify(gameData))
    },
  },
}
</script>
