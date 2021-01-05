import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { PermissionService } from '../service/permission.service';
import { RouteConfig } from 'vue-router';
import asyncRoutes from '@/layout/router';
import router, { constantRoutes, resetRouter } from '@/router';

const hasPermission = (roles: string[], route: RouteConfig) => {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role));
    } else {
        return true;
    }
};

const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]) => {
    const res: RouteConfig[] = [];
    routes.forEach(route => {
        const r = { ...route };
        if (hasPermission(roles, r)) {
            if (r.children) {
                r.children = filterAsyncRoutes(r.children, roles);
            }
            res.push(r);
            if (r.children && r.children.length === 0 && !r.redirect) {
                res.pop();
            }
        }
    });
    return res;
}

export interface IPermissionState {
    sessiontoken: string;
    freshtoken: string;
    roles: string[];
    routes: RouteConfig[];
    dynamicRoutes: RouteConfig[];
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
    public service: PermissionService;
    public sessiontoken: string;
    public freshtoken: string;
    public roles: string[];

    public routes: RouteConfig[];
    public dynamicRoutes: RouteConfig[];

    constructor(props: any) {
        super(props);
        this.service = new PermissionService();
        this.sessiontoken = sessionStorage.getItem('sessiontoken') || '';
        this.freshtoken = sessionStorage.getItem('freshtoken') || '';
        this.roles = [];
        this.routes = [];
        this.dynamicRoutes = [];
        // this.routes = constantRoutes.concat(asyncRoutes);
        // this.dynamicRoutes = asyncRoutes;
    }

    @Action
    public generateRoutes(roles: string[]) {
        let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        this.settingRoutes(accessedRoutes);
    }

    @Mutation
    private settingRoutes(routes: RouteConfig[]) {
        this.routes = constantRoutes.concat(routes);
        this.dynamicRoutes = routes;
    }

    @Action
    public isLogin() {
        // 这里可以返回 Promise
        if (this.sessiontoken && this.freshtoken) return true;
        if (sessionStorage.getItem('userInfo')) return true;
        return false;
    }

    @Action
    public async getRoles() {
        // TODO 自己写 API 请调用 Service ...
        const roles = await this.service.getRoles();
        await this.setRoles(roles);
        return roles;
    }

    @Action
    public async changeRoles(roles: string[] | Promise<string[]>) {
        await this.setRoles(await roles);
        resetRouter();
        PermissionModule.generateRoutes(await roles);
        router.addRoutes(PermissionModule.dynamicRoutes);
        return roles;
    }

    @Mutation
    private setRoles(roles: string[]) {
        this.roles = roles;
    }

    @Action
    public setToken(sessiontoken: string, freshtoken: string) {
        this.removeToken();
        this.setTokenIN(sessiontoken, freshtoken);
        this.setRolesIN([]);
    }

    @Action
    public resetToken(sessiontoken: string, freshtoken: string) {
        this.removeToken();
        this.setTokenIN(sessiontoken, freshtoken);
        this.setRolesIN([]);
    }

    @Mutation
    private removeToken() {
        sessionStorage.removeItem('sessiontoken');
        sessionStorage.removeItem('freshtoken');
        this.sessiontoken = sessionStorage.getItem('sessiontoken') || '';
        this.freshtoken = sessionStorage.getItem('freshtoken') || '';
    }

    @Mutation
    private setTokenIN(sessiontoken: string, freshtoken: string) {
        sessionStorage.setItem('sessiontoken', sessiontoken);
        sessionStorage.setItem('freshtoken', freshtoken);
        this.sessiontoken = sessionStorage.getItem('sessiontoken') || '';
        this.freshtoken = sessionStorage.getItem('freshtoken') || '';
    }

    @Mutation
    private setRolesIN(roles: string[]) {
        this.roles = roles;
    }
}

export const PermissionModule = getModule(Permission);
