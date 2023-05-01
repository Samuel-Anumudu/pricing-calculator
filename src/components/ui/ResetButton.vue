<template>
  <button class="reset-btn" type="button">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ResetButton',

  props: {
    text: {
      type: String,
      required: true
    }
  }
})
</script>
