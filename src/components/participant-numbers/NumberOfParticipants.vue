<template>
  <div id="number-of-participants">
    <div class="participants-field">
      <label for="numberOfParticipants">Number of participants</label>
      <input
        type="number"
        id="numberOfParticipants"
        placeholder="00"
        :value="numberOfParticipantsValue"
        @input="handleNumberOfParticipantsInput"
      />
      <small>A minimum of 4 participants is needed for a study</small>
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
      <small>This must be at least 20% of total participants</small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, watchEffect } from 'vue'

export default defineComponent({
  name: 'NumberOfParticipants',
  emits: ['updateNumberOfParticipants'],
  setup(_, { emit }) {
    const numberOfParticipants = ref<number | null>(null)
    const additionalParticipants = ref<number | null>(null)

    const numberOfParticipantsValue = computed({
      get: () => numberOfParticipants.value?.toString() || '',
      set: (value: string) => {
        const parsedValue = parseInt(value)
        if (!isNaN(parsedValue) && parsedValue >= 0) {
          numberOfParticipants.value = parsedValue
        } else {
          numberOfParticipants.value = null
        }
      }
    })

    watch(numberOfParticipants, (newValue) => {
      if (Number.isInteger(newValue) && newValue! >= 0) {
        additionalParticipants.value = Math.floor(newValue! * 0.2)
      } else {
        additionalParticipants.value = null
      }

      emit('updateNumberOfParticipants', {
        numberOfParticipants: newValue,
        additionalParticipants: additionalParticipants.value
      })
    })
    watchEffect(() => {
      if (!numberOfParticipants.value) {
        additionalParticipants.value = null
      }
    })

    const updateAdditionalParticipants = () => {
      if (numberOfParticipants.value) {
        additionalParticipants.value = Math.floor(numberOfParticipants.value * 0.2)
      } else {
        additionalParticipants.value = null
      }
    }

    const handleNumberOfParticipantsInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target) {
        const parsedValue = parseFloat(target.value)
        if (isNaN(parsedValue) || parsedValue < 0 || !Number.isInteger(parsedValue)) {
          target.value = ''
          numberOfParticipants.value = null
        } else {
          numberOfParticipantsValue.value = target.value
          updateAdditionalParticipants()
          emit('updateNumberOfParticipants', {
            numberOfParticipants: numberOfParticipants.value,
            additionalParticipants: additionalParticipants.value
          })
        }
      }
    }

    return {
      numberOfParticipants,
      additionalParticipants,
      numberOfParticipantsValue,
      handleNumberOfParticipantsInput
    }
  }
})
</script>
