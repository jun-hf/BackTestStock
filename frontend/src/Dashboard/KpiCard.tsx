import { BadgeDelta, Card, Flex, Metric, Text, DeltaBar } from "@tremor/react"; 

interface KpiProps {
    title: string;
    metric: string;
    growthRate: number;
    isPositive: boolean;
    net: number;
};

const KpiCard: React.FC<KpiProps> = ({ title, metric, growthRate, isPositive, net }) => {
    return (
        <Card className="max-w-lg mx-auto">
            <Flex alignItems="start">
                <div>
                    <Text>{title}</Text>
                    <Metric>{metric}</Metric>
                </div>
                <BadgeDelta deltaType={isPositive ? "moderateIncrease" :  "moderateDecrease"}>{`${growthRate.toString()}%`}</BadgeDelta>
            </Flex>
            <Flex className="mt-4">
                <Text className="truncate">{net}</Text>
            </Flex>
            <DeltaBar value={growthRate} isIncreasePositive={isPositive} className="mt-3" />
        </Card>
    );
}; 

export default KpiCard;