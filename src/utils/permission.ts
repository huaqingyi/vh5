import { PermissionModule } from '@/store/modules/permission';

export function checkPermission(value: string[]) {
    if (value && value instanceof Array && value.length > 0) {
        const roles = PermissionModule.roles;
        const permissionRoles = value;
        const hasPermission = roles.some(role => {
            return permissionRoles.includes(role);
        });
        return hasPermission;
    } else {
        console.error(
            "need roles! Like v-permission=\"['admin','editor']\""
        );
        return false;
    }
}