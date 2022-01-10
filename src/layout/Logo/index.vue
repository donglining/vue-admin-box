<template>
  <div class="logo-container">
    <h1 v-if="!isCollapse">{{ $t(systemTitle) }}</h1>
    <img v-else src="@/assets/logo.png" class="logo-img" alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { systemTitle } from '@/config'
export default defineComponent({
  setup() {
    const store = useStore()
    const isCollapse = computed(() => store.state.app.isCollapse)
    return {
      isCollapse,
      systemTitle
    }
  }
})
</script>

<style lang="scss" scoped>
  .logo-container {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: var(--system-logo-background);
    h1 {
      font-size: 18px;
      white-space: nowrap;
      color: var(--system-logo-color);
    }
  }
  .logo-img{
    height: 60%;
  }
</style>