<template>
  <div>
    <button type="button">{{ text }}</button>
  </div>
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
