import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import createSagaMiddleware from "redux-saga"
import { watchRunTimer } from "../features/timer/timernew.saga"

export const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  middleware: (getExistingMiddlewares) => {
    console.log(getExistingMiddlewares())
    return [...getExistingMiddlewares(), sagaMiddleware]
  },
  reducer: {
    counter: counterReducer,
  },
})

sagaMiddleware.run(watchRunTimer)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
