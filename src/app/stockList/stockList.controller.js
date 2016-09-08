'use strict';

export class StockListController {

  constructor() {
    this.infoSelectedStock = undefined;
  }

  infoStock(stock) {
    if (this.infoSelectedStock === stock) {
      this.infoSelectedStock = undefined;
    } else {
      this.infoSelectedStock = stock;
    }
  }

  removeStock(stock) {
    if (stock) {
      if (this.infoSelectedStock === stock) {
        this.infoSelectedStock = undefined;
      }

      this.onStockRemoved({stock: stock});
    } else {
      this.Notification.warning('Please select stock');
    }
  }
}
