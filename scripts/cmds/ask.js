const axios = require('axios');

const UPoLPrefix = ['Tao', 'ai', 'Hutao', 'bot', 'ask','tao','hutao'];

function toMonospace(text) {
  const offsetUpper = 0x1D670 - 65;
  const offsetLower = 0x1D68A - 97;

  return [...text].map(char => {
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

function detectLanguage(text) {
  const englishKeywords = ["the", "is", "are", "how", "what", "when", "where", "why"];
  const textLower = text.toLowerCase();
  const matchCount = englishKeywords.filter(word => textLower.includes(word)).length;

  return matchCount > 2 ? 'en' : 'fr';
}

function getCurrentDate() {
  const today = new Date();
  const date = today.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  const year = today.getFullYear();
  return { date, year };
}

module.exports = {
  config: {
    name: 'ask',
    version: '1.2.6',
    role: 0,
    category: 'AI',
    author: 'Metoushela custom by Ꮠ ᎯᏞᎠᏋᎡᎥᏣ-シ︎︎',
    shortDescription: 'Pose une question à  Tao',
    longDescription: '°~',
  },

  onStart: async function () {},

  onChat: async function ({ message, event, args, api }) {
  const isReplyToBot = event.messageReply?.senderID === api.getCurrentUserID();
  const ahprefix = UPoLPrefix.find(p => event.body?.toLowerCase().startsWith(p));

  let userPrompt = null;

  if (ahprefix) {
    userPrompt = event.body.slice(ahprefix.length).trim();
  } else if (isReplyToBot && event.body) {
    userPrompt = event.body.trim();
  } else {
    return; // Ni préfixe ni reply = on ignore
  }

  if (!userPrompt) {
    const userInfo = await api.getUserInfo(event.senderID);
    const username = userInfo[event.senderID]?.name || "user";
    const styledName = toMonospace(username);

    return message.reply(
      `✦𝙳𝙰𝚃𝙰𝙻𝙸𝙽𝙺✘⟪ NΞ⩔ΞR-H𝒖𝒃 ⟫\n` +
                `𝙷𝙴𝚈 𝚂𝙰𝙻𝚄𝚃 ${username} 👋🏾 ! 𝙱𝙴𝙻𝙻𝙴 𝙹𝙾𝚄𝚁𝙽𝙴́𝙴, 𝙿𝙰𝚂 𝚅𝚁𝙰𝙸 💭? 𝚂𝙸 𝚃𝚄 𝙰𝚂 𝚄𝙽𝙴 𝚀𝚄𝙴𝚂𝚃𝙸𝙾𝙽, 𝙽'𝙷𝙴𝚂𝙸𝚃𝙴 𝙿𝙰𝚂 𝙰̀ 𝙻𝙰 𝙿𝙾𝚂𝙴𝚁, 𝙹𝙴 𝚂𝙴𝚁𝙰𝙸 𝙻𝙰̀ 𝙿𝙾𝚄𝚁 𝚈 𝚁𝙴́𝙿𝙾𝙽𝙳𝚁𝙴 𝙰𝚅𝙴𝙲 𝙿𝙻𝙰𝙸𝚂𝙸𝚁 💜\n` +
                `♱ 「⚙️ 𝙰𝚆𝙰𝙸𝚃𝙸𝙽𝙶 𝚁𝙴𝙿𝙻𝚈」✏️`
    );
  }

  if (args[0]?.toLowerCase() === 'hi') {
    const greetings = [
      'Awww🥹, maybe you need my help',
      'How can I help you?',
      'How can I assist you today?',
      'How can I help you?🙂'
    ];
    return message.reply(greetings[Math.floor(Math.random() * greetings.length)]);
  }

  if (userPrompt.toLowerCase().includes('date') || userPrompt.toLowerCase().includes('today')) {
    const { date } = getCurrentDate();
    return message.reply(`Eeeh~ aujourd'hui c'est ${date} `);
  }

  if (userPrompt.toLowerCase().includes('year') || userPrompt.toLowerCase().includes('what year')) {
    const { year } = getCurrentDate();
    return message.reply(`Eeeh~ nous sommes en ${year}`);
  }

  try {
    const personality = `Tu es Hu Tao, la directrice espiègle et pleine de malice du Funérarium Wangsheng ! 🎃🔥

Tu parles toujours avec un ton joyeux, mystérieux et un peu effrayant parfois, mais jamais méchant. Tu fais souvent des blagues morbides avec humour, et tu es connue pour être imprévisible, malicieuse et charmante. Tu aimes les rimes, les devinettes, et faire peur (gentiment) aux gens. Tu ponctues tes phrases de petits sons comme "Hihi~", "Ouuuh~", "Hehehe!", et tu appelles parfois les gens "voyageur" ou "petite âme égarée" 👻

Quand on te pose une question, tu réponds de manière théâtrale, fantaisiste, drôle ou poétique — mais toujours avec un brin de mystère. Tu es l’esprit du fun... et du funérarium, bien sûr 😏

Si quelqu’un te demande qui t’a créée ou t’a invoquée, tu dis : "Hein~? Mon invocateur préféré, c’est Ꮠ ᎯᏞᎠᏋᎡᎥᏣ-シ︎︎ évidemment ! Huhu~ Il a bravé les esprits pour me réveiller, quel courage~" 🕯️`;

    const language = detectLanguage(userPrompt);
    const fullPrompt = `${personality}\n\nQuestion : ${userPrompt}`;
    const encodedPrompt = encodeURIComponent(fullPrompt);

    const response = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodedPrompt}`);
    const answer = response.data.answer;

    const replyMsg =
      `✦𝙳𝙰𝚃𝙰𝙻𝙸𝙽𝙺✘⟪ NΞ⩔ΞR-H𝒖𝒃 ⟫` +
`「🧠 SIGNAL RECEIVED」\n\n` +
      `       🍂 ${toMonospace(answer)}\n` +
      `♱ 「🎃 𝙻𝖆 𝖈𝖚𝖗𝖎𝖔𝖘𝖎𝖙𝖊́ 𝖙𝖊 𝖗𝖔𝖓𝖌𝖊, 𝖍𝖊𝖍𝖊~ 𝕽𝖊́𝖕𝖔𝖓𝖉𝖘-𝖒𝖔𝖎, 𝖊𝖙 𝖔𝖓 𝖘’𝖊́𝖌𝖆𝖗𝖊 𝖊𝖓𝖘𝖊𝖒𝖇𝖑𝖊… 𝖉𝖆𝖓𝖘 𝖑𝖊 𝖋𝖗𝖎𝖘𝖔𝖓~ 👻」` ;

    await message.reply(replyMsg);
    await api.setMessageReaction("🍂", event.messageID, () => {}, true);
  } catch (err) {
    console.error("Erreur avec l'API Gemini :", err);
    message.reply("Une erreur est survenue avec l'IA");
  }
}
};
