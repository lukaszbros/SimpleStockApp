'use strict';

export class StockDataController {

  /* @ngInject */
  constructor($rootScope, StockService) {
    this.rootScope = $rootScope;
    this.StockService = StockService;
    this.stockValues = [];
  }

  $onInit() {
    this.dismissStockWatch = this.rootScope.$watch(() => {
      return this.stock;
    }, () => {
      this.updateStockData();
    }, true);
  }

  $onDestroy() {
    this.dismissStockWatch();
  }

  updateStockData() {
    if (this.stock && this.stock.symbol) {
      let data = this.StockService.getCurrentStockFor(this.stock.symbol);
      if (data && data.values) {
        this.stockValues = data.values;
      }
    }
  }
}
