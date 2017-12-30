<template>
  <div class="ui feed">
    <Tweet
      v-for="tweet in tweets"
      :key="tweet.id"
      :tweet="tweet"
      :auth-user="authUser"
      v-on:delete="removeDeletedTweet"
    />
  </div>
</template>

<script>
  import Tweet from '@/components/Tweet/Tweet'
  import EventBus from '@/eventBus'

  export default {
    name: 'Tweets',
    components: {
      Tweet
    },
    props: {
      tweets: {
        type: Array,
        required: true
      },
      authUser: {
        type: Object,
        required: true
      }
    },
    created () {
      // listen for event fired
      EventBus.$on('tweetAdded', this.fetchAddedTweet)
    },
    methods: {
      fetchAddedTweet (tweet) {
        // add tweet to top of tweets
        return this.tweets.unshift(tweet)
      },
      removeDeletedTweet (tweetId) {
        const filteredTweets = this.tweets.filter(tweet => {
          return tweet.id !== tweetId
        })

        this.$emit('update:tweets', filteredTweets)
      }
    }
  }
</script>
