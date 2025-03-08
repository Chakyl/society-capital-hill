// priority: 0
console.info("[SOCIETY] handleItemBlockFluidTags.js.js loaded");

ServerEvents.tags("item", (e) => {
  const stripTags = [
    "sewingkit:bone_sewing_needle",
    "sewingkit:diamond_sewing_needle",
    "sewingkit:netherite_sewing_needle",
    "sewingkit:wood_sewing_needle",
    "sewingkit:gold_sewing_needle",
    "refurbished_furniture:knife",
    "vintagedelight:cheese_wheel",
    "vintagedelight:oat_dough",
    "vintagedelight:oat_seeds",
    "vintagedelight:raw_oats",
    "vintagedelight:salt_dust",
    "vintagedelight:cheese_curds",
    "vintagedelight:cheese_slice",
    "vintagedelight:wild_oats",
    "vintagedelight:oat",
    "vintagedelight:oat_bag",
    "farm_and_charm:chicken_parts",
    "farmersdelight:carrot_crate",
    "farmersdelight:rich_soil",
    "farm_and_charm:bacon",
    "farmersdelight:onion",
    "farm_and_charm:tomato_seeds",
    "farm_and_charm:rotten_tomato",
    "farm_and_charm:tomato",
    "farmersdelight:organic_compost",
    "farmersdelight:wild_cabbages",
    "farmersdelight:wild_beetroots",
    "farmersdelight:rich_soil_farmland",
    "farmersdelight:wild_onions",
    "farmersdelight:tomato_seeds",
    "farmersdelight:raw_pasta",
    "farmersdelight:wild_rice",
    "farmersdelight:bacon_and_eggs",
    "farmersdelight:wild_carrots",
    "farmersdelight:dog_food",
    "farmersdelight:horse_feed",
    "farmersdelight:wild_potatoes",
    "farmersdelight:cabbage_crate",
    "farmersdelight:tomato_crate",
    "farmersdelight:beetroot_crate",
    "farmersdelight:onion_crate",
    "farmersdelight:potato_crate",
    "farmersdelight:wheat_dough",
    "create:dough",
    "autumnity:syrup_bottle",
    "candlelight:mozzarella",
    "quark:rope",
    "brewery:hops_seeds",
    "farm_and_charm:strawberry_seed",
    "pamhc2trees:orangeitem",
    "veggiesdelight:dandelion_leaf",
  ];
  stripTags.forEach((item) => {
    e.removeAllTagsFrom(item);
  });
});

