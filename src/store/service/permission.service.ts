import { Service } from '@/libs/vuex';

export class PermissionService extends Service {

    public async getRoles(): Promise<string[]> {
        // return Promise.resolve([ 'admin' ]);
        // TODO
        return Promise.resolve([ 'admin' ]);
    }
}