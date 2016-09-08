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

      this.onStockRemoved({stock: stock});
    } else {
      this.Notification.warning('Please select stock');
    }
  }
}
