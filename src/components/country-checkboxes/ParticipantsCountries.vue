<template>
  <div class="participants-countries">
    <p>Countries to recruit participants from</p>
    <div class="country-fields">
      <label v-for="(country, index) in countries" :key="index" :for="country">
        <input type="checkbox" :id="country" :value="country" v-model="selectedCountries" />
        <span>{{ country }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'ParticipantsCountries',
  props: {
    countries: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  emits: ['selectedCountriesChanged'],
  setup(_, { emit }) {
    const selectedCountries = ref<string[]>([])

    watch(selectedCountries, (newValue) => {
      emit('selectedCountriesChanged', newValue)
    })

    return { selectedCountries }
  }
})
</script>
