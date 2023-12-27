import './App.css';
import BuySellForm from './BuySell/BuySellForm';
import { Title } from "@tremor/react";

function App() {
  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Backtest Stock</Title>
      <BuySellForm />
    </div>
  )
}

export default App
