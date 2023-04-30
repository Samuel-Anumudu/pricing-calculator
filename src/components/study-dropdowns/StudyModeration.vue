<template>
  <div id="study-moderation">
    <label for="studyModeration"> Study moderation </label>
    <select id="studyModeration" v-model="studyModerationSelected" @change="updateStudyModeration">
      <option value="">— Select study moderation</option>
      <option value="I will moderate the sessions">I will moderate the sessions</option>
      <option value="Kimoyo moderates">Kimoyo moderates</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'StudyModeration',

  props: {
    initialStudyModeration: {
      type: String as PropType<string>,
      default: ''
    },
    servicePlan: {
      type: String as PropType<string>,
      required: true
    }
  },

  emits: ['updateStudyModeration'],
  setup(props, { emit }) {
    const studyModerationSelected = ref<string>(props.initialStudyModeration)
    const servicePlanRef = toRef(props, 'servicePlan')

    const updateStudyModeration = () => {
      emit('updateStudyModeration', studyModerationSelected.value)
    }

    watch(servicePlanRef, (newServicePlan) => {
      if (newServicePlan === 'premium') {
        studyModerationSelected.value = 'Kimoyo moderates'
      } else {
        studyModerationSelected.value = ''
      }
    })

    return { updateStudyModeration, studyModerationSelected }
  }
})
</script>

<style scoped></style>
