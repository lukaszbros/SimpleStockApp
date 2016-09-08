'use strict';
import * as d3 from "d3";

export function StockGraphService($rootScope, $timeout, $q) {
  'ngInject';

  let d = $q.defer();
  $timeout(() => {
    console.log(d3);
    $rootScope.$apply(function() { d.resolve(d3); });
  }, 0);

  return {
    d3: () => { return d.promise; }
  };
}
