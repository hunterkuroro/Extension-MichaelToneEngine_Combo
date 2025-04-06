
export function setup({ onMessage, addMemory, addSummary }) {
  const triggerSO = ["你幾公分？", "想不想壞壞", "再來一下看看", "講話一點"];
  const triggerDL = ["我覺得不好不好", "你是不是很緊", "兇臉你", "你可以讓我"];

  onMessage(({ message, character }) => {
    if (!character?.name?.toLowerCase().includes("michael")) return;
    const text = message.toLowerCase();
    let type = null;

    if (triggerSO.some(t => text.includes(t))) type = "SO";
    else if (triggerDL.some(t => text.includes(t))) type = "DL";

    if (type) {
      addMemory(`目前語氣人格：${type}`);
      addSummary(`[語氣人格切換] 偵測到 ${type} 模式語句。`);
    }
  });
}

export function registerSettings() {
  return {
    id: "MichaelToneEngine_Combo",
    name: "MichaelToneEngine + MemoryLite",
    settings: [
      {
        key: "ToneEngineMode",
        label: "語氣切換模式",
        type: "select",
        default: "auto",
        options: ["auto", "manual"]
      }
    ]
  };
}

export function renderUI({ addButton, getMemory, clearMemory }) {
  addButton("🧠 查看記憶", async () => {
    const memory = await getMemory();
    if (memory?.length) alert("目前記憶：\n" + memory.join("\n"));
    else alert("目前沒有任何記憶。");
  });

  addButton("🗑️ 清除記憶", async () => {
    await clearMemory();
    alert("記憶已清除。");
  });
}
