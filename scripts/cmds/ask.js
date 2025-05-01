const axios = require('axios');

// Fonction pour convertir en lettres monospace
function toMonospace(text) {
    const offsetUpper = 0x1D670 - 65; // A
    const offsetLower = 0x1D68A - 97; // a

    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            return String.fromCodePoint(code + offsetUpper);
        } else if (code >= 97 && code <= 122) {
            return String.fromCodePoint(code + offsetLower);
        } else {
            return char;
        }
    }).join('');
}

const apiKey = "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";
const url = "https://api.groq.com/openai/v1/chat/completions";

async function getAIResponse(input, messageID) {
    try {
        const requestBody = {
            model: "llama3-8b-8192",
            messages: [
                { role: "user", content: input }
            ]
        };

        const response = await axios.post(url, requestBody, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        });

        const reply = response.data.choices[0]?.message?.content || "Désolé, je n'ai pas de réponse pour le moment.";
        return { response: reply, messageID };

    } catch (error) {
        console.error("Erreur API Groq:", error);
        return { response: "Une erreur est survenue avec l'IA.", messageID };
    }
}

module.exports = {
    config: {
        name: 'ask',
        author: 'messie', // modified by Ꮠ ᎯᏞᎠᏋᎡᎥᏣ-シ︎︎
        role: 0,
        category: 'ai',
        shortDescription: 'ai to ask anything',
    },
    onStart: async function ({ api, event, args }) {
        const input = args.join(' ').trim();
        if (!input) return;

        let response;
        const keywords = ["tao", "ai", "ask", "hutao"];
        if (keywords.includes(input.toLowerCase())) {
            const userInfo = await api.getUserInfo(event.senderID);
            const username = userInfo[event.senderID]?.name || "utilisateur";

            response =
                `✦𝙳𝙰𝚃𝙰𝙻𝙸𝙽𝙺✘⟪ NΞ⩔ΞR-H𝒖𝒃 ⟫\n` +
                `𝙷𝙴𝚈 𝚂𝙰𝙻𝚄𝚃 ${username} 👋🏾 ! 𝙱𝙴𝙻𝙻𝙴 𝙹𝙾𝚄𝚁𝙽𝙴́𝙴, 𝙿𝙰𝚂 𝚅𝚁𝙰𝙸 ? 💭\n` +
                `𝚂𝙸 𝚃𝚄 𝙰𝚂 𝚄𝙽𝙴 𝚀𝚄𝙴𝚂𝚃𝙸𝙾𝙽, 𝙽'𝙷𝙴𝚂𝙸𝚃𝙴 𝙿𝙰𝚂 𝙰̀ 𝙻𝙰 𝙿𝙾𝚂𝙴𝚁, 𝙹𝙴 𝚂𝙴𝚁𝙰𝙸 𝙻𝙰̀ 𝙿𝙾𝚄𝚁 𝚈 𝚁𝙴́𝙿𝙾𝙽𝙳𝚁𝙴 𝙰𝚅𝙴𝙲 𝙿𝙻𝙰𝙸𝚂𝙸𝚁 💜✏️\n` +
                `♱ 「⚙️ 𝙰𝚆𝙰𝙸𝚃𝙸𝙽𝙶 𝚁𝙴𝙿𝙻𝚈」`;
        } else {
            const aiResponse = await getAIResponse(input, event.messageID);
            const label = toMonospace("SIGNAL RECEIVED");
            response =
                `✦𝙳𝙰𝚃𝙰𝙻𝙸𝙽𝙺✘⟪ NΞ⩔ΞR-H𝒖𝒃 ⟫\n` +
                `  「🧠 ${label}」\n` +
                `✉️ ${toMonospace(aiResponse.response)}\n` +
                `♱ 「⚙️ 𝙰𝚆𝙰𝙸𝚃𝙸𝙽𝙶 𝚁𝙴𝙿𝙻𝚈」`;
        }

        api.sendMessage(response, event.threadID, event.messageID);
    },

    onChat: async function ({ api, event, message }) {
        const messageContent = event.body.trim();
        const triggers = ["tao", "ai", "ask", "hutao"];
        const lower = messageContent.toLowerCase();
        const matchedTrigger = triggers.find(t => lower.startsWith(t));
        if (!matchedTrigger) return;

        let response;
        if (lower === matchedTrigger) {
            const userInfo = await api.getUserInfo(event.senderID);
            const username = userInfo[event.senderID]?.name || "utilisateur";

            response =
                `✦𝙳𝙰𝚃𝙰𝙻𝙸𝙽𝙺✘⟪ NΞ⩔ΞR-H𝒖𝒃 ⟫\n` +
                `𝙷𝙴𝚈 𝚂𝙰𝙻𝚄𝚃 ${username} 👋🏾 ! 𝙱𝙴𝙻𝙻𝙴 𝙹𝙾𝚄𝚁𝙽𝙴́𝙴, 𝙿𝙰𝚂 𝚅𝚁𝙰𝙸 💭? 𝚂𝙸 𝚃𝚄 𝙰𝚂 𝚄𝙽𝙴 𝚀𝚄𝙴𝚂𝚃𝙸𝙾𝙽, 𝙽'𝙷𝙴𝚂𝙸𝚃𝙴 𝙿𝙰𝚂 𝙰̀ 𝙻𝙰 𝙿𝙾𝚂𝙴𝚁, 𝙹𝙴 𝚂𝙴𝚁𝙰𝙸 𝙻𝙰̀ 𝙿𝙾𝚄𝚁 𝚈 𝚁𝙴́𝙿𝙾𝙽𝙳𝚁𝙴 𝙰𝚅𝙴𝙲 𝙿𝙻𝙰𝙸𝚂𝙸𝚁 💜\n` +
                `♱ 「⚙️ 𝙰𝚆𝙰𝙸𝚃𝙸𝙽𝙶 𝚁𝙴𝙿𝙻𝚈」✏️`;
        } else {
            const input = messageContent.replace(new RegExp(`^${matchedTrigger}\\s*`, "i"), "").trim();
            const aiResponse = await getAIResponse(input, event.messageID);
            const label = toMonospace("SIGNAL RECEIVED");
            response =
                `✦𝙳𝙰𝚃𝙰𝙻𝙸𝙽𝙺✘⟪ NΞ⩔ΞR-H𝒖𝒃 ⟫\n` +
                `  「🧠 ${label}」\n` +
                `✉️ ${toMonospace(aiResponse.response)}\n` +
                `♱ 「⚙️ 𝙰𝚆𝙰𝙸𝚃𝙸𝙽𝙶 𝚁𝙴𝙿𝙻𝚈」`;
        }

        message.reply(response);
    }
};
