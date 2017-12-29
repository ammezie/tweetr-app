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

      <form class="ui form" @submit.prevent="replyTweet">
        <div class="field">
          <textarea name="reply" v-model="reply" rows="2" placeholder="Reply tweet"></textarea>
        </div>

        <button class="ui button primary" :disabled="!isFormValid">Reply</button>
      </form>

      <Replies :replies="replies"/>
    </div>
  </div>
</template>

<script>
  import Replies from '@/components/Tweet/Replies';

  export default {
    name: 'SingleTweet',
    components: {
      Replies
    },
    data () {
      return {
        tweet: '',
        replies: [],
        reply: ''
      }
    },
    computed: {
      isFormValid () {
        return !!this.reply
      }
    },
    created () {
      this.fetchTweet()
    },
    methods: {
      fetchTweet () {
        axios.get(`/tweets/${this.$route.params.id}`).then(response => {
          this.tweet = response.data.data
          this.replies = response.data.data.replies.reverse()
        })
      },
      back () {
        this.$router.go(-1)
      },
      replyTweet () {
        const token = localStorage.getItem('tweetr-token')

        axios
          .post(
            `/tweets/reply/${this.tweet.id}`,
            { reply: this.reply },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
            this.reply = ''

            this.replies.unshift(response.data.data)
          })
      }
    }
  }
</script>
