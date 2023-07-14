import React from 'react'
import useLocalStorage, {useSaveStorage} from '../../hooks/useLocalStorage'

const App: React.FC = () => {
  const [data, setData] = useLocalStorage()
  const saveData = useSaveStorage()
  const {message, exVersion} = data

  return (
    <div>
      <h2>{`${message} I am using React in popup page`}</h2>
      <br />
      <input
        type="text"
        value={message}
        onChange={e => setData({message: e.target.value})}
      />
      <p>{exVersion}</p>
      <button type="button" onClick={saveData}>
        save
      </button>
    </div>
  )
}

export default App
