import angular from 'angular';
import {StockGraphController} from './stockGraph.controller';
import common from '../common/common.component';

export default angular.module('app.stockGraph', [common])
  .component('stockGraph', {
    templateUrl: 'app/stockGraph/stockGraph.html',
    controller: StockGraphController,
    controllerAs: 'stockGraph',
    bindings: {
      selectedStocks: '=',
      dateFrom: '=',
      dateTo: '='
    }
  })
  .name;
