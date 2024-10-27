import { useState } from 'react';
import { useData } from './hooks/useData';
import { LiveChart } from './components/ui/LiveChart';

export const App = () => {
  const [count, setCount] = useState(1);
  const { data, isConnected } = useData({
    url: 'ws://localhost:3000',
    count: count,
  });
  if (!isConnected) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="space-x-2">
        <button
          className="border border-slate-200 bg-slate-200 hover:border-slate-300"
          onClick={() => setCount((prev) => prev + 1)}
        >
          Add Series
        </button>
        <button
          className="border border-slate-200 bg-slate-200 hover:border-slate-300"
          onClick={() => setCount(1)}
        >
          Reset Series
        </button>
      </div>
      {data && (
        <div>
          {data.values.map((value, index) => (
            <div key={index} className="min-w-96">
              <span>
                <strong>{new Date(data.timestamp).toISOString()}</strong>
              </span>
              <span className="ml-4">{value}</span>
            </div>
          ))}
          <LiveChart data={data} />
        </div>
      )}
    </div>
  );
};
