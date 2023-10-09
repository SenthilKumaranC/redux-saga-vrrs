function* setBoard() {

}

function* validate() {

}

function* chessFlow() {
  while (true) {
    const gameData = yield take("START_GAME")
    yield call(setBoard,gameData) //VALIDATION
    while(true){
        const action = yield take(['MOVE','TIME_OUT','CANCEL','DISCONNECT'])
        if(action.type==="MOVE"){
            yield call(validate,moveData) //VALIDATION

            const result = yield call(checkForCheckmate,moveData) //VALIDATION
            if(result){
                break
            }
        }else{
            if(action.type==="TIME_OUT"){
               if(action.payload)
                    break
                
            }
        }
        
    }
  

  }
}
