<script setup lang="ts">
const route = useRoute();
const { layoutState, setActiveMenuItem, toggleMenu } = useLayout();

const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
    index: {
        type: Number,
        default: 0
    },
    root: {
        type: Boolean,
        default: true
    },
    parentItemKey: {
        type: String,
        default: undefined
    }
});

const isActiveMenu = ref(false);
const itemKey = ref<string | undefined>(undefined);

onBeforeMount(() => {
    itemKey.value = props.parentItemKey ? props.parentItemKey + '-' + props.index : String(props.index);

    const activeItem = layoutState.activeMenuItem;

    isActiveMenu.value = activeItem === itemKey.value || (typeof activeItem === 'string' && typeof itemKey.value === 'string' && (activeItem as string).startsWith(itemKey.value + '-'));
});

watch(
    () => layoutState.activeMenuItem,
    (newVal) => {
        isActiveMenu.value = newVal === itemKey.value || (typeof newVal === 'string' && typeof itemKey.value === 'string' && (newVal as string).startsWith(itemKey.value + '-'));
    }
);

const itemClick = (event: MouseEvent, item: MenuItem) => {
    if (item.disabled) {
        event.preventDefault();
        return;
    }

    if ((item.to || item.url) && (layoutState.staticMenuMobileActive || layoutState.overlayMenuActive)) {
        toggleMenu();
    }

    if (item.command) {
        item.command({ originalEvent: event, item: item });
    }

    const foundItemKey = item.items ? (isActiveMenu.value ? props.parentItemKey : itemKey.value) : itemKey.value;

    setActiveMenuItem(foundItemKey);
}
</script>

<template>
    <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
        <div v-if="root && item.visible !== false" class="layout-menuitem-root-text">{{ item.label }}</div>
        <a v-if="(!item.to || item.items) && item.visible !== false" :href="item.url" :class="item.class" :target="item.target" tabindex="0" @click="itemClick($event, item)">
            <i :class="item.icon" class="layout-menuitem-icon" />
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i v-if="item.items" class="pi pi-fw pi-angle-down layout-submenu-toggler" />
        </a>
        <NuxtLink v-if="item.to && !item.items && item.visible !== false" :class="[item.class, { 'active-route': route.path === item.to }]" tabindex="0" :to="item.to" @click="itemClick($event, item)">
            <i :class="item.icon" class="layout-menuitem-icon" />
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i v-if="item.items" class="pi pi-fw pi-angle-down layout-submenu-toggler" />
        </NuxtLink>
        <Transition v-if="item.items && item.visible !== false" name="layout-submenu">
            <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
                <AppMenuItem v-for="(child, i) in item.items" :key="child" :index="i" :item="child" :parent-item-key="itemKey" :root="false" />
            </ul>
        </Transition>
    </li>
</template>

<style lang="scss" scoped></style>
