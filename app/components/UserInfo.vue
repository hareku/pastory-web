<template>
  <div class="user-info">
    <div class="mr-2">
      <v-avatar :size="40">
        <img
          :src="user.photoURL"
          alt="">
      </v-avatar>
    </div>

    <div class="mr-2">{{ user.displayName }}</div>

    <div class="ml-auto">
      <v-btn
        flat
        small
        color="grey"
        @click="logout">ログアウト</v-btn>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['user'])
  },

  methods: {
    ...mapMutations(['setUser', 'setIsLoaded']),

    logout() {
      if (!window.confirm('ログアウトしますか？')) {
        return
      }

      firebase.auth().signOut().then(() => {
        this.setUser({ user: null })
      }).catch(e => {
        console.log(e)
        this.setUser({ user: null })
      })
    }
  },
}
</script>

<style>
.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
