import {
    Card,
    Grid,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Text,
    Title,
} from "@tremor/react";
import React from "react";
import KpiCard from './KpiCard';

const Dashboard = () => {
    return (
        <div className="p-12">
            <Title>Buy Sell Strategy</Title>
            <Text>Stock Information</Text>

            <TabGroup className="mt-6">
                <TabList>
                    <Tab>Analysis</Tab>
                    <Tab>Stock Information</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {/* <KpiCard title={} metric={} growthRate={} isPositive={} net={}/> */}
                        <div className="mt-6">
                            <Card>
                                <div className="h-80"></div>
                            </Card>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="mt-6">
                            <Card>
                                <div className="h-96"></div>
                            </Card>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
};


export default Dashboard;