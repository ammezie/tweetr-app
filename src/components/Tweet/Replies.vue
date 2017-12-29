<template>
  <div class="ui small feed">
    <div class="event" v-for="reply in replies" :key="reply.id">
      <div class="label">
        <img src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
      </div>
      <div class="content">
        <div class="summary">
          <router-link :to="reply.user.username">
            {{ reply.user.name }}
            <small>{{ `@${reply.user.username}` }}</small>
          </router-link>
          <div class="date">
            {{ reply.created_at | timeAgo }}
          </div>
        </div>
        <div class="extra text">
          {{ reply.reply }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Replies',
    props: {
      replies: {
        type: Array,
        required: true
      }
    }
  }
</script>
