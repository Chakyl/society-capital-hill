console.info("[SOCIETY] farmingLoot.js loaded");

const cropList = [
  "minecraft:wheat",
  "minecraft:carrots",
  "minecraft:potatoes",
  "minecraft:pumpkin_stem",
  "minecraft:melon_stem",
  "minecraft:torchflower_crop",
  "minecraft:pitcher_crop",
  "minecraft:beetroots",
  "minecraft:bamboo",
  "snowyspirit:ginger",
  "supplementaries:flax",
  "herbalbrews:coffee_plant",
  "herbalbrews:rooibos_plant",
  "herbalbrews:tea_plant",
  "herbalbrews:yerba_mate_plant",
  "minecraft:sweet_berry_bush",
  "farm_and_charm:tomato_crop",
  "farm_and_charm:strawberry",
  "farm_and_charm:lettuce_crop",
  "farm_and_charm:barley_crop",
  "farm_and_charm:onion_crop",
  "farm_and_charm:tomato_crop_body",
  "farm_and_charm:corn_crop",
  "farm_and_charm:oat_crop",
  "brewery:hops_crop",
  "brewery:hops_crop_body",
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
  "pamhc2trees:pamorange",
  "pamhc2trees:pamdragonfruit",
  "pamhc2trees:pampeach",
  "pamhc2trees:pamplum",
  "pamhc2trees:pambanana",
  "pamhc2trees:pamapple",
  "pamhc2trees:pamcherry",
  "pamhc2trees:pamstarfruit",
  "pamhc2trees:pamlychee",
  "pamhc2trees:pammango",
  "pamhc2trees:pamhazelnut",
  "pamhc2trees:pampawpaw",
  "pamhc2trees:pamcinnamon",
  "vintagedelight:ghost_pepper_crop",
  "vintagedelight:gearo_berry_bush",
  "vintagedelight:cucumber_crop",
  "farmersdelight:cabbages",
  "farmersdelight:budding_tomatoes",
  "farmersdelight:tomatoes",
  "vintagedelight:peanut_crop",
  "farmersdelight:rice",
  "farmersdelight:rice_panicles",
  "society:ancient_fruit",
  "etcetera:cotton",
  "society:tubabacco_leaf",
  "brewery:hop_trellis",
  "society:blueberry",
  "veggiesdelight:cauliflower_crop",
  "veggiesdelight:garlic_crop",
  "veggiesdelight:bellpepper_crop",
  "veggiesdelight:sweet_potato_crop",
  "society:eggplant",
];

const checkMaxGrownWithChance = (destroyedBlock, chance) => {
  return (
    chance > Math.random() &&
    destroyedBlock.blockState.block.isMaxAge(destroyedBlock.blockState)
  );
};

LootJS.modifiers((e) => {
  e.addBlockLootModifier(cropList)
    .hasAnyStage("sticky_crops")
    .apply((c) => {
      if (checkMaxGrownWithChance(c.destroyedBlock, 0.02)) {
        c.addLoot("society:pine_tar");
      }
    });
  e.addBlockLootModifier(cropList)
    .hasAnyStage("soil_inspector")
    .apply((c) => {
      if (checkMaxGrownWithChance(c.destroyedBlock, 0.05)) {
        c.addLoot("farm_and_charm:fertilizer");
      }
    });
  e.addBlockLootModifier(cropList)
    .randomChance(0.25)
    .customCondition({
      condition: "minecraft:location_check",
      offsetY: -1,
      predicate: {
        block: {
          blocks: ["dew_drop_farmland_growth:bountiful_fertilized_farmland"],
        },
      },
    })
    .modifyLoot(Ingredient.all, (itemStack) => {
      itemStack.setCount(itemStack.getCount() + 1);
      return itemStack;
    });
  e.addBlockLootModifier(cropList)
    .hasAnyStage("crop_collector")
    .modifyLoot(Ingredient.all, (itemStack) => {
      itemStack.setCount(itemStack.getCount() * 2);
      return itemStack;
    });
});
