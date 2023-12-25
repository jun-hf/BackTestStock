import './App.css'


import { Card, Text, Metric } from "@tremor/react";

const Bar = () => (
  <Card className="max-w-xs mx-auto">
    <Text>Sales</Text>
    <Metric>$ 34,743</Metric>
  </Card>
);

function App() {
  return (
    <>
      <Bar />
    </>
  )
}

export default App
