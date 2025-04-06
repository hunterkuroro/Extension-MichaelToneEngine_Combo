let currentMemory = [];

export function setup({ onMessage, addMemory, addSummary }) {
    const triggerSO = ["你總給分寸", "想不想更黏一點", "膩歪一點", "眼神盯緊一點"];
    const triggerDL = ["裝乖一下好不好", "你是不是很愛黏", "兇臉你", "你可以嘴壞"];

    onMessage(({ message, character }) => {
        if (!character?.name?.toLowerCase().includes("michael")) return;
        const text = message.toLowerCase();
        let type = null;

        if (triggerSO.some(t => text.includes(t))) type = "SO";
        else if (triggerDL.some(t => text.includes(t))) type = "DL";

        if (type) {
            addMemory(`目前語氣人格：${type}`);
            addSummary(`[語氣人格切換] 偵測到 ${type} 模式語句`);
        }
    });
}

export function registerSettings() {
    return {
        id: "MichaelToneEngine_Combo_v1.2",
        name: "Michael ToneEngine + 記憶UI整合",
        settings: []
    };
}

export function renderCustomUI(container) {
    const memoryButton = document.createElement("button");
    memoryButton.innerText = "🧠 記憶操作";
    memoryButton.style.margin = "4px";
    memoryButton.onclick = () => showMemoryDialog();
    container.appendChild(memoryButton);
}

function showMemoryDialog() {
    const modal = document.createElement("div");
    Object.assign(modal.style, {
        position: "fixed", top: "20%", left: "35%", padding: "20px",
        background: "#1c1c1c", color: "white", border: "1px solid #555", zIndex: 9999
    });

    modal.innerHTML = `
        <h3 style="margin-top:0;">🧠 記憶管理</h3>
        <textarea id="memoryArea" rows="10" style="width:100%">${currentMemory.join("\n")}</textarea><br><br>
        <button onclick="saveMemory()">✅ 儲存</button>
        <button onclick="clearMemory()">🗑️ 清除</button>
        <button onclick="this.parentNode.remove()">❌ 關閉</button>
    `;
    document.body.appendChild(modal);
    window.saveMemory = () => {
        const area = document.getElementById("memoryArea");
        currentMemory = area.value.split("\n").filter(x => x.trim() !== "");
        alert("✅ 記憶已儲存！");
    };
    window.clearMemory = () => {
        currentMemory = [];
        document.getElementById("memoryArea").value = "";
        alert("🗑️ 記憶已清除！");
    };
}