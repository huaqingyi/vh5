import Vue from 'vue';
import * as directives from '../directives';
import { DirectiveOptions } from 'vue/types/umd';

// Register global directives
Object.keys(directives).forEach(key => {
    Vue.directive(
        key,
        (directives as {
            [key: string]: DirectiveOptions;
        })[key]
    );
});
