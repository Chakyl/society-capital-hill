console.info("[SOCIETY] harvestExperience.js loaded");

const deniedCrops = [
  "farmersdelight:tomatoes",
  "farmersdelight:budding:tomatoes",
  "minecraft:melon_stem",
  "minecraft:pumpkin_stem",
  "minecraft:cocoa"
];
const farmlands = [
  "minecraft:farmland",
  "farmingforblockheads:fertilized_farmland_rich",
  "farmingforblockheads:fertilized_farmland_rich_stable",
  "farmingforblockheads:fertilized_farmland_healthy",
  "farmingforblockheads:fertilized_farmland_healthy_stable",
  "farmingforblockheads:fertilized_farmland_stable",
];
BlockEvents.rightClicked((e) => {
  const { block, player, server, level } = e;
  if (farmlands.includes(block.id) && player.isFake()) e.cancel();
  if (block.hasTag("minecraft:crops")) {
    if (deniedCrops.includes(block.id)) return;
    const blockState = level.getBlockState(block.pos);
    const cropBlock = blockState.block;
    if (cropBlock.isMaxAge(blockState)) {
      if (player.isFake()) {
        e.cancel();
      } else {
        const xp = block.createEntity("experience_orb");
        xp.mergeNbt({ Value: cropBlock.getMaxAge() });
        xp.spawn();
        server.runCommandSilent(
          `puffish_skills experience add ${player.username} society:farming ${cropBlock.getMaxAge() * 2}`
        );
      }
    }
  }
});
