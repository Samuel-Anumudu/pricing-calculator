<template>
  <header :class="{ 'form-completed': isFormCompleted }">
    <div class="container">
      <img src="../../assets/kimoyo.png" alt="Kimoyo logo" class="logo" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'HeaderSection',
  props: {
    isFormCompleted: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  }
})
</script>
