import { Chart } from 'chart.js';

export const setChartZoomY = (chart: Chart | null, zoomLevel: ZoomLevel) => {
  if (!chart) {
    return;
  }
  chart.zoomScale('y', { ...zoomLevel }, 'zoom');
};

export const setChartFreeze = (chart: Chart | null, freeze: boolean) => {
  if (!chart) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const xAxis = chart.options.scales?.x as any;
  if (xAxis && xAxis.realtime) {
    xAxis.realtime.pause = freeze;
    chart.update('none');
  }
};

export type ZoomLevel = {
  min: number;
  max: number;
};
