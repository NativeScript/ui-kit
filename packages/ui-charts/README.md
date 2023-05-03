# @nativescript/ui-charts

Highcharts SDK for NativeScript


## Usage

```bash
npm install @nativescript/ui-charts
```

The best way to explore the usage of the plugin is to inspect the demo app in the plugin's root folder. 
In `apps/demo` folder you can find the usage of the plugin for TypeScript non-Angular application. Refer to `apps/demo/src/chart-demos` for different chart types.
	
```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
  xmlns:ui="@nativescript/ui-charts">
  <GridLayout>
    <ui:UIChartsView options="{{ chartOptions }}" />
  </GridLayout>
</Page>
```

The `chartOptions` is a HICharts options object,
refer to https://www.highcharts.com/demo/ for inspiration, and also checkout https://api.highcharts.com/highcharts/ for API reference

## License

Apache License Version 2.0
