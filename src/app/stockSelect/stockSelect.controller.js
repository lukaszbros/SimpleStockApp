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
          console.log(response);
          this.stocks = response.data;
        });
  }
}
