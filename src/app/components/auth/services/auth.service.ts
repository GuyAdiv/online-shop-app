import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    private url = 'http://localhost:8080/api/users';
    private token: string;
    private currentUser: any;

    constructor(private http: HttpClient) {
    }

    async userLogin(username: string, password: string) {
        const url = this.url + '/login';

        const result = await this.http.post<any>(url, {
            username,
            password
        }).toPromise();

        this.token = result.token;
        this.currentUser = result.user;

        return result;
    }

    getUserId() {
        if (this.currentUser) {
            return this.currentUser.id;
        }
    }

    getUserToken() {
        return 'Bearer ' + this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        this.token = null;
    }
}
