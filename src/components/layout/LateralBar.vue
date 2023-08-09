<script setup lang="ts">
import Link from '@/components/Link.vue';

import { Route } from '@/types/Router/Routes';


const props = defineProps<{
    routes: Route[];
}>()




</script>
<template>
    <nav>
        <div class="author">
            <div class="avatar"></div>
            <a href="#">Author</a>
        </div>
        <div class="main-nav">
            <template v-for="route in props.routes" :key="route.name">
                <Link v-if="route.meta.enable" class="navLink" :class="$route.path === route.path ? 'active' : ''"
                    :to="route.path"
                    :icon="route.children && route.children?.map(child => child.meta.enable).length > 1 ? ['chevron-right', route.icon] : route.icon"
                    :label="route.label">
                </Link>
                <template v-if="route.meta.enable && route.children">
                    <template v-for="child in route.children" :key="child.name">
                        <Link v-if="child.meta.enable && $route.path.includes(route.path)" class="navLink navLink-child"
                            :class="$route.path.includes(child.path) ? 'active' : ''" :to="child.path" :icon="child.icon"
                            :label="child.label" />
                    </template>
                </template>
            </template>
        </div>
    </nav>
</template>
<style scoped lang="scss">
nav {
    background-color: var(--primary-color);
    color: var(--secondary-color);
}

.main-nav {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: .5rem;
    padding: 1rem 0;
    user-select: none;

    .navLink {
        width: 100%;
        padding: .5rem 1rem;

        &.active {
            background-color: var(--info-color);
            color: var(--secondary-color);
        }

        &.navLink-child {
            padding-left: 2rem;
            padding-block: .2rem;
        }
    }
}

.author {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;

    .avatar {
        margin: 1rem auto .2rem auto;
        width: 75%;
        height: 2rem;
        background-image: url('https://avatars.githubusercontent.com/u/102580693?v=4');
        background-size: cover;
        background-position: center;
        border-radius: 5px;
    }

    a {
        font-family: 'Shadows Into Light', cursive;
        font-size: 1.2rem;
        font-weight: 600;

        &:hover {
            color: var(--info-color);
        }
    }


}

.main-nav {

    h2 {
        text-align: center;
        margin-bottom: 1rem;
        border-bottom: 2px solid var(--secondary-color);
    }
}
</style>