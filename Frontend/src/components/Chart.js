import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries
} from 'react-vis';

class Chart extends Component {
  render() {
    return (
      <div className="chart">
        <XYPlot width={550} height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineMarkSeries
            className="linemark-series"
            curve={'curveMonotoneX'}
            data={[{ x: 1, y: 11 }, { x: 1.5, y: 30 }, { x: 2.5, y: 15 },
            { x: 3, y: 22 }, { x: 5, y: 18 }, { x: 8, y: 32 }, { x: 10, y: 45 }, { x: 12, y: 35 }]}
          />
        </XYPlot>
      </div>
    );
  }
}

export default Chart;