ServerEvents.tags("item", (e) => {
  // Misc tags
  e.add("forge:crops", "society:ancient_fruit");
  e.add("forge:salt", "meadow:alpine_salt");
  e.add("forge:crops", "society:tubabbaco");
  e.add("forge:crops", "society:blueberry");
  e.add("forge:berries", "society:blueberry");
  e.add("forge:crops", "society:eggplant");
  e.add("forge:crops", "society:eggplant");
  e.add("forge:vegetables/eggplant", "society:eggplant");
  e.add("forge:vegetables", "society:eggplant");
  e.add("meadow:water_bottles", "herbalbrews:water_cup");
  e.add("farm_and_charm:water_bottles", "herbalbrews:water_cup");
  e.add("forge:water_bottles", "herbalbrews:water_cup");
  e.add("forge:food/raw_pasta", "farm_and_charm:raw_pasta");
  e.add("forge:salad_ingredients", "farm_and_charm:lettuce");
  e.add("forge:grain/corn", "farm_and_charm:corn");
  e.add("candlelight:butter", "farm_and_charm:butter");
  e.add("netherdepthsupgrade:lava_fishing_rod", "forge:tools/fishing_rods");
  e.add("forge:rope", "brewery:rope");
  e.remove("candlelight:red_effect", "minecraft:potion");
  e.remove("candlelight:white_effect", "minecraft:potion");
  e.remove("candlelight:all_effects", "minecraft:potion");
  // Vinery leaf fix
  e.add("minecraft:mineable/hoe", "vinery:apple_leaves");
  e.add("minecraft:mineable/hoe", "vinery:dark_cherry_leaves");
  // Tag tags
  e.add("forge:food/cheese", "#forge:foods/cheese");
  e.add("forge:food/pastas", "#forge:foods/pastas");
  e.add("letsdo_addon_compat:tools/knives", "#forge:tools/knives");
  // Milk
  const bakeryMilks = [
    "minecraft:milk_bucket",
    "meadow:wooden_milk_bucket",
    "meadow:wooden_grain_milk_bucket",
  ];
  bakeryMilks.forEach((milk) => {
    e.add("bakery:milk", milk);
  });
  e.add("forge:milks", "meadow:wooden_grain_milk_bucket");
  e.add("farm_and_charm:milk", "meadow:wooden_grain_milk_bucket");
  // Bulk
  global.preserves.forEach((preserve) => {
    e.add("society:preserves", preserve.item);
  });
  global.lootFurniture.forEach((item) => {
    e.add("society:loot_furniture", item);
  });
  global.dehydratorRecipes.forEach((dehydratee) => {
    e.add(
      "society:dehydrated",
      dehydratee.output[0].substring(2, dehydratee.output[0].length)
    );
  });
  global.fish.forEach((fish) => {
    const splitFish = fish.item.split(":");
    let fishId = splitFish[1];
    if (
      ["barrel", "roe", "meat"].some((denied) => splitFish[1].includes(denied))
    )
      return;
    if (fishId.includes("raw_")) {
      fishId = fishId.substring(4, fishId.length);
    }
    
    e.add(`crabbersdelight:jei_display_results/society/${fishId}_bait`, fish.item);
  });
  global.agedRoe.forEach((preserve) => {
    e.add("society:aged_roe", preserve.item);
  });
  global.pristine.forEach((mineral) => {
    e.add("society:pristine_mineral", mineral.item);
  });

  [
    "society:large_egg",
    "society:large_duck_egg",
    "society:large_goose_egg",
    "society:large_turkey_egg",
  ].forEach((egg) => {
    e.add("society:large_eggs", egg);
  });
  const rawLogs = [
    "quark:blossom_log",
    "quark:ancient_log",
    "quark:azalea_log",
    "minecraft:dark_oak_log",
    "minecraft:mangrove_log",
    "minecraft:spruce_log",
    "minecraft:acacia_log",
    "meadow:pine_log",
    "minecraft:oak_log",
    "minecraft:birch_log",
    "minecraft:jungle_log",
    "minecraft:cherry_log",
    "betterarcheology:rotten_log",
    "vinery:dark_cherry_log",
    "beachparty:palm_log",
    "vinery:apple_log",
    "autumnity:maple_log",
    "atmospheric:rosewood_log",
    "atmospheric:morado_log",
    "atmospheric:yucca_log",
    "atmospheric:laurel_log",
    "atmospheric:aspen_log",
    "atmospheric:watchful_aspen_log",
    "atmospheric:kousa_log",
    "atmospheric:crustose_log",
    "atmospheric:grimwood_log",
  ];
  rawLogs.forEach((log) => {
    e.add("society:raw_logs", log);
  });
  // Furniture
  global.lootFurniture.forEach((furniture) => {
    e.add("society:loot_furniture", furniture);
  });
  const mirrors = [
    "furniture:cherry_mirror",
    "furniture:mangrove_mirror",
    "furniture:dark_oak_mirror",
    "furniture:acacia_mirror",
    "furniture:spruce_mirror",
    "furniture:jungle_mirror",
    "furniture:oak_mirror",
    "furniture:birch_mirror",
  ];
  mirrors.forEach((mirror) => {
    e.add("society:mirrors", mirror);
  });
  // Geodes
  const geodeJunk = [
    "minecraft:granite",
    "minecraft:diorite",
    "minecraft:andesite",
    "minecraft:clay_ball",
    "aquaculture:tin_can",
  ];
  geodeJunk.forEach((geodeItem) => {
    e.add("society:geode_junk", geodeItem);
  });
  const geodeBonus = [
    "minecraft:raw_iron",
    "minecraft:raw_copper",
    "minecraft:coal",
  ];
  geodeBonus.forEach((geodeItem) => {
    e.add("society:geode_bonus", geodeItem);
  });
  global.geodeList.forEach((geodeItem) => {
    e.add("society:geode_treasure", geodeItem.item);
    e.add("society:omni_geode_treasure", geodeItem.item);
  });
  const geodeRelic = ["relics:horse_flute", "relics:hunter_belt"];
  geodeRelic.forEach((geodeItem) => {
    e.add("society:geode_relic", geodeItem);
  });
  // Frozen Geode
  const frozenGeodeBonus = [
    "minecraft:raw_iron",
    "minecraft:raw_copper",
    "minecraft:ice",
    "minecraft:raw_zinc",
    "minecraft:coal",
  ];
  frozenGeodeBonus.forEach((geodeItem) => {
    e.add("society:frozen_geode_bonus", geodeItem);
  });
  global.frozenGeodeList.forEach((geodeItem) => {
    e.add("society:frozen_geode_treasure", geodeItem.item);
    e.add("society:omni_geode_treasure", geodeItem.item);
  });
  const frozenGeodeRelic = ["relics:wool_mitten", "relics:ice_skates"];
  frozenGeodeRelic.forEach((geodeItem) => {
    e.add("society:frozen_geode_relic", geodeItem);
  });
  // Magma Geode
  const magmaGeodeBonus = [
    "minecraft:raw_iron",
    "minecraft:raw_copper",
    "minecraft:raw_gold",
    "minecraft:raw_zinc",
    "minecraft:clay_ball",
    "minecraft:coal",
  ];
  magmaGeodeBonus.forEach((geodeItem) => {
    e.add("society:magma_geode_bonus", geodeItem);
  });
  global.magmaGeodeList.forEach((geodeItem) => {
    e.add("society:magma_geode_treasure", geodeItem.item);
    e.add("society:omni_geode_treasure", geodeItem.item);
  });
  const magmaGeodeRelic = ["relics:bastion_ring", "relics:magma_walker"];
  magmaGeodeRelic.forEach((geodeItem) => {
    e.add("society:magma_geode_relic", geodeItem);
  });
  // Omni Geode
  const omniGeodeBonus = [
    "minecraft:raw_iron",
    "minecraft:raw_gold",
    "minecraft:raw_zinc",
    "minecraft:ancient_debris",
  ];
  omniGeodeBonus.forEach((geodeItem) => {
    e.add("society:omni_geode_bonus", geodeItem);
  });
  e.add("society:omni_geode_special", "society:prismatic_shard");

  global.cooking.forEach((meal) => {
    e.add("society:dish", meal.item);
  });
  // Relics
  const relics = [
    "relics:aqua_walker",
    "relics:amphibian_boot",
    "relics:arrow_quiver",
    "relics:bastion_ring",
    "relics:rage_glove",
    "relics:chorus_inhibitor",
    "relics:drowned_belt",
    "relics:elytra_booster",
    "relics:enders_hand",
    "relics:holy_locket",
    "relics:horse_flute",
    "relics:hunter_belt",
    "relics:ice_breaker",
    "relics:ice_skates",
    "relics:infinity_ham",
    "relics:jellyfish_necklace",
    "relics:leather_belt",
    "relics:magma_walker",
    "relics:midnight_robe",
    "relics:reflection_necklace",
    "relics:roller_skates",
    "relics:shadow_glaive",
    "relics:space_dissector",
    "relics:spatial_sign",
    "relics:spore_sack",
    "relics:wool_mitten",
    "relics:blazing_flask",
  ];
  relics.forEach((relic) => e.add("society:relics", relic));

  Color.DYE.forEach((color) => {
    e.add(
      "society:botania_seeds",
      `botania_seeds:${color}_mystical_flower_seed`
    );
  });

  [
    "aquaculture:jellyfish",
    "aquaculture:goldfish",
    "aquaculture:leech",
    "society:neptuna",
  ].forEach((fish) => e.add("minecraft:fishes", fish));
  // Artifacts
  global.artifacts.forEach((artifact) => {
    e.add("society:artifacts", artifact.item);
  });
  // Furniture Workbench tags
  global.lootFurniture.forEach((item) => {
    if (item.includes("tanukidecor"))
      e.add("refurbished_furniture:outdoors", item);
    else e.add("refurbished_furniture:kitchen", item);
  });
  Ingredient.of("@fantasyfurniture").stacks.forEach((item) => {
    if (item.toString().includes("furniture_station")) return;
    e.add("refurbished_furniture:bathroom", item.id);
  });
  const smallMilks = [
    "society:milk",
    "society:goat_milk",
    "society:sheep_milk",
    "society:buffalo_milk",
    "society:warped_milk",
  ];
  smallMilks.forEach((item) => {
    e.add("society:small_milk", item);
  });
  const largeMilks = [
    "society:large_milk",
    "society:large_goat_milk",
    "society:large_buffalo_milk",
    "society:large_sheep_milk",
    "society:large_warped_milk",
  ];
  largeMilks.forEach((item) => {
    e.add("society:large_milk", item);
  });
});

