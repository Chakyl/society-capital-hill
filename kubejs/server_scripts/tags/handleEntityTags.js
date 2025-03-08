// priority: 0
console.info("[SOCIETY] handleEntityTags.js loaded");

ServerEvents.tags("entity_type", (e) => {
  global.husbandryAnimals.forEach((animal) => {
    e.add("society:husbandry_animal", animal);
  });

  const milkableAnimals = [
    "minecraft:cow",
    "minecraft:goat",
    "minecraft:sheep",
    "meadow:wooly_sheep",
    "meadow:wooly_cow",
    "meadow:water_buffalo",
    "minecraft:mooshroom",
    "buzzier_bees:moobloom",
    "species:mammutilation",
  ];
  milkableAnimals.forEach((animal) => {
    e.add("society:milkable_animal", animal);
  });

  const largeEggAnimals = [
    "minecraft:chicken",
    "untitledduckmod:duck",
    "untitledduckmod:goose",
    "autumnity:turkey",
  ];
  largeEggAnimals.forEach((animal) => {
    e.add("society:large_egg_animal", animal);
  });

  const petAnimals = [
    "buzzier_bees:grizzly_bear",
    "minecraft:wolf",
    "minecraft:cat",
    "quark:foxhound",
    "quark:shiba",
    "minecraft:allay",
    "legendarycreatures:ender_wisp",
    "minecraft:horse",
    "minecraft:polar_bear",
    "hamsters:hamster",
  ];
  petAnimals.forEach((animal) => {
    e.add("society:pet_animal", animal);
  });
});
