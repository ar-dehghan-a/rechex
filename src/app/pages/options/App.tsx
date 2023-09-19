import React, {useEffect, useState} from 'react';
import './App.scss';
import {useLocalStorage} from '../../hooks/useLocalStorage';

const App: React.FC = () => {
  const [local, setLocal] = useLocalStorage();
  const [data, setData] = useState(local);

  const dataHandler = (target: HTMLInputElement) => {
    const {name, value} = target;
    setData(prev => ({...prev, [name]: value}));
  };

  useEffect(() => {
    setData(local);
  }, [local]);

  return (
    <div>
      <h2>{`My name is ${data.name}`}</h2>
      <br />
      <input
        type="text"
        name="message"
        value={data.message}
        onChange={({target}) => dataHandler(target)}
      />
      <br />
      <button onClick={() => setLocal('all', data)}>save</button>
    </div>
  );
};

export default App;
