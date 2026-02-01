<template>
  <div class="panel-wrapper">
    <svg
      viewBox="0 0 360 640"
      preserveAspectRatio="xMidYMid meet"
      class="panel-svg"
    >
      <!-- Background -->
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0a0f1f"/>
          <stop offset="100%" stop-color="#111a2f"/>
        </linearGradient>
      </defs>

      <!-- House shape -->
      <path
        d="M40 140 L180 40 L320 140 V600 H40 Z"
        fill="url(#bgGrad)"
        stroke="#1e90ff"
        stroke-width="3"
        rx="20"
      />

      <!-- SET POINT -->
      <text x="80" y="170" fill="#8fbfff" font-size="12">SET POINT</text>
      <rect x="80" y="180" width="200" height="6" rx="3" fill="#1e3a5f"/>
      <circle cx="170" cy="183" r="8" fill="#ffffff"/>

      <!-- Valve -->
      <text x="150" y="220" fill="#8fbfff" font-size="12">VALVE</text>
      <polygon points="140,235 160,225 160,245" fill="#4da3ff"/>
      <polygon points="220,235 200,225 200,245" fill="#4da3ff"/>
      <rect x="165" y="225" width="30" height="20" rx="4" fill="#ff4444"/>
      <text x="170" y="240" fill="#fff" font-size="10">70%</text>

      <!-- AUTO -->
      <rect x="240" y="215" width="60" height="30" rx="6" fill="#f4c430"/>
      <polygon points="255,220 255,240 270,230" fill="#000"/>
      <text x="275" y="235" font-size="10" fill="#000">AUTO</text>

      <!-- Level Danau -->
      <rect x="70" y="270" width="100" height="90" rx="8" fill="#0f2b4f"/>
      <rect x="70" y="315" width="100" height="45" rx="0" fill="#2ea8ff"/>
      <text x="90" y="260" fill="#8fbfff" font-size="12">Lvl Danau</text>
      <rect x="80" y="295" width="80" height="22" rx="11" fill="#000"/>
      <text x="95" y="310" fill="#ffd700" font-size="12">220 cm</text>

      <!-- Level Sungai -->
      <rect x="190" y="270" width="100" height="90" rx="8" fill="#0f2b4f"/>
      <rect x="190" y="330" width="100" height="30" rx="0" fill="#2ea8ff"/>
      <text x="210" y="260" fill="#8fbfff" font-size="12">Lvl Sungai</text>
      <rect x="200" y="295" width="80" height="22" rx="11" fill="#000"/>
      <text x="215" y="310" fill="#ffd700" font-size="12">110 cm</text>

      <!-- Power Consumption -->
      <text x="120" y="390" fill="#ff5555" font-size="12">POWER CONSUMPTION</text>
      <rect x="100" y="400" width="160" height="40" rx="10" fill="#000"/>
      <text x="120" y="425" fill="#ffd700" font-size="14">1000000 KWH</text>

      <!-- Voltage -->
      <circle cx="90" cy="480" r="28" fill="#0f2b4f" stroke="#4da3ff"/>
      <text x="70" y="485" fill="#ffffff" font-size="12">220V</text>

      <!-- Ampere -->
      <circle cx="180" cy="480" r="28" fill="#0f2b4f" stroke="#00ff99"/>
      <text x="165" y="485" fill="#ffffff" font-size="12">15A</text>

      <!-- Lightning Buttons -->
      <rect x="250" y="455" width="40" height="40" rx="6" fill="#2c2f3a"/>
      <polygon points="270,460 260,480 270,480 260,500" fill="#ffd700"/>

      <rect x="300" y="455" width="40" height="40" rx="6" fill="#2c2f3a"/>
      <polygon points="320,460 310,480 320,480 310,500" fill="#ffd700"/>
    </svg>
  </div>
</template>

<style scoped>
.panel-wrapper {
  width: 100%;
  height: 50vh; /* setengah layar */
  background: #050814;
}

.panel-svg {
  width: 100%;
  height: 100%;
}
</style>
