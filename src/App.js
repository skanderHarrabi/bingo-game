import { useEffect, useState } from 'react';
import './App.scss';
import { Matrice } from './components/matrice/matrice';
import { CelebrationAnimation } from './components/celebration/celebrationAnimation';
import { Header } from './components/header/header';


function App() {
  const [isBingo, setIsBingo] = useState(false);

  useEffect(()=> {
    const t = setTimeout(()=> {
      setIsBingo(false);
    },[8000]);

    return () => {
      clearTimeout(t);
    }
  },[isBingo])

  return (
    <div className="App">
      {isBingo && <CelebrationAnimation />}
      <Header isBingo={isBingo}/>
      <Matrice setIsBingo={setIsBingo} />
    </div>
  );
}

export default App;
