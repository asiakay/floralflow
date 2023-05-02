import React, { useEffect, useRef } from 'react'; // Import React, useEffect and useRef
import Chart from 'chart.js/auto'; // Import chart.js


const ChartComponent = ({ type, data, options, width, height }) => {
    const chartRef = useRef(null); // Reference to the canvas element
  
    useEffect(() => {
      if (chartRef.current) { // Check if the chartRef is not null
        const chart = new Chart(chartRef.current, { // Create the chart
          type, // Set the chart type
          data, // Set the chart data
          options: {// Set the chart options
            responsive: true, // Make the chart responsive
            maintainAspectRatio: false, // Don't maintain the aspect ratio
            indexAxis: 'y', // Set the index axis to the y axis
            scales: { // Configure the scales
              x: { // Configure the x axis
                title: { // Configure the x axis title
                  display: true, // Show the title
                  text: 'Quantity in Stock', // Set the title text
                  color: '#000000', // Set the title color
                }, // End of the x axis title configuration section
              }, // End of the x axis configuration section
              y: { // Configure the y axis
                title: { // Configure the y axis title
                  display: true, // Show the title
                  text: 'Item Name', // Set the title text
                  color: '#000000', // Set the title color
                }, // End of the y axis title configuration section
              }, // End of the y axis configuration section
            }, // End of the scales configuration section
          }, // End of the chart options
        }); // End of the chart creation
  
        return () => { // This is the cleanup function
          chart.destroy(); // Destroy the chart before unmounting
        }; // End of the cleanup function
      } // End of the if statement
    }, [type, data, options]); // End of the useEffect dependencies array
  
    return <canvas 
    ref={chartRef} // Pass the chartRef to the canvas element
    width={width}  // Set the canvas width
    height={height} // Set the canvas height
    />; // End of the canvas element
  }; // End of the ChartComponent function
  
  
    export default ChartComponent; // Export the ChartComponent component