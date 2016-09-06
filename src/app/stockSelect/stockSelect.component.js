import angular from 'angular';
import {StockSelectController} from './stockSelect.controller';
import common from '../common/common.component';

export default angular.module('app.stockSelect', [common])
  .component('stockSelect', {
    templateUrl: 'app/stockSelect/stockSelect.html',
    controller: StockSelectController,
    controllerAs: 'stockSelect'
  })
  .name;
