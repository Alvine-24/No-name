module.exports = {
  config: {
    name: "hutaogc",
    version: "1.0",
    author: "元 Aldéric-シ︎︎",
    countDown: 10,
    role: 0,
    shortDescription: "Ajouter un utilisateur au groupe de l'administrateur",
    longDescription: "Ajoutez un utilisateur au groupe de l'administrateur lorsqu'il écrit 'hutaogc'",
    category: "admin",
  },

  onStart: async function ({ event, message, api, args }) {
    // ID du groupe de l'administrateur (à remplacer par votre propre ID de groupe)
    const adminGroupID = "6721795254603251";
    const userID = event.senderID;

    try {
      const userInfo = await api.getUserInfo(userID);
      const userName = userInfo[userID].name;

      await api.addUserToGroup(userID, adminGroupID);
      message.reply({
        body: `🎉 Bienvenue, ${userName} ! 🎉\nVous avez été ajouté au groupe de l'administrateur. Nous espérons que vous trouverez cette communauté utile et agréable. 😊`,
        mentions: [{ tag: userName, id: userID }]
      });
    } catch (error) {
      message.reply({
        body: `❌ Désolé, une erreur est survenue lors de l'ajout au groupe. ❌\nVeuillez réessayer plus tard ou contacter l'administrateur avec la cmd callad.\nErreur: ${error.message} 😢`,
        mentions: [{ tag: "vous", id: userID }]
      });
    }
  }
};
