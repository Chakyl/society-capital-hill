// Why are entity type tags so weird
global.checkEntityTag = (entity, checkedTag) => {
  return entity.entityType.tags.anyMatch((tag) => tag.location() == checkedTag);
};

global.isFresh = (age, actionAge, interactionCooldown) => {
    if (actionAge < interactionCooldown) return false;
    return age < actionAge;
  };
  
const resolveMilk = (hearts, type, warped) => {
  let size = "";
  let resolvedType = "";
  if (hearts > 5) {
    size = "large_";
  }
  if (type === "mammutilation") return "species:ichor_bottle";
  if (type === "goat") resolvedType = type;
  if (type.includes("sheep")) resolvedType = "sheep";
  if (warped) resolvedType = "warped";
  if (type === "water buffalo") resolvedType = "buffalo";
  return `${size}${resolvedType}${resolvedType === "" ? "" : "_"}milk`;
};

global.getMilk = (level, target, data, player, interactionCooldown) => {
    const ageLastMilked = data.getInt("ageLastMilked");
    const hungry = level.time - data.getInt("ageLastFed") > interactionCooldown * 2;
    const nonIdType = String(target.type.split(":")[1]).replace(/_/g, " ");
    const affection = data.getInt("affection");
    let hearts = Math.floor(affection / 100);
    const freshAnimal = global.isFresh(
      level.time,
      ageLastMilked,
      interactionCooldown
    );
    let affectionIncrease = 0
    if (player) affectionIncrease = player.stages.has("animal_whisperer") || data.bribed ? 20 : 10;
    let warped = false;
    let quality = 0;
  
    if (nonIdType === "wooly cow" && Number(target.getNbt().Variant) === 2) {
      warped = true;
    }
    if (
      !target.isBaby() &&
      !hungry &&
      (freshAnimal || level.time - ageLastMilked > interactionCooldown)
    ) {
      data.affection = affection + affectionIncrease;
      data.ageLastMilked = level.time;
      if (hearts >= 10 || (hearts > 0 && hearts % 5 === 0)) {
        quality = 3;
      } else {
        quality = (hearts % 5) - 2;
      }
      let milkId = resolveMilk(hearts, nonIdType, warped);
      return Item.of(
        `${player && player.stages.has("shepherd") ? 2 : 1}x ${
          milkId.includes(":") ? milkId : `society:${milkId}`
        }`,
        quality > 0 ? `{quality_food:{effects:[],quality:${quality}}}` : null
      ) 
    }
    return -1
}