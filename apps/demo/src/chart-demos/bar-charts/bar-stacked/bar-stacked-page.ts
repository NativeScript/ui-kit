import { NavigatedData, Page } from '@nativescript/core/ui/page';
import { fromObject } from '@nativescript/core/data/observable';

let chartView;
const viewModel = fromObject({
  chartOptions: {
    plotOptions: {
      column: {
        stacking: 'normal',
        borderRadius: 4,
        pointWidth: 30,
        borderWidth: 0,
      },
      series: {
        animation: true,
      },
    },
    boost: {
      enabled: true,
      useGPUTranslations: true,
    },
    chart: {
      scrollablePlotArea: {
        minWidth: 1400,
        scrollPositionX: 1,
      },
      spacingBottom: 30,
      animation: true,
    },
    legend: {
      verticalAlign: 'top',
    },
    yAxis: {
      min: -360,
      max: 360,
      title: {
        text: 'kWh',
      },
      tickAmount: 7,
    },
    title: {
      text: '',
    },
    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: 'column',
        yAxis: 0,
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            enabled: false,
          },
          select: {
            enabled: false,
          },
        },
        pointPadding: 0.01,
        maxPointWidth: 30,
        groupPadding: 0.1,
        name: 'Stroom',
        id: 'Electricity',
        stack: 'verbruik',
        color: '#5FB624',
        data: [
          {
            y: 215,
            selected: false,
            id: '2020-10-05;2020-11-01',
          },
          {
            y: 266,
            selected: false,
            id: '2020-11-01;2020-12-01',
          },
          {
            y: 308,
            selected: false,
            id: '2020-12-01;2021-01-01',
          },
          {
            y: 257,
            selected: false,
            id: '2021-01-01;2021-02-01',
          },
          {
            y: 239,
            selected: false,
            id: '2021-02-01;2021-03-01',
          },
          {
            y: 222,
            selected: false,
            id: '2021-03-01;2021-04-01',
          },
          {
            y: 188,
            selected: false,
            id: '2021-04-01;2021-05-01',
          },
          {
            y: 162,
            selected: false,
            id: '2021-05-01;2021-06-01',
          },
          {
            y: 154,
            selected: false,
            id: '2021-06-01;2021-07-01',
          },
          {
            y: 59,
            selected: false,
            id: '2021-07-01;2021-08-01',
          },
          {
            y: 168,
            selected: false,
            id: '2021-08-01;2021-09-01',
          },
          {
            y: 195,
            selected: false,
            id: '2021-09-01;2021-10-01',
          },
          {
            y: 209,
            selected: false,
            id: '2021-10-01;2021-11-01',
          },
          {
            y: 270,
            selected: false,
            id: '2021-11-01;2021-12-01',
          },
          {
            y: 323,
            selected: false,
            id: '2021-12-01;2022-01-01',
          },
          {
            y: 311,
            selected: false,
            id: '2022-01-01;2022-02-01',
          },
          {
            y: 219,
            selected: false,
            id: '2022-02-01;2022-03-01',
          },
          {
            y: 211,
            selected: false,
            id: '2022-03-01;2022-04-01',
          },
          {
            y: 175,
            selected: false,
            id: '2022-04-01;2022-05-01',
          },
          {
            y: 165,
            selected: false,
            id: '2022-05-01;2022-06-01',
          },
          {
            y: 143,
            selected: false,
            id: '2022-06-01;2022-07-01',
          },
          {
            y: 150,
            selected: false,
            id: '2022-07-01;2022-08-01',
          },
          {
            y: 96,
            selected: false,
            id: '2022-08-01;2022-09-01',
          },
          {
            y: 194,
            selected: false,
            id: '2022-09-01;2022-10-01',
          },
          {
            y: 211,
            selected: false,
            id: '2022-10-01;2022-11-01',
          },
          {
            y: 262,
            selected: false,
            id: '2022-11-01;2022-12-01',
          },
          {
            y: 299,
            selected: false,
            id: '2022-12-01;2023-01-01',
          },
          {
            y: 282,
            selected: true,
            id: '2023-01-01;2023-02-01',
          },
        ],
        allowPointSelect: false,
      },
      {
        type: 'column',
        yAxis: 0,
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            enabled: false,
          },
          select: {
            enabled: false,
          },
        },
        pointPadding: 0.01,
        maxPointWidth: 30,
        groupPadding: 0.1,
        name: 'Teruglevering',
        id: 'ReturnSupply',
        stack: 'verbruik',
        color: '#FFC800',
        data: [
          {
            y: -38,
            selected: false,
            id: '2020-10-05;2020-11-01',
          },
          {
            y: -23,
            selected: false,
            id: '2020-11-01;2020-12-01',
          },
          {
            y: -5,
            selected: false,
            id: '2020-12-01;2021-01-01',
          },
          {
            y: -17,
            selected: false,
            id: '2021-01-01;2021-02-01',
          },
          {
            y: -44,
            selected: false,
            id: '2021-02-01;2021-03-01',
          },
          {
            y: -100,
            selected: false,
            id: '2021-03-01;2021-04-01',
          },
          {
            y: -196,
            selected: false,
            id: '2021-04-01;2021-05-01',
          },
          {
            y: -231,
            selected: false,
            id: '2021-05-01;2021-06-01',
          },
          {
            y: -241,
            selected: false,
            id: '2021-06-01;2021-07-01',
          },
          {
            y: -272,
            selected: false,
            id: '2021-07-01;2021-08-01',
          },
          {
            y: -174,
            selected: false,
            id: '2021-08-01;2021-09-01',
          },
          {
            y: -119,
            selected: false,
            id: '2021-09-01;2021-10-01',
          },
          {
            y: -62,
            selected: false,
            id: '2021-10-01;2021-11-01',
          },
          {
            y: -20,
            selected: false,
            id: '2021-11-01;2021-12-01',
          },
          {
            y: -4,
            selected: false,
            id: '2021-12-01;2022-01-01',
          },
          {
            y: -9,
            selected: false,
            id: '2022-01-01;2022-02-01',
          },
          {
            y: -51,
            selected: false,
            id: '2022-02-01;2022-03-01',
          },
          {
            y: -149,
            selected: false,
            id: '2022-03-01;2022-04-01',
          },
          {
            y: -198,
            selected: false,
            id: '2022-04-01;2022-05-01',
          },
          {
            y: -256,
            selected: false,
            id: '2022-05-01;2022-06-01',
          },
          {
            y: -268,
            selected: false,
            id: '2022-06-01;2022-07-01',
          },
          {
            y: -255,
            selected: false,
            id: '2022-07-01;2022-08-01',
          },
          {
            y: -257,
            selected: false,
            id: '2022-08-01;2022-09-01',
          },
          {
            y: -135,
            selected: false,
            id: '2022-09-01;2022-10-01',
          },
          {
            y: -71,
            selected: false,
            id: '2022-10-01;2022-11-01',
          },
          {
            y: -22,
            selected: false,
            id: '2022-11-01;2022-12-01',
          },
          {
            y: -9,
            selected: false,
            id: '2022-12-01;2023-01-01',
          },
          {
            y: -14,
            selected: true,
            id: '2023-01-01;2023-02-01',
          },
        ],
        allowPointSelect: false,
      },
    ],
    xAxis: {
      categories: ['okt', 'nov', 'dec', 'jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec', 'jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec', 'jan'],
      labels: {
        padding: 0,
      },
    },
    exporting: {
      enabled: false,
    },
  },
});

export function chartViewLoaded(args) {
  chartView = args.object;
  chartView.setOptions(viewModel.get('chartOptions'));
}

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;

  if (args.isBackNavigation) return;

  page.bindingContext = viewModel;
}

export function goBack(args) {
  args.object.page.frame.goBack();
}
