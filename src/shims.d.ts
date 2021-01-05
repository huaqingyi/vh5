declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module '*.gif' {
    export const gif: any;
}

// TODO: remove this part after vue-count-to has its typescript file
declare module 'vue-count-to';

// TODO: remove this part after vuedraggable has its typescript file
declare module 'vuedraggable';

// TODO: remove this part after vue2-dropzone has its typescript file
declare module 'vue2-dropzone';

// TODO: remove this part after vue-image-crop-upload has its typescript file
declare module 'vue-image-crop-upload';

// TODO: remove this part after vue-splitpane has its typescript file
declare module 'vue-splitpane';

declare class TLFDocs {
    // https://element.eleme.io/#/zh-CN/component/form
    static 'TLF(表单)'(): any;

    // https://element.eleme.io/#/zh-CN/component/table
    static 'TLF(表格)'(): any;

    // line charts https://github.com/Armour/vue-typescript-admin-template/blob/master/src/components/Charts/LineChart.vue
    // bar charts https://github.com/Armour/vue-typescript-admin-template/blob/master/src/components/Charts/BarChart.vue
    // mixed charts https://github.com/Armour/vue-typescript-admin-template/blob/master/src/components/Charts/MixedChart.vue
    static 'TLF(图表)'(): any;

    // http://gitlab.talefun.com/vue/vueboot
    static 'TLF(微信验证)'(): any;

    // https://github.com/axios/axios
    static 'TLF(HTTP服务配置项)'(): any;
}
