console.info("[SOCIETY] globalServer.js loaded");
global.mainUiElementIds = [
  "animalName",
  "animalNameIcons",
  "affection",
  "artisanMessage",
  "artisanItemMessage",
  "artisanProgress",
  "pondHeader",
  "fishIcon",
  "fishName",
  "population",
];
const clearUiPaint = (player, ids) => {
  let removedText = {};
  let removedShadow = {};
  // Spawn and clear instance of paint element to prevent warnings that they don't exist
  ids.forEach((id) => {
    removedText[id] = { type: "text" };
    removedShadow[`${id}Shadow`] = { type: "text" };
  });
  player.paint(removedText);
  player.paint(removedShadow);
  ids.forEach((id) => {
    removedText[id] = { remove: true };
    removedShadow[`${id}Shadow`] = { remove: true };
  });
  player.paint(removedText);
  player.paint(removedShadow);
};

global.renderUiText = (player, server, messages, clearedMessages) => {
  server.scheduleInTicks(0, () => {
    clearUiPaint(player, clearedMessages);
    player.paint(messages);
    player.persistentData.ageLastShownMessage = player.age;
    server.scheduleInTicks(80, () => {
      if (player.age - player.persistentData.get("ageLastShownMessage") >= 80)
        clearUiPaint(player, clearedMessages);
    });
  });
};

global.formatPrice = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
global.calculateCoinValue = (coin) => {
  let value = 0;
  switch (coin.id.split(":")[1]) {
    case "spur":
      value = 1;
      break;
    case "bevel":
      value = 8;
      break;
    case "sprocket":
      value = 16;
      break;
    case "cog":
      value = 64;
      break;
    case "crown":
      value = 512;
      break;
    case "sun":
      value = 4096;
      break;
    case "ancient_coin":
      value = 253952;
      break;
    case "prismatic_coin":
      value = 16252928;
      break;
    default:
      console.log(`Invalid coin`);
  }
  return value * coin.count;
};

global.getPigColor = (pig) => {
  switch (pig) {
    case "Red":
      return "c";
    case "Blue":
      return "b";
    case "Yellow":
      return "e";
    case "Green":
      return "a";
    default:
      console.log(`Invalid pig color`);
  }
  return;
};

global.calculateCoinsFromValue = (price, output) => {
  for (let i = 0; i < global.coinMap.length; i++) {
    let { coin, value } = global.coinMap[i];
    if (value <= price) {
      if (price % value === 0) {
        output.push({ id: coin, count: price / value });
        return output;
      } else {
        output.push({ id: coin, count: Math.floor(price / value) });
        global.calculateCoinsFromValue(price % value, output);
      }
      return output;
    }
  }
};