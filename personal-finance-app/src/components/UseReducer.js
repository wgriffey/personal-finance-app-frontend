import React, {useReducer} from 'react'

const intialState = {count:0}
const reducer = (state, action) => {
    switch(action.type){
        case 'increment':
            return {count: state.count + 1}
        case 'decrement':
            return {count: state.count - 1}   
        default:
            return    
    }
}

function UseReducer() {
    const [state, dispatch] = useReducer(reducer, intialState)

  return (
    <div>
        <h2>Count: {state.count}</h2>
        <button className='btn btn-success' onClick={() => dispatch({type:'increment'})}>Increment</button>
        <button className='btn btn-danger' onClick={() => dispatch({type: 'decrement'})}>Decrement</button>

    </div>
  )
}

export default UseReducer
