console.info("[SOCIETY] goldenClock.js loaded");

// TODO: Add more machines
global.handleProgress = (level, block) => {
  const eventObj = { level: level, block: block };
  let id = block.id;
  switch (id) {
    case "society:loom":
      global.handleBETick(eventObj, global.loomRecipes, 1, false, true);
      break;
    case "society:mayonnaise_machine":
      global.handleBETick(
        eventObj,
        global.mayonnaiseMachineRecipes,
        1,
        false,
        true
      );
      break;
    case "society:preserves_jar":
      global.handleBETick(eventObj, global.preservesJarRecipes, 4, false, true);
      break;
    case "society:crystalarium":
      global.handleBETick(
        eventObj,
        global.crystalariumCrystals,
        5,
        false,
        true
      );
      break;
    case "society:aging_cask":
      global.handleBETick(eventObj, global.agingCaskRecipes, 10, true, true);
      break;
    case "society:ancient_cask":
      global.handleBETick(eventObj, global.ancientCaskRecipes, 20, false, true);
      break;
    case "society:dehydrator":
      global.handleBETick(eventObj, global.dehydratorRecipes, 1, false, true);
      break;
    case "society:deluxe_worm_farm":
      global.handleBETick(eventObj, null, 1, false, true);
      break;
    case "society:seed_maker":
      global.handleBETick(eventObj, global.seedMakerRecipes, 1, false, true);
      break;
    case "society:fish_smoker":
      global.handleBETick(eventObj, global.fishSmokerRecipes, 2, false, true);
      break;
    case "society:bait_maker":
      global.handleBETick(eventObj, global.baitMakerRecipes, 1, false, true);
      break;
    default:
      console.log("Invalid artisan machine!");
  }
};

StartupEvents.registry("block", (event) => {
  event
    .create("society:golden_clock", "cardinal")
    .soundType("copper")
    .box(1, 0, 1, 15, 16, 15)
    .defaultCutout()
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:needs_stone_tool")
    .item((item) => {
      item.tooltip(
        Text.gray("Randomly progresses artisan machines in a 5x5x5 area")
      );
      item.modelJson({
        parent: "society:block/golden_clock",
      });
    })
    .model("society:block/golden_clock")
    .randomTick((tick) => {
      const { block, level } = tick;
      const { x, y, z } = block;
      const radius = 2;
      let scanBlock;
      if (rnd5()) {
        for (let pos of BlockPos.betweenClosed(
          new BlockPos(x - radius, y - radius, z - radius),
          [x + radius, y + radius, z + radius]
        )) {
          scanBlock = level.getBlock(pos);
          if (scanBlock.hasTag("society:golden_clock_advanced")) {
            global.handleProgress(level, scanBlock);
          }
        }
        level.server.runCommandSilent(
          `playsound tanukidecor:block.grandfather_clock.chime block @a ${x} ${y} ${z}`
        );
      }
    });
});
