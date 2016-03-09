(function () {

    'use strict';

    angular.module('angularStringFilters', ['ngSanitize'])
        .filter('truncate', function () {
            return function (input, chars, breakOnWord) {
                if (isNaN(chars)) return input;
                if (chars <= 0) return '';
                if (input && input.length > chars) {
                    input = input.substring(0, chars);

                    if (!breakOnWord) {
                        var lastspace = input.lastIndexOf(' ');
                        //get last space
                        if (lastspace !== -1) {
                            input = input.substr(0, lastspace);
                        }
                    } else {
                        while (input.charAt(input.length - 1) === ' ') {
                            input = input.substr(0, input.length - 1);
                        }
                    }
                    return input + '…';
                }
                return input;
            };
        })
        .filter('words', function () {
            return function (input, words) {
                if (isNaN(words)) return input;
                if (words <= 0) return '';
                if (input) {
                    var inputWords = input.split(/\s+/);
                    if (inputWords.length > words) {
                        input = inputWords.slice(0, words).join(' ') + '…';
                    }
                }
                return input;
            };
        })
        .filter('ucfirst', function () {
            return function (str, arg) {
                return angular.isString(str) ? str.charAt(0).toUpperCase() + str.substr(1) : str;
            };
        })
        .filter('ucwords', function () {
            return function (input, readable) {
                if (input) {
                    if (readable) {
                        input = input.split('_').join(' ');
                    }

                    return input.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase();});
                }

                return '';
            };
        })
        .filter('basename', function () {
            return function (url, arg) {
                (url || '').split('/').pop();
            };
        })
        .filter('bool', function () {
            return function (str) {
                //console.log("str: ", str);
                return str != '';
            };
        })
        .filter('trustedHTML', function ($sce) {
            return function (src) {
                return $sce.trustAsHtml(src);
            }
        })
        .filter('safeHTML', function ($sanitize) {
            return function (src) {
                try {
                    var html = $sanitize(src);
                    return html;
                } catch (e) {
                }
            }
        })
        .filter('trustedURL', function ($sce) {
            return function (src) {
                return $sce.trustAsResourceUrl(src);
            }
        });
})();