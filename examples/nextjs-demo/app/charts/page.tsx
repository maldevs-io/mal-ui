'use client';

import {
  AreaChart,
  BarChart,
  BubbleChart,
  CompositeChart,
  DonutChart,
  LineChart,
  PieChart,
  RadarChart,
  ScatterChart,
  Sparkline,
} from 'mal-ui/charts';
import { Card, SimpleGrid, Stack, Title } from 'mal-ui/core';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => ({
  date: m,
  Apples: 200 + i * 10,
  Oranges: 100 + i * 30,
  Tomatoes: 150 + i * 5,
}));

const donut = [
  { name: 'A', value: 400, color: 'indigo.6' },
  { name: 'B', value: 300, color: 'yellow.6' },
  { name: 'C', value: 300, color: 'teal.6' },
];

const scatter = [
  {
    color: 'blue.6',
    name: 'Group A',
    data: Array.from({ length: 20 }, () => ({ x: Math.random() * 100, y: Math.random() * 100 })),
  },
];

const bubbleData = Array.from({ length: 10 }, (_, i) => ({ hour: i, index: i, value: 10 + i * 5 }));

const radar = [
  { product: 'A', alpha: 120, beta: 110, gamma: 140 },
  { product: 'B', alpha: 98, beta: 130, gamma: 100 },
  { product: 'C', alpha: 86, beta: 130, gamma: 90 },
];

export default function ChartsPage() {
  return (
    <Stack gap="lg">
      <Title order={2}>Charts</Title>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Box title="LineChart">
          <LineChart
            h={220}
            data={months}
            dataKey="date"
            series={[
              { name: 'Apples', color: 'indigo.6' },
              { name: 'Oranges', color: 'orange.6' },
            ]}
            curveType="natural"
          />
        </Box>
        <Box title="AreaChart">
          <AreaChart
            h={220}
            data={months}
            dataKey="date"
            series={[
              { name: 'Apples', color: 'indigo.6' },
              { name: 'Tomatoes', color: 'red.6' },
            ]}
          />
        </Box>
        <Box title="BarChart">
          <BarChart
            h={220}
            data={months}
            dataKey="date"
            series={[
              { name: 'Apples', color: 'indigo.6' },
              { name: 'Oranges', color: 'orange.6' },
            ]}
          />
        </Box>
        <Box title="CompositeChart">
          <CompositeChart
            h={220}
            data={months}
            dataKey="date"
            series={[
              { name: 'Apples', color: 'indigo.6', type: 'bar' },
              { name: 'Oranges', color: 'orange.6', type: 'line' },
            ]}
          />
        </Box>
        <Box title="DonutChart">
          <DonutChart data={donut} />
        </Box>
        <Box title="PieChart">
          <PieChart data={donut} withLabels />
        </Box>
        <Box title="RadarChart">
          <RadarChart
            h={220}
            data={radar}
            dataKey="product"
            series={[
              { name: 'alpha', color: 'blue.4' },
              { name: 'beta', color: 'red.4' },
            ]}
          />
        </Box>
        <Box title="ScatterChart">
          <ScatterChart
            h={220}
            data={scatter}
            dataKey={{ x: 'x', y: 'y' }}
            xAxisLabel="x"
            yAxisLabel="y"
          />
        </Box>
        <Box title="BubbleChart">
          <BubbleChart
            h={80}
            data={bubbleData}
            range={[10, 200]}
            label="Bubbles"
            dataKey={{ x: 'hour', y: 'index', z: 'value' }}
            color="lime.6"
          />
        </Box>
        <Box title="Sparkline">
          <Sparkline
            w={200}
            h={60}
            data={[10, 20, 40, 20, 40, 10, 50]}
            curveType="natural"
            color="blue"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </Box>
      </SimpleGrid>
    </Stack>
  );
}

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card withBorder padding="md">
      <Title order={5} mb="sm">
        {title}
      </Title>
      {children}
    </Card>
  );
}
