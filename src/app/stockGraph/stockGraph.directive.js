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
            let margin = {top: 20, right: 20, bottom: 20, left: 40},
                width = ele[0].getBoundingClientRect().width - margin.left - margin.right,
                height = ele[0].getBoundingClientRect().height - margin.top - margin.bottom;

            let minDate = d3.min(data, stock => { return d3.min(stock.values, value => { return value.date; }); });
            let maxDate = d3.max(data, stock => { return d3.max(stock.values, value => { return value.date; }); });
            let minValue = d3.min(data, stock => { return d3.min(stock.values, value => { return value.close; }); });
            let maxValue = d3.max(data, stock => { return d3.max(stock.values, value => { return value.close; }); });
            const x = d3.scaleTime().domain([minDate, maxDate]).range([width, 0]);
            const y = d3.scaleLinear().domain([minValue, maxValue]).range([height, 0]);
            const z = d3.scaleOrdinal(d3.schemeCategory10).domain(data.map(stock => { return stock.symbol; }));

            // Define the axes
            let xAxis = d3.axisBottom(x)
                .tickFormat(d3.timeFormat('%m-%d'));
            let yAxis = d3.axisLeft(y)
                .tickSize(1)
                .ticks(6)
                .tickFormat(d3.format(",.2f"));

            let line = d3.line()
                .x(function(d) {
                  return x(d.date);
                })
                .y(function(d) {
                  return y(d.close);
                });

            // Add the X Axis
            const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            g.append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', `translate(0, ${height})`)
                .call(xAxis);

            // Add the Y Axis
            g.append('g')
                .attr('class', 'axis axis-y')
                .call(yAxis)
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '0.71em')
                .attr('fill', '#000')
                .text('Close price $');

            const stock = g.selectAll(".stock")
                .data(data)
                .enter().append("g")
                .attr("class", "stock");

            stock.append('path')
                .attr('class', 'line')
                .attr('fill', 'none')
                .attr("stroke", stock => { return z(stock.symbol); })
                .attr('d', stock => { return line(stock.values); });
          }, 0);
        };
      });
    }
  }
}