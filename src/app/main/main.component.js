import angular from 'angular';
import {MainController} from './main.controller';
import stockSelect from '../stockSelect/stockSelect.component.js';

export default angular.module('app.main', [stockSelect])
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'main'
    })
    .name;
