<template>
  <v-app>
    <!-- <v-navigation-drawer app></v-navigation-drawer> -->
    <v-toolbar 
      app 
      fixed 
      dark 
      class="primary">
      <v-toolbar-title>{{ siteTitle }}</v-toolbar-title>
    </v-toolbar>

    <v-content> <nuxt /> </v-content>

    <v-footer 
      app 
      class="pa-3">
      <v-spacer />
      <div>&copy; {{ nowYear }} {{ siteTitle }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      siteTitle: 'Pastory.me',
      sidebar: null,
      nowYear: new Date().getFullYear()
    }
  }
}
</script>
