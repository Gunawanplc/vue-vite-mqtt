<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useMqtt } from './services/mqtt'

const {
  connect,
  disconnect,
  isConnected,
  lastMessage
} = useMqtt()

onMounted(() => {
  connect()
})

onBeforeUnmount(() => {
  disconnect()
})
</script>

<template>
  <div style="padding:20px">
    <h2>Vue Vite + MQTT Realtime</h2>
    <h3>topic : demo/vue/mqtt</h3>

    <p>
      Status:
      <b :style="{ color: isConnected ? 'green' : 'red' }">
        {{ isConnected ? 'CONNECTED' : 'DISCONNECTED' }}
      </b>
    </p>

    <div v-if="lastMessage" style="border:1px solid #ccc;padding:10px">
      <div><b>Topic:</b> {{ lastMessage.topic }}</div>
      <div><b>Data:</b> {{ lastMessage.data }}</div>
      <div><small>{{ lastMessage.time }}</small></div>
    </div>
  </div>
</template>
