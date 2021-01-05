import { Action, Mutation } from 'vuex-module-decorators';
import { VuexModule, Module } from '@/libs/vuex';
import { ContainerService, InitDataResponse } from './service';
import store from '@/store';

@Module({ store })
export class ContainerStore extends VuexModule {

    public service: ContainerService;

    constructor(state: ContainerStore) {
        super(state);
        this.service = new ContainerService();
    }

    // @Action({ commit: 'initSuccess' })
    // public async init() {
    //     return await this.service.init();
    // }

    // @Mutation
    // public async initSuccess(data: InitDataResponse) {
    //     if (!data.err) {
    //         this.initData = data;
    //     }
    // }
}
