import { ChangeEvent, useState } from 'react';

type SliderProps = {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  onChange: (newValue: number) => void;
};

export const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  initialValue = 50,
  onChange,
}: SliderProps) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setValue(newValue);
    onChange(newValue);
  };
  const reset = () => {
    setValue(initialValue);
    onChange(initialValue);
  };

  return (
    <div className="mx-auto w-full max-w-xs">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        onDoubleClick={reset}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      />
      <div className="mt-2 flex justify-between">
        <span className="text-sm text-gray-500">{min}</span>
        <span className="text-sm font-bold text-blue-500">{value}</span>
        <span className="text-sm text-gray-500">{max}</span>
      </div>
    </div>
  );
};
