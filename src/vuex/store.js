import Vue from 'vue'  
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import pessoas from './modules/pessoas/main'
import config from './modules/config/main'

Vue.use(Vuex)

export default new Vuex.Store({  
    state,
    mutations,
    actions,
    modules: {
        pessoas,
        config
    }
  })
