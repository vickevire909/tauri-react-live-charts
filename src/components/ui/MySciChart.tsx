import { EAxisType, EChart2DModifierType, ESeriesType } from 'scichart';
import { SciChartReact } from 'scichart-react';

type MySciChartProps = {};

export const MySciChart = (props: MySciChartProps) => {
  return (
    <SciChartReact
      style={{ width: 800, height: 600 }}
      config={{
        xAxes: [{ type: EAxisType.NumericAxis }],
        yAxes: [{ type: EAxisType.NumericAxis }],
        series: [
          {
            type: ESeriesType.SplineMountainSeries,
            options: {
              fill: '#3ca832',
              stroke: '#eb911c',
              strokeThickness: 4,
              opacity: 0.4,
            },
            xyData: { xValues: [1, 2, 3, 4], yValues: [1, 4, 7, 3] },
          },
        ],
        modifiers: [
          { type: EChart2DModifierType.ZoomPan, options: { enableZoom: true } },
          { type: EChart2DModifierType.MouseWheelZoom },
          { type: EChart2DModifierType.ZoomExtents },
        ],
      }}
    />
  );
};
