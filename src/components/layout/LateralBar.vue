<script setup lang="ts">
import { computed, ref } from 'vue'
import Link from '@/components/Link.vue';
import { useRoute } from 'vue-router';
import { RouteRecordRaw } from 'vue-router'

// import { Route } from '@/types/Router/Routes';

const routes = useRoute()
const props = defineProps<{
    routes: RouteRecordRaw[]
    ;
}>()

const isActive = computed(() => (r: RouteRecordRaw) => {
    return routes.name === r.name || routes.redirectedFrom?.name === r.name || routes.matched.some(m => m.name === r.name)
})
const isOpen = ref(false)
const toggleOpen = (r: RouteRecordRaw) => {
    if (!r.children) return
    if (!r.children.some(c => c.meta?.visible)) return
    isOpen.value = !isOpen.value
}
</script>
<template>
    <nav>
        <div class="author">
            <div class="avatar"></div>
            <a href="#">Author</a>
        </div>
        <div class="main-nav">
            <template v-for="r in   props.routes  " :key="r.name">
                <Link :to="{ name: r.name as string }" class="navLink" :class="{ active: isActive(r) }"
                    :icon="r.children ? [(r.children?.some(c => c.meta?.visible) ? (isOpen ? 'chevron-down' : 'chevron-right') : ''), r.meta?.icon as string] : (r.meta?.icon as string)"
                    @click="toggleOpen(r)">
                {{ r.meta?.label }}
                </Link>
                {{ r.meta?.state }}
                <template v-if="isOpen">
                    <template v-for="c in r.children" :key="c.name">
                        <Link :to="{ name: c.name as string }" class="navLink navLink-child"
                            :class="{ active: isActive(c) }" :icon="(c.meta?.icon as string)">
                        {{ c.meta?.label }}
                        </Link>
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
        font-family: "Raleway", sans-serif;
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