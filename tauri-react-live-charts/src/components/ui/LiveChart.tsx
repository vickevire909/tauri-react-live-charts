import { useEffect, useRef } from 'react';
import uPlot, { AlignedData } from 'uplot';
import 'uplot/dist/uPlot.min.css';
import 'uplot/dist/uPlot.iife.min.js';
import { Data } from '../../types/types';

interface Size {
  width: number;
  height: number;
}

interface LiveChartProps {
  data: Data;
}

export const LiveChart = ({ data }: LiveChartProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<uPlot | null>(null);

  const xRef = useRef<number[]>([]);
  const yRef = useRef<number[][]>([]);

  useEffect(() => {
    const plot = new uPlot(
      {
        width: 800,
        height: 200,
        series: [{}, {}],
      },
      [xRef.current, ...yRef.current],
      ref.current!,
    );
    chartRef.current = plot;
    console.log('created chart');
    return () => plot.destroy();
  }, []);

  useEffect(() => {
    // xRef.current.shift();

    xRef.current.push(data.timestamp);

    for (let i = 0; i < data.values.length; i++) {
      if (!yRef.current[i]) {
        yRef.current.push([]);
        const name = `y${i}`;
        chartRef.current?.addSeries({
          label: name,
          auto: true,
          stroke: 'red',
          points: {
            show: false,
          },
        });
        console.log('added series ', name);
      }
      //   yRef.current[i].shift();
      yRef.current[i].push(data.values[i]);
    }
    chartRef.current?.setData([xRef.current, ...yRef.current]);
  }, [data.timestamp, data.values]);

  return <div ref={ref} />;
};

function randomRGBA() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.1})`;
}
