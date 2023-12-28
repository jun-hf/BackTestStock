import './App.css';
import BuySellForm from './BuySell/BuySellForm';
import { Title } from "@tremor/react";
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* <Title className='mb-2'>Backtest Stock</Title> */}
      {/* <BuySellForm /> */}
      <Dashboard />
    </div>
  )
}

export default App
