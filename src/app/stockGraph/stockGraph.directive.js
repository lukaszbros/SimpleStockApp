'use strict';

export function d3Graph($window, $timeout, StockGraphService) {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      data: '=',
      label: '@',
      onClick: '&'
    },
    link: function (scope, ele, attrs) {
      StockGraphService.d3().then(function (d3) {
        var renderTimeout;
        var margin = parseInt(attrs.margin) || 20;

        var svg = d3.select(ele[0])
            .append('svg');

        $window.onresize = function () {
          scope.$apply();
        };

        scope.$watch(function () {
          return angular.element($window)[0].innerWidth;
        }, function () {
          scope.render(scope.data);
        });

        scope.$watch('data', function (newData) {
          scope.render(newData);
        }, true);

        scope.render = function (data) {
          svg.selectAll('*').remove();
          if (!data || data.length === 0) return;
          if (renderTimeout) clearTimeout(renderTimeout);

          renderTimeout = $timeout(function () {
            let minValue = data[0].values[0].close,
                maxValue = data[0].values[0].close;
            angular.forEach(data[0].values, stockData => {
              if (stockData.close < minValue) {
                minValue = stockData.close
              }

              if (stockData.close > maxValue) {
                maxValue = stockData.close
              }
            });

            let margin = {top: 20, right: 20, bottom: 20, left: 20},
                width = ele[0].getBoundingClientRect().width - margin.left - margin.right,
                height = ele[0].getBoundingClientRect().height - margin.top - margin.bottom;

            let x = d3.scaleTime().domain([data[0].values[0].date, data[0].values[data[0].values.length-1].date]).range([0, width]);
            let y = d3.scaleLinear().domain([minValue, maxValue]).range([height, 0]);

            // Define the axes
            let xAxis = d3.axisBottom(x)
                .tickFormat(d3.timeFormat('%m-%d'));
            let yAxis = d3.axisLeft(y)
                .tickSize(1)
                .ticks(6)
                .tickFormat(d3.format(",.0f"));

            let line = d3.line()
                .x(function(d) {
                  return x(d.date);
                })
                .y(function(d) {
                  return y(d.close);
                });

            // Add the X Axis
            svg.append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
                .call(xAxis);

            // Add the Y Axis
            svg.append('g')
                .attr('class', 'axis axis-y')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
                .call(yAxis)
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '0.71em')
                .attr('fill', '#000')
                .text('Close price $');

            svg.append('svg:path')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
                .datum(data[0].values)
                .attr('class', 'line')
                .attr('fill', 'none')
                .attr('stroke', '#000')
                .attr('d', line);
          }, 0);
        };
      });
    }
  }
}