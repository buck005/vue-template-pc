/**
 * Created by user on 2018/6/19.
 */
//obj形式传值
import {myFetch} from 'assets/js/utils'
export function goLogin (option) {
  const url = '/api/login';
  const params = Object.assign({},option)
  return myFetch(url, params, 'POST')
}
//单个传值
// export function editProduct (option) {
//   const url = `/api/finance/mxd/background/product/edit/${option}`;
//   const params = Object.assign({}, option)
//   return myFetch(url, params, 'POST')
// }