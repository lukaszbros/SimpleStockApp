'use strict';

export class StockListController {

  constructor() {
    this.infoSelectedStock = undefined;
    this.stockColor = ['#1f77b4', '#ff7f0e', '#2ca02c'];
  }

  infoStock(stock) {
    if (this.infoSelectedStock === stock) {
      this.infoSelectedStock = undefined;
    } else {
      this.infoSelectedStock = stock;
      this.dataSelectedStock = undefined;
    }
  }

  dataStock(stock) {
    if (this.dataSelectedStock === stock) {
      this.dataSelectedStock = undefined;
    } else {
      this.dataSelectedStock = stock;
      this.infoSelectedStock = undefined;
    }
  }

  removeStock(stock) {
    if (stock) {
      if (this.infoSelectedStock === stock) {
        this.infoSelectedStock = undefined;
      }

      if (this.dataSelectedStock === stock) {
        this.dataSelectedStock = undefined;
      }

      this.onStockRemoved({stock});
    } else {
      this.Notification.warning('Please select stock');
    }
  }
}
