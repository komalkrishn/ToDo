import './App.css';
import React, {useEffect, useState} from 'react'

const App = () => {
  const [initialValue, setInitialValue] = useState(1)
  const [maxValue, setMaxValue] = useState(1000)
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json')
    .then((res) => res.json())
    .then((response) => {
      console.log('response is: ', response)
      //TODO: Here we are getting only null value
      //Hence taking 1 as default value
    })
  }, [])

  const putDataToBackend = (value) => {
    setShowLoader(true)
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'shubhamsinhaIITBHU': value})
    }
    fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json', requestOptions)
    .then((res) => res.json())
    .then((response) => console.log('response is: ', response))
    .catch((error) => {console.log('error is: ', error)})
    setTimeout(() => {
      setShowLoader(false)
    },300)
  }

  const handleSubtraction = () => {
    putDataToBackend(initialValue-1)
    setInitialValue(initialValue-1)
  }

  const handleAddition = () => {
   
    putDataToBackend(initialValue+1)
    setInitialValue(initialValue+1)
  }

  const handleChangeText = (event) => { 
   
    if(event.target.value<=maxValue) {
      putDataToBackend(+event.target.value)
      setInitialValue(+event.target.value)
    }
  }

  return (
    <div className='container'>
      {
        showLoader && 
        <div className='saveCounter'>
          <div className="progressContainer">
            <hr className="progressView" />
          </div>
          <div className="progressText">Saving counter value</div>
        </div>
      }
      <div className="wrapper">
        <div className="box">
          <button onClick={handleSubtraction} className='content'>-</button>
        </div>

        <div className="box1">
          <input className='content' value={initialValue} type='number' onChange={(event) => handleChangeText(event)}/>
        </div>

        <div className="box2">
          <button onClick={handleAddition} disabled={initialValue === maxValue} className='content'>+</button>
        </div>
        
      </div>
      <div>
        <p>Counter value: {initialValue}</p>
      </div>
    </div> 
  )
}

export default App;
