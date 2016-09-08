import angular from 'angular';
import {StockGraphService} from './stockGraph.service';
import {d3Graph} from './stockGraph.directive';
import {StockGraphController} from './stockGraph.controller';
import common from '../common/common.component';
import "d3/d3";
import "nvd3/build/nv.d3";
import nvd3 from 'angular-nvd3';

export default angular.module('app.stockGraph', [common, nvd3])
  //.factory('StockGraphService', StockGraphService)
  //.directive('d3Graph', d3Graph)
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
