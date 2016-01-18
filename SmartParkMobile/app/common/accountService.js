(function () {
    'use strict';

    function accountService(localStorageFactory, CONFIG) {

        var userData = {
            loggedIn : false,
            charges : null,
            userEmail: null,
            memoryHash: null,
            userName: null
        }

        this.updateCharges = function (charges) {
            localStorageFactory.set(CONFIG.localStorageEnum.charges, charges);
            userData.charges = localStorageFactory.get(CONFIG.localStorageEnum.charges);
        };

        this.login = function (hash, email, charges, name) {
            localStorageFactory.set(CONFIG.localStorageEnum.email, email);
            localStorageFactory.set(CONFIG.localStorageEnum.hash, hash);
            localStorageFactory.set(CONFIG.localStorageEnum.charges, charges);
            localStorageFactory.set(CONFIG.localStorageEnum.name, name);

            userData.loggedIn = true;
            userData.charges = charges;
            userData.userEmail = email;
            userData.memoryHash = hash;
            userData.userName = name;
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
                userData.userName = null;
            } else {
                userData.userEmail = localStorageFactory.get(CONFIG.localStorageEnum.email);
                userData.charges = localStorageFactory.get(CONFIG.localStorageEnum.charges);
                userData.userName = localStorageFactory.get(CONFIG.localStorageEnum.name);
                userData.loggedIn = true;
            }
            return userData;
        };

        this.logout = function () {
            userData.loggedIn = false;
            userData.charges = null;
            userData.userEmail = null;
            userData.userName = null;
            userData.memoryHash = null;
            localStorageFactory.clear();
        };
    }
    angular.module('app').service('accountService', ['localStorageFactory', 'CONFIG', accountService]);
})();