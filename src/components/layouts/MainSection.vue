<template>
  <main>
    <div class="main-container">
      <section class="form-section">
        <div class="container">
          <div class="pricing-calculator-text">
            <h1>Pricing calculator</h1>
            <p>Calculate how much it will cost to conduct a Kimoyo Research Study.</p>
          </div>
          <form>
            <div class="form-fields">
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
              <NumberOfParticipants
                @updateNumberOfParticipants="onInputsUpdated"
                :key="resetInstance"
              />

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
                :servicePlan="servicePlan"
                :initialStudyModeration="studyModerationSelected"
                @updateStudyModeration="onUpdateStudyModeration"
                :key="resetInstance"
              />

              <ProjectManagement
                :servicePlan="servicePlan"
                :initialSelect="projectManagementSelected"
                @updateSelected="onUpdateSelectedProjectManagement"
                :key="resetInstance"
              />

              <StudyTranscript
                :servicePlan="servicePlan"
                :initialSelect="studyTranscriptSelected"
                @updateSelected="onUpdateStudyTranscript"
                :key="resetInstance"
              />

              <StudyReport
                :servicePlan="servicePlan"
                :initialSelect="studyReportSelected"
                @updateStudyReport="onUpdateStudyReport"
                :key="resetInstance"
              />
            </div>

            <ResetButton text="Reset pricing selection" @click="resetFields" />
          </form>
        </div>
      </section>
      <section class="total-cost-section">
        <div class="total-cost">
          <div class="container">
            <p>Total Cost</p>
            <h1>USD {{ totalCost }}.00</h1>
          </div>
        </div>
        <div class="study-summary">
          <div class="container">
            <h3>Study summary</h3>
            <p v-if="!servicePlan">
              Your study summary will be displayed here based on your selection.
            </p>
            <p v-else>Based on your study selection on our {{ servicePlan }} plan</p>

            <StudySummaryList
              :selectedCountries="selectedCountries"
              :numberOfParticipants="numberOfParticipants"
              :additionalParticipants="additionalParticipants"
              :duration="duration"
              :selectedStudyStructure="selectedStudyStructure"
              :studyModerationSelected="studyModerationSelected"
              :projectManagementSelected="projectManagementSelected"
              :studyTranscriptSelected="studyTranscriptSelected"
              :studyReportSelected="studyReportSelected"
            />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import ServicePlans from '@/components/service-plan-radios/ServicePlans.vue'
import ParticipantsCountries from '@/components/country-checkboxes/ParticipantsCountries.vue'
import NumberOfParticipants from '@/components/participant-numbers/NumberOfParticipants.vue'
import StudyDuration from '@/components/study-dropdowns/StudyDuration.vue'
import StudyStructure from '@/components/study-dropdowns/StudyStructure.vue'
import StudyModeration from '@/components/study-dropdowns/StudyModeration.vue'
import ProjectManagement from '@/components/study-dropdowns/ProjectManagement.vue'
import StudyTranscript from '@/components/study-dropdowns/StudyTranscript.vue'
import StudyReport from '@/components/study-dropdowns/StudyReport.vue'
import StudySummaryList from '@/components/study-summary-list/StudySummaryList.vue'
import ResetButton from '@/components/ui/ResetButton.vue'

