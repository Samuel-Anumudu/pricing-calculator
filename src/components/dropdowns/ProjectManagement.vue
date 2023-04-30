<template>
  <div id="project-management">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'ProjectManagement',
  props: {
    initialSelect: {
      type: String as PropType<string>,
      default: ''
    }
  },
  emits: ['updateSelected'],
  setup(props, { emit }) {
    const projectManagementSelected = ref<string>(props.initialSelect)

    const updateProjectManagementSelected = () => {
      emit('updateSelected', projectManagementSelected.value)
    }
    return { projectManagementSelected, updateProjectManagementSelected }
  }
})
</script>
