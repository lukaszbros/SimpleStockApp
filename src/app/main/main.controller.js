'use strict';

export class MainController {

  /* @ngInject */
  constructor(Notification) {
    this.Notification = Notification;
    this.selectedStocks = [];
  }

  stockSelected(stock) {
    if (this.selectedStocks.length === 3) {
      this.Notification.warning('You can only select 3 stocks at a time');
      return;
    }

    if (this.selectedStocks.indexOf(stock) === -1) {
      this.selectedStocks.push(stock);
    } else {
      this.Notification.info('Already selected');
    }
  }

  stockRemoved(stock) {
    const indexOfStock = this.selectedStocks.indexOf(stock);
    if (indexOfStock !== -1) {
      this.selectedStocks.splice(indexOfStock, 1);
    } else {
      this.Notification.info('No stock to remove');
    }
  }
}