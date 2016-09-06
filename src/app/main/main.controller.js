'use strict';

export class MainController {

  /* @ngInject */
  constructor(Notification) {
    this.Notification = Notification;
    this.selectedStocks = [];
  }

  stockSelected(selectedStock) {
    if (this.selectedStocks.indexOf(selectedStock) === -1) {
      this.selectedStocks.push(selectedStock);
    } else {
      this.Notification.info('Already selected');
    }
  }
}