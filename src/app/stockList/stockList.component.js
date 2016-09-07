import angular from 'angular';
import {StockListController} from './stockList.controller';

export default angular.module('app.stockList', [])
  .component('stockList', {
    templateUrl: 'app/stockList/stockList.html',
    controller: StockListController,
    controllerAs: 'stockList',
    bindings: {
      selectedStocks: '=',
      onStockRemoved: '&'
    }
  })
  .name;
