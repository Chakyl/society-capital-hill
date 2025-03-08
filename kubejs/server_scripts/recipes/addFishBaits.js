console.info("[SOCIETY] addFishBaits.js loaded");

ServerEvents.highPriorityData((e) => {
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
    e.addJson(
      `crabbersdelight:loot_tables/gameplay/crab_trap_loot/society/${fishId}_bait.json`,
      {
        type: "minecraft:fishing",
        pools: [
          {
            rolls: 1,
            bonus_rolls: 0,
            entries: [
              {
                type: "minecraft:item",
                weight: 1,
                name: fish.item,
              },
            ],
          },
        ],
      }
    );
  });
});
