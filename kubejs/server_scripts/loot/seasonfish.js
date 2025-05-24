console.info("[SOCIETY] seasonFish.js loaded");

const checkSeason = (p, season) =>
  global.getSeasonFromLevel(p.level) === season;

const convertToLootEntry = (entries) => {
  let pool = [];
  entries.forEach((entry) => {
    const { fish, weight } = entry;
    pool.push(LootEntry.of(fish).withWeight(weight));
  });
  return pool;
};

const createPool = (entries, clear, rain, night) => {
  let timeOfDayEntries;
  if (night) {
    timeOfDayEntries = entries.filter((fish) => fish.night === true);
  } else {
    timeOfDayEntries = entries.filter((fish) => fish.night === undefined);
  }
  let newPool = timeOfDayEntries.filter(
    (fish) => !fish.requiresRain && !fish.requiresClear
  );
  if (clear) {
    return newPool.concat(
      timeOfDayEntries.filter((fish) => fish.requiresClear)
    );
  }
  if (rain) {
    return newPool.concat(timeOfDayEntries.filter((fish) => fish.requiresRain));
  }
  return newPool;
};

const createWeatherLootTable = (
  e,
  season,
  weather,
  oceanFish,
  riverFish,
  freshFish,
  night
) => {
  if (!night) {
    e.addLootTableModifier("minecraft:gameplay/fishing")
      .playerPredicate((p) => checkSeason(p, season))
      .anyBiome("#minecraft:is_ocean", "#minecraft:is_beach")
      .weatherCheck(weather)
      .timeCheck(24000, 0, 12999)
      .addWeightedLoot([1, 1], convertToLootEntry(oceanFish));

    e.addLootTableModifier("minecraft:gameplay/fishing")
      .playerPredicate((p) => checkSeason(p, season))
      .anyBiome("#minecraft:is_river")
      .weatherCheck(weather)
      .timeCheck(24000, 0, 12999)
      .addWeightedLoot([1, 1], convertToLootEntry(riverFish));

    e.addLootTableModifier("minecraft:gameplay/fishing")
      .playerPredicate((p) => checkSeason(p, season))
      .not((n) => {
        n.anyBiome(
          "#minecraft:is_ocean",
          "#minecraft:is_beach",
          "#minecraft:is_river"
        );
      })
      .weatherCheck(weather)
      .timeCheck(24000, 0, 12999)
      .addWeightedLoot([1, 1], convertToLootEntry(freshFish));
  } else {
    e.addLootTableModifier("minecraft:gameplay/fishing")
      .playerPredicate((p) => checkSeason(p, season))
      .anyBiome("#minecraft:is_ocean", "#minecraft:is_beach")
      .weatherCheck(weather)
      .timeCheck(24000, 13000, 23999)
      .addWeightedLoot([1, 1], convertToLootEntry(oceanFish));

    e.addLootTableModifier("minecraft:gameplay/fishing")
      .playerPredicate((p) => checkSeason(p, season))
      .anyBiome("#minecraft:is_river")
      .weatherCheck(weather)
      .timeCheck(24000, 13000, 23999)
      .addWeightedLoot([1, 1], convertToLootEntry(riverFish));

    e.addLootTableModifier("minecraft:gameplay/fishing")
      .playerPredicate((p) => checkSeason(p, season))
      .not((n) => {
        n.anyBiome(
          "#minecraft:is_ocean",
          "#minecraft:is_beach",
          "#minecraft:is_river"
        );
      })
      .weatherCheck(weather)
      .timeCheck(24000, 13000, 23999)
      .addWeightedLoot([1, 1], convertToLootEntry(freshFish));
  }
};

const createSeasonLootTable = (
  e,
  season,
  oceanFish,
  riverFish,
  freshFish,
  night
) => {
  if (night) {
    createWeatherLootTable(
      e,
      season,
      { raining: false, thundering: false },
      createPool(oceanFish, true, false, true),
      createPool(riverFish, true, false, true),
      createPool(freshFish, true, false, true),
      true
    );
    createWeatherLootTable(
      e,
      season,
      { raining: true },
      createPool(oceanFish, false, true, true),
      createPool(riverFish, false, true, true),
      createPool(freshFish, false, true, true),
      true
    );
  } else {
    createWeatherLootTable(
      e,
      season,
      { raining: false, thundering: false },
      createPool(oceanFish, true, false, false),
      createPool(riverFish, true, false, false),
      createPool(freshFish, true, false, false)
    );
    createWeatherLootTable(
      e,
      season,
      { raining: true },
      createPool(oceanFish, false, true, false),
      createPool(riverFish, false, true, false),
      createPool(freshFish, false, true, false)
    );
  }
};

LootJS.modifiers((e) => {
  [
    "minecraft:cod",
    "minecraft:salmon",
    "minecraft:tropical_fish",
    "minecraft:pufferfish",
  ].forEach((fish) => {
    e.addLootTableModifier("minecraft:gameplay/fishing").removeLoot(fish);
  });

  createSeasonLootTable(
    e,
    "spring",
    global.springOcean,
    global.springRiver,
    global.springFresh
  );
  createSeasonLootTable(
    e,
    "spring",
    global.springOcean,
    global.springRiver,
    global.springFresh,
    true
  );
  
  createSeasonLootTable(
    e,
    "summer",
    global.summerOcean,
    global.summerRiver,
    global.summerFresh
  );
  createSeasonLootTable(
    e,
    "summer",
    global.summerOcean,
    global.summerRiver,
    global.summerFresh,
    true
  );

  createSeasonLootTable(
    e,
    "autumn",
    global.autumnOcean,
    global.autumnRiver,
    global.autumnFresh
  );
  createSeasonLootTable(
    e,
    "autumn",
    global.autumnOcean,
    global.autumnRiver,
    global.autumnFresh,
    true
  );

  createSeasonLootTable(
    e,
    "winter",
    global.winterOcean,
    global.winterRiver,
    global.winterFresh
  );
  createSeasonLootTable(
    e,
    "winter",
    global.winterOcean,
    global.winterRiver,
    global.winterFresh,
    true
  );
  e.addLootTableModifier("minecraft:gameplay/fishing")
  .hasAnyStage("fly_fisher")
  .modifyLoot(Ingredient.all, (itemStack) => {
    if (itemStack.maxStackSize == 1) return itemStack;
    itemStack.setCount(itemStack.getCount() + 1);
    return itemStack;
  })
  .hasAnyStage("school_fisher")
  .modifyLoot(Ingredient.all, (itemStack) => {
    if (itemStack.maxStackSize == 1) return itemStack;
    itemStack.setCount(itemStack.getCount() + 3);
    return itemStack;
  });
});
