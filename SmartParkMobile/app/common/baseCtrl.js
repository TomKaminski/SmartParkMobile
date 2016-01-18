(function () {
    'use strict';

    function baseCtrl($scope, accountService) {
        this.globalNotifications = [];
        this.globalLoading = false;

        this.getNotifications = function () {
            return this.globalNotifications;
        }

        this.pushToNotifications = function (notification) {
            this.globalNotifications.push(notification);
        }

        this.pushManyToNotifications = function (listOfNotifications, type) {
            angular.forEach(listOfNotifications, function (value) {
                this.push({ value: value, type: type });
            }, this.globalNotifications);
        }

        this.clearNotifications = function () {
            this.globalNotifications = [];
        }

        this.refreshUserContext = function () {
            this.user = accountService.initUserContext();
        }

        this.globalLoadingOff = function() {
            this.globalLoading = false;
        }

        this.globalLoadingOn = function () {
            this.globalLoading = true;
        }
    }

    angular.module('app').controller('baseCtrl', baseCtrl);
})();