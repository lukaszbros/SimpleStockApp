'use strict';

export class StockGraphController {

  /* @ngInject */
  constructor(StockService, $rootScope) {
    this.StockService = StockService;
    this.stockData = [];
    this.rootScope = $rootScope;
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
