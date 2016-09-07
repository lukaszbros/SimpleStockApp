'use strict';

export class StockListController {

  constructor() {
    this.infoSelectedStock = undefined;
  }

  infoStock(stock) {
    this.infoSelectedStock = stock;
  }

  removeStock(stock) {
    if (stock) {
      this.onStockRemoved({stock: stock});
    } else {
      this.Notification.warning('Please select stock');
    }
  }
}
