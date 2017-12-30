<template>
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
        <div class="date">
          {{ tweet.created_at | timeAgo }}
          <small v-if="canDeleteTweet">
            <a @click="deleteTweet(tweet.id)">Delete Tweet</a>
          </small>
        </div>
      </div>
      <router-link :to="`/${tweet.user.username}/status/${tweet.id}`">
        <div class="extra text">
          {{ tweet.tweet }}
        </div>
      </router-link>

      <TweetReactions
        :tweet="tweet"
        :replies="tweet.replies"
        :favorites.sync="tweet.favorites"
        :auth-user="authUser"
      />
    </div>
  </div>
</template>

<script>
  import TweetReactions from '@/components/Tweet/TweetReactions'

  export default {
    name: 'Tweet',
    components: {
      TweetReactions
    },
    props: {
      tweet: {
        type: Object,
        required: true
      },
      authUser: {
        type: Object,
        required: true
      }
    },
    computed: {
      canDeleteTweet () {
        return this.tweet.user_id === this.authUser.id
      }
    },
    methods: {
      deleteTweet (tweetId) {
        const token = localStorage.getItem('tweetr-token')
        const deleteConfirmed = confirm('Are you sure?')

        if (deleteConfirmed) {
          axios
            .delete(`/tweets/destroy/${tweetId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(response => {
              this.$emit('delete', tweetId)
            })
        }
      }
    }
  }
</script>
