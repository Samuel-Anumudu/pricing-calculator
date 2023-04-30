<template>
  <div class="study-summary-list">
    <ul class="selected-countries-list">
      <li v-show="selectedCountries.length !== 0">
        {{ selectedCountries?.length }}
        {{ selectedCountries?.length < 2 ? 'country' : 'countries' }} -
        <span v-for="(country, index) in selectedCountries" :key="index">{{
          (index ? ', ' : '') + country
        }}</span>
      </li>
    </ul>

    <ul class="selected-number-of-participants">
      <li v-show="numberOfParticipants">
        {{ numberOfParticipants }} + {{ additionalParticipants }} additional participants
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

    <ul class="selected-study-report">
      <li v-show="studyReportSelected">
        {{
          studyReportSelected === 'I will need a study report'
            ? 'Need study report and analysis'
            : 'No study report and analysis needed'
        }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'StudySummaryList',
  props: {
    selectedCountries: {
      type: Array as PropType<string[]>,
      required: true
    },
    numberOfParticipants: {
      type: [Number, null] as PropType<number | null>,
      required: false,
      default: null
    },
    additionalParticipants: {
      type: [Number, null] as PropType<number | null>,
      required: false,
      default: null
    },
    duration: {
      type: [Number, String] as PropType<number | String>,
      required: true,
      default: String
    },
    selectedStudyStructure: {
      type: String,
      required: true
    },
    studyModerationSelected: {
      type: String,
      required: true
    },
    projectManagementSelected: {
      type: String,
      required: true
    },
    studyTranscriptSelected: {
      type: String,
      required: true
    },
    studyReportSelected: {
      type: String,
      required: true
    }
  }
})
</script>
