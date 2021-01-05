import router from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Route } from 'vue-router';
import Auth, { PermissionErrorType } from '@/config/auth';
import { isFunction } from 'lodash';
import { PermissionModule } from '@/store/modules/permission';

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to: Route, _: Route, next: any) => {
    // Start progress bar
    NProgress.start();
    const auth = new Auth(to, _, next);
    const permission = await auth.actionPermission();
    switch (permission) {
        case PermissionErrorType.SUCCESS:
            if (auth.restPermission && isFunction(auth.restPermission))
                return auth.restPermission();
            else return next();
        case PermissionErrorType.FAIL:
            if (auth.notPermission && isFunction(auth.notPermission))
                return auth.notPermission();
            else return next(`/401?redirect=${PermissionModule.dynamicRoutes[0].path}`);
        case PermissionErrorType.ERROR:
            if (auth.errorPermission && isFunction(auth.errorPermission))
                return auth.errorPermission();
            else return next(`/404?redirect=${PermissionModule.dynamicRoutes[0].path}`);
        case PermissionErrorType.DONE: return await false;
        default: return auth.notPermission();
    }
});

router.afterEach((to: Route) => {
    // Finish progress bar
    NProgress.done();
    // set page title
    document.title = to.meta.title;
});
