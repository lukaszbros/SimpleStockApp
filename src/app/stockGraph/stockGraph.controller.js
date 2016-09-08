'use strict';

export class StockGraphController {

  /* @ngInject */
  constructor(StockService, $rootScope) {
    this.StockService = StockService;
    this.rootScope = $rootScope;
    this.stockData = [];
    this.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin : {
          top: 20,
          right: 50,
          bottom: 40,
          left: 55
        },
        x: function(d){ return d.date; },
        y: function(d){ return d.close; },
        xAxis: {
          axisLabel: 'Date',
          tickFormat: function (d) {
            return d3.time.format("%Y-%m-%d")(new Date(d))
          }
        },
        yAxis: {
          axisLabel: 'Stock price ($)',
          tickFormat: function(d){
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        },
        tooltip: {
          contentGenerator: function (e) {
            var series = e.series[0];
            console.log(e);
            if (series.value === null) return;

            var rows =
                "<tr>" +
                "<td class='key'>" + 'Date: ' + "</td>" +
                "<td class='x-value'>" + e.value.toISOString().slice(0,-14) + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td class='key'>" + 'Close: ' + "</td>" +
                "<td class='x-value'><strong>$" + (series.value?series.value.toFixed(2):0) + "</strong></td>" +
                "</tr>" +
                "<tr>" +
                "<td class='key'>" + 'High: ' + "</td>" +
                "<td class='x-value'><strong>$" + (e.point.high?e.point.high.toFixed(2):0) + "</strong></td>" +
                "</tr>" +
                "<tr>" +
                "<td class='key'>" + 'Low: ' + "</td>" +
                "<td class='x-value'><strong>$" + (e.point.low?e.point.low.toFixed(2):0) + "</strong></td>" +
                "</tr>" +
                "<tr>" +
                "<td class='key'>" + 'Volume: ' + "</td>" +
                "<td class='x-value'><strong>" + (e.point.volume?e.point.volume:0) + "</strong></td>" +
                "</tr>";

            var header =
                "<thead>" +
                "<tr>" +
                "<td class='legend-color-guide'><div style='background-color: " + series.color + ";'></div></td>" +
                "<td class='key'><strong>" + series.key + "</strong></td>" +
                "</tr>" +
                "</thead>";

            return "<table>" +
                header +
                "<tbody>" +
                rows +
                "</tbody>" +
                "</table>";
          }
        }
      },
    };
  }

  $onInit() {
    this.rootScope.$watch(() => {
      return this.selectedStocks;
    }, () => {
      this.updateStockData();
    }, true);
  }

  updateStockData() {
    this.StockService.getStockData(this.selectedStocks, this.dateFrom, this.dateTo)
        .then(stockData => {
          this.stockData = stockData;
        });
  }
}
