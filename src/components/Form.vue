<script setup lang="ts">
import { ref } from 'vue';
import { PropType } from 'vue';

//Types
import { iInput } from '@/types/input';


const props = defineProps({
    config: {
        type: Array as PropType<iInput[]>,
        required: true
    }
});

const emit = defineEmits(["update:data"]);

let labels = ref<string[]>(props.config.map(input => input.label));
let values = ref<any[]>(props.config.map(input => input.value));

let new_value = ref(labels.value.reduce((acc, label) => {
    acc[label] = values.value[labels.value.indexOf(label)];
    return acc;
}, {} as { [key: string]: string }))


const onSubmit = (event: Event) => {
    event.preventDefault();
    if (props.config.some(input => input.required && !new_value.value[input.label])) {
        //on envoi un message d'erreur
        return;
    } else {
        emit('update:data', new_value.value);
    }

};

const isText = ['text', 'password', 'email'];



</script>

<template>
    <form @submit="onSubmit">
        <template v-for="input, index in props.config" :key="index">
            <InputText v-if="isText.includes(input.type)" :label="input.label" v-model="new_value[input.label]" placeholder
                :type="input.type" :disabled="input.disabled" />
            <div class="avatar-form" v-if="input.type === 'img'">
                <InputText :label="input.label" v-model="new_value[input.label]" disabled />
                <img :src="new_value[input.label]" :alt="input.label" />
            </div>
            <InputBox v-if="input.type === 'checkbox' || input.type === 'radio'" :label="input.label"
                :options="input.options" :type="input.type" :disabled="input.disabled" v-model="new_value[input.label]" />
        </template>
        <div id="submit">
            <Button type="submit" label="Submit" />
        </div>
    </form>
</template>

<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 3rem;

    #submit {
        p {
            padding: .2rem 1rem;
            border-radius: 5px;
            color: var(--secondary-color);
            background-color: var(--ligther-danger-color);
        }

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}



.avatar-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    img {
        width: 70px;
        height: 70px;
        border: 1px solid var(--darker-primary-color);
        cursor: pointer;
    }
}
</style>
