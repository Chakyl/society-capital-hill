console.info("[SOCIETY] disableBonemeal.js loaded");
const DispenserBlock = Java.loadClass(
  "net.minecraft.world.level.block.DispenserBlock"
);
DispenserBlock.registerBehavior(Item.of("minecraft:bone_meal").item, () => {});

BlockEvents.rightClicked((e) => {
  if (
    e.player.isHoldingInAnyHand("minecraft:bone_meal") ||
    e.player.isHoldingInAnyHand("meadow:watering_can")
  ) {
    if (
      e.block.hasTag("minecraft:crops") ||
      e.block.hasTag("minecraft:saplings") ||
      [
        "atmospheric:dragon_roots",
        "atmospheric:aloe_vera",
        "atmospheric:aloe_kernels",
        "atmospheric:yucca_branch",
        "minecraft:kelp",
        "farm_and_charm:wild_nettle",
        "farm_and_charm:wild_ribwort",
        "minecraft:cocoa",
        "minecraft:cave_vines",
        "minecraft:cave_vines_plant",
        "minecraft:bamboo",
        "nethervinery:crimson_grape_bush",
        "nethervinery:warped_grape_bush",
        "vinery:savanna_grape_bush_white",
        "vinery:jungle_grape_bush_red",
        "vinery:savanna_grape_bush_red",
        "vinery:white_grape_bush",
        "vinery:red_grape_bush",
        "vinery:taiga_grape_bush_red",
        "vinery:taiga_grape_bush_white",
        "vinery:jungle_grape_bush_white",
        "vinery:grapevine_stem",
        "nethervinery:obsidian_stem",
        "farmersdelight:budding_tomatoes",
        "farmersdelight:rice",
        "farmersdelight:rice_panicles",
        "herbalbrews:lavender",
        "herbalbrews:hibiscus",
        "minecraft:torchflower"
      ].includes(e.block.id)
    ) {
      e.player.tell("Bone Meal is too weak to grow this crop...");
      e.cancel();
    }
  }
});
