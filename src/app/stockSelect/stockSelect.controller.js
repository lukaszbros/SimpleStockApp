'use strict';

export class StockSelectController {

  /* @ngInject */
  constructor(StockService, Notification) {
    this.StockService = StockService;
    this.Notification = Notification;
    this.stocks = [];
  }

  $onInit() {
    this.StockService.getStockList()
        .then(stocks => {
          this.stocks = stocks;
        });
  }

  selectStock(stock) {
    if (stock) {
      this.onStockSelected({stock});
    } else {
      this.Notification.warning('Please select stock');
    }
  }
}
