<script setup lang="ts">
import Link from '@/components/Link.vue';
interface Route {
    name: string;
    path: string;
    children?: Route[];
}


const props = defineProps<{
    routes: Route[];
}>()

const iconsRoute = [
    {
        name: 'Accueil',
        icon: 'icon-home',
    }, {
        name: 'Articles',
        icon: 'icon-folder',
    }, {
        name: 'Utilisateurs',
        icon: 'icon-user-circle',
    }, {
        name: 'Galerie',
        icon: 'icon-image',
    }
]

let associatedRoutes = (routeName: string) => {
    return iconsRoute.find((route) => route.name === routeName)?.icon
}


const ignoreRoutes = ['Auth', 'NotFound'];
const routes = props.routes.filter((route) => !ignoreRoutes.includes(route.name));


</script>
<template>
    <nav>
        <div class="author">
            <div class="avatar"></div>
            <a href="#">Author</a>
        </div>
        <div class="main-nav">
            <ul>
                <li v-for="route in  routes " :class="$route.path === route.path ? 'active' : ''">
                    <Link :to="route.path" :label="route.name"
                        :icon="route.children ? [associatedRoutes(route.name), 'icon-chevron-right'] : associatedRoutes(route.name)" />
                </li>
            </ul>
        </div>
    </nav>
</template>
<style scoped lang="scss">
nav {
    background-color: var(--primary-color);
    color: var(--secondary-color);

    ul {
        display: flex;
        flex-direction: column;
        gap: .5rem;

        li {
            cursor: pointer;
            font-size: 1.1rem;
            padding-block: .5rem;

            a {
                padding-left: 1rem;
            }

            &.active {
                background-color: var(--info-color);
            }
        }
    }
}

.child-list {
    padding-left: 2rem;

    li {
        font-size: .9rem;
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