<template>
    <div>
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { ContainerStore } from '@/layout/store';
import { InitDataResponse } from '@/layout/service';

@Component
export default class extends Vue {

    // @Action(ContainerStore.action((props: ContainerStore) => props.init))
    // public init!: () => any;

    // @State(state => state[ContainerStore.id].initData)
    // public initData!: InitDataResponse;

    public async created() {
        // await this.init();
        // console.log(this.initData);
    }
}
</script>

<style lang="scss" scoped>
</style>
