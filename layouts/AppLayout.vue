<script setup lang="ts">
import AppTopbar from './AppTopbar.vue';
import AppSidebar from './AppSidebar.vue';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref<EventListener | null>(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event: Event) => {
            if (isOutsideClicked(event as MouseEvent)) {
                layoutState.overlayMenuActive = false;
                layoutState.staticMenuMobileActive = false;
                layoutState.menuHoverActive = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value as EventListener);
    }
}

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener.value as EventListener);
        outsideClickListener.value = null;
    }
}

const isOutsideClicked = (event: MouseEvent) => {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl?.isSameNode(event.target as Node) || sidebarEl?.contains(event.target as Node) || topbarEl?.isSameNode(event.target as Node) || topbarEl?.contains(event.target as Node));
}
</script>

<template>
    <div>
        <div class="layout-wrapper" :class="containerClass">
            <AppTopbar />
            <AppSidebar />
            <div class="layout-main-container">
                <div class="layout-main">
                    <NuxtPage />
                </div>
            </div>
            <div class="layout-mask animate-fadein" />
        </div>
        <Toast />
    </div>
</template>
