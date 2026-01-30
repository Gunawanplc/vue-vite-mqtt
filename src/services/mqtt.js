import mqtt from 'mqtt'
import { ref } from 'vue'

const isConnected = ref(false)
const lastMessage = ref(null)

let client = null

export function useMqtt() {
  const connect = () => {
    if (client) return

    client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt', {
      clientId: 'vue_vite_' + Math.random().toString(16).slice(2),
      keepalive: 60,
      reconnectPeriod: 1000,
      clean: true
    })

    client.on('connect', () => {
      isConnected.value = true
      client.subscribe('demo/vue/mqtt')
    })

    client.on('message', (topic, payload) => {
      try {
        lastMessage.value = {
          topic,
          data: JSON.parse(payload.toString()),
          time: new Date().toLocaleTimeString()
        }
      } catch {
        lastMessage.value = {
          topic,
          data: payload.toString(),
          time: new Date().toLocaleTimeString()
        }
      }
    })

    client.on('close', () => {
      isConnected.value = false
    })
  }

  const disconnect = () => {
    client?.end()
    client = null
  }

  return {
    connect,
    disconnect,
    isConnected,
    lastMessage
  }
}
