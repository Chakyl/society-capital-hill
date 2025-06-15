console.info("[SOCIETY] disableSaltSnowball.js loaded");

BlockEvents.rightClicked("vintagedelight:salt", (e) => {
  if (e.player.isCrouching() || e.item.hasTag("forge:tools/shovels")) e.cancel();
});
