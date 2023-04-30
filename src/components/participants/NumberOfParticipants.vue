<template>
  <div id="number-of-participants">
    <div class="participants-field">
      <label for="numberOfparticipants">Number of participants</label>
      <input
        type="number"
        id="numberOfparticipants"
        placeholder="00"
        v-model="numberOfparticipants"
        @input="updateAdditionalParticipants"
      />
    </div>
    <div class="participants-field">
      <label for="additionalParticipants">Number of additional participants</label>
      <input
        type="number"
        id="additionalParticipants"
        placeholder="00"
        v-model="additionalParticipants"
        readonly
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'NumberOfParticipants',
  emits: ['updateNumberOfParticipants'],
  setup(_, { emit }) {
    const numberOfparticipants = ref<number | null>(null)
    const additionalParticipants = ref<number | null>(null)

    watch([numberOfparticipants, additionalParticipants], () => {
      if (numberOfparticipants.value! < 0) {
        numberOfparticipants.value = null
      }

      emit('updateNumberOfParticipants', {
        numberOfparticipants: numberOfparticipants.value,
        additionalParticipants: additionalParticipants.value
      })
    })

    const updateAdditionalParticipants = () => {
      if (numberOfparticipants.value) {
        additionalParticipants.value = Math.floor(numberOfparticipants.value * 0.2)
      } else {
        additionalParticipants.value = null
      }
    }

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      numberOfparticipants,
      // eslint-disable-next-line vue/no-dupe-keys
      additionalParticipants,
      updateAdditionalParticipants
    }
  }
})
</script>

<style scoped></style>
