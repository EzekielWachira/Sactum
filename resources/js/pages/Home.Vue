<template>
    <q-layout view="hHh lpR fFf">
        <q-header class="bg-grey-10 text-white shadow-5" >
            <q-toolbar class="q-px-md">
                <q-toolbar-title>
                Laravel <strong class="text-deep-orange">Sanctum</strong>
                </q-toolbar-title>
                <q-space></q-space>
                <q-btn v-if="!isLoggedIn" label="Login" to="/login" dense flat class="q-mr-sm q-px-sm"></q-btn>
                <q-btn v-if="!isLoggedIn" label="Register" to="/register" dense flat class="q-mr-sm q-px-sm"></q-btn>
                <q-btn v-if="isLoggedIn" label="Dashboard" to="/dashboard" dense flat class="q-mr-sm q-px-sm"></q-btn>
                <q-btn v-if="isLoggedIn" label="Logout" to="/dashboard" dense flat class="q-mr-sm q-px-sm text-grey-5"
                @click.prevent="logout"></q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
        <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import user from '../api/user'
export default {
  data () {
    return {
      isLoggedIn: false
    }
  },
  mounted() {

      this.$root.$on('login', () => {
          this.isLoggedIn = true
      })

    this.isLoggedIn = !!localStorage.getItem("token")
  },
  methods: {
    logout() {
        user.logout()
          .then(() => {
            localStorage.removeItem("token");
            this.isLoggedIn = false;
            this.$router.push({name: 'Login'})
          })
    }
  },
}
</script>
