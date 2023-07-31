<script setup lang="ts">



</script>
<template>
    <div class="container">
        <ul>
            <li>
                <Card />
            </li>
        </ul>
        <div class="user-desc">
            <h1>USER INFO</h1>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

ul {
    flex: 1;
    list-style: none;
    padding: 0;
}

.user-desc {
    flex: 2;
    border: 2px solid var(--primary-color);
    border-radius: 5px;
    padding: 1rem;
}
</style>
