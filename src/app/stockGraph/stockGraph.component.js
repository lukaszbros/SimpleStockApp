import angular from 'angular';
import {StockGraphService} from './stockGraph.service';
import {d3Graph} from './stockGraph.directive';
import {StockGraphController} from './stockGraph.controller';
import common from '../common/common.component';

export default angular.module('app.stockGraph', [common])
  .factory('StockGraphService', StockGraphService)
  .directive('d3Graph', d3Graph)
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
