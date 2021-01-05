import { Service } from '@/libs/vuex';
import { ResponseImpl } from '@/impls/response.impl';

export class InitDataResponse extends ResponseImpl {
    constructor() {
        super();
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ContainerService extends Service {

    // public async init(): Promise<InitDataResponse> {
    //     return await this.http.get('rts/sys/init').then(resp => resp.data);
    // }
}
