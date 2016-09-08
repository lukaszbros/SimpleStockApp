'use strict';

export function StockService($http, $q, $filter, Notification) {
  'ngInject';

  return {
    getStockList() {
      let request = $q.defer();
      $http.get('/app/common/stocks.json')
        .then((response) => {
          request.resolve(response.data);
        }, () => {
          this.Notification.error('Cannot load stocks list');
        });

      return request.promise;
    },

    getStockData(selectedStocks, dateFrom, dateTo) {
      let request = $q.defer();
      if (angular.isArray(selectedStocks) && selectedStocks.length > 0 && angular.isDate(dateFrom) && angular.isDate(dateTo)) {
        let stockSymbols = [];
        angular.forEach(selectedStocks, stock => {
          stockSymbols.push(`"${stock.symbol}"`);
        });

        const query = encodeURIComponent(`select * from yahoo.finance.historicaldata where symbol in (${stockSymbols.join()}) and startDate = "${$filter('date')(dateFrom,'yyyy-MM-dd')}" and endDate = "${$filter('date')(dateTo,'yyyy-MM-dd')}"`);
        $http.get(`http://query.yahooapis.com/v1/public/yql?q=${query}&format=json&diagnostics=true&env=http://datatables.org/alltables.env`)
          .then((response) => {
            if (response.data && response.data.query && response.data.query.results && response.data.query.results.quote) {
              request.resolve(response.data.query.results.quote);
            } else {
              request.resolve([]);
            }
          },() => {
            Notification.error('Cannot load stock data');
          });
      } else {
        request.resolve([]);
      }

      return request.promise;
    }
  };
}
