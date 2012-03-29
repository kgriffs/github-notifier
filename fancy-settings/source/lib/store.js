//
// store.js by Frank Kohlhepp
// Copyright (c) 2011 - 2012 Frank Kohlhepp
// https://github.com/frankkohlhepp/store-js
// License: MIT-license
//
(function(){var c=function(g,h){return Object.prototype.hasOwnProperty.call(g,h)};var b=function(g){var i=0;for(var h in g){if(c(g,h)){i++}}return i};var d=function(l,j,k){var h=l.length>>>0;for(var g=(k<0)?Math.max(0,h+k):k||0;g<h;g++){if(l[g]===j){return g}}return -1};var f=function(i,g,h){return d(i,g,h)!==-1};var a=function(h,g){if(!f(h,g)){h.push(g)}return h};var e=this.Store=function(g,i,h){this.name=g;this.defaults=i||{};this.watcherSpeed=h||500;this.listeners={};this.applyDefaults()};e.clear=function(){localStorage.clear()};e.prototype.applyDefaults=function(){for(var g in this.defaults){if(c(this.defaults,g)&&this.get(g)===undefined){this.set(g,this.defaults[g])}}return this};e.prototype.watcher=function(i){if(this.watcherTimer){clearTimeout(this.watcherTimer)}if(b(this.listeners)||i){this.newObject=this.toObject();if(this.oldObject){for(var g in this.newObject){if(c(this.newObject,g)&&this.newObject[g]!==this.oldObject[g]){this.fireEvent(g,this.newObject[g])}}for(var g in this.oldObject){if(c(this.oldObject,g)&&!c(this.newObject,g)){this.fireEvent(g,this.newObject[g])}}}this.oldObject=this.newObject;var h=this;this.watcherTimer=setTimeout(function(){h.watcher()},this.watcherSpeed)}return this};e.prototype.get=function(g){var h=localStorage.getItem("store."+this.name+"."+g);if(h===null){return undefined}try{return JSON.parse(h)}catch(i){return null}};e.prototype.set=function(g,h){if(h===undefined){this.remove(g)}else{if(typeof h==="function"){h=null}try{h=JSON.stringify(h)}catch(i){h=null}localStorage.setItem("store."+this.name+"."+g,h)}return this};e.prototype.remove=function(g){localStorage.removeItem("store."+this.name+"."+g);return this.applyDefaults()};e.prototype.reset=function(){var g="store."+this.name+".";for(var h=(localStorage.length-1);h>=0;h--){if(localStorage.key(h).substring(0,g.length)===g){localStorage.removeItem(localStorage.key(h))}}return this.applyDefaults()};e.prototype.toObject=function(){var g={};var h="store."+this.name+".";for(var k=(localStorage.length-1);k>=0;k--){if(localStorage.key(k).substring(0,h.length)===h){var j=localStorage.key(k).substring(h.length);var l=this.get(j);if(l!==undefined){g[j]=l}}}return g};e.prototype.fromObject=function(g,i){if(!i){this.reset()}for(var h in g){if(c(g,h)){this.set(h,g[h])}}return this};e.prototype.addEvent=function(g,h){this.watcher(true);if(!this.listeners[g]){this.listeners[g]=[]}a(this.listeners[g],h);return this};e.prototype.removeEvent=function(g,j){for(var h=(this.listeners[g].length-1);h>=0;h--){if(this.listeners[g][h]===j){this.listeners[g].splice(h,1)}}if(!this.listeners[g].length){delete this.listeners[g]}return this};e.prototype.fireEvent=function(k,n){var m=[k,"*"];for(var l=0;l<m.length;l++){var g=m[l];if(this.listeners[g]){for(var h=0;h<this.listeners[g].length;h++){this.listeners[g][h](n,k,this.name)}}}return this}}());