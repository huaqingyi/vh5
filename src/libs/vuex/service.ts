import { AxiosInstance } from 'axios';

export interface VuexService { }

export class Service implements VuexService {

    public http!: AxiosInstance;
}
