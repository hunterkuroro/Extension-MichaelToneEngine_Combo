export function setup({ onMessage, addMemory, addSummary }) {
    const triggerSO = ["你幹麼公分？", "想不想要壞壞", "再來一下看看", "講話一點"];
    const triggerDL = ["抱我一下好不好", "你是不是很寂寞", "兇臉你", "你可以靠我"];

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

    // 插入按鈕
    setTimeout(() => {
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.top = "10px";
        container.style.right = "10px";
        container.style.zIndex = "9999";

        const saveBtn = document.createElement("button");
        saveBtn.innerText = "💾 儲存記憶";
        saveBtn.style.marginRight = "6px";
        saveBtn.onclick = () => {
            addMemory("[手動儲存] 你剛剛按下了儲存記憶按鈕。");
            alert("✅ 已儲存！");
        };

        const viewBtn = document.createElement("button");
        viewBtn.innerText = "📖 查看記憶";
        viewBtn.onclick = () => {
            const memoryList = localStorage.getItem("extensions_memoryLite") || "(無記憶)";
            alert("📘 目前記憶：\n" + memoryList);
        };

        container.appendChild(saveBtn);
        container.appendChild(viewBtn);
        document.body.appendChild(container);
    }, 2000);
}

export function registerSettings() {
    return {
        id: "ToneEngine-Enhanced",
        name: "Tone Engine 補完強化版",
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
