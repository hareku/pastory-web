<template>
  <div class="page">
    <v-container>
      <LoadingView v-if="!isLoaded"/>
      <GuestView v-else-if="!user" />

      <template v-else>
        <UserInfo/>
        <DiaryCreateCard class="mt-3"/>
        <DiaryList class="mt-4" />
      </template>
    </v-container>
  </div>
</template>

<script>
import auth from '~/plugins/auth'
import LoadingView from '~/components/LoadingView'
import GuestView from '~/components/GuestView'
import DiaryList from '~/components/DiaryList'
import UserInfo from '~/components/UserInfo'
import DiaryCreateCard from '~/components/DiaryCreateCard'
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  components: { LoadingView, DiaryCreateCard, GuestView, UserInfo, DiaryList },

  computed: {
    ...mapState(['user', 'isLoaded'])
  },

  async mounted() {
    try {
      let user
      if (!this.user) user = await auth()

      if (user) {
        this.setUser({ user })
        await this.fetchDiaries()
      }
    } catch (e) {
      window.alert(e)
      this.setUser({ user: null })
    } finally {
      this.setIsLoaded(true)
    }
  },

  methods: {
    ...mapMutations(['setUser', 'setIsLoaded']),
    ...mapActions(['fetchDiaries'])
  },
}
</script>

<style>
.page {
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
}
</style>
