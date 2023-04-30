<template>
  <HeaderSection :isFormCompleted="isFormCompleted" />
  <MainSection @formCompleted="onFormCompleted" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HeaderSection from './components/layouts/HeaderSection.vue'
import MainSection from './components/layouts/MainSection.vue'

export default defineComponent({
  name: 'App',
  components: {
    HeaderSection,
    MainSection
  },
  setup() {
    const isFormCompleted = ref<boolean>(false)

    const onFormCompleted = (completed: boolean) => {
      isFormCompleted.value = completed
    }

    return { isFormCompleted, onFormCompleted }
  }
})
</script>
