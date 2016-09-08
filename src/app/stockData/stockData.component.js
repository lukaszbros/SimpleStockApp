import angular from 'angular';
import {StockDataController} from './stockData.controller';
import common from '../common/common.component';

export default angular.module('app.stockData', [common])
  .component('stockData', {
    templateUrl: 'app/stockData/stockData.html',
    controller: StockDataController,
    controllerAs: 'stockData',
    bindings: {
      stock: '='
    }
  })
  .name;
