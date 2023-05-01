<template>
  <div class="study-duration">
    <label for="duration-dropdown">Duration of each study session</label>
    <select id="duration-dropdown" v-model="selectedDuration" @change="updateDuration">
      <option value="">— Select study session duration</option>
      <option value="30">30 minutes interview</option>
      <option value="60">60 minutes interview</option>
      <option value="90">90 minutes interview</option>
    </select>
    <small>How long will each study session last?</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'StudyDuration',
  props: {
    initialDuration: {
      type: String as PropType<string>,
      default: ''
    }
  },
  emits: ['updateDuration'],
  setup(props, { emit }) {
    const selectedDuration = ref<string>(props.initialDuration)

    const updateDuration = () => {
      emit('updateDuration', selectedDuration.value)
    }

    return { selectedDuration, updateDuration }
  }
})
</script>
