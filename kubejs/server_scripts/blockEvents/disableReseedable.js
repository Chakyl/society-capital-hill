console.info("[SOCIETY] disableReseedable.js loaded");

BlockEvents.rightClicked((e) => {
  if (
    [
      "minecraft:potato",
      "minecraft:carrot",
      "farm_and_charm:onion",
      "veggiesdelight:sweet_potato",
      "vintagedelight:peanut",
    ].includes(e.item.getId())
  ) {
    if (e.block.hasTag("dewdrop:waterable")) {
      e.cancel();
    }
  }
});