import { defineComponent, ref, computed, watch, watchEffect } from 'vue'
export default defineComponent({
  name: 'MainSection',
  components: {
    StudySummaryList,
    ServicePlans,
    ParticipantsCountries,
    NumberOfParticipants,
    StudyDuration,
    StudyStructure,
    StudyModeration,
    ProjectManagement,
    StudyTranscript,
    StudyReport,
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
    const numberOfParticipants = ref<number | null>(null)
    const additionalParticipants = ref<number | null>(null)
    // List of countries
    const countries = ref(['Country 01', 'Country 02', 'Country 03', 'Country 04', 'Country 05'])
    // Study Session Duration ref
    const duration = ref<string>('')
    // Study Structure ref
    const selectedStudyStructure = ref<string>('')
    // Study Moderation ref
    const studyModerationSelected = ref<string>('')
    // Project management and discussion prep ref
    const projectManagementSelected = ref<string>('')
    // Study Transcript ref
    const studyTranscriptSelected = ref<string>('')
    // Study Report ref
    const studyReportSelected = ref<string>('')
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

    const onUpdateStudyReport = (selectedStudyReport: string) => {
      studyReportSelected.value = selectedStudyReport
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
      numberOfParticipants: number
      additionalParticipants: number
    }) => {
      numberOfParticipants.value = values.numberOfParticipants
      additionalParticipants.value = values.additionalParticipants
    }

    const resetFields = () => {
      resetInstance.value += 1
      servicePlan.value =
        duration.value =
        selectedStudyStructure.value =
        studyModerationSelected.value =
        studyTranscriptSelected.value =
        studyReportSelected.value =
        projectManagementSelected.value =
          ''
      numberOfParticipants.value = additionalParticipants.value = null
      selectedCountries.value = []
    }

    // Computed Calculations
    const countryCost = computed((): number => {
      const multiplier =
        servicePlan.value === 'standard' ? 2 : servicePlan.value === 'premium' ? 3 : 1
      return selectedCountries.value.length * multiplier
    })

    /*
    VERSION 2
   const countryCost = computed((): number => {
     if (servicePlan.value === 'standard') {
       return selectedCountries.value.length * 2
     } else if (servicePlan.value === 'premium') {
       return selectedCountries.value.length * 3
     } else return selectedCountries.value.length * 1
   })
    */

    const durationCost = computed((): number => {
      let durationMultiplier = 0
      const participants = numberOfParticipants.value! + additionalParticipants.value!
      if (duration.value) {
        durationMultiplier = duration.value === '30' ? 0.5 : duration.value === '60' ? 1 : 1.5
      }
      const planMultiplier = servicePlan.value === 'standard' ? 2 : 1
      return Math.round(durationMultiplier * planMultiplier * participants)
    })

    /*
VERSION 2
    const durationCost = computed((value: number) => {
      let participants: number = numberOfParticipants.value! + additionalParticipants.value!
      if (duration.value === '30') {
        if (servicePlan.value === 'standard') {
          value = Math.round(0.5 * 2 * participants)
        } else {
          value = Math.round(0.5 * participants)
        }
      } else if (duration.value === '60') {
        if (servicePlan.value === 'standard') {
          value = Math.round(1 * 2 * participants)
        } else {
          value = Math.round(1 * participants)
        }
      } else if (duration.value === '90') {
        if (servicePlan.value === 'standard') {
          value = Math.round(1.5 * 2 * participants)
        } else {
          value = Math.round(1.5 * participants)
        }
      }
      return value
    })
*/

    const studyStructureCost = computed((): number => {
      if (selectedStudyStructure.value === 'face-to-face study') {
        return servicePlan.value === 'standard' ? 2 : servicePlan.value === 'premium' ? 3 : 1
      }
      return 0
    })

    const studyTranscriptCost = computed((): number => {
      if (studyTranscriptSelected.value === 'I will need transcripts') {
        return servicePlan.value === 'standard' ? 4 : servicePlan.value === 'premium' ? 6 : 2
      }
      return 0
    })

    const studyModerationCost = computed((): number => {
      if (studyModerationSelected.value === 'Kimoyo moderates') {
        return servicePlan.value === 'standard' ? 4 : servicePlan.value === 'premium' ? 6 : 2
      }
      return 0
    })

    const projectManagementCost = computed((): number => {
      if (projectManagementSelected.value === 'I need help preparing discussion guide') {
        return servicePlan.value === 'standard' ? 2 : servicePlan.value === 'premium' ? 3 : 1
      }
      return 0
    })

    const studyReportCost = computed((): number => {
      if (studyReportSelected.value === 'I will need a study report') {
        return servicePlan.value === 'standard' ? 10 : servicePlan.value === 'premium' ? 15 : 5
      }
      return 0
    })

    // Calculate the total cost
    const totalCost = computed((): number => {
      return [
        countryCost.value,
        durationCost.value,
        studyStructureCost.value,
        studyModerationCost.value,
        projectManagementCost.value,
        studyTranscriptCost.value,
        studyReportCost.value
      ].reduce((sum, cost) => sum + (cost || 0), 0)
    })

    const computeIsFormCompleted = computed((): boolean => {
      return !(
        !servicePlan.value ||
        !selectedCountries.value ||
        !numberOfParticipants.value ||
        !duration.value ||
        !selectedStudyStructure.value ||
        !studyModerationSelected.value ||
        !projectManagementSelected.value ||
        !studyTranscriptSelected.value ||
        !studyReportSelected.value
      )
    })

    // watchers

    // Watch for changes to servicePlan (standard) and update selectedStudyStructure
    watch(servicePlan, (newVal: string) => {
      if (newVal === 'standard') {
        selectedStudyStructure.value = 'Online study'
      } else {
        selectedStudyStructure.value = ''
      }
    })

    // Watch for changes to servicePlan (premium) and update inputs values
    watch(servicePlan, (newVal: string) => {
      if (newVal === 'premium') {
        studyModerationSelected.value = 'Kimoyo moderates'
        projectManagementSelected.value = 'I need help preparing discussion guide'
        studyTranscriptSelected.value = 'I will need transcripts'
        studyReportSelected.value = 'I will need a study report'
      } else {
        studyModerationSelected.value = ''
        projectManagementSelected.value = ''
        studyTranscriptSelected.value = ''
        studyReportSelected.value = ''
      }
    })

    // Watch for when form is completely filled and all values received
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
      numberOfParticipants,
      additionalParticipants,
      duration,
      durationCost,
      selectedStudyStructure,
      studyModerationSelected,
      studyTranscriptSelected,
      studyReportSelected,
      projectManagementSelected,
      onUpdateSelectedProjectManagement,
      onUpdateDuration,
      onUpdateStudyModeration,
      onUpdateStudyTranscript,
      onUpdateStudyReport,
      onStudyStructureSelected,
      onChangeServicePlan,
      onSelectedCountriesChanged,
      onInputsUpdated,
      resetFields
    }
  }
})
</script>
