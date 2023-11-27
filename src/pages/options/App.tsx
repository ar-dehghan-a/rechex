import React from 'react';
import './App.scss';
import useChromeLocalStorage from '@/hooks/useLocalStorage';

const App: React.FC = () => {
  const [name] = useChromeLocalStorage('name', 'rechex');
  const [message, setMessage] = useChromeLocalStorage(
    'message',
    'hello from rechex'
  );

  return (
    <div>
      <h2>{`My name is ${name}`}</h2>
      <br />
      <input
        type="text"
        value={message}
        onChange={({target: {value}}) => setMessage(value)}
      />
      <p>Edit src/pages/options/App.tsx</p>
    </div>
  );
};

export default App;
