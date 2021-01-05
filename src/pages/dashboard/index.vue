<template>
    <div class="dashboard-container">
        Dashboard ...
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PermissionModule } from '../../store/modules/permission';

@Component
export default class extends Vue {

    get roles() {
        return PermissionModule.roles;
    }

    created() {
    }
}
</script>
