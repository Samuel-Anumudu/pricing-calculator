<template>
  <main>
    <section id="form-section">
      <div>
        <h1 class="header-text">Pricing calculator</h1>
        <p>Calculate how much it will cost to conduct a Kimoyo Research Study.</p>
      </div>
      <form>
        <ServicePlans
          :servicePlan="servicePlan"
          @updateServicePlan:servicePlan="onChangeServicePlan"
          :key="resetInstance"
        />

        <ParticipantsCountries
          :countries="countries"
          @selectedCountriesChanged="onSelectedCountriesChanged"
          :key="resetInstance"
        />
        <NumberOfParticipants @updateNumberOfParticipants="onInputsUpdated" :key="resetInstance" />

        <StudyDuration
          :initialDuration="duration"
          @updateDuration="onUpdateDuration"
          :key="resetInstance"
        />

        <StudyStructure
          :servicePlan="servicePlan"
          :initialStudyStructure="selectedStudyStructure"
          @updateStudyStructure="onStudyStructureSelected"
          :key="resetInstance"
        />

        <StudyModeration
          :initialStudyModeration="studyModerationSelected"
          @updateStudyModeration="onUpdateStudyModeration"
          :key="resetInstance"
        />

        <ProjectManagement
          :initialSelect="projectManagementSelected"
          @updateSelected="onUpdateSelectedProjectManagement"
          :key="resetInstance"
        />

        <StudyTranscript
          :initialSelect="studyTranscriptSelected"
          @updateSelected="onUpdateStudyTranscript"
          :key="resetInstance"
        />

        <ResetButton text="Reset pricing selection" @click="resetFields" />
      </form>
    </section>

    <!-- Refactor this into a component later: beginning line -->
    <section id="cost-section">
      <div class="total-cost">
        <p>Total Cost</p>
        <h1>USD {{ totalCost }}.00</h1>
      </div>
      <div class="study-summary">
        <h3>Study summary</h3>
        <p v-if="!servicePlan">
          Your study summary will be displayed here based on your selection.
        </p>
        <p v-else>Based on your study selection on our {{ servicePlan }} plan</p>

        <div class="selections">
          <ul class="selected-countries-list">
            <li v-show="selectedCountries.length !== 0">
              {{ selectedCountries.length }}
              {{ selectedCountries.length < 2 ? 'country' : 'countries' }} -
              <span v-for="(country, index) in selectedCountries" :key="index">{{
                (index ? ', ' : '') + country
              }}</span>
            </li>
          </ul>

          <ul class="selected-number-of-participants">
            <li v-show="numberOfparticipants">
              {{ numberOfparticipants }} + {{ additionalParticipants }} additional participants
            </li>
          </ul>

          <ul class="selected-study-session">
            <li v-show="duration">{{ duration }} minutes study session</li>
          </ul>

          <ul class="selected-study-structure">
            <li v-show="selectedStudyStructure">{{ selectedStudyStructure }}</li>
          </ul>

          <ul class="selected-study-moderation">
            <li v-show="studyModerationSelected">{{ studyModerationSelected }}</li>
          </ul>

          <ul class="selected-project-management">
            <li v-show="projectManagementSelected">
              {{
                projectManagementSelected === 'I will prepare my discussion guide'
                  ? 'Project management & discussion guide preparation not needed'
                  : 'Project management & discussion guide preparation needed'
              }}
            </li>
          </ul>

          <ul class="selected-study-transcript">
            <li v-show="studyTranscriptSelected">
              {{
                studyTranscriptSelected === 'I will need transcripts'
                  ? 'Transcripts needed'
                  : 'No transcripts needed'
              }}
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- Refactor this into a component later: ending line -->
  </main>
</template>

<script lang="ts">
import ServicePlans from '@/components/service-plans/ServicePlans.vue'
import ParticipantsCountries from '@/components/countries/ParticipantsCountries.vue'
import NumberOfParticipants from '@/components/participants/NumberOfParticipants.vue'
import StudyDuration from '@/components/dropdowns/StudyDuration.vue'
import StudyStructure from '@/components/dropdowns/StudyStructure.vue'
import StudyModeration from '@/components/dropdowns/StudyModeration.vue'
import ProjectManagement from '@/components/dropdowns/ProjectManagement.vue'
import StudyTranscript from '@/components/dropdowns/StudyTranscript.vue'
import ResetButton from '@/components/ui/ResetButton.vue'

