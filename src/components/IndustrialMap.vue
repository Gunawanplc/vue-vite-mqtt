<template>
  <div class="monitor-wrapper">
    <div class="dashboard-container">
      
      <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" class="main-svg">
        <path d="M30 140 L400 20 L770 140 L770 480 L30 480 Z" fill="none" stroke="#cbd5e1" stroke-width="2"/>

        <g transform="translate(60, 110)">
          <text x="0" y="-5" fill="white" font-size="14" font-weight="bold">set point</text>
          <line x1="0" y1="15" x2="100" y2="15" stroke="#3b82f6" stroke-width="6" stroke-linecap="round" />
          <circle cx="30" cy="15" r="10" fill="#3b82f6" stroke="white" stroke-width="2" />
        </g>

        <g transform="translate(240, 80)">
          <path d="M0 20 L25 5 L25 35 Z M55 20 L30 5 L30 35 Z" fill="#3b82f6" stroke="white" stroke-width="1"/>
          <rect x="23" y="0" width="8" height="15" fill="#3b82f6" />
          <text x="65" y="0" fill="white" font-size="14" font-weight="bold">Control Valve</text>
          <rect x="65" y="10" width="80" height="35" rx="10" fill="white" />
          <text x="105" y="35" fill="black" text-anchor="middle" font-weight="bold" font-size="20">{{ valveOpening }}%</text>
        </g>

        <g transform="translate(500, 60)">
          <rect width="240" height="90" fill="white" stroke="black" stroke-width="3" />
          <rect x="20" y="15" width="60" height="60" rx="8" fill="#fbbf24" stroke="#d97706" />
          <path d="M40 28 L60 45 L40 62 Z" fill="black" />
          <text x="95" y="55" fill="black" font-size="24" font-weight="bold">Auto Mode</text>
        </g>

        <g transform="translate(60, 180)">
          <rect width="200" height="230" fill="#1e293b" stroke="#475569" stroke-width="3" />
          <rect x="3" :y="227 - (danauLevel * 0.9)" width="194" :height="danauLevel * 0.9" fill="#2563eb" opacity="0.9" />
          <text x="100" y="120" text-anchor="middle" fill="white" font-weight="bold" font-size="16">Lvl Danau</text>
          <rect x="40" y="140" width="120" height="45" rx="20" fill="black" stroke="#3b82f6" stroke-width="2" />
          <text x="100" y="172" text-anchor="middle" fill="#fbbf24" font-size="20" font-weight="bold">{{ danauLevel }} cm</text>
        </g>

        <g transform="translate(280, 180)">
          <rect width="200" height="230" fill="#1e293b" stroke="#475569" stroke-width="3" />
          <rect x="3" :y="227 - (sungaiLevel * 0.9)" width="194" :height="sungaiLevel * 0.9" fill="#0ea5e9" opacity="0.8" />
          <text x="100" y="120" text-anchor="middle" fill="white" font-weight="bold" font-size="16">Lvl Sungai</text>
          <rect x="40" y="140" width="120" height="45" rx="20" fill="black" stroke="#0ea5e9" stroke-width="2" />
          <text x="100" y="172" text-anchor="middle" fill="#fbbf24" font-size="20" font-weight="bold">{{ sungaiLevel }} cm</text>
        </g>

        <g transform="translate(520, 190)">
          <text x="0" y="0" fill="white" font-size="14" font-weight="bold">volt</text>
          <circle cx="25" cy="40" r="35" fill="white" stroke="#475569" stroke-width="2" />
          <path d="M25 40 L10 20" stroke="black" stroke-width="3" stroke-linecap="round" />
          <path d="M5 45 A30 30 0 0 1 45 45" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="2 2" />

          <text x="110" y="0" fill="white" font-size="14" font-weight="bold">ampere</text>
          <circle cx="135" cy="40" r="35" fill="white" stroke="#475569" stroke-width="2" />
          <path d="M135 40 L155 25" stroke="black" stroke-width="3" stroke-linecap="round" />

          <text x="80" y="110" text-anchor="middle" fill="#ef4444" font-size="15" font-weight="bold">Power Consumption</text>
          <rect x="-10" y="125" width="190" height="55" fill="black" stroke="#92400e" stroke-width="2" />
          <text x="85" y="162" text-anchor="middle" fill="#facc15" font-size="22" font-family="monospace" font-weight="bold">1000000 KWH</text>
        </g>

        <g transform="translate(60, 430)">
          <template v-for="(p, i) in 4" :key="i">
            <g :transform="`translate(${i * 85}, 0)`">
              <path d="M5 25 L35 25 L35 5 L20 5 L5 25" fill="#94a3b8" stroke="white" />
              <circle cx="20" cy="18" r="8" fill="none" stroke="white" stroke-width="1" />
              <text x="20" y="42" text-anchor="middle" fill="white" font-size="11">Pump {{ i+1 }}</text>
            </g>
          </template>

          <g transform="translate(450, -10)">
            <rect x="0" y="0" width="70" height="55" rx="5" fill="#334155" stroke="white" />
            <text x="35" y="35" text-anchor="middle" fill="#fbbf24" font-size="24">⚡</text>
            <rect x="90" y="0" width="70" height="55" rx="5" fill="#334155" stroke="white" />
            <text x="125" y="35" text-anchor="middle" fill="#fbbf24" font-size="24">⚡</text>
          </g>
        </g>
      </svg>

      <div class="footer-panel">
        <div class="control-box">
          <label>DANAU LEVEL</label>
          <input type="range" v-model="danauLevel" min="20" max="240">
        </div>
        <div class="control-box">
          <label>VALVE OPENING</label>
          <input type="range" v-model="valveOpening" min="0" max="100">
        </div>
        <button class="start-btn">SYSTEM START</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const danauLevel = ref(220);
const sungaiLevel = ref(110);
const valveOpening = ref(100);
</script>

<style scoped>
.monitor-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background: #020617;
  padding-top: 20px;
}

.dashboard-container {
  width: 800px;
  height: 600px;
  background: #0f172a;
  border: 2px solid #334155;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-svg {
  flex: 1;
  padding: 10px;
}

.footer-panel {
  height: 100px;
  background: #1e293b;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 40px;
  border-top: 2px solid #334155;
}

.control-box {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.control-box label {
  color: #60a5fa;
  font-size: 11px;
  font-weight: bold;
}

.start-btn {
  background: #059669;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.start-btn:active {
  transform: scale(0.95);
  background: #047857;
}

input[type="range"] {
  width: 160px;
  accent-color: #3b82f6;
}
</style>