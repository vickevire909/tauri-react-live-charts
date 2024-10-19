import Chart from 'chart.js/auto';
import StreamingPlugin from '@robloche/chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';
import { StreamingLineChart } from './components/ui/StreamingLineChart';
import { useCallback, useState } from 'react';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Slider } from './components/ui/Slider';
import { ZoomLevel } from './components/ui/lib';

Chart.register(zoomPlugin);
Chart.register(StreamingPlugin);

export const App = () => {
  const [count, setCount] = useState(0);
  const handleDataPointAdded = useCallback(() => setCount((prev) => prev + 1), []);
  const [freeze, setFreeze] = useState(false);
  const toggleFreeze = () => setFreeze((prev) => !prev);
  const arr = Array.from({ length: 20 }, (_v, i) => i);
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>({ min: 0, max: 2 });

  const calculateZoom = useCallback(
    (sliderValue: number): ZoomLevel => {
      const minZoom = 0.002;
      const maxZoom = 2;
      const zoomRange = minZoom + (maxZoom - minZoom) * (1 - sliderValue / 100);
      const center = (zoomLevel.min + zoomLevel.max) / 2;
      const newYMin = Math.max(0, center - zoomRange / 2);
      const newYMax = Math.min(100, center + zoomRange / 2);
      return { min: newYMin, max: newYMax };
    },
    [zoomLevel],
  );

  const handleSliderChange = (newValue: number) => {
    const newZoomLevel = calculateZoom(newValue);
    setZoomLevel(newZoomLevel);
  };

  return (
    <div className="bg-slate-800 text-slate-100">
      <div className="flex justify-center gap-5 space-x-4">
        <h1 className="w-fit bg-slate-900 p-2">Number of Points added: {count}</h1>
        <button
          onClick={toggleFreeze}
          className="border border-slate-900 bg-slate-900 p-2 hover:bg-slate-800"
        >
          Freeze
        </button>
      </div>
      <div className="flex flex-col items-center justify-between">
        <div className="w-full">
          <Slider min={0} max={100} step={1} initialValue={0} onChange={handleSliderChange} />
        </div>
        {arr.map((i) => (
          <StreamingLineChart
            key={i}
            onDataPointAdded={handleDataPointAdded}
            freeze={freeze}
            zoomLevel={zoomLevel}
          />
        ))}
      </div>
    </div>
  );
};
