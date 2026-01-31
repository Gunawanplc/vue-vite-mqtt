import mqtt from 'mqtt'
import { ref } from 'vue'

let client = null
let heartbeatTimer = null
const isConnected = ref(false)

const logs = ref([])   // 👈 LOG STORE

function addLog(msg) {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift(`[${time}] ${msg}`)

  // batasi jumlah log
  if (logs.value.length > 50) {
    logs.value.pop()
  }
}

export function useMqtt() {

  function connect() {
    if (client && client.connected) return

    client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt', {
      // keepalive: 20,
      // reconnectPeriod: 0,
      keepalive: 10,          // lebih agresif
      reconnectPeriod: 5000,  // lebih lambat
      clean: true,
    })

    client.on('connect', () => {
      isConnected.value = true
      addLog('MQTT CONNECTED')
      startHeartbeat()        // 🔑 TAMBAH
    })

    let lastCloseTime = 0

    client.on('close', () => {
      lastCloseTime = Date.now()
      isConnected.value = false
      addLog('MQTT CLOSED at ' + lastCloseTime)
      stopHeartbeat()         // 🔑 TAMBAH
    })

    client.on('error', () => {
      isConnected.value = false
      addLog('MQTT ERROR')
      startHeartbeat()        // 🔑 TAMBAH
      client?.end(true)
      client = null
    })
  }

  function forceReconnect() {
    if (!navigator.onLine) {
      addLog('Reconnect skipped (offline)')
      return
    }

    if (Date.now() - lastCloseTime < 3000) {
      addLog('Reconnect delayed (broker cooldown)')
      return
    }

    if (client) {
      client.end(true)
      client = null
    }

    setTimeout(connect, 1000)
  }

  function disconnect() {
    if (client) {
      client.end(true)
      client = null
      isConnected.value = false
    }
  }

  

  function startHeartbeat() {
    stopHeartbeat()

    heartbeatTimer = setInterval(() => {
      if (!client || !client.connected) {
        forceReconnect()
        return
      }

      // publish ringan
      client.publish('ping/mobile', '1')
    }, 15000)
  }

  function stopHeartbeat() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
  }

  return {
    connect,
    forceReconnect,
    disconnect,
    isConnected,
    logs          // 👈 expose logs
  }
}



// import mqtt from 'mqtt'

// let client = null

// export function connectMQTT() {
//   if (client && client.connected) return

//   client = mqtt.connect('wss://xxxx.hivemq.cloud:8884/mqtt', {
//     keepalive: 20,
//     reconnectPeriod: 0,     // ❗ matikan auto reconnect bawaan
//     connectTimeout: 10000,
//     clean: true,
//     resubscribe: true,
//   })

//   client.on('connect', () => {
//     console.log('MQTT CONNECTED')
//   })

//   client.on('close', () => {
//     console.log('MQTT CLOSED')
//   })

//   client.on('error', (err) => {
//     console.log('MQTT ERROR', err)
//     client.end(true)
//   })
// }



// import mqtt from 'mqtt'
// import { ref } from 'vue'

// const isConnected = ref(false)
// const lastMessage = ref(null)

// let client = null

// export function useMqtt() {

//   const connect = () => {
//     if (client?.connected) return

//     client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt', {
//       clientId: 'vue_' + Math.random().toString(16).slice(2),
//       keepalive: 30,           // 🔴 WAJIB kecil di mobile
//       reconnectPeriod: 2000,   // reconnect agresif
//       connectTimeout: 4000,
//       clean: true
//     })

//     client.on('connect', () => {
//       console.log('MQTT connected')
//       isConnected.value = true
//       client.subscribe('demo/vue/mqtt', { qos: 0 })
//     })

//     client.on('message', (topic, payload) => {
//       lastMessage.value = {
//         topic,
//         data: safeParse(payload),
//         time: new Date().toLocaleTimeString()
//       }
//     })

//     client.on('reconnect', () => {
//       console.log('MQTT reconnecting...')
//       isConnected.value = false
//     })

//     client.on('close', () => {
//       console.log('MQTT closed')
//       isConnected.value = false
//     })

//     client.on('error', err => {
//       console.error('MQTT error', err)
//       isConnected.value = false
//       client?.end(true)
//       client = null
//     })
//   }

//   const disconnect = () => {
//     client?.end(true)
//     client = null
//     isConnected.value = false
//   }

//   return { connect, disconnect, isConnected, lastMessage }
// }

// function safeParse(payload) {
//   try {
//     return JSON.parse(payload.toString())
//   } catch {
//     return payload.toString()
//   }
// }


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
