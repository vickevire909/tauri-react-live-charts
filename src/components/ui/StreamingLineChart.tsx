import { Chart, ChartConfiguration } from 'chart.js';
import { useCallback, useEffect, useRef } from 'react';
import { setChartFreeze, setChartZoomY, ZoomLevel } from './lib';

type StreamingChartProps = {
  onDataPointAdded: () => void;
  freeze: boolean;
  zoomLevel: ZoomLevel;
};
export const StreamingLineChart = ({
  onDataPointAdded,
  freeze,
  zoomLevel,
}: StreamingChartProps) => {
  const chartDomRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const createChart = useCallback(() => {
    if (!chartDomRef.current) {
      return;
    }
    const ctx = chartDomRef.current!.getContext('2d')!;
    const chartOptions: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'signalA',
            backgroundColor: 'rgba(222, 24, 162, 0.99)',
            borderColor: 'rgba(222, 24, 162, 0.99)',
            fill: false,
            data: [],
            yAxisID: 'y',
          },
        ],
      },
      options: {
        plugins: {
          decimation: {
            enabled: true,
            algorithm: 'min-max',
            threshold: 1000,
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            limits: {
              x: {
                min: 0, //Date.now(),
                max: 100, //Date.now() + 1000 * 60 * 60,
                minRange: 1000 * 60,
              },
              y: {
                min: 0,
                max: 2,
                minRange: 0.001,
              },
            },
            zoom: {
              wheel: {
                enabled: false,
              },
              pinch: {
                enabled: false,
              },

              mode: 'xy',
            },
          },
        },
        datasets: {
          line: {
            borderWidth: 0.5,
            tension: 0,
            stepped: false,
            borderDash: [],
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        parsing: false,
        normalized: true,
        spanGaps: true,
        maintainAspectRatio: false,
        animation: false,
        responsive: true,
        resizeDelay: 500,
        scales: {
          x: {
            type: 'realtime',
            ticks: {
              minRotation: 30,
              maxRotation: 30,
              sampleSize: 1,
            },
            realtime: {
              delay: 250,
              refresh: 50,
              frameRate: 144,
              ttl: 600_000,
              pause: false,
              duration: 120_000,
              onRefresh: (chart: Chart) => {
                chart.data.datasets.forEach((dataset) => {
                  const dt = Date.now();

                  dataset.data.push({
                    x: dt,
                    y: Math.random(),
                  });
                  onDataPointAdded();
                });
              },
            },
          },
          y: {
            type: 'linear',
            min: 0,
            max: 1,
          },
        },
      },
    };

    const chart = new Chart(ctx, chartOptions);
    chartInstanceRef.current = chart;
    console.log('chart created');
  }, [onDataPointAdded]);

  const destroyChart = useCallback(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
      console.log('chart destroyed');
    }
  }, []);

  useEffect(() => {
    createChart();
    return () => destroyChart();
  }, [createChart, destroyChart, onDataPointAdded]);

  useEffect(() => {
    const chart = chartInstanceRef.current;
    setChartFreeze(chart, freeze);
  }, [freeze]);

  useEffect(() => {
    const chart = chartInstanceRef.current;
    setChartZoomY(chart, zoomLevel);
  }, [zoomLevel]);

  return (
    <div className="min-h-60 w-full">
      <canvas ref={chartDomRef}></canvas>
    </div>
  );
};
