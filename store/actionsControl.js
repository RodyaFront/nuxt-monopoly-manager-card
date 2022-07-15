export const state = () => ({
  $actionInventory: [],
})

export const mutations = {
  setInventory(state, payload) {
    state.$actionInventory = payload
  },
  pushToInventory(state, payload) {
    state.$actionInventory.push(payload)
  },
  increaseAmount(state, { id, amount }) {
    const actionIdx = state.$actionInventory.findIndex((i) => i.id === id)

    state.$actionInventory[actionIdx].amount += parseInt(amount)
  },
  pullFromInventoryById(state, payload) {
    state.$actionInventory = state.$actionInventory.filter(
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
  inventory: (state) => state.$actionInventory,
}
