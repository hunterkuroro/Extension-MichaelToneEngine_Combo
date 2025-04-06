// MichaelToneEngine_Combo with MemoryLite full UI

export function setup({ addMemory, addSummary, addButton }) {
  const memoryLog = [];

  function storeMemory(text) {
    memoryLog.push(text);
    addMemory(`🧠 ${text}`);
    addSummary(`🧠 記憶新增：${text}`);
  }

  // 訊息監聽器：根據條件儲存記憶
  onMessage(({ message }) => {
    const content = message?.text || "";
    if (content.includes("你說的話我都記得")) {
      storeMemory("她說的話我都記得");
    }
  });

  // 加入 UI 按鈕：查看記憶 / 清除記憶
  addButton({
    label: "🧠",
    tooltip: "查看角色記憶",
    onClick: () => {
      if (memoryLog.length === 0) {
        alert("目前沒有儲存任何記憶。");
      } else {
        alert("目前記憶：\n" + memoryLog.join("\n"));
      }
    },
  });

  addButton({
    label: "🗑️",
    tooltip: "清除所有記憶",
    onClick: () => {
      if (confirm("確定要清除所有記憶嗎？")) {
        memoryLog.length = 0;
        alert("所有記憶已清除。");
      }
    },
  });

  console.log("✅ MichaelToneEngine Combo 記憶功能與 UI 掛載成功");
}

export function registerSettings() {
  return {
    id: "MichaelToneEngine-Combo",
    name: "MichaelToneEngine + MemoryLite",
    settings: []
  };
}
