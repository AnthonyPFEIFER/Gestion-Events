import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BASE_URL_API } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    type_file:number = 0;

    TYPE_AVATAR = 1;
    TYPE_ATTACHED_PICTURE_LOCATION = 2;
    TYPE_LOCATION = 3;

    SERVER_URL = BASE_URL_API.url_api_v + 'image/upload';

    constructor(private httpClient: HttpClient) {}

    public upload(formData) {
        return this.httpClient.post<any>(this.SERVER_URL, formData, {
            reportProgress: true,
            observe: 'events'
        });
    }
}