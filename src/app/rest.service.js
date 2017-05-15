"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var RestService = (function () {
    function RestService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.baseUrl = 'http://localhost:8080'; // URL to web api
    }
    RestService.prototype.getBooks = function () {
        var url = this.baseUrl + "/books";
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    RestService.prototype.getStores = function () {
        var url = this.baseUrl + "/stores";
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    RestService.prototype.getPurchases = function () {
        var url = this.baseUrl + "/purchase";
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    RestService.prototype.createPurchase = function (book_id, store_id) {
        var url = this.baseUrl + "/purchase";
        return this.http
            .post(url, JSON.stringify({ bookId: book_id, storeId: store_id }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    RestService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return RestService;
}());
RestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RestService);
exports.RestService = RestService;
var Store = (function () {
    function Store() {
    }
    return Store;
}());
exports.Store = Store;
var Book = (function () {
    function Book() {
    }
    return Book;
}());
exports.Book = Book;
var Purchase = (function () {
    function Purchase() {
    }
    return Purchase;
}());
exports.Purchase = Purchase;
//# sourceMappingURL=rest.service.js.map