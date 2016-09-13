'use strict';
import angular from 'angular';

export function StockService($http, $q, $filter, Notification) {
  'ngInject';

  let currentStockData = [];

  return {
    getStockList() {
      const request = $q.defer();
      $http.get('/app/common/stocks.json')
          .then(response => {
            request.resolve(response.data);
          }, () => {
            this.Notification.error('Cannot load stocks list');
          });

      return request.promise;
    },

    getStockData(selectedStocks, dateFrom, dateTo) {
      const request = $q.defer();
      if (angular.isArray(selectedStocks) && selectedStocks.length > 0 && angular.isDate(dateFrom) && angular.isDate(dateTo)) {
        const stockSymbols = [];
        angular.forEach(selectedStocks, stock => {
          stockSymbols.push(`"${stock.symbol}"`);
        });

        const query = encodeURIComponent(`select * from yahoo.finance.historicaldata where symbol in (${stockSymbols.join()}) and startDate = "${$filter('date')(dateFrom, 'yyyy-MM-dd')}" and endDate = "${$filter('date')(dateTo, 'yyyy-MM-dd')}"`);
        $http.get(`http://query.yahooapis.com/v1/public/yql?q=${query}&format=json&diagnostics=true&env=http://datatables.org/alltables.env`)
            .then(response => {
              if (response.data && response.data.query && response.data.query.results && response.data.query.results.quote) {
                const stockData = selectedStocks.map(stock => {
                  return {
                    symbol: stock.symbol,
                    values: response.data.query.results.quote
                        .filter(quote => quote.Symbol === stock.symbol)
                        .map(quote => {
                          return {
                            symbol: quote.Symbol,
                            date: new Date(quote.Date),
                            open: Number(quote.Open),
                            close: Number(quote.Close),
                            high: Number(quote.High),
                            low: Number(quote.Low),
                            volume: Number(quote.Volume)
                          };
                        })
                  };
                });

                currentStockData = stockData;
                request.resolve(stockData);
              } else {
                request.resolve([]);
              }
            }, () => {
              Notification.error('Cannot load stock data');
            });
      } else {
        request.resolve([]);
      }

      return request.promise;
    },

    getCurrentStockFor(stockSymbol) {
      return currentStockData.find(stock => stock.symbol === stockSymbol);
    }
  };
}
