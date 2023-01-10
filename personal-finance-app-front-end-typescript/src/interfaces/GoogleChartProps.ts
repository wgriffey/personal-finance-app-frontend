import { GoogleChartOptions, GoogleChartWrapperChartType } from 'react-google-charts';

export interface GoogleChartProps{
    chartType: GoogleChartWrapperChartType;
    data: [[string|number, string|number]];
    options: GoogleChartOptions;
}