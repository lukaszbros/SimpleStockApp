import angular from 'angular';
import stockDetails from '../stockDetails/stockDetails.component';
import stockData from '../stockData/stockData.component';
import {StockListController} from './stockList.controller';

export default angular.module('app.stockList', [stockDetails, stockData])
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
