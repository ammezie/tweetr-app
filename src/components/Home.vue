<template>
  <div class="ui stackable grid vertically padded container">
    <div class="four wide column">
      <UserSidebar :user="user"/>
    </div>
    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui medium dividing header">Timeline</h2>

        <Tweets
          :tweets.sync="tweets"
          :auth-user="user"
        />

      </div>
    </div>
    <div class="four wide column">
      <WhoToFollow/>
    </div>
  </div>
</template>

<script>
  import UserSidebar from '@/components/User/UserSidebar'
  import Tweets from '@/components/Tweet/Tweets'
  import WhoToFollow from '@/components/User/WhoToFollow'

  export default {
    name: 'Home',
    components: {
      UserSidebar,
      Tweets,
      WhoToFollow
    },
    data () {
      return {
        user: '',
        tweets: []
      }
    },
    beforeRouteEnter (to, from, next) {
      const token = localStorage.getItem('tweetr-token')

      return token ? next() : next('/login')
    },
    created () {
      this.fetchAuthenticatedUser()
      this.fetchUserTimeline()
    },
    methods: {
      fetchAuthenticatedUser () {
        const token = localStorage.getItem('tweetr-token')

        axios
          .get('/account/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.user = response.data.data
          })
      },
      fetchUserTimeline () {
        const token = localStorage.getItem('tweetr-token')

        axios
          .get('/users/timeline', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.tweets = response.data.data.reverse()
          })
      }
    }
  }
</script>
