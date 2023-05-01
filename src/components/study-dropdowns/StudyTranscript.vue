<template>
  <div class="study-transcript">
    <label for="studyTranscript"> Need transcripts from each session? </label>
    <select
      id="studyTranscript"
      v-model="studyTranscriptSelected"
      @change="updateStudyTranscriptSelected"
    >
      <option value="">— Select</option>
      <option value="I will need transcripts">I will need transcripts</option>
      <option value="I don't need transcripts">I don't need transcripts</option>
    </select>
    <small>Do you need help from Kimoyo transcribing each session?</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'StudyTranscript',
  props: {
    initialSelect: {
      type: String as PropType<string>,
      default: ''
    },
    servicePlan: {
      type: String as PropType<string>,
      required: true
    }
  },
  emits: ['updateSelected'],
  setup(props, { emit }) {
    const studyTranscriptSelected = ref<string>(props.initialSelect)

    const servicePlanRef = toRef(props, 'servicePlan')

    const updateStudyTranscriptSelected = () => {
      emit('updateSelected', studyTranscriptSelected.value)
    }

    watch(servicePlanRef, (newServicePlan) => {
      if (newServicePlan === 'premium') {
        studyTranscriptSelected.value = 'I will need transcripts'
      } else {
        studyTranscriptSelected.value = ''
      }
    })

    return { studyTranscriptSelected, updateStudyTranscriptSelected }
  }
})
</script>