import { defineComponent, ref, computed, watch, watchEffect } from 'vue'
export default defineComponent({
  name: 'MainSection',
  components: {
    ServicePlans,
    ParticipantsCountries,
    NumberOfParticipants,
    StudyDuration,
    StudyStructure,
    StudyModeration,
    ProjectManagement,
    StudyTranscript,
    ResetButton
  },

  setup(_, { emit }) {
    // Service plans radio inputs
    const servicePlan = ref<string>('')
    // Selected countries checkbox inputs
    const selectedCountries = ref<string[]>([])
    // Unmount the instance of components when there's a reset
    const resetInstance = ref(0)
    // Number of participantss inputs
    const numberOfparticipants = ref<number | null>(null)
    const additionalParticipants = ref<number | null>(null)
    // List of countries
    const countries = ref(['Nigeria', 'Ghana', 'Senegal', 'South Africa', 'Kenya'])
    // Study Session Initial Duration
    const duration = ref<string>('')
    // Study Structure selected
    const selectedStudyStructure = ref<string>('')
    // Study Moderation selected
    const studyModerationSelected = ref<string>('')
    // Project management and discussion prep selected
    const projectManagementSelected = ref<string>('')
    // Study Transcript for each session
    const studyTranscriptSelected = ref<string>('')
    // Form completed ref
    const isFormCompleted = ref(false)

    // Methods
    const onStudyStructureSelected = (selectedValue: string) => {
      selectedStudyStructure.value = selectedValue
    }

    const onUpdateStudyModeration = (selectedModeration: string) => {
      studyModerationSelected.value = selectedModeration
    }

    const onUpdateStudyTranscript = (selectedStudyTranscript: string) => {
      studyTranscriptSelected.value = selectedStudyTranscript
    }

    const onUpdateSelectedProjectManagement = (selectedProjectManagement: string) => {
      projectManagementSelected.value = selectedProjectManagement
    }
    const onUpdateDuration = (value: string) => {
      duration.value = value
    }
    const onChangeServicePlan = (newVal: string) => {
      servicePlan.value = newVal
    }

    const onSelectedCountriesChanged = (newValue: string[]) => {
      selectedCountries.value = newValue
    }

    const onInputsUpdated = (values: {
      numberOfparticipants: number
      additionalParticipants: number
    }) => {
      numberOfparticipants.value = values.numberOfparticipants
      additionalParticipants.value = values.additionalParticipants
    }

    const resetFields = () => {
      resetInstance.value += 1
      servicePlan.value = ''
      duration.value = ''
      selectedStudyStructure.value = ''
      studyModerationSelected.value = ''
      studyTranscriptSelected.value = ''
      projectManagementSelected.value = ''
      numberOfparticipants.value = null
      additionalParticipants.value = null
      selectedCountries.value = []
    }

    // Computed Calculations
    const countryCost = computed(() => {
      return selectedCountries.value.length * 1
    })

    const durationCost = computed((value: number) => {
      if (duration.value) {
        let allParticipants: number = numberOfparticipants.value! + additionalParticipants.value!
        if (duration.value === '30') {
          value = Math.round(0.5 * allParticipants)
        } else if (duration.value === '60') {
          value = Math.round(1 * allParticipants)
        } else if (duration.value === '90') {
          value = Math.round(1.5 * allParticipants)
        }
      }
      return value
    })

    const studyStructureCost = computed((value: number) => {
      if (selectedStudyStructure.value === 'face-to-face study') {
        value = 1
      }
      return value
    })

    const studyTranscriptCost = computed((value: number) => {
      if (studyTranscriptSelected.value === 'I will need transcripts') {
        value = 2
      }
      return value
    })

    const studyModerationCost = computed((value: number) => {
      if (studyModerationSelected.value === 'Kimoyo moderates') {
        value = 2
      }
      return value
    })

    const projectManagementCost = computed((value: number) => {
      if (projectManagementSelected.value === 'I need help preparing discussion guide') {
        value = 1
      }
      return value
    })
    // Calculate the total cost
    const totalCost = computed(() => {
      const costPerCountry = countryCost.value || 0
      const costPerDuration = durationCost.value || 0
      const costPerStudyStructure = studyStructureCost.value || 0
      const costPerStudyModeration = studyModerationCost.value || 0
      const costPerProjectManagement = projectManagementCost.value || 0
      const costPerStudyTranscript = studyTranscriptCost.value || 0
      return (
        costPerCountry +
        costPerDuration +
        costPerStudyStructure +
        costPerStudyModeration +
        costPerProjectManagement +
        costPerStudyTranscript
      )
    })

    // watchers
    // Watch for changes to servicePlan and update selectedStudyStructure
    watch(servicePlan, (newVal) => {
      if (newVal === 'standard') {
        selectedStudyStructure.value = 'Online study'
      } else {
        selectedStudyStructure.value = ''
      }
    })

    //  servicePlan.value = ''
    //   duration.value = ''
    //   selectedStudyStructure.value = ''
    //   studyModerationSelected.value = ''
    //   studyTranscriptSelected.value = ''
    //   projectManagementSelected.value = ''
    //   numberOfparticipants.value = null
    //   additionalParticipants.value = null
    //   selectedCountries.value = []

    // Watch for when form is completely filled and all values received
    const computeIsFormCompleted = computed((): boolean => {
      if (
        servicePlan.value &&
        selectedCountries.value &&
        numberOfparticipants.value &&
        additionalParticipants.value &&
        duration.value &&
        selectedStudyStructure.value &&
        studyModerationSelected.value &&
        projectManagementSelected.value &&
        studyTranscriptSelected.value
        // should add more here -----------
      ) {
        return true
      }

      return false
    })
    watchEffect(() => {
      const completed = computeIsFormCompleted.value
      isFormCompleted.value = completed
      if (completed) {
        emit('formCompleted', true)
      } else {
        emit('formCompleted', false)
      }
    })

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      servicePlan,
      totalCost,
      selectedCountries,
      resetInstance,
      countries,
      numberOfparticipants,
      additionalParticipants,
      duration,
      durationCost,
      selectedStudyStructure,
      studyModerationSelected,
      studyTranscriptSelected,
      projectManagementSelected,
      onUpdateSelectedProjectManagement,
      onUpdateDuration,
      onUpdateStudyModeration,
      onUpdateStudyTranscript,
      onStudyStructureSelected,
      onChangeServicePlan,
      onSelectedCountriesChanged,
      onInputsUpdated,
      resetFields
    }
  }
})
</script>

function emit(arg0: string, value: boolean) { throw new Error('Function not implemented.') }
