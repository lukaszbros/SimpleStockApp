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
        .then(response => {
          this.stocks = response.data;
        });
  }

  selectStock(selectedStock) {
    if (selectedStock) {
      this.onStockSelected({selectedStock: selectedStock});
    } else {
      this.Notification.warning('Please select stock');
    }
  }
}
