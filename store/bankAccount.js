import { TYPES } from '@/utils/defaultData'

export const state = () => ({
  $bankAccount: 10000,
  $bankAccountHistory: [],
  $debt: 0,
  $animation: '',
})
export const mutations = {
  setBankAccount(state, payload) {
    state.$bankAccount = payload
  },
  setDebt(state, payload) {
    state.$debt = payload
  },
  setAnimation(state, payload) {
    state.$animation = payload
  },
  increaseBankAccount(state, { value, options = {} }) {
    state.$bankAccount = state.$bankAccount + parseInt(value)

    state.$bankAccountHistory = [
      ...state.$bankAccountHistory,
      {
        value: String(value).replace('-', ''),
        type: TYPES.INCREASE,
      },
    ]

    state.$animation = 'jump'
  },
  decreaseBankAccount(state, { value, options = {} }) {
    state.$bankAccount = state.$bankAccount - parseInt(value)

    if (options.history !== undefined && !options.history) {
      return
    }

    state.$bankAccountHistory = [
      ...state.$bankAccountHistory,
      {
        value: options.debt ? options.debt : String(value).replace('-', ''),
        type: options.type ? options.type : TYPES.DECREASE,
        debt: options.debt ? options.debt : 0,
      },
    ]

    state.$animation = 'squeeze'
  },
  increaseDebt(state, payload) {
    state.$debt = state.$debt + parseInt(payload)
  },
  decreaseDebt(state, payload) {
    state.$debt = state.$debt - parseInt(payload)
  },
}
export const actions = {
  increaseBankAccount({ commit, state }, { value, options = {} }) {
    if (state.$debt > 0) {
      const moreThenZeroAfterIncrease =
        parseInt(state.$debt) - parseInt(value) < 0
      const revenue = parseInt(value) - parseInt(state.$debt)

      if (moreThenZeroAfterIncrease) {
        commit('increaseBankAccount', { value: revenue, options })
        commit('decreaseDebt', state.$debt)
        return
      }

      if (state.$debt > 0) {
        commit('decreaseDebt', value)
        return
      }
    }

    commit('increaseBankAccount', { value, options })
  },
  decreaseBankAccount({ commit, state }, { value, options = {} }) {
    const lessThenZeroAfterDecrease =
      parseInt(state.$bankAccount) - parseInt(value) < 0
    const debt = parseInt(value) - parseInt(state.$bankAccount)

    if (lessThenZeroAfterDecrease) {
      commit('decreaseBankAccount', {
        value: state.$bankAccount,
        options: { debt },
      })

      commit('increaseDebt', debt)

      return
    }

    commit('decreaseBankAccount', { value, options })
  },
}
export const getters = {
  bankAccount: (state) => state.$bankAccount,
  debt: (state) => state.$debt,
  bankAccountHistory: (state) => state.$bankAccountHistory,
  animation: (state) => state.$animation,
}
