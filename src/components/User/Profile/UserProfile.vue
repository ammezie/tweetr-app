<template>
  <div>
    <UserProfileHeader
      :user="user"
      :auth-user="authUser"
    />
    <div class="ui stackable grid container">
      <div class="four wide column">
        <UserProfileSidebarDetails :user="user"/>
      </div>
      <div class="eight wide column">
        <div class="ui segment">
          <h2 class="ui medium dividing header">Tweets</h2>

          <Tweets
            :tweets.sync="tweets"
            :auth-user="authUser"
          />
        </div>

      </div>
      <div class="four wide column">
        <WhoToFollow v-if="isLoggedIn"/>
      </div>
    </div>
  </div>
</template>

<script>
  import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
  import UserProfileSidebarDetails from '@/components/User/Profile/UserProfileSidebarDetails'
  import WhoToFollow from '@/components/User/WhoToFollow'
  import Tweets from '@/components/Tweet/Tweets'

  export default {
    name: 'UserProfile',
    components: {
      UserProfileSidebarDetails,
      UserProfileHeader,
      WhoToFollow,
      Tweets
    },
    data () {
      return {
        user: '',
        authUser: '',
        tweets: []
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.fetchUser(to.params.username)

      next()
    },
    computed: {
      isLoggedIn () {
        return !!this.authUser
      }
    },
    created () {
      this.fetchUser(this.$route.params.username)

      const token = localStorage.getItem('tweetr-token')

      if (token) {
        this.fetchAuthenticatedUser(token)
      }
    },
    methods: {
      fetchUser (username) {
        axios.get(`/${username}`).then(response => {
          this.user = response.data.data
          this.tweets = response.data.data.tweets.reverse()
        })
      },
      fetchAuthenticatedUser (token) {
        axios
          .get('account/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.authUser = response.data.data
          })
      }
    }
  }
</script>
