<template>
  <div id="study-transcript">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'StudyTranscript',
  props: {
    initialSelect: {
      type: String as PropType<string>,
      default: ''
    }
  },
  emits: ['updateSelected'],
  setup(props, { emit }) {
    const studyTranscriptSelected = ref<string>(props.initialSelect)
    const updateStudyTranscriptSelected = () => {
      emit('updateSelected', studyTranscriptSelected.value)
    }
    return { studyTranscriptSelected, updateStudyTranscriptSelected }
  }
})
</script>
