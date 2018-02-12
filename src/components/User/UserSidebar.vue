<template>
  <div>
    <div class="ui attached segment">
      <form class="ui form" @submit.prevent="postTweet">
        <div class="field">
          <textarea name="tweet" v-model="tweet" rows="2" placeholder="Compose tweet"></textarea>
        </div>

        <button class="ui button fluid primary" :disabled="!isFormValid">Tweet</button>
      </form>
    </div>
    <div class="ui bottom attached menu">
      <router-link class="item" to="/">
        <i class="home icon"></i>
      </router-link>
      <router-link class="item" :to="`/${user.username}`">Profile</router-link>
      <router-link class="item" to="/settings/profile">Settings</router-link>
      <a class="item" @click="logout">
        <i class="sign out icon"></i>
      </a>
    </div>
  </div>
</template>

<script>
  import EventBus from '@/eventBus'

  export default {
    name: 'UserSidebar',
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        tweet: ''
      }
    },
    computed: {
      isFormValid () {
        return !!this.tweet
      }
    },
    methods: {
      postTweet () {
        const token = localStorage.getItem('tweetr-token')

        axios
          .post(
            '/tweet',
            { tweet: this.tweet },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
            // fire an event to the event bus
            EventBus.$emit('tweetAdded', response.data.data)

            // clear input field
            this.tweet = ''
          })
      },
      logout () {
        localStorage.removeItem('tweetr-token')

        this.$router.push('/login')
      }
    }
  }
</script>
