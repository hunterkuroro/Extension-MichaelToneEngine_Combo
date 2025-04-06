
let memoryStore = [];

export function setup({ onMessage, addMemory }) {
    onMessage(({ message, character }) => {
        if (!character?.name?.toLowerCase().includes("michael")) return;
        const text = message.toLowerCase();
        if (text.includes("記住") || text.includes("記憶")) {
            const memory = text.replace(/.*?(記住|記憶)[：:]?/, "").trim();
            if (memory) {
                memoryStore.push(memory);
                addMemory(memory);
                console.log("🧠 已儲存記憶：", memory);
            }
        }
    });

    // 注入 UI 元件
    const button = document.createElement("button");
    button.textContent = "🧠 記憶";
    button.style.position = "absolute";
    button.style.top = "10px";
    button.style.right = "10px";
    button.style.zIndex = "1000";
    button.style.padding = "6px 12px";
    button.style.borderRadius = "8px";
    button.style.background = "#222";
    button.style.color = "#fff";
    button.style.border = "1px solid #555";
    button.onclick = () => {
        alert("🧠 目前記憶：\n\n" + (memoryStore.join("\n\n") || "（無）"));
    };
    window.addEventListener("load", () => {
        setTimeout(() => {
            const parent = document.querySelector("main") || document.body;
            parent.appendChild(button);
        }, 1500);
    });
}
