export const state = () => ({
  $productsInventory: [],
})

export const mutations = {
  setInventory(state, payload) {
    state.$productsInventory = payload
  },
  pushToInventory(state, payload) {
    state.$productsInventory.push({ ...payload, product: true })
  },
  increaseAmount(state, { id, amount }) {
    const productIdx = state.$productsInventory.findIndex((i) => i.id === id)

    state.$productsInventory[productIdx].amount += parseInt(amount)
  },
  pullFromInventoryById(state, payload) {
    state.$productsInventory = state.$productsInventory.filter(
      (item) => item.id !== payload
    )
  },
}

export const actions = {
  addToInventory({ commit }, payload) {
    commit('pushToInventory', payload)
  },
  increaseAmount({ commit }, payload) {
    const { id, amount } = payload
    commit('increaseAmount', { id, amount })
  },
  pullFromInventoryById({ commit }, payload) {
    commit('pullFromInventoryById', payload)
  },
}

export const getters = {
  inventory: (state) => state.$productsInventory,
}
