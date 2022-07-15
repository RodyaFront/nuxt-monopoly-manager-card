export default {
  computed: {
    getImage() {
      return this.$store.getters['image/image']
    },
    getImageHistory() {
      return this.$store.getters['image/imageHistory']
    },
  },
  methods: {
    decreaseImage(value) {
      this.$store.dispatch('image/decreaseImage', { value })
    },
    increaseImage(value) {
      this.$store.dispatch('image/increaseImage', { value })
    },
    resetImage() {
      this.$store.dispatch('image/eraseImage')
    },
  },
}
