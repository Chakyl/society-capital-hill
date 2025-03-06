console.info("[SOCIETY] addToolRecipes.js loaded");

ServerEvents.recipes((e) => {
  const shapeTemplate = ["cmc", "cTc", "ccc"];
  const toolTypes = ["pickaxe", "shovel", "hoe", "sword", "axe"];
  const armorTypes = ["helmet", "chestplate", "leggings", "boots"];

  const upgradeTool = (type, modId, armor) => {
    if (!armor) {
      if (type !== "watering_can") {
        e.smithing(
          `${modId}:stone_${type}`,
          `numismatics:cog`,
          `${modId}:wooden_${type}`,
          "minecraft:cobblestone"
        );
        e.smithing(
          `${modId}:iron_${type}`,
          `society:iron_upgrade_smithing_template`,
          `${modId}:stone_${type}`,
          "minecraft:iron_ingot"
        );
      }
    } else {
      e.smithing(
        `${modId}:chainmail_${type}`,
        `society:iron_upgrade_smithing_template`,
        `${modId}:leather_${type}`,
        "minecraft:chain"
      );
      e.smithing(
        `${modId}:iron_${type}`,
        `society:iron_upgrade_smithing_template`,
        `${modId}:chainmail_${type}`,
        "minecraft:iron_ingot"
      );
    }
    e.smithing(
      `${modId}:gold${modId === "minecraft" ? "en" : ""}_${type}`,
      `society:gold_upgrade_smithing_template`,
      `${modId}:iron_${type}`,
      "minecraft:gold_ingot"
    );
    e.smithing(
      `${modId}:diamond_${type}`,
      `society:diamond_upgrade_smithing_template`,
      `${modId}:gold${modId === "minecraft" ? "en" : ""}_${type}`,
      "minecraft:diamond"
    );
    if (modId !== "aquaculture") {
      e.smithing(
        `${modId}:netherite_${type}`,
        `minecraft:netherite_upgrade_smithing_template`,
        `${modId}:diamond_${type}`,
        "minecraft:netherite_ingot"
      );
    }
  };
  e.smithing(
    `society:galaxy_sword`,
    `minecraft:netherite_upgrade_smithing_template`,
    `minecraft:netherite_sword`,
    "society:prismatic_shard"
  );
  
  
  const manasteelUpgrades = (type) => {
    e.smithing(
      `botania:manasteel_${type === "pickaxe" ? "pick" : type}`,
      `society:botanical_tribute`,
      `minecraft:golden_${type}`,
      "botania:manasteel_ingot"
    );
  };
  const elementiumUpgrades = (type) => {
    e.smithing(
      `botania:elementium_${type}`,
      `society:botanical_tribute`,
      `botania:manasteel_${type === "pickaxe" ? "pick" : type}`,
      "botania:elementium_ingot"
    );
  };
  e.smithing(
    'botania:glass_pickaxe',
    "society:botanical_tribute",
    "botania:manasteel_pick",
    "botania:mana_glass"
  );
  const runes = ["spring", "summer", "autumn", "winter"];
  const terrasteelUpgrades = (type, runeIndex) => {
    e.shaped(`botania:terrasteel_${type}`, ["crc", "mTm", "cmc"], {
      T: Item.of(`botania:manasteel_${type}`),
      m: "botania:terrasteel_ingot",
      c: "society:botanical_tribute",
      r: `botania:rune_${runes[runeIndex]}`,
    }).modifyResult((grid, result) => {
      let item = grid.find(Item.of(`botania:manasteel_${type}`));
      return result.withNBT(item.nbt);
    });
  };
  const neptuniumUpgrades = (type) => {
    e.smithing(
      `aquaculture:neptunium_${type}`,
      `society:neptunium_upgrade_smithing_template`,
      `minecraft:diamond_${type}`,
      "aquaculture:neptunium_ingot"
    );
  };
  toolTypes.forEach((type) => {
    upgradeTool(type, "minecraft");
    neptuniumUpgrades(type);
    manasteelUpgrades(type);
    elementiumUpgrades(type);
  });
  armorTypes.forEach((type, index) => {
    upgradeTool(type, "minecraft", true);
    neptuniumUpgrades(type);
    manasteelUpgrades(type);
    elementiumUpgrades(type);
    terrasteelUpgrades(type, index);
  });
  e.smithing(
    `aquaculture:neptunium_bow`,
    `society:neptunium_upgrade_smithing_template`,
    `minecraft:bow`,
    "aquaculture:neptunium_ingot"
  );
  upgradeTool("fillet_knife", "aquaculture");
  e.smithing(
    `aquaculture:neptunium_fillet_knife`,
    `society:neptunium_upgrade_smithing_template`,
    `aquaculture:diamond_fillet_knife`,
    "aquaculture:neptunium_ingot"
  );

  // BA brush
  e.shaped(`betterarcheology:iron_brush`, shapeTemplate, {
    T: Item.of(`minecraft:brush`),
    m: "minecraft:iron_ingot",
    c: "numismatics:cog",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of(`minecraft:brush`));
    return result.withNBT(item.nbt);
  });
  e.shaped(`betterarcheology:diamond_brush`, shapeTemplate, {
    T: Item.of("betterarcheology:iron_brush"),
    m: "minecraft:diamond",
    c: "numismatics:crown",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of("betterarcheology:iron_brush"));
    return result.withNBT(item.nbt);
  });
  e.shaped(`betterarcheology:netherite_brush`, ["cmc", "cTc", "csc"], {
    T: Item.of(`betterarcheology:diamond_brush`),
    m: "minecraft:netherite_ingot",
    c: "numismatics:sun",
    s: "minecraft:netherite_upgrade_smithing_template",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of(`betterarcheology:diamond_brush`));
    return result.withNBT(item.nbt);
  });
  // Knives
  const knifeTiers = ["flint", "iron", "gold", "diamond", "netherite"];
  knifeTiers.forEach((tier, index) => {
    if (index > 0) {
      e.smithing(
        `farmersdelight:${tier === "gold" ? "golden" : tier}_knife`,
        tier === "netherite"
          ? `minecraft:netherite_upgrade_smithing_template`
          : `society:${tier}_upgrade_smithing_template`,
        `farmersdelight:${
          tier === "diamond" ? "golden" : knifeTiers[index - 1]
        }_knife`,
        `minecraft:${tier}${tier === "diamond" ? "" : "_ingot"}`
      );
    }
  });
  const rodTiers = ["normal", "iron", "gold", "diamond", "neptunium"];
  rodTiers.forEach((tier, index) => {
    if (index > 0) {
      e.smithing(
        `aquaculture:${tier}_fishing_rod`,
        tier === "netherite"
          ? `minecraft:netherite_upgrade_smithing_template`
          : `society:${tier}_upgrade_smithing_template`,
        tier === "iron"
          ? "minecraft:fishing_rod"
          : `aquaculture:${rodTiers[index - 1]}_fishing_rod`,
        tier === "neptunium"
          ? "aquaculture:neptunium_ingot"
          : `minecraft:${tier}${tier === "diamond" ? "" : "_ingot"}`
      );
    }
  });
  // Misc
  e.shaped("create:netherite_backtank", ["cmc", "cTc", "csc"], {
    T: Item.of("create:copper_backtank"),
    m: "minecraft:netherite_ingot",
    c: "numismatics:sun",
    s: "minecraft:netherite_chestplate",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of("create:copper_backtank"));
    return result.withNBT(item.nbt);
  });
  e.shaped("create:netherite_diving_helmet", ["cmc", "cTc", "csc"], {
    T: Item.of("create:copper_diving_helmet"),
    m: "minecraft:netherite_ingot",
    c: "numismatics:sun",
    s: "minecraft:netherite_helmet",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of("create:copper_diving_helmet"));
    return result.withNBT(item.nbt);
  });
  e.shaped("create:netherite_diving_boots", ["cmc", "cTc", "csc"], {
    T: Item.of("create:copper_diving_boots"),
    m: "minecraft:netherite_ingot",
    c: "numismatics:sun",
    s: "minecraft:netherite_boots",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of("create:copper_diving_boots"));
    return result.withNBT(item.nbt);
  });
  // Wool armor
  const upgradeWool = (type, mappedType) => {
    e.smithing(
      `minecraft:chainmail_${mappedType}`,
      `society:iron_upgrade_smithing_template`,
      `sewingkit:wool_${type}`,
      "minecraft:chain"
    );
  };
  [
    { wool: "hat", upgrade: "helmet" },
    { wool: "shirt", upgrade: "chestplate" },
    { wool: "pants", upgrade: "leggings" },
    { wool: "shoes", upgrade: "boots" },
  ].forEach((entry) => {
    upgradeWool(entry.wool, entry.upgrade);
  });
  e.smithing(
    `society:dragontooth_axe`,
    `minecraft:netherite_upgrade_smithing_template`,
    "minecraft:diamond_axe",
    "quark:dragon_scale"
  );
  // Watering Cans
  e.smithing(
    "dew_drop_watering_cans:iron_watering_can",
    `society:iron_upgrade_smithing_template`,
    "dew_drop_watering_cans:copper_watering_can",
    "minecraft:iron_ingot"
  );
  upgradeTool("watering_can", "dew_drop_watering_cans");
});
