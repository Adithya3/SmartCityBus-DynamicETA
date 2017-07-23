import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
    private _session: any

    constructor() {

    }

    set session(value) {
        this._session = value;
    }

    get session() {
        return this._session
    }
}