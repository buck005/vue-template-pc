const CashLimit =()=>import("components/home/home.vue");//账户提现限额
const prefix = 'home'
const routers = [
  {
    path: `/${prefix}/home`,
    name: `${prefix}-home`,
    component: CashLimit
  },
]
export default routers
