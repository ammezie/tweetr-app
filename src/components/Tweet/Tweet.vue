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
    }
  }
</script>
