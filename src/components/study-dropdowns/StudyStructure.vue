<template>
  <div class="study-structure">
    <label for="studyStructure">Study structure</label>
    <select v-model="selectedStudyStructure" id="studyStructure" @change="updateStudyStructure">
      <option value="">— Select study structure</option>
      <option value="Online study">Online study</option>
      <option value="face-to-face study">face-to-face study</option>
    </select>
    <small>Will this be an online study or physical study?</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'StudyStructure',
  props: {
    initialStudyStructure: {
      type: String as PropType<string>,
      default: ''
    },
    servicePlan: {
      type: String as PropType<string>,
      required: true
    }
  },
  emits: ['updateStudyStructure'],

  setup(props, { emit }) {
    const selectedStudyStructure = ref<string>(props.initialStudyStructure)
    const servicePlanRef = toRef(props, 'servicePlan')

    const updateStudyStructure = () => {
      emit('updateStudyStructure', selectedStudyStructure.value)
    }

    watch(servicePlanRef, (newServicePlan) => {
      if (newServicePlan === 'standard') {
        selectedStudyStructure.value = 'Online study'
      } else {
        selectedStudyStructure.value = ''
      }
    })

    // eslint-disable-next-line vue/no-dupe-keys
    return { selectedStudyStructure, updateStudyStructure, servicePlan: servicePlanRef }
  }
})
</script>
