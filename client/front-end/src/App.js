import './App.css';

import pokemon from 'pokemontcgsdk'
import CardSearch from './Components/UpperPanel/CardSearch/CardSearch'
import CardInfo from './Components/UpperPanel/CardInfo/CardInfo'
import UpperPanelContainer from './Components/UpperPanel/UpperPanelContainer/UpperPanelContainer';

function App() {


  // API key to access pokemon card api
  pokemon.configure({apiKey: 'd47970f2-3447-4b91-92f8-8b3427ebb339'})

  return (
    <div className="App">


      <div className="Dashboard">
        <UpperPanelContainer/>

        <div className='lower-panel'>
        </div>

      </div>

    </div>
  );
}

export default App;
