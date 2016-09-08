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
      if (this.stock && this.stock.symbol) {
        return this.StockService.getCurrentStockFor(this.stock.symbol);
      }
    }, currentStock => {
      if (currentStock) {
        this.stockValues = currentStock.values;
      }
    }, true);
  }

  $onDestroy() {
    this.dismissStockWatch();
  }
}
