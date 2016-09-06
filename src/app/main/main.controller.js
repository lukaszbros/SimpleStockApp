'use strict';

export class MainController {

  constructor() {
    this.selectedStocks = [];
  }

  stockSelected(selectedStock) {
    console.log(selectedStock);
  }
}