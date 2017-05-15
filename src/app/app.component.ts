import {Component, OnInit} from '@angular/core';
import {Book, Purchase, RestService, Store} from "./rest.service";

@Component({
    selector: 'my-app',
    template: `
        <h1>PSK Spring demo</h1>
        <h2>Books</h2>
        <table *ngIf="books">
            <thead>
                <tr>
                    <th>Title</th><th>Available in stores</th>
                </tr>
            </thead>
            <tr *ngFor="let book of books">
                <td>{{book.title}}</td>
                <td>{{join(book.stores)}}</td>
            </tr>
        </table>
        <h2>Purchases</h2>
        <h3>Purchase log</h3>
        <ul>
            <li *ngFor="let p of purchases">
                {{p.book.title}} bought in {{p.store.name}}
            </li>
        </ul>
        <h3>Register purchase</h3>
        <form #registerForm="ngForm" (ngSubmit)="onSubmit()">
            <select [(ngModel)]="selectedBook" name="selectedBook" required>
                <option></option>
                <option *ngFor="let b of books" [value]="b.id">{{b.title}}</option>
            </select> bought in
            <select [(ngModel)]="selectedStore" name="selectedStore" required>
                <option></option>
                <option *ngFor="let s of stores" [value]="s.id">{{s.name}}</option>
            </select>
            <button type="submit">Register</button>
        </form>
    `,
})
export class AppComponent implements OnInit {
    books: Book[];
    stores: Store[];
    purchases: Purchase[];
    selectedBook: number;
    selectedStore: number;

    constructor(private restService: RestService) {
    }

    ngOnInit(): void {
        this.restService.getBooks().then(books => {
            this.books = books;
            console.log(books);
        });
        this.restService.getStores().then(stores => this.stores = stores);
        this.getPurchases();

    }

    join(stores: Store[]) {
        return stores.map(s => s.name).join(", ");
    }

    onSubmit() {
        this.restService.createPurchase(this.selectedBook, this.selectedStore).then(purchase => {
            this.selectedBook = null;
            this.selectedStore = null;
            this.getPurchases();
        });
    }

    private getPurchases() {
        this.restService.getPurchases().then(purchases => this.purchases = purchases);
    }
}
