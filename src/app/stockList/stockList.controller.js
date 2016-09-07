'use strict';

export class StockListController {
  removeStock(stock) {
    if (stock) {
      this.onStockRemoved({stock: stock});
    } else {
      this.Notification.warning('Please select stock');
    }
  }
}
