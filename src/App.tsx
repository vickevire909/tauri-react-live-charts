import Chart from 'chart.js/auto';
import StreamingPlugin from '@robloche/chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';
import { StreamingLineChart } from './components/ui/StreamingLineChart';

Chart.register(StreamingPlugin);

export const App = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-800 text-slate-100">
      <div className="flex flex-col">
        <StreamingLineChart />
      </div>
    </div>
  );
};
