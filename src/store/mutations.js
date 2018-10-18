/**
 * Created by sign on 2018/4/24.
 */
import  * as types from './types'
import getters from './getters'

const mutations={
  [types.LOGINSTATE](state,val){
    state.loginState=val;
  },//是否已登录
  [types.USERNAME](state,val){
    state.loginUserName=val;
  },//用户手机号
}


export default mutations
