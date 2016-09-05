import angular from 'angular';

import {stockSelect} from './app/stockSelect';

import './index.scss';

export const app = 'app';

angular
  .module(app, [])
  .component('app', stockSelect);
