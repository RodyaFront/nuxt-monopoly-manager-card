import { TYPES } from '@/utils/defaultData'

export const state = () => ({
  $image: 0,
  $imageHistory: [],
  $animation: '',
})
export const mutations = {
  setImage(state, payload) {
    state.$image = payload
  },
  setAnimation(state, payload) {
    state.$animation = payload
  },
  increaseImage(state, { value, options = {} }) {
    state.$image = state.$image + parseInt(value)

    state.$imageHistory = [
      ...state.$imageHistory,
      {
        value: String(value).replace('-', ''),
        type: TYPES.INCREASE,
      },
    ]

    state.$animation = 'jump'
  },
  decreaseImage(state, { value, options = {} }) {
    state.$image = state.$image - parseInt(value)

    state.$imageHistory = [
      ...state.$imageHistory,
      {
        value: String(value).replace('-', ''),
        type: options.type ? options.type : TYPES.DECREASE,
      },
    ]

    state.$animation = 'squeeze'
  },
}
export const actions = {
  increaseImage({ commit }, { value, options = {} }) {
    commit('increaseImage', { value, options })
  },
  decreaseImage({ commit }, { value, options = {} }) {
    commit('decreaseImage', { value, options })
  },
  eraseImage({ dispatch, state }) {
    let type = state.$image < 0 ? TYPES.INCREASE : TYPES.DECREASE

    if (state.$image === 0) {
      return
    }

    dispatch('decreaseImage', {
      value: state.$image,
      options: { type },
    })
  },
}
export const getters = {
  image: (state) => state.$image,
  imageHistory: (state) => state.$imageHistory,
  bankAccount: (state) => state.$bankAccount,
  animation: (state) => state.$animation,
}
