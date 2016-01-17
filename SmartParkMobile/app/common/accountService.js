(function () {
    'use strict';

    function accountService(localStorageFactory, CONFIG) {

        var userData = {
            loggedIn : false,
            charges : null,
            userEmail: null,
            memoryHash: null
        }

        this.updateCharges = function () {
            userData.charges = localStorageFactory.get(CONFIG.localStorageEnum.charges);
        };

        this.login = function (hash, email, charges) {
            localStorageFactory.set(CONFIG.localStorageEnum.email, email);
            localStorageFactory.set(CONFIG.localStorageEnum.hash, hash);
            localStorageFactory.set(CONFIG.localStorageEnum.charges, charges);
            userData.loggedIn = true;
            userData.charges = charges;
            userData.userEmail = email;
            userData.memoryHash = hash;
        };

        this.getAccountData = function () {
            return userData;
        };

        this.initUserContext = function () {
            if (userData.loggedIn === true && userData.memoryHash !== null) {
                return userData;
            }

            userData.memoryHash = localStorageFactory.get(CONFIG.localStorageEnum.hash);
            if (userData.memoryHash === null) {
                userData.loggedIn = false;
                userData.charges = null;
                userData.userEmail = null;
            } else {
                userData.userEmail = localStorageFactory.get(CONFIG.localStorageEnum.email);
                userData.charges = localStorageFactory.get(CONFIG.localStorageEnum.charges);
                userData.loggedIn = true;
            }
            return userData;
        };

        this.logout = function () {
            userData.loggedIn = false;
            userData.charges = null;
            userData.userEmail = null;
            userData.memoryHash = null;
            localStorageFactory.clear();
        };
    }
    angular.module('app').service('accountService', ['localStorageFactory', 'CONFIG', accountService]);
})();