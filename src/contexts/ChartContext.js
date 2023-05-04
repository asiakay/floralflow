import { createContext } from 'react';

const ChartContext = createContext({
  chartData: null,
  setChartData: () => {},
  setData: () => {},
});

export default ChartContext;
// Compare this snippet from src/contexts/ChartContext.js: