
function* authorize(user, password) {
    try {
      const token = yield call(Api.authorize, user, password)
      yield put({type: 'LOGIN_SUCCESS', token})
      yield call(Api.storeItem, {token})
    } catch(error) {
      yield put({type: 'LOGIN_ERROR', error})
    }
  }
  
  function* loginFlow() {
    while (true) {
      const {user, password} = yield take('LOGIN_REQUEST')
      // fork return a Task object
      const task = yield fork(authorize, user, password)
      const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
      if (action.type === 'LOGOUT')
        yield cancel(task)
      yield call(Api.clearItem, 'token')
    }
  }