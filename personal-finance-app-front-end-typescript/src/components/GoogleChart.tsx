import React from 'react';
import { Chart } from 'react-google-charts';
import { GoogleChartProps } from '../interfaces/GoogleChartProps';


function GoogleChart(chartProps: GoogleChartProps) {
  return (
    <Chart chartType={chartProps.chartType} data={chartProps.data} options={chartProps.options}/>  )
}

export default GoogleChart