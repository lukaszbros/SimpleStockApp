import angular from 'angular';
import {MainController} from './main.controller';
import dateSelect from '../dateSelect/dateSelect.component.js';
import stockSelect from '../stockSelect/stockSelect.component.js';
import stockList from '../stockList/stockList.component.js';
import stockGraph from '../stockGraph/stockGraph.component';

export default angular.module('app.main', [stockSelect, stockList, dateSelect, stockGraph])
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'main'
    })
    .name;
