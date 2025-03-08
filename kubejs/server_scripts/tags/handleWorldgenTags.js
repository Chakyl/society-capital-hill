// priority: 0
console.info("[SOCIETY] handleWorldgenTags.js loaded");

ServerEvents.tags("worldgen/biome", (e) => {
  e.add("society:mining_biomes", "#minecraft:is_overworld");
  e.add("minecraft:without_zombie_sieges", "#minecraft:is_overworld");
  e.add("society:spawns_magma_geodes", "#minecraft:is_nether");
  e.add("forge:is_snowy", "mining_dimension:frozen_caves");
  const magmaGeodeBiomes = [
    "mining_dimension:blackstone_caves",
    "mining_dimension:desert_caves",
  ];
  magmaGeodeBiomes.forEach((biome) => {
    e.add("society:spawns_magma_geodes", biome);
  });
  const cavernBiomes = [
    "mining_dimension:blackstone_caves",
    "mining_dimension:mining",
    "mining_dimension:frozen_caves",
    "mining_dimension:lush_caverns",
    "mining_dimension:desert_caves",
  ];
  cavernBiomes.forEach((biome) => {
    e.add("society:is_skull_cavern", biome);
    e.add("supplementaries:has_cave_urns", biome);
    e.add("society:mining_biomes", biome);
  });
});
