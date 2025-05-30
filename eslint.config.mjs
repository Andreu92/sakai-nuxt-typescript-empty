// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
    files: ['**/*.vue'],
    rules: {
        'vue/no-template-shadow': 'off'
    }
});
