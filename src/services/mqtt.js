import mqtt from 'mqtt'
import { ref } from 'vue'

const isConnected = ref(false)
const lastMessage = ref(null)

let client = null

export function useMqtt() {

  const connect = () => {
    if (client?.connected) return

    client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt', {
      clientId: 'vue_' + Math.random().toString(16).slice(2),
      keepalive: 30,           // 🔴 WAJIB kecil di mobile
      reconnectPeriod: 2000,   // reconnect agresif
      connectTimeout: 4000,
      clean: true
    })

    client.on('connect', () => {
      console.log('MQTT connected')
      isConnected.value = true
      client.subscribe('demo/vue/mqtt', { qos: 0 })
    })

    client.on('message', (topic, payload) => {
      lastMessage.value = {
        topic,
        data: safeParse(payload),
        time: new Date().toLocaleTimeString()
      }
    })

    client.on('reconnect', () => {
      console.log('MQTT reconnecting...')
      isConnected.value = false
    })

    client.on('close', () => {
      console.log('MQTT closed')
      isConnected.value = false
    })

    client.on('error', err => {
      console.error('MQTT error', err)
      isConnected.value = false
      client?.end(true)
      client = null
    })
  }

  const disconnect = () => {
    client?.end(true)
    client = null
    isConnected.value = false
  }

  return { connect, disconnect, isConnected, lastMessage }
}

function safeParse(payload) {
  try {
    return JSON.parse(payload.toString())
  } catch {
    return payload.toString()
  }
}


// import mqtt from 'mqtt'
// import { ref } from 'vue'

// const isConnected = ref(false)
// const lastMessage = ref(null)

// let client = null

// export function useMqtt() {
//   const connect = () => {
//     if (client) return

//     client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt', {
//       clientId: 'vue_vite_' + Math.random().toString(16).slice(2),
//       keepalive: 60,
//       reconnectPeriod: 1000,
//       clean: true
//     })

//     client.on('connect', () => {
//       isConnected.value = true
//       client.subscribe('demo/vue/mqtt')
//     })

//     client.on('message', (topic, payload) => {
//       try {
//         lastMessage.value = {
//           topic,
//           data: JSON.parse(payload.toString()),
//           time: new Date().toLocaleTimeString()
//         }
//       } catch {
//         lastMessage.value = {
//           topic,
//           data: payload.toString(),
//           time: new Date().toLocaleTimeString()
//         }
//       }
//     })

//     client.on('close', () => {
//       isConnected.value = false
//     })
//   }

//   const disconnect = () => {
//     client?.end()
//     client = null
//   }

//   return {
//     connect,
//     disconnect,
//     isConnected,
//     lastMessage
//   }
// }
