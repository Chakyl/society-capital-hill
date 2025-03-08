console.info("[SOCIETY] neptuniumHoe.js loaded");

BlockEvents.rightClicked(
  [
    "minecraft:dirt",
    "minecraft:rooted_dirt",
    "minecraft:coarse_dirt",
    "minecraft:dirt_path",
    "minecraft:grass_block",
  ],
  (e) => {
    const { item, block } = e;
    if (
      item.id === "aquaculture:neptunium_hoe" ||
      item.id === "botania:elementium_hoe"
    ) {
      block.set("dew_drop_farmland_growth:hydrating_farmland");
      e.cancel();
    }
  }
);