ServerEvents.tags("block", (e) => {
  e.add("sturdy_farmland:weak_fertilizer", "minecraft:gold_block");
  e.add("sturdy_farmland:strong_fertilizer", "minecraft:diamond_block");
  e.add("sturdy_farmland:hydrating_fertilizer", "minecraft:lapis_block");
  const buildingGadgetsDeny = [
    "society:aging_cask",
    "society:ancient_cask",
    "society:charging_rod",
    "society:coin_leaderboard",
    "society:deluxe_worm_farm",
    "society:fish_pond",
    "society:loom",
    "society:crystalarium",
    "society:espresso_machine",
    "society:fish_smoker",
    "society:mayonnaise_machine",
    "society:preserves_jar",
    "society:prize_machine",
    "society:seed_maker",
    "society:dehydrator",
  ];
  buildingGadgetsDeny.forEach((block) => {
    e.add("buildinggadgets2:deny", block);
  });
  e.remove("minecraft:dirt", "farmersdelight:rich_soil");
  const rawLogs = [
    "quark:blossom_log",
    "quark:ancient_log",
    "quark:azalea_log",
    "minecraft:dark_oak_log",
    "minecraft:mangrove_log",
    "minecraft:spruce_log",
    "minecraft:acacia_log",
    "meadow:pine_log",
    "minecraft:oak_log",
    "minecraft:birch_log",
    "minecraft:jungle_log",
    "minecraft:cherry_log",
    "betterarcheology:rotten_log",
    "vinery:dark_cherry_log",
    "beachparty:palm_log",
    "vinery:apple_log",
  ];
  rawLogs.forEach((log) => {
    e.add("society:raw_logs", log);
  });
  const flowersMissingBlockTags = [
    "meadow:eriophorum_tall",
    "meadow:alpine_poppy",
    "meadow:delphinium",
    "meadow:saxifrage",
    "meadow:enzian",
    "meadow:fire_lily",
    "meadow:eriophorum",
    "meadow:small_fir",
  ];
  flowersMissingBlockTags.forEach((flower) => {
    e.add("minecraft:flowers", flower);
    e.add(
      flower !== "meadow:eriophorum_tall"
        ? "minecraft:small_flowers"
        : "minecraft:tall_flowers",
      flower
    );
  });
  // Sails
  e.remove("create:windmill_sails", "#minecraft:wool");
  const tickArtisanMachines = [
    "society:loom",
    "society:mayonnaise_machine",
    "society:preserves_jar",
    "society:crystalarium",
    "society:aging_cask",
    "society:ancient_cask",
    "society:dehydrator",
    "society:deluxe_worm_farm",
    "society:seed_maker",
    "society:fish_smoker",
  ];
  tickArtisanMachines.forEach((log) => {
    e.add("society:artisan_machine", log);
  });
  tickArtisanMachines.forEach((log) => {
    e.add("society:golden_clock_advanced", log);
  });
  const randomTickMachines = [
    "society:charging_rod",
    "society:espresso_machine",
  ];
  randomTickMachines.forEach((log) => {
    e.add("society:artisan_machine", log);
  });
  e.remove("minecraft:leaves", "beachparty:palm_leaves");
});

ServerEvents.tags("fluid", (e) => {
  e.removeAllTagsFrom("minecraft:milk");
  e.remove("forge:milk", "minecraft:milk");
  e.remove("minecraft:milk", "minecraft:milk");
});
