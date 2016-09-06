'use strict';

export class StockSelectController {

  /* @ngInject */
  constructor(StockService) {
    this.StockService = StockService;
    this.stocks = [];
  }

  $onInit() {
    this.StockService.getStockList()
        .then(response => {
          this.stocks = response.data;
        });
  }

  selectStock(selectedStock) {
    if (selectedStock) {
      this.onStockSelected({selectedStock: selectedStock});
    }
  }
}
