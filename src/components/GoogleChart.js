import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Chart } from 'react-google-charts';
import { db } from '../lib/firebase';
import ChartContext from '../contexts/ChartContext'; // Import ChartContext properly
import randomColor from 'randomcolor';

function GoogleChart() {
  const { setData } = useContext(ChartContext);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsCollection = collection(db, 'items');
        const itemSnaphot = await getDocs(itemsCollection);
        const itemsList = itemSnaphot.docs.map(doc => {
          return {
          id: doc.id,
          name: doc.data().name.trim(),
          description: doc.data().description,
          quantity: doc.data().quantity,
          price: doc.data().price,
          createdAt: doc.data().createdAt
            ? doc.data().createdAt.toDate()
            : null,
          updatedAt:
            doc.data().updatedAt && doc.data().updatedAt.toDate
              ? doc.data().updatedAt.toDate()
              : null,
          };
        });

        const colors = randomColor({
          count: itemsList.length,
          format: 'rgb',
          luminosity: 'light',

        });

        const itemsListWithColors = itemsList.map((item, index) => ({
          ...item,
          backgroundColor: colors[index],
        }));

        setChartData(itemsListWithColors);

        const totalQuantity = itemsList.reduce((total, item) => {
          return total + item.quantity;
        }, 0);

        const itemData = itemsListWithColors.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          backgroundColor: itemData.map((item) => item.backgroundColor),
        }));

        setData({
          labels: itemData.map(item => item.name),
          datasets: [{
              label: 'Quantity',
              data: itemData.map(item => item.quantity),
              backgroundColor: itemData.map(
                (item) => chartData
                .find((dataItem) => dataItem
                .name === item
                .name)?.backgroundColor 
                || colors[0]
              ),
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            }],
          total: totalQuantity,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [setData, chartData]);

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  const chartDataFormatted = [
    ['Item', 'Quantity'],
    ...chartData.map((item) => [item.name, Number(item.quantity)]) // Convert quantity to number type
  ];

  const chartOptions = {
    title: 'Quantity of Items',
    subtitle: 'Quantity of Items',
    chartArea: { width: '50%' },
    fontSize: 16,
    legend: { position: 'none' },
    hAxis: {
      title: 'Quantity',
      minValue: 0,
    },
    vAxis: {
      title: '',
    },
    bars: 'horizontal',
    axes: {
      y: {
        0: { side: 'right' },
      },
    },
    series: chartDataFormatted.map((item) => ({
      color: chartData.find((dataItem) => dataItem.name === item[0])?.backgroundColor,
    })),
  };



  return (
    <ChartContext.Provider value={{ chartData, setChartData, setData }}>
      <Chart
        chartType="BarChart"
        data={chartDataFormatted}
        options={chartOptions}
        width="100%"
        height="100%"
      />
    </ChartContext.Provider>
  );
}

export default GoogleChart;
//