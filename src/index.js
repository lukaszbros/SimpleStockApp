import angular from 'angular';
import angularUiNotification from 'angular-ui-notification';
import main from './app/main/main.component';

import './index.scss';

angular.module('app', [main, angularUiNotification]);
