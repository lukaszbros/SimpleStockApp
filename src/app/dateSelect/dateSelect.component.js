import angular from 'angular';
import 'angular-bootstrap/ui-bootstrap-tpls.min';

export default angular.module('app.dateSelect', ['ui.bootstrap'])
  .component('dateSelect', {
    templateUrl: 'app/dateSelect/dateSelect.html',
    controllerAs: 'dateSelect',
    bindings: {
      dateFrom: '=',
      dateTo: '='
    }
  })
  .name;
