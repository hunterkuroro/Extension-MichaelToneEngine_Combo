export function setup({ onMessage, addMemory }) {
  onMessage(({ message, character }) => {
    if (!character?.name?.toLowerCase().includes("michael")) return;
    if (message.toLowerCase().includes("記住")) {
      addMemory(`[記憶Lite] ${message}`);
    }
  });
}

export function registerSettings() {
  return {
    id: "MemoryLite",
    name: "記憶Lite",
    settings: [
      {
        key: "memoryMode",
        label: "記憶觸發條件",
        type: "select",
        default: "auto",
        options: ["auto", "manual"]
      }
    ]
  };
}