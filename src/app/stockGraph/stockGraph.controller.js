'use strict';

export class StockGraphController {

  /* @ngInject */
  constructor(StockService, $rootScope) {
    this.StockService = StockService;
    this.rootScope = $rootScope;
    this.stockData = [];
  }

  $onInit() {
    this.dismissStockWatch = this.rootScope.$watch(() => {
      return this.selectedStocks;
    }, () => {
      this.updateStockData();
    }, true);

    this.dismissDateFromkWatch = this.rootScope.$watch(() => {
      return this.dateFrom;
    }, () => {
      this.updateStockData();
    }, true);

    this.dismissDateToWatch = this.rootScope.$watch(() => {
      return this.dateTo;
    }, () => {
      this.updateStockData();
    }, true);
  }

  $onDestroy() {
    this.dismissStockWatch();
    this.dismissDateFromkWatch();
    this.dismissDateToWatch();
  }

  updateStockData() {
    this.StockService.getStockData(this.selectedStocks, this.dateFrom, this.dateTo)
        .then(stockData => {
          this.stockData = stockData;
        });
  }
}
