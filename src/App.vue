<template>
  <HeaderSection />
  <MainSection />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderSection from './components/layouts/HeaderSection.vue'
import MainSection from './components/layouts/MainSection.vue'

export default defineComponent({
  name: 'App',
  components: {
    HeaderSection,
    MainSection
  }
})
</script>
