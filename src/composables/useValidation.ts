import { ref, watch } from 'vue'
export const useValidation = (value: any, condition: any) => {

    type Error = {
        message: string
    }
    const errors = ref<Error[]>([])

    watch(value, () => {
        errors.value = []
        if (condition['length']) {
            validatelength()
        }
    })


    const validatelength = () => {
        let min = condition['length'][0]
        let max = condition['length'][1]
        if (value.length < min || value.length > max) {
            return false
        } else {
            return errors.value = [...errors.value, { message: `Length must be between ${min} and ${max}` }]
        }
    }

    return {
        validatelength,
        errors
    }

}