## 1. 框架简介
* [vue] (https://cn.vuejs.org/v2/guide/)
* [vuex] (https://vuex.vuejs.org/)
* [echarts] (https://www.echartsjs.com/examples/zh/index.html)
* 如果 template 合意, 请务必打颗心 😘

## 3. DEV模式下API代理
### vue.config.js 参考 [VueCli] (https://cli.vuejs.org/zh/config/)
```js
proxy: {
  // change xxx-api/login => /mock-api/v1/login
  // detail: https://cli.vuejs.org/config/#devserver-proxy
  [process.env.VUE_APP_BASE_API]: {
    target: `http://localhost:${mockServerPort}/mock-api/v1`,
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    pathRewrite: {
      ['^' + process.env.VUE_APP_BASE_API]: ''
    }
  }
}
```

# 4. 路由管理
### src/layout/router.ts
```typescript
import Layout from '@/layout/index.vue';
import test1Router from '@/pages/test1/router';
import test2Router from '@/pages/test2/router';

export default [
    {
        path: '/test',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/pages/test/test.vue'),
                name: 'Icons',
                meta: {
                    title: 'test',
                    icon: 'icon',
                    noCache: true,
                },
            },
        ],
    },
    // 子路由
    test1Router,
    // 子路由
    test2Router,
    {
        path: '*',
        redirect: '/404',
        meta: { hidden: true },
    },
];
```

## 5. 状态store和api
### src/layout/store.ts (定义model层)
```typescript
import { Action, Mutation } from 'vuex-module-decorators';
import { VuexModule, Module } from '@/libs/vuex';
import { ContainerService, InitDataResponse } from './service';
import { WXUserInfo } from 'wx-auth';
import store from '@/store';

@Module({ store })
export class ContainerStore extends VuexModule {

    public service: ContainerService;
    public accessToken: string;

    constructor(state: ContainerStore) {
        super(state);
        this.service = new ContainerService();
        this.accessToken = '';
    }

    @Action({ commit: 'testSuccess' })
    public async test(data: { payload: { code: string } }) {
        // ...
        // this.service.login();
        return { accessToken: 'xxx' };
    }

    @Mutation
    public async testSuccess(data: {
        accessToken?: string;
    }) {
        this.accessToken = data.payload.accessToken || '';
    }
}
```

### src/layout/service.ts (定义服务层)
```typescript
import { Service } from '@/libs/vuex';
import { ResponseImpl } from '@/impls/response.impl';

export class InitDataResponse extends ResponseImpl {
    constructor() {
        super();
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ContainerService extends Service {

    public async login(): Promise<InitDataResponse> {
        // return await this.http.get xxx;
    }
}
```

### src/layout/index.vue (输出视图层)
```vue
<template>
    <div class="app-wrapper">
        {{ accessToken }}
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Action, State } from 'vuex-class';
import { ContainerStore } from '@/layout/store';

@Component
export default class extends mixins(ResizeMixin) {
    // get fixedHeader() {
    //     return SettingsModule.fixedHeader;
    // }

    @Action(ContainerStore.action(
        (props: ContainerStore) => props.test,
    ))
    public test!: () => any;

    @State((state) => state[ContainerStore.id].accessToken)
    public accessToken!: string;

    public async created() {
        await this.test();
    }
}
</script>

<style lang="scss" scoped>
</style>
```

# 5. 请求和props
### page.vue
```typescript
@Action(ContainerStore.action(
    (props: ContainerStore) => props.init,
))
public init!: () => any;
```
### store.ts
```typescript
constructor(state: ContainerStore) {
    super(state);
    this.service = new ContainerService();
}

@Action({ commit: 'initSuccess' })
public async init() {
    return await this.service.init();
}
```
### service.ts
```typescript
public async init(): Promise<InitDataResponse> {
    return await this.http.get('rts/sys/init').then((resp) => resp.data);
}
```
