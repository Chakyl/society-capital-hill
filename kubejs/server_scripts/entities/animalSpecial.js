console.info("[SOCIETY] animalSpecial.js loaded");

const handleSpecialItem = (
  data,
  chance,
  hungry,
  minHearts,
  mult,
  item,
  hasQuality,
  e
) => {
  const { player, target, level, server } = e;
  const affection = data.getInt("affection") || 0;
  const hearts = Math.floor(affection / 100);
  let quality = 0;

  if (!hungry && hearts >= minHearts && Math.random() <= chance) {
    data.affection =
      affection + (player.stages.has("animal_whisperer") ? 20 : 10);
    let specialItem = level.createEntity("minecraft:item");
    if (hasQuality && hearts > 0) {
      quality = Math.floor((hearts % 11) / 2 - 2);
    }
    specialItem.x = player.x;
    specialItem.y = player.y;
    specialItem.z = player.z;
    specialItem.item = Item.of(
      `${mult}x ${item}`,
      quality > 0 ? `{quality_food:{effects:[],quality:${quality}}}` : null
    );
    specialItem.spawn();
    server.runCommandSilent(
      `playsound stardew_fishing:dwop block @a ${player.x} ${player.y} ${player.z}`
    );
    server.runCommandSilent(
      `puffish_skills experience add ${player.username} society:husbandry 60`
    );
    level.spawnParticles(
      "farmersdelight:star",
      true,
      target.x,
      target.y + 1,
      target.z,
      0.2 * rnd(1, 4),
      0.2 * rnd(1, 4),
      0.2 * rnd(1, 4),
      3,
      0.01
    );
  }
};

ItemEvents.entityInteracted((e) => {
  const { hand, player, item, level, target } = e;
  if (hand == "OFF_HAND") return;
  if (!global.checkEntityTag(target, "society:husbandry_animal")) return;
  if (hand == "MAIN_HAND") {
    const interactionCooldown = 12000;
    const data = target.persistentData;
    const ageLastFed = data.getInt("ageLastFed");
    const ageLastDroppedSpecial = data.getInt("ageLastDroppedSpecial") || 0;
    const freshAnimal = global.isFresh(
      level.time,
      ageLastDroppedSpecial,
      interactionCooldown
    );
    const hungry = level.time - ageLastFed > interactionCooldown * 2;
    const affection = data.getInt("affection") || 0;
    const hearts = Math.floor(affection / 100);
    const heartBonus = hearts === 10 ? 2 : 1;
    let resetCooldown = true;
    if (
      freshAnimal ||
      level.time - ageLastDroppedSpecial > interactionCooldown
    ) {
      if (
        ["minecraft:pig", "snowpig:snow_pig", "minecraft:mooshroom"].includes(
          target.type
        )
      )
        handleSpecialItem(
          data,
          0.3,
          hungry,
          4,
          heartBonus * player.stages.has("triple_truffle") ? 3 : 1,
          "society:truffle",
          true,
          e
        );
      if (target.type === "minecraft:rabbit") {
        handleSpecialItem(
          data,
          0.33,
          hungry,
          3,
          player.stages.has("coopmaster") ? 2 : 1,
          "society:fine_wool",
          true,
          e
        );
        handleSpecialItem(
          data,
          0.16,
          hungry,
          5,
          heartBonus * player.stages.has("coopmaster") ? 2 : 1,
          "minecraft:rabbit_foot",
          true,
          e
        );
      }
      if (
        item === "minecraft:shears" &&
        (target.type === "minecraft:sheep" ||
          target.type === "meadow:wooly_sheep") &&
        !target.getNbt().Sheared
      ) {
        handleSpecialItem(
          data,
          0.5,
          hungry,
          4,
          heartBonus,
          "society:fine_wool",
          true,
          e
        );
      } else if (
        target.type === "minecraft:sheep" ||
        target.type === "meadow:wooly_sheep"
      ) {
        resetCooldown = false;
      }
      if (target.type === "buzzier_bees:moobloom") {
        handleSpecialItem(
          data,
          0.01,
          hungry,
          10,
          1,
          "betterarcheology:growth_totem",
          false,
          e
        );
      }
      if (target.type === "autumnity:snail") {
        handleSpecialItem(
          data,
          1,
          hungry,
          3,
          heartBonus * 2,
          "autumnity:snail_shell_piece",
          false,
          e
        );
      }
      if (target.type === "minecraft:sniffer") {
        handleSpecialItem(
          data,
          1,
          hungry,
          5,
          heartBonus,
          "betterarcheology:artifact_shards",
          false,
          e
        );
      }
      if (target.type === "minecraft:panda") {
        const pandaFruits = [
          "pamhc2trees:mangoitem",
          "atmospheric:orange",
          "pamhc2trees:peachitem",
          "pamhc2trees:pawpawitem",
          "pamhc2trees:bananaitem",
        ];
        handleSpecialItem(
          data,
          0.75,
          hungry,
          2,
          heartBonus,
          pandaFruits[Math.floor(Math.random() * pandaFruits.length)],
          true,
          e
        );
      }
      if (global.checkEntityTag(target, "society:large_egg_animal")) {
        let eggType = String(target.type).split(":")[1];
        handleSpecialItem(
        data,
          1,
          hungry,
          4,
          1,
          `society:large${eggType === "chicken" ? "" : `_${eggType}`}_egg`,
          true,
          e
        );
      }
      if (
        player.stages.has("coopmaster") &&
        [
          "minecraft:chicken",
          "untitledduckmod:duck",
          "untitledduckmod:goose",
          "etcetera:chapple",
          "autumnity:turkey",
        ].includes(target.type)
      ) {
        handleSpecialItem(
          data,
          0.02,
          hungry,
          1,
          1,
          "vintagedelight:golden_egg",
          false,
          e
        );
      }
      if (data.bff) {
        handleSpecialItem(
          data,
          0.1,
          hungry,
          10,
          1,
          "society:prismatic_shard",
          false,
          e
        );
      }
      if (resetCooldown) data.ageLastDroppedSpecial = level.time;
    }
  }
});
