import { combineReducers } from 'redux'

import { userReducer } from './reducers/user.reducer.js'
import { orderReducer } from './reducers/order.reducer.js'
import { systemReducer } from './reducers/system.reducer.js'

export const rootReducer = combineReducers({
    userModule: userReducer,
    orderModule: orderReducer,
    systemModule: systemReducer,
})
