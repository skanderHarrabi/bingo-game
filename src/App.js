import { useEffect, useState } from 'react';
import './App.scss';
import { Matrix } from './components/matrix/matrix';
import { CelebrationAnimation } from './components/celebration/celebrationAnimation';
import { Header } from './components/header/header';


function App() {
  const [isBingo, setIsBingo] = useState(false);

  // if no item selected the visual effects of bingo will turn off after 8 seconds
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
      <Matrix setIsBingo={setIsBingo} />
    </div>
  );
}

export default App;
