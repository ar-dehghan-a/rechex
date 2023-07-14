import React from 'react'
import useLocalStorage, {useSaveStorage} from '../../hooks/useLocalStorage'

const App: React.FC = () => {
  const [message, setMessage] = useLocalStorage('message')
  const saveData = useSaveStorage()

  return (
    <div>
      <h2>{`${message} I am using React in popup page`}</h2>
      <br />
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="button" onClick={saveData}>
        save
      </button>
    </div>
  )
}

export default App
