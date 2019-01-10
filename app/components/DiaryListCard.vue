<template>
  <v-card flat>
    <v-card-title>
      <div class="body-2">{{ diary.date }}</div>
    </v-card-title>
    <template v-if="!editing">
      <v-card-text>{{ diary.body }}</v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="sendingDeletion"
          icon
          @click="editing = true">
          <v-icon color="grey">edit</v-icon>
        </v-btn>
        <v-btn
          :loading="sendingDeletion"
          icon
          @click="deleteDiary">
          <v-icon color="grey">delete_outline</v-icon>
        </v-btn>
      </v-card-actions>
    </template>

    <template v-else>
      <v-form @submit.prevent="updateDiary">
        <v-card-text>
          <v-textarea
            v-model="updatePayload.body"
            :disabled="sendingUpdate"
            class="pt-0"
            rows="5"
            counter="255"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="sendingUpdate"
            color="primary"
            flat
            @click="editing = false"
          >
            <span>キャンセル</span>
          </v-btn>
          <v-btn
            :loading="sendingUpdate"
            color="primary"
            flat
            @click="updateDiary"
          >
            <span>保存</span>
          </v-btn>
        </v-card-actions>
      </v-form>
    </template>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    diary: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      editing: false,
      sendingUpdate: false,
      sendingDeletion: false,
      updatePayload: {
        body: this.diary.body
      }
    }
  },

  methods: {
    ...mapActions({
      dispatchUpdateDiary: 'updateDiary',
      dispatchDeleteDiary: 'deleteDiary'
    }),

    async updateDiary() {
      if (this.diary.body === this.updatePayload.body) {
        this.editing = false
        return
      }

      try {
        this.sendingUpdate = true
        await this.dispatchUpdateDiary({
          diaryId: this.diary.id,
          input: this.updatePayload
        })
        this.editing = false
      } catch (e) {
        window.alert(e)
      } finally {
        this.sendingUpdate = false
      }
    },

    async deleteDiary() {
      if (!window.confirm(`${this.diary.date} の日記を削除しますか？`)) {
        return
      }

      try {
        this.sendingDeletion = true
        await this.dispatchDeleteDiary({ diaryId: this.diary.id })
      } catch (e) {
        window.alert(e)
      } finally {
        this.sendingDeletion = false
      }
    }
  }
}
</script>
