<template>
    <div id="app">
        <router-view />
        <service-worker-update-popup />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ServiceWorkerUpdatePopup from '@/libs/pwa/components/ServiceWorkerUpdatePopup.vue';

@Component({
	name: 'App',
	components: {
		ServiceWorkerUpdatePopup,
	},
})
export default class extends Vue {
	public async created() {}
}
</script>

<style lang="scss">
.el-drawer {
	&.btt {
		.el-drawer__body {
			// overflow: auto;
			position: relative;
			.el-card {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				display: flex;
				flex-direction: column;
				.el-card__body {
					overflow: auto;
				}
			}
		}
	}
}
</style>

