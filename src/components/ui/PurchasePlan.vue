<template>
  <button class="purchase-plan-btn" type="button">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PurchasePlan',

  props: {
    text: {
      type: String,
      required: true
    }
  }
})
</script>
