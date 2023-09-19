import React from 'react';
import './App.scss';
import {useLocalStorage} from '../../hooks/useLocalStorage';

const App: React.FC = () => {
  const [data, setData] = useLocalStorage();

  return (
    <div>
      <h2>{`My name is ${data.name}`}</h2>
      <br />
      <input
        type="text"
        name="message"
        value={data.message}
        onChange={({target: {value}}) => setData('message', value)}
      />
    </div>
  );
};

export default App;
