
import { Card, NumberInput  } from "@tremor/react";

const BuySellForm = () => (
  <Card className="mt-6">
    <NumberInput placeholder="Amount..." />
    <NumberInput error={true} errorMessage="Number out of bounds" />
    <NumberInput placeholder="Disabled" disabled={true} />
    <NumberInput enableStepper={false} />
  </Card>
);

export default BuySellForm;