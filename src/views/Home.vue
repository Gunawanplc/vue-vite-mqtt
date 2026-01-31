<script setup>
import { useMqtt } from '../services/mqtt'

const { lastMessage, isConnected } = useMqtt()
</script>

<template>
  <div class="page">
    <h2>Home</h2>

    <p>Status:
      <b :style="{ color: isConnected ? 'green' : 'red' }">
        {{ isConnected ? 'CONNECTED' : 'DISCONNECTED' }}
      </b>
    </p>

    <div v-if="lastMessage">
      <p><b>Topic:</b> {{ lastMessage.topic }}</p>
      <p><b>Data:</b> {{ lastMessage.data }}</p>
    </div>
  </div>
</template>
