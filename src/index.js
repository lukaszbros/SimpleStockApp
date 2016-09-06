import angular from 'angular';
import common from './app/common/common.component';
import stockSelect from './app/stockSelect/stockSelect.component.js';

import './index.scss';

angular.module('app', [common, stockSelect]);
