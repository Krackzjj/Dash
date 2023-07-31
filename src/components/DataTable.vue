<script setup lang="ts">
import { formatDate } from '@/utils/date.ts';



interface Props {
    headers: {
        type: string;
        label?: string;
    }[];
    data: any;
    actions?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    actions: true,
});


</script>

<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th v-for="header in props.headers" :key="header.type">{{ header.label ? header.label :
                        (header.type).replace('_', ' ') }}</th>
                    <th v-if="props.actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.id">
                    <td v-for="header in headers" :key="header.type">
                        <span v-if="header.type === 'created_at' || header.type === 'updated_at'">{{
                            formatDate(item[header.type]) }}</span>
                        <span v-else>{{ item[header.type] }}</span>
                    </td>
                    <td class="action-btn" v-if="props.actions">
                        <Button class="btn" sm label="Edit" color="warning" />
                        <Button class="btn" sm label="Delete" color="danger" />
                        <Button class="btn" sm label="Link" icon="icon-link" color="info" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<style scoped lang="scss">
.table-container {
    width: 100%;
    max-height: 85vh;
    overflow-y: scroll;
}

table {
    width: 100%;
    border-collapse: collapse;

    thead {
        position: sticky;
        background-color: white;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
        top: 0;
    }

    th {
        text-transform: capitalize;

        &:last-child {
            width: 20%;
            text-align: center;
        }
    }

    th,
    td {
        text-align: left;
        padding: 0.5rem;
    }

    .action-btn {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
    }
}
</style>