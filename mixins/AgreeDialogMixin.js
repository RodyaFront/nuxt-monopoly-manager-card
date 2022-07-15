export default {
  data: () => ({
    resolve: null,
    reject: null,
    agreeDialogModel: false,
  }),
  methods: {
    async open() {
      this.agreeDialogModel = true
      return await new Promise((res, rej) => {
        this.resolve = res
        this.reject = rej
      })
    },
    agree() {
      this.resolve(true)
      this.agreeDialogModel = false
    },
    disagree() {
      this.resolve(false)
      this.agreeDialogModel = false
    },
  },
}
