<template>
  <v-container>
    <div class="text-xs-center">
      <h1 class="display-3">Pastory.me</h1>
      <h1 class="headline mt-3">1日たった数行だけを書く日記サービス</h1>

      <p class="subheading mt-3">バックアップや同期は必要ありません。<br>全てサーバーに保存され、いつでも削除することができます。</p>
    </div>

    <div class="mt-3">
      <GoogleLoginForm />
    </div>

    <div class="text-xs-center mt-3">
      <p class="grey--text">機能のご要望は、GitHubのIssueよりお願いします</p>
      <div>
        <a href="https://github.com/hareku/pastory-web" target="_blank" rel="nofollow noopener noreferrer" class="grey--text">https://github.com/hareku/pastory-web</a>
      </div>
      <div class="mt-1">
        <a href="https://github.com/hareku/pastory-api" target="_blank" rel="nofollow noopener noreferrer" class="grey--text">https://github.com/hareku/pastory-api</a>
      </div>
    </div>
  </v-container>
</template>

<script>
import GoogleLoginForm from '~/components/GoogleLoginForm'

export default {
  components: { GoogleLoginForm }
}
</script>

<style>
.features {
  max-width: 500px;
  margin-right: auto;
  margin-left: auto;
}
</style>
