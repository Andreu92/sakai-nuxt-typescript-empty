<script setup lang="ts">
import AppMenuItem from './AppMenuItem.vue';
import type { MenuItem } from 'primevue/menuitem';

const model = ref<MenuItem[]>([
    {
        label: 'Home',
        items: [{ label: 'Home', icon: 'pi pi-fw pi-home', to: '/' }]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i" />
            <li v-if="item.separator" class="menu-separator" />
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
