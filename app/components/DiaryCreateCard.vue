<template>
  <v-card>
    <v-form @submit.prevent="postNewDiary">
      <v-card-text>
        <v-dialog
          ref="dialog"
          v-model="dateModal"
          :return-value.sync="input.date"
          :disabled="sendingForm"
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="input.date"
            :disabled="sendingForm"
            label="いつの日？"
            prepend-icon="event"
            readonly
          />
          <v-date-picker
            v-model="input.date"
            :day-format="date => new Date(date).getDate()"
            :allowed-dates="allowedDates"
            :disabled="sendingForm"
            scrollable
            locale="ja"
          >
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click="dateModal = false"
            >キャンセル</v-btn>
            <v-btn
              flat
              color="primary"
              @click="$refs.dialog.save(input.date)"
            >完了</v-btn>
          </v-date-picker>
        </v-dialog>

        <v-textarea
          v-model="input.body"
          :disabled="sendingForm"
          label="この日のできごと"
          rows="5"
          counter="255"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          :loading="sendingForm"
          :disabled="!canSubmit"
          color="primary"
          @click="postNewDiary()"
        >
          <v-icon left>check</v-icon>
          <span>記録する</span>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      dateModal: false,
      sendingForm: false,
      input: {
        date: null,
        body: ''
      }
    }
  },

  computed: {
    ...mapState(['diaries']),

    today: () => new Date().toISOString().substr(0, 10),

    canSubmit() {
      return !!this.input.body && !!this.input.date
    }
  },

  created() {
    if (!this.diaries.some(diary => diary.date === this.today)) {
      this.input.date = this.today
    }
  },

  methods: {
    ...mapActions({
      dispatchPostNewDiary: 'postNewDiary'
    }),

    allowedDates(date) {
      if (date > this.today) {
        return false
      }

      return !this.diaries.some(diary => diary.date === date)
    },

    async postNewDiary() {
      if (!this.canSubmit) {
        return
      }

      try {
        this.sendingForm = true
        await this.dispatchPostNewDiary({ input: this.input })

        this.input.date = null
        this.input.body = ''
      } catch (e) {
        window.alert(e)
      } finally {
        this.sendingForm = false
      }
    }
  }
}
</script>
