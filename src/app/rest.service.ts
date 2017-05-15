import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private baseUrl = 'http://localhost:8080';  // URL to web api
    constructor(private http: Http) { }
    getBooks(): Promise<Book[]> {
        const url = `${this.baseUrl}/books`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Book[])
            .catch(this.handleError);
    }
    getStores(): Promise<Store[]> {
        const url = `${this.baseUrl}/stores`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Store[])
            .catch(this.handleError);
    }
    getPurchases(): Promise<Purchase[]> {
        const url = `${this.baseUrl}/purchase`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Purchase[])
            .catch(this.handleError);
    }
    createPurchase(book_id: number, store_id: number): Promise<Purchase> {
        const url = `${this.baseUrl}/purchase`;
        return this.http
            .post(url, JSON.stringify({bookId: book_id, storeId: store_id}), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Purchase)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

export class Store {
    id: number;
    name: string;
}

export class Book {
    id: number;
    title: string;
    stores: Store[];
}

export class Purchase {
    id: number;
    book: Book;
    store: Store;
}