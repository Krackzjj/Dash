<script setup lang="ts">
import { RouterView } from 'vue-router';
import { routes } from '@/routes';
import LateralBar from '@/components/layout/LateralBar.vue';



</script>

<template>
  <div class="container">
    <main>
      <LateralBar id="lateral" :routes="routes" />
      <div class="main-container">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <div>
              <Suspense>
                <component :is="Component"></component>
              </Suspense>
            </div>
          </template>
        </RouterView>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.main-container {
  display: flex;
}

main {
  display: grid;
  width: 100vw;
  grid-template-columns: 10vw 5fr;
  height: 100vh;

  #lateral {
    z-index: 100;
  }
}
</style>
