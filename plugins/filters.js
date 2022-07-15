import Vue from 'vue'

const filters = [
  [
    'localeNumber',
    function (value) {
      try {
        return Number(value).toLocaleString('en-US', {
          maximumFractionDigits: 2,
        })
      } catch (e) {
        console.error('filters.js / parseInt')
      }
    },
  ],
]

filters.forEach((filter) => Vue.filter(filter[0], filter[1]))
