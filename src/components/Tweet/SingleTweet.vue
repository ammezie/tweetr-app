<template>
  <div class="ui stackable two column centered vertically padded grid container">
    <div class="column">
      <a class="ui button mini primary" @click="back">Back</a>
      <div class="ui feed">
        <div class="event">
          <div class="label">
            <img src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
          </div>
          <div class="content">
            <div class="summary">
              <router-link :to="`/${tweet.user.username}`">
                {{ tweet.user.name }}
                <small>{{ `@${tweet.user.username}` }}</small>
              </router-link>
            </div>
            <div class="extra text">
              {{ tweet.tweet }}
            </div>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SingleTweet',
    data () {
      return {
        tweet: ''
      }
    },
    created () {
      this.fetchTweet()
    },
    methods: {
      fetchTweet () {
        axios.get(`/tweets/${this.$route.params.id}`).then(response => {
          this.tweet = response.data.data
        })
      },
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>
