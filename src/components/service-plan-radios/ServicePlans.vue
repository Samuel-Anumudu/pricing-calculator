<template>
  <div id="service-plans">
    <div class="service-plan-controls">
      <p>Select a Kimoyo service plan</p>
      <label for="basic">
        <input type="radio" id="basic" value="basic" v-model="selectedPlan" /> Basic
      </label>
      <label for="standard">
        <input type="radio" id="standard" value="standard" v-model="selectedPlan" /> Standard
      </label>
      <label for="premium">
        <input type="radio" id="premium" value="premium" v-model="selectedPlan" /> Premium
      </label>
    </div>
    <div class="service-plan-desc">
      <p v-if="servicePlan === 'basic'">
        📣 A description for a basic Kimoyo service plan and what it entails.
      </p>
      <p v-else-if="servicePlan === 'standard'">
        📣 A description for a standard Kimoyo service plan and what it entails.
      </p>
      <p v-else-if="servicePlan === 'premium'">
        📣 A description for a premium Kimoyo service plan and what it entails.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'ServicePlans',
  props: {
    servicePlan: {
      type: String as PropType<string> | null,
      default: ''
    }
  },
  emits: ['updateServicePlan:servicePlan'],

  setup(props, { emit }) {
    const selectedPlan = ref<string | null>(props.servicePlan)

    watch(selectedPlan, (newVal) => {
      emit('updateServicePlan:servicePlan', newVal)
    })

    return {
      selectedPlan
    }
  }
})
</script>
