import './App.css';
import BuySellForm from './BuySellForm';
import { Title } from "@tremor/react";

function App() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Backtest Stock</Title>
      <BuySellForm />
    </main>
  )
}

export default App
