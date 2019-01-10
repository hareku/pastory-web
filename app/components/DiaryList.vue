<template>
  <div>
    <template v-if="diaries.length > 0">
      <div
        v-for="diary in diaries"
        :key="diary.id">
        <DiaryListCard :diary="diary" />
        <v-divider />
      </div>
    </template>

    <template v-else>
      <v-card>
        <v-card-text>
          <div class="grey--text subheading">まだ日記はありません。</div>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script>
import DiaryListCard from './DiaryListCard'
import { mapGetters } from 'vuex'

export default {
  components: { DiaryListCard },

  computed: {
    ...mapGetters({
      diaries: 'diariesOrderedByDate'
    })
  }
}
</script>
