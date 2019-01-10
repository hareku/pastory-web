<template>
  <div class="text-xs-center">
    <v-btn
      large
      @click="redirectGoogle()"
      color="primary">
      <template>Googleでログイン</template>
    </v-btn>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  methods: {
    redirectGoogle() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    }
  }
}
</script>
