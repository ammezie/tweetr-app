<template>
  <div class="column">
    <div class="ui card">
      <div class="content">
        <img class="right floated mini ui image" src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
        <div class="header">
          <router-link :to="`/${user.username}`">{{ user.name }}</router-link>
        </div>
        <div class="meta">
          {{ `@${user.username}` }}
        </div>
        <div class="description">
          {{ user.bio }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
