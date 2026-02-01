<template>
  <div class="mobile-container">
    <div class="svg-wrapper">
      <svg viewBox="0 0 400 650" xmlns="http://www.w3.org/2000/svg" class="main-svg">
        <path d="M20 120 L200 10 L380 120 L380 640 L20 640 Z" fill="#111827" stroke="#374151" stroke-width="3"/>
        <path d="M20 120 L200 10 L380 120" fill="none" stroke="#60a5fa" stroke-width="4" stroke-linecap="round"/>

        <g transform="translate(45, 130)">
          <text x="0" y="0" fill="#94a3b8" font-size="11" font-weight="bold">SET POINT</text>
          <line x1="0" y1="15" x2="70" y2="15" stroke="#1e293b" stroke-width="8" stroke-linecap="round" />
          <line x1="0" y1="15" x2="40" y2="15" stroke="#3b82f6" stroke-width="8" stroke-linecap="round" />
          <circle cx="40" cy="15" r="7" fill="white" />

          <g transform="translate(100, -15)">
            <text x="35" y="15" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">VALVE</text>
            <path d="M10 30 L25 20 L25 40 Z M50 30 L35 20 L35 40 Z" fill="#3b82f6" />
            <rect x="25" y="25" width="10" height="10" fill="#3b82f6" />
            <rect x="65" y="18" width="55" height="28" rx="5" fill="black" stroke="#374151" />
            <text x="92" y="38" text-anchor="middle" fill="#ef4444" font-size="16" font-weight="bold">{{ valveOpening }}%</text>
          </g>

          <g transform="translate(230, -15)">
            <rect width="100" height="55" rx="8" fill="#1e293b" stroke="#374151" />
            <rect x="10" y="12" width="30" height="30" rx="5" fill="#fbbf24" />
            <path d="M20 20 L27 27 L20 34 Z" fill="black" />
            <text x="45" y="32" fill="white" font-size="10" font-weight="bold">AUTO</text>
          </g>
        </g>

        <g transform="translate(40, 210)">
          <rect width="155" height="200" fill="#0f172a" rx="5" stroke="#1e293b" />
          <rect x="2" :y="198 - (danauLevel/1.5)" width="151" :height="danauLevel/1.5" fill="#2563eb" rx="3" />
          <text x="77" y="90" text-anchor="middle" fill="white" font-size="14" opacity="0.8">Lvl Danau</text>
          <rect x="27" y="110" width="100" height="40" rx="20" fill="black" stroke="#3b82f6" />
          <text x="77" y="137" text-anchor="middle" fill="#fbbf24" font-size="18" font-weight="bold">{{ danauLevel }} cm</text>

          <g transform="translate(165, 0)">
            <rect width="155" height="200" fill="#0f172a" rx="5" stroke="#1e293b" />
            <rect x="2" :y="198 - (sungaiLevel/1.5)" width="151" :height="sungaiLevel/1.5" fill="#0ea5e9" rx="3" />
            <text x="77" y="90" text-anchor="middle" fill="white" font-size="14" opacity="0.8">Lvl Sungai</text>
            <rect x="27" y="110" width="100" height="40" rx="20" fill="black" stroke="#0ea5e9" />
            <text x="77" y="137" text-anchor="middle" fill="#fbbf24" font-size="18" font-weight="bold">{{ sungaiLevel }} cm</text>
          </g>
        </g>

        <g transform="translate(40, 430)">
          <path d="M10 50 A35 35 0 0 1 80 50" fill="none" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
          <path d="M10 50 A35 35 0 0 1 50 20" fill="none" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/>
          <text x="45" y="45" text-anchor="middle" fill="white" font-size="12" font-weight="bold">220V</text>
          <text x="45" y="65" text-anchor="middle" fill="#94a3b8" font-size="9">VOLT</text>

          <g transform="translate(90, 0)">
            <path d="M10 50 A35 35 0 0 1 80 50" fill="none" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
            <path d="M10 50 A35 35 0 0 1 60 25" fill="none" stroke="#10b981" stroke-width="6" stroke-linecap="round"/>
            <text x="45" y="45" text-anchor="middle" fill="white" font-size="12" font-weight="bold">15A</text>
            <text x="45" y="65" text-anchor="middle" fill="#94a3b8" font-size="9">AMPERE</text>
          </g>

          <g transform="translate(180, 0)">
            <text x="75" y="5" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="bold">POWER CONSUMPTION</text>
            <rect width="150" height="45" y="15" rx="5" fill="black" stroke="#92400e" />
            <text x="75" y="45" text-anchor="middle" fill="#facc15" font-size="15" font-family="monospace" font-weight="bold">1000000 KWH</text>
          </g>
        </g>

        <g transform="translate(40, 530)">
          <template v-for="(p, i) in 4" :key="i">
            <g :transform="`translate(${i * 45}, 0)`">
              <path d="M5 25 L30 25 L30 10 L15 10 Z" fill="#475569" stroke="white" stroke-width="1" />
              <circle cx="15" cy="18" r="5" fill="#1e293b" stroke="white" />
              <text x="17" y="42" text-anchor="middle" fill="#94a3b8" font-size="8">PUMP {{ i+1 }}</text>
            </g>
          </template>

          <g transform="translate(220, 0)">
            <rect width="60" height="50" rx="5" fill="#334155" stroke="#475569" />
            <text x="30" y="35" text-anchor="middle" font-size="20">⚡</text>
            <rect x="70" width="60" height="50" rx="5" fill="#334155" stroke="#475569" />
            <text x="100" y="35" text-anchor="middle" font-size="20">⚡</text>
          </g>
        </g>
      </svg>
    </div>

    <div class="footer-panel">
      <div class="slider-group">
        <label>DANAU LEVEL</label>
        <input type="range" v-model="danauLevel" min="20" max="250">
      </div>
      <button class="start-btn">SYSTEM START</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const danauLevel = ref(220);
const sungaiLevel = ref(110);
const valveOpening = ref(70);
</script>

<style scoped>
.mobile-container {
  background: #020617;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
}

.svg-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
}

.main-svg {
  width: 100%;
  max-width: 420px;
  height: auto;
}

.footer-panel {
  background: #0f172a;
  padding: 20px;
  border-top: 2px solid #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slider-group label {
  display: block;
  color: #60a5fa;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 5px;
}

.start-btn {
  background: #059669;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 13px;
}

input[type="range"] {
  width: 150px;
  accent-color: #3b82f6;
}
</style>