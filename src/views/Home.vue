<script setup lang="ts">
// import type { Ref } from 'vue';
// import type { Home } from '@/schema/HomeSchema.ts'

// import { ref } from 'vue';
// import { useApi } from '@/composables/useApi';

// import toast from '@/composables/useToast'

// let { get, put } = useApi('/misc/home');

// const { response } = await get();
// const data = response?.reduce((acc: Home, cur: Home) => ({ ...acc, [cur.name]: cur }), {})

// const titleFromApi = ref(data.title.value);
// const subTitleFromApi = ref(data.subtitle.value);
// const messageFromApi = ref(data.hero_text.value);

// const title = ref(data.title.value.trim());
// const subTitle = ref(data.subtitle.value.trim());
// const message = ref(data.hero_text.value.trim());
// // const logo = ref(data.logo.value.trim());

// const focus_title = ref(false)
// const focus_subTitle = ref(false)
// const focus_message = ref(false)


// const handleUpdate = (value: string, valueAPI: Ref<string>, APIField: string, focus: Ref<boolean>) => {
//     if (value !== valueAPI.value) {
//         put({
//             id: data[APIField].id,
//             name: APIField,
//             value: value
//         });
//         valueAPI.value = value;
//         toast({
//             message: 'Modification effectuée',
//             type: 'success',
//             icon: 'check'
//         })
//         blur()
//         focus.value = false
//     } else {
//         toast({
//             message: 'Aucune modification',
//             type: 'warning',
//             icon: 'warning'
//         })
//     }
// }

// const handleTitle = () => {
//     handleUpdate(title.value, titleFromApi, 'title', focus_title)
// }
// const handleSubTitle = () => {
//     handleUpdate(subTitle.value, subTitleFromApi, 'subtitle', focus_subTitle)
// }
// const handleMessage = () => {
//     handleUpdate(message.value, messageFromApi, 'hero_text', focus_message)
// }

// const handleLogo = () => {
//     toast({
//         message: 'Fonctionnalité en cours de développement',
//         type: 'warning',
//         icon: 'warning'
//     })
// }

</script>
<template>
    <div class="module-container">
        <h1>Bienvenue User</h1>
        <!-- <div class="logo-container">
            <p>Logo</p>
            <div class="logo-img" @click="handleLogo">
                <div>
                    <i class="icon-cloud-upload"></i>
                    <p>Clique ou Dépose ton nouveau logo</p>
                </div>
                <img src="https://avatars.githubusercontent.com/u/102580693?v=4'" alt="logo-site">
            </div>
        </div>
        <div class=" title-container">
            <p>Titre</p>
            <div class="title">
                <input type="text" v-model="title" @focus="focus_title = true">
            </div>
            <Button color="info" :disabled="!focus_title" sm @click="handleTitle">Modifier</Button>
        </div>
        <div class="subtitle-container">
            <p>Sous Titre</p>
            <div class="subtitle">
                <input type="text" v-model="subTitle" @keydown.enter="handleSubTitle" @focus="focus_subTitle = true">
            </div>
            <Button color="info" :disabled="!focus_subTitle" sm @click="handleSubTitle">Modifier</Button>
        </div>
        <div class="message-container">
            <p>Message d'accueil :</p>
            <div class="message">
                <textarea v-model="message" @focus="focus_message = true"></textarea>
            </div>
            <Button color="info" sm :disabled="!focus_message" @click="handleMessage">Modifier</Button>
        </div> -->
    </div>
</template>
<style scoped lang="scss">
.module-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

.logo-img {
    display: flex;
    width: 200px;
    height: 100px;
    border-radius: 5px;
    border: 2px solid var(--primary-color);
    overflow: hidden;
    position: relative;
    cursor: pointer;

    &:hover {
        div {
            transform: translateX(0);
        }

        img {
            transform: translateX(100%);
        }
    }

    div {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 100%;
        gap: .5rem;
        transform: translateX(-100%);
        transition: transform .3s ease-in-out;

        p {
            text-align: center;
            user-select: none;
        }
    }

    img {
        position: absolute;
        width: 200px;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform .3s ease-in-out;
    }

}

.title,
.message,
.subtitle,
.logo {
    &-container {
        display: flex;
        flex-direction: column;
        gap: .2rem;
    }

    display: block;
    padding: 1rem;
    border-radius: 5px;
    background-color: var(--disabled-color);

    input,
    textarea {
        width: 100%;
        border: none;
        background-color: transparent;
        font-size: 1rem;

        &:focus {
            outline: none;
        }
    }

    textarea {
        min-height: 15rem;
    }
}

.message-container {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}
</style>
