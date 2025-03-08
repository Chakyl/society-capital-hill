console.info("[SOCIETY] registerCoinLeaderboardPlayers.js loaded");

PlayerEvents.loggedIn((e) => {
  if (!e.player.stages.has("first_login")) {
    e.player.stages.add("first_login");
    let playerList = JsonIO.read("kubejs/data/players_registered.json");

    if (playerList == null) {
      JsonIO.write("kubejs/data/players_registered.json", "{}");
      playerList = JsonIO.read("kubejs/data/players_registered.json");
    }

    if (!playerList.containsKey(e.player.uuid)) {
      playerList[e.player.uuid] = e.player.name.string;
      JsonIO.write("kubejs/data/players_registered.json", playerList);
    }
  }
});
