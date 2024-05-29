import Header from './Components/Header';
import Sidenav from './Components/Sidenav';
import { DataContextProvider } from './Context/DataContext';
import Resumo from './Pages/Resumo';
import Vendas from './Pages/Vendas';
import './Style.css';

function App() {
  return (
    <DataContextProvider>
      <div className='container'>
        <Sidenav />
        <Header />
        <Resumo />
        <Vendas />
      </div>
    </DataContextProvider>
  );
}

export default App;
