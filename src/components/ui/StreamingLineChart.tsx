import { Chart } from 'chart.js';
import { useEffect, useRef, useState } from 'react';

export const StreamingLineChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart>();
  useEffect(() => {
    const ctx = chartRef.current!.getContext('2d')!;
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'signalA',
            backgroundColor: 'rgba(222, 24, 162, 0.69)',
            borderColor: 'rgba(222, 24, 162, 0.69)',
            fill: false,
            data: [],
            pointRadius: 0.5,
            borderWidth: 0.5,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        animation: false,
        responsive: true,
        resizeDelay: 500,
        scales: {
          x: {
            type: 'realtime',
            realtime: {
              delay: 1000,
              refresh: 1000,
              frameRate: 144,
              ttl: 600_000,
              duration: 60_000,
              onRefresh: (chart) => {
                chart.data.datasets.forEach((dataset) => {
                  dataset.data.push({
                    x: Date.now(),
                    y: Math.random(),
                  });
                });
              },
            },
          },
        },
      },
    });
    setChart(chart);
    return () => chart.destroy();
  }, []);

  return <canvas ref={chartRef}></canvas>;
};
