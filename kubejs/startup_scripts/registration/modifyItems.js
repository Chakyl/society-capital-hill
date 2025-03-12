ItemEvents.modification((e) => {
  e.modify("*", (item) => {
    item.maxDamage *= 3;
  });
  e.modify("gag:energized_hearthstone", (item) => {
    item.maxDamage = 2;
  });
  e.modify("gag:hearthstone", (item) => {
    item.maxDamage = 2;
  });
  e.modify("gag:escape_rope", (item) => {
    item.maxDamage = 512;
  });
  global.geodeList.forEach((geodeItem) => {
    const { item } = geodeItem;
    e.modify(item, (item) => {
      item.rarity = "uncommon";
    });
  });
  global.frozenGeodeList.forEach((geodeItem) => {
    const { item } = geodeItem;
    e.modify(item, (item) => {
      item.rarity = "rare";
    });
  });
  global.magmaGeodeList.forEach((geodeItem) => {
    const { item } = geodeItem;
    e.modify(item, (item) => {
      item.rarity = "epic";
    });
  });
  e.modify(["society:bank_meter", "society:milk_pail"], (item) => {
    item.maxStackSize = 1;
  });
  e.modify("society:aquamarine", (item) => {
    item.rarity = "uncommon";
  });
  e.modify("society:amethyst_chunk", (item) => {
    item.rarity = "uncommon";
  });
  e.modify("society:ruby", (item) => {
    item.rarity = "rare";
  });
  e.modify("society:topaz", (item) => {
    item.rarity = "rare";
  });
  e.modify("quark:diamond_heart", (item) => {
    item.rarity = "epic";
  });
  e.modify("society:jade", (item) => {
    item.rarity = "epic";
  });
  e.modify("society:prismatic_shard", (item) => {
    item.rarity = "epic";
  });
  e.modify("society:golden_clock", (item) => {
    item.rarity = "epic";
  });
  const goldVanillaTools = [
    "minecraft:golden_hoe",
    "minecraft:golden_axe",
    "minecraft:golden_pickaxe",
    "minecraft:golden_shovel",
  ];
  goldVanillaTools.forEach((tool) => {
    e.modify(tool, (item) => {
      item.digSpeed = 7;
      item.tier = (tier) => {
        tier.level = 3;
      };
    });
  });
  const goldHammers = [
    "justhammers:gold_reinforced_impact_hammer",
    "justhammers:gold_hammer",
    "justhammers:gold_impact_hammer",
    "justhammers:gold_reinforced_hammer",
  ];
  goldHammers.forEach((tool) => {
    e.modify(tool, (item) => {
      item.digSpeed = 7;
      item.tier = (tier) => {
        tier.level = 3;
      };
    });
  });
  e.modify("minecraft:golden_sword", (item) => {
    item.setAttackDamage(6.5);
  });
  e.modify("minecraft:golden_axe", (item) => {
    item.setAttackDamage(8);
  });
  const goldTools = [
    "farmersdelight:golden_knife",
    "aquaculture:gold_fishing_rod",
    "aquaculture:gold_fillet_knife",
    "sewingkit:gold_sewing_needle",
    "justhammers:gold_reinforced_hammer",
    "minecraft:golden_sword",
    "minecraft:golden_hoe",
    "minecraft:golden_axe",
    "minecraft:golden_pickaxe",
    "minecraft:golden_shovel",
    "justhammers:gold_reinforced_impact_hammer",
    "justhammers:gold_destructor_hammer",
    "justhammers:gold_impact_hammer",
    "justhammers:gold_hammer",
  ];
  goldTools.forEach((tool) => {
    e.modify(tool, (item) => {
      item.maxDamage *= tool.split(":")[0] === "justhammers" ? 2 : 16;
    });
  });
  e.modify("minecraft:golden_helmet", (item) => {
    item.maxDamage *= 3;
    item.setArmorProtection(2.5);
  });
  e.modify("minecraft:golden_chestplate", (item) => {
    item.maxDamage *= 3;
    item.setArmorProtection(7);
  });
  e.modify("minecraft:golden_leggings", (item) => {
    item.maxDamage *= 3;
    item.setArmorProtection(5.5);
  });
  e.modify("minecraft:golden_boots", (item) => {
    item.maxDamage *= 3;
    item.setArmorProtection(2.5);
  });
  e.modify("twigs:twig", (item) => (item.burnTime = 20));
});
