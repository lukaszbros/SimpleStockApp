import angular from 'angular';
import {StockGraphController} from './stockGraph.controller';
import common from '../common/common.component';
import "d3/d3";
import "nvd3/build/nv.d3";
import nvd3 from 'angular-nvd3';

export default angular.module('app.stockGraph', [common, nvd3])
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
