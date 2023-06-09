import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedUiCharts } from '@demo/shared';
import {} from '@nativescript/ui-charts';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedUiCharts {
  selectedType = 'Line';
  chartTypes = [
    { type: 'Line', onSelectCategory: this.onSelectCategory.bind(this) },
    { type: 'Area', onSelectCategory: this.onSelectCategory.bind(this) },
    { type: 'Bar', onSelectCategory: this.onSelectCategory.bind(this) },
    { type: 'Column', onSelectCategory: this.onSelectCategory.bind(this) },
    { type: '3D', onSelectCategory: this.onSelectCategory.bind(this) },
    { type: 'Tests', onSelectCategory: this.onSelectCategory.bind(this) },
  ];
  lineChart = [
    {
      name: 'Basic Line Chart (async data)',
      route: './chart-demos/line-charts/basic-line/basic-line-page',
    },
    {
      name: 'With Data Labels',
      route: './chart-demos/line-charts/with-data-labels/with-data-labels-page',
    },
    {
      name: 'Time data with irregular intervals (styled)',
      route: './chart-demos/line-charts/spline-irregular-time/spline-irregular-time-page',
    },
  ];
  areaChart = [
    {
      name: 'Basic Area Chart',
      route: './chart-demos/area-charts/basic-area/basic-area-page',
    },
    {
      name: 'Stacked Area Chart',
      route: './chart-demos/area-charts/area-stacked/area-stacked-page',
    },
    {
      name: 'Area Range Chart',
      route: './chart-demos/area-charts/area-ranged/area-ranged-page',
    },
    {
      name: 'Percentage Area Chart',
      route: './chart-demos/area-charts/area-stacked-percent/area-stacked-percent-page',
    },
    {
      name: 'Area Spline Chart',
      route: './chart-demos/area-charts/area-spline/area-spline-page',
    },
  ];
  barChart = [
    {
      name: 'Basic Bar Chart',
      route: './chart-demos/bar-charts/basic-bar/basic-bar-page',
    },
    {
      name: 'Stacked Bar Chart',
      route: './chart-demos/bar-charts/bar-stacked/bar-stacked-page',
    },
    {
      name: 'Bar With Negative Stack Chart',
      route: './chart-demos/bar-charts/bar-negative-stack/bar-negative-stack-page',
    },
  ];
  columnChart = [
    {
      name: 'Basic Column Chart',
      route: './chart-demos/column-charts/basic-column/basic-column-page',
    },
    {
      name: 'Stacked Column Chart',
      route: './chart-demos/column-charts/column-stacked/column-stacked-page',
    },
  ];
  '3dChart' = [
    {
      name: '3D Column Chart',
      route: './chart-demos/3d-charts/3d-column/3d-column-page',
    },
    {
      name: '3D Column Chart with Stacking and Grouping',
      route: './chart-demos/3d-charts/3d-column-sg/3d-column-sg-page',
    },
    // doesn't render currently
    // {
    //   name: '3D Cylinder Chart',
    //   route: './chart-demos/3d-charts/3d-cylinder/3d-cylinder-page',
    // },
    {
      name: '3D Donut Chart',
      route: './chart-demos/3d-charts/3d-donut/3d-donut-page',
    },
    {
      name: '3D Pie Chart',
      route: 'demos/3d-charts/3d-pie/3d-pie-page',
    },
    // doesn't render currently
    // {
    //   name: '3D Pyramid Chart',
    //   route: './chart-demos/3d-charts/3d-pyramid/3d-pyramid-page',
    // },

    // TODO: implement dragging
    {
      name: '3D Scatter Chart',
      route: './chart-demos/3d-charts/3d-scatter-draggable/3d-scatter-draggable-page',
    },
  ];
  testsChart = [
    {
      name: 'Dynamic Chart Height',
      route: './chart-demos/tests/dynamic-chart-height/dynamic-chart-height-page',
    },
  ];
  selectedSource = this.lineChart;
  onItemTap(args) {
    const demo = this.selectedSource[args.index];
    args.object.page.frame.navigate(demo.route);
  }
  onSelectCategory(args) {
    const chartType = args.object.text.toLowerCase() + 'Chart';

    if (this[chartType]) {
      console.log('selected chart type:', `${args.object.text}`);
      this.set('selectedType', `${args.object.text}`);
      this.set('selectedSource', this[chartType]);
    } else {
      console.log('Chart type', chartType, 'not implemented');
    }
  }
}
