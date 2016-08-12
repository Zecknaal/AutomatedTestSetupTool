/**
 * Created by Zeck on 8/11/2016.
 */

angular.module('ModalResponse', [])
    .service('ModalResponseService', function(){
        this.setResponse = function(response){
            this.response = response;
        }

        this.getResponse = function(){
            return this.response;
        }

        this.setCallback = function(callback){
            this.callback = callback;
        }

        this.getCallback = function(){
            return this.callback;
        }
    });
