import { useCallback, useState } from 'react';
import { Slider } from './components/ui/Slider';
import { ChartBuilder, MySciChart } from './components/ui/MySciChart';
import { chartBuilder, ISciChartSurfaceBase } from 'scichart';

export const App = () => {
  const [count, setCount] = useState(0);
  const [freeze, setFreeze] = useState(false);
  const toggleFreeze = () => setFreeze((prev) => !prev);
  const arr = Array.from({ length: 20 }, (_v, i) => i);

  const handleSliderChange = (newValue: number) => {};

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
        <MySciChart />
      </div>
    </div>
  );
};
