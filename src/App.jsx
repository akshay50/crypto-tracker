import { useState } from 'react';
import './App.css';
import CryptoTable from './components/CryptoTable';

function App() {
  const [count, setCount] = useState(0);

  return <CryptoTable />;
}

export default App;
