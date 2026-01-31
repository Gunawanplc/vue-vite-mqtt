<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useMqtt } from './services/mqtt'

// MQTT GLOBAL
const {
  connect,
  disconnect,
  isConnected,
  lastMessage
} = useMqtt()

const handleVisibility = () => {
  if (document.visibilityState === 'visible') {
    connect()
  } else {
    disconnect()
  }
}

const handleUnload = () => {
  disconnect()
}

onMounted(() => {
  connect()
  document.addEventListener('visibilitychange', handleVisibility)
  window.addEventListener('beforeunload', handleUnload)
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleVisibility)
  window.removeEventListener('beforeunload', handleUnload)
})

</script>

<template>
  <div class="app">

    <!-- CONTENT -->
    <router-view />

    <!-- MQTT STATUS BAR (OPTIONAL) -->
    <div class="mqtt-status">
      <span
        :class="isConnected ? 'online' : 'offline'">
        {{ isConnected ? 'MQTT CONNECTED' : 'MQTT DISCONNECTED' }}
      </span>
    </div>

    <!-- BOTTOM NAVIGATION -->
    <nav class="bottom-nav">
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link to="/parameter" class="nav-item">Parameter</router-link>
      <router-link to="/setting" class="nav-item">Setting</router-link>
    </nav>

  </div>
</template>

<style>
.app {
  min-height: 100vh;
  padding-bottom: calc(96px + env(safe-area-inset-bottom));
}

/* MQTT STATUS */
.mqtt-status {
  position: fixed;
  bottom: 56px;
  left: 0;
  right: 0;
  height: 40px;
  background: #f5f5f5;
  text-align: center;
  line-height: 40px;
  font-size: 12px;
}

.online {
  color: green;
  font-weight: bold;
}

.offline {
  color: red;
  font-weight: bold;
}

/* BOTTOM NAV */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  background: #ffffff;
  border-top: 1px solid #ddd;
}

.nav-item {
  flex: 1;
  text-align: center;
  line-height: 56px;
  text-decoration: none;
  color: #666;
}

.router-link-active {
  color: #1976d2;
  font-weight: bold;
}
</style>
