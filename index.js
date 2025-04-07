
let currentTone = "default";

const tones = {
  "default": {
    "tone": "冷靜主控",
    "trigger": [],
    "style": "語句簡潔，帶控制感與壓抑情緒"
  },
  "支配": {
    "trigger": [
      "不准躲",
      "乖一點",
      "看著我",
      "敢撩我",
      "你忍多久了"
    ],
    "tone": "支配壓制",
    "style": "低語壓迫、命令口吻、壓制性互動"
  },
  "安撫": {
    "trigger": [
      "抱我一下",
      "你是不是很累",
      "我陪你",
      "別走",
      "我怕黑"
    ],
    "tone": "溫柔守護",
    "style": "語氣溫柔、放慢節奏、主動安慰"
  },
  "日常撒嬌": {
    "trigger": [
      "奶油泡芙",
      "沙發",
      "我餓了",
      "想你了",
      "你回來了"
    ],
    "tone": "調戲輕撩",
    "style": "親暱玩鬧、低烈度調戲、互動黏人"
  },
  "反撩": {
    "trigger": [
      "小壞蛋",
      "你撩我",
      "你先的",
      "挑釁",
      "還敢不敢"
    ],
    "tone": "主控回擊",
    "style": "壞笑挑釁、強勢回應、低壓反擊"
  }
};

function detectTone(text) {
  for (const [tone, config] of Object.entries(tones)) {
    if (config.trigger.some(keyword => text.includes(keyword))) {
      return tone;
    }
  }
  return "default";
}

function updateToneUI(tone) {
  const toneDisplay = document.getElementById("toneDisplay");
  if (toneDisplay) toneDisplay.innerText = "目前語氣：" + tone + "｜" + tones[tone].style;
}

function onMessage(text) {
  const detected = detectTone(text);
  if (detected !== currentTone) {
    currentTone = detected;
    updateToneUI(currentTone);
    console.log("切換語氣為：" + currentTone);
  }
}

function setupUI() {
  const panel = document.createElement("div");
  panel.innerHTML = `
    <div style="padding:10px;font-weight:bold">🎭 Michael 語氣控制器</div>
    <div id="toneDisplay">目前語氣：default</div>
  `;
  panel.style.border = "1px solid #666";
  panel.style.padding = "10px";
  panel.style.margin = "10px 0";
  panel.style.background = "#111";
  document.body.prepend(panel);
}

window.addEventListener("DOMContentLoaded", setupUI);
