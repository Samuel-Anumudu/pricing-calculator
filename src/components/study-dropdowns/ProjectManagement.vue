<template>
  <div class="project-management">
    <label for="projectManagement"> Project management & discussion guide prep </label>
    <select
      id="projectManagement"
      v-model="projectManagementSelected"
      @change="updateProjectManagementSelected"
    >
      <option value="">— Select</option>
      <option value="I will prepare my discussion guide">I will prepare my discussion guide</option>
      <option value="I need help preparing discussion guide">
        I need help preparing discussion guide
      </option>
    </select>
    <small>Do you need help from Kimoyo with a discussion prep?</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch } from 'vue'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'ProjectManagement',
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
    const projectManagementSelected = ref<string>(props.initialSelect)
    const servicePlanRef = toRef(props, 'servicePlan')

    const updateProjectManagementSelected = () => {
      emit('updateSelected', projectManagementSelected.value)
    }

    watch(servicePlanRef, (newServicePlan) => {
      if (newServicePlan === 'premium') {
        projectManagementSelected.value = 'I need help preparing discussion guide'
      } else {
        projectManagementSelected.value = ''
      }
    })
    return { projectManagementSelected, updateProjectManagementSelected }
  }
})
</script>
