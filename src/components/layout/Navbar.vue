<script setup lang="ts">
import { useStore } from '@/store';
const store = useStore();
</script>
<template>
    <div>
        <nav>
            <div>
                <img src="https://picsum.photos/50/50" alt="logo" id="logo">
            </div>
            <input type="text" placeholder="Search">
            <button @click="store.$state.current_user.role = 'admin'">ADMIN</button>
            <button @click="store.$state.current_user.role = 'user'">USER</button>
            <ul id="nav">
                <li><span class="icon icon-bell"></span></li>
                <li v-if="store.isLogged" id="name">{{ store.$state.current_user.username }}</li>
                <li>{{ store.isLogged ? 'Déconnexion' : 'Connexion' }}</li>
            </ul>
        </nav>
    </div>
</template>
<style scoped lang="scss">
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: .5rem;
    background-color: var(--primary-color);

    div {
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

ul#nav {
    display: flex;
    align-items: center;
    list-style: none;

    li {
        margin: 0 1rem;
    }

    #name {
        color: var(--secondary-color);
    }

    li:last-child {
        color: var(--secondary-color);

        &:hover {
            color: var(--danger-color);
        }
    }
}

input {
    margin-inline: 10%;
    border-radius: 0;
    background-color: var(--primary-color);
    border: none;
    padding: 0.5rem;
    width: 20%;
    transition: all 0.5s ease-in-out;

    &::placeholder {
        color: var(--secondary-color);
    }

    &:focus {
        outline: none;
        width: 20%;
        background-color: var(--secondary-color);
        border-radius: 10px;

        &::placeholder {
            color: var(--primary-color);
        }
    }
}

.icon {
    padding: 0.5rem;
    border-radius: 50%;
    background-color: var(--darker-secondary-color);
}

#logo {
    border-radius: 50%;
    border: 1px solid var(--secondary-color);
}
</style>