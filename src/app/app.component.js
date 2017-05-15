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
var rest_service_1 = require("./rest.service");
var AppComponent = (function () {
    function AppComponent(restService) {
        this.restService = restService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.restService.getBooks().then(function (books) {
            _this.books = books;
            console.log(books);
        });
        this.restService.getStores().then(function (stores) { return _this.stores = stores; });
        this.getPurchases();
    };
    AppComponent.prototype.join = function (stores) {
        return stores.map(function (s) { return s.name; }).join(", ");
    };
    AppComponent.prototype.onSubmit = function () {
        var _this = this;
        this.restService.createPurchase(this.selectedBook, this.selectedStore).then(function (purchase) {
            _this.selectedBook = null;
            _this.selectedStore = null;
            _this.getPurchases();
        });
    };
    AppComponent.prototype.getPurchases = function () {
        var _this = this;
        this.restService.getPurchases().then(function (purchases) { return _this.purchases = purchases; });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n        <h1>PSK Spring demo</h1>\n        <h2>Books</h2>\n        <table *ngIf=\"books\">\n            <thead>\n                <tr>\n                    <th>Title</th><th>Available in stores</th>\n                </tr>\n            </thead>\n            <tr *ngFor=\"let book of books\">\n                <td>{{book.title}}</td>\n                <td>{{join(book.stores)}}</td>\n            </tr>\n        </table>\n        <h2>Purchases</h2>\n        <h3>Purchase log</h3>\n        <ul>\n            <li *ngFor=\"let p of purchases\">\n                {{p.book.title}} bought in {{p.store.name}}\n            </li>\n        </ul>\n        <h3>Register purchase</h3>\n        <form #registerForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n            <select [(ngModel)]=\"selectedBook\" name=\"selectedBook\" required>\n                <option></option>\n                <option *ngFor=\"let b of books\" [value]=\"b.id\">{{b.title}}</option>\n            </select> bought in\n            <select [(ngModel)]=\"selectedStore\" name=\"selectedStore\" required>\n                <option></option>\n                <option *ngFor=\"let s of stores\" [value]=\"s.id\">{{s.name}}</option>\n            </select>\n            <button type=\"submit\">Register</button>\n        </form>\n    ",
    }),
    __metadata("design:paramtypes", [rest_service_1.RestService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map