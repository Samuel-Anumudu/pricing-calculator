<template>
  <div id="study-report">
    <label for="studyReport">Study report & analysis</label>
    <select id="studyReport" v-model="studyReportSelected" @change="updateStudyReport">
      <option value="">— Select study report & analysis</option>
      <option value="I will need a study report">I will need a study report</option>
      <option value="I don't need a study report">I don't need a study report</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'StudyReport',
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
  emits: ['updateStudyReport'],
  setup(props, { emit }) {
    const studyReportSelected = ref<string>(props.initialSelect)
    const servicePlanRef = toRef(props, 'servicePlan')

    const updateStudyReport = () => {
      emit('updateStudyReport', studyReportSelected.value)
    }

    watch(servicePlanRef, (newServicePlan: string) => {
      if (newServicePlan === 'premium') {
        studyReportSelected.value = 'I will need a study report'
      } else {
        studyReportSelected.value = ''
      }
    })

    return { studyReportSelected, updateStudyReport }
  }
})
</script>

<style scoped></style>
