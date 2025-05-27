<script setup lang="ts">
import NotFound from '@/components/NotFound.vue';

defineProps({
    error: {
        type: Object,
        default: null
    }
});
</script>

<template>
    <div>
        <NotFound v-if="error.statusCode === 404" />
        <div v-else>
            <h1>{{ error.statusCode }}</h1>
            <p>Something went wrong</p>
            <p>{{ error.message }}</p>
            <NuxtLink to="/">Go back home</NuxtLink>
        </div>
    </div>
</template>
