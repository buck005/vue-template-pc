//element-ui分页公用
let mixin = {
  data () {
    return {
      queryMethodName: 'list',
      total:0,
      pagination: {
        pageNum: 1,
        pageNumber:1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        currentPage: 1
      }
    }
  },
  methods: {
    sizeChange (val) {
      this.pagination.pageSize = val
      this[this.queryMethodName]()
    },
    // 当前页变化
    currentChange (val) {
      this.pagination.pageNum = this.pagination.currentPage = val
      this[this.queryMethodName]()
    }
  }
}
export default mixin
