module.exports = {
  config: {
    name: "hu tao",
    version: "1.0",
    author: "元 Aldéric-シ︎︎",
    shortDescription: "Répond avec un GIF lorsque vous écrivez 'Hu Tao'",
    longDescription: "Répond avec un GIF à chaque fois que vous envoyez le mot 'Hu Tao' dans la conversation.",
    category: "Commandes",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    // Vérifie si le message contient le mot "Hu Tao" (en minuscules)
    if (event.body && event.body.toLowerCase() === "hu tao") {
      return message.reply({
        body: "Hey salut, je dance bien tu ne trouves pas ?💜🍀",
        attachment: await global.utils.getStreamFromURL("https://res.cloudinary.com/dqjupymch/video/upload/v1719001014/kxsrx3zxjoz4n0ecowxs.mp4")
      });
    }
  }
}
