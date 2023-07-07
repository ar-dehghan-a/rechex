import React from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

const App: React.FC = () => {
  const {data, changeData, saveData} = useLocalStorage(['message'])
  const {message} = data

  return (
    <div>
      <h2>{`${message} I am using React in popup page`}</h2>
      <br />
      <input
        type="text"
        value={message}
        onChange={e => changeData({message: e.target.value})}
      />
      <button type="button" onClick={saveData}>
        save
      </button>
    </div>
  )
}

export default App
