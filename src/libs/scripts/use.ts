import Vue from 'vue';
import VantUI from 'vant';

import SvgIcon from 'vue-svgicon';

Vue.use(VantUI);

Vue.use(SvgIcon, {
    tagName: 'svg-icon',
    defaultWidth: '1em',
    defaultHeight: '1em',
});
