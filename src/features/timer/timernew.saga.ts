import { cancel, fork as executeTaskAndAttachToMainTask, take, takeEvery, put, spawn, TakeEffect, ForkEffect, CancelEffect } from "redux-saga/effects"
import { sagaMiddleware } from "../../app/store"

const timerPromise = (timerInterval:number) =>
  new Promise((resolve) => setTimeout(resolve, timerInterval))

function* runTimer(payload:any) {
  console.log("Lets start timer", payload)
  yield timerPromise(3000)
  console.log("timer completed")
  yield put({ type: "TIMER_COMPLETED" })
}

export function* watchRunTimer() {

  //yield takeEvery("RUN_TIMER", runTimer)
  //waiting for below action
 
    const payload:TakeEffect = yield take("RUN_TIMER") //LOGIN REQUEST
    //when action received executer below line
    const runTimerTask = yield executeTaskAndAttachToMainTask(runTimer, payload) //VALIDATION
    const {type} = yield take(["STOP_TIMER", "TIMER_COMPLETED"])
    if (type === "STOP_TIMER") {
      yield cancel(runTimerTask)
    }
    if (type === "TIMER_COMPLETED") {
      console.log("success")
    } 
    sagaMiddleware.run(watchRunTimer)
}
//Main Task(InProgress) -> Sub Task(spawn - InProgress)
