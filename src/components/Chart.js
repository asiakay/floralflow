/* import React from 'react';
import { Line } from 'react-chartjs-2';
import { useChart } from '../contexts/ChartContext';
import { Chart } from 'react-google-charts';

export default function GoogleChart() {

  return(
    <Chart
    chartType='BarChart'
    data={[
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7],
    ]}
    options={{
      title: 'My Daily Activities',
      chartArea: { width: '100%' },
      hAxis: {
        title: 'Total Quantity',
        minValue: 0,
      },
      vAxis: {
        title: 'Items',
      },
    }}
    // For tests 
    legendToggle
  />
  );
}

 */