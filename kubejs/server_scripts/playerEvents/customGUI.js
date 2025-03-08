console.info("[SOCIETY] coinUi.js loaded");

const xOffset = 64;

const Numismatics = Java.loadClass(
  "dev.ithundxr.createnumismatics.Numismatics"
);

const getPlayerBalance = (player) => {
  const playerAccount = Numismatics.BANK.accounts.get(player.getUuid());
  return playerAccount ? playerAccount.getBalance() : 0;
};

PlayerEvents.tick((e) => {
  const player = e.player;
  const curios = player.nbt.ForgeCaps["curios:inventory"];
  if (player.age % 20 == 0) {
    if (
      ["gag:energized_hearthstone", "gag:hearthstone"].includes(
        player.getHeldItem("main_hand").id
      )
    ) {
      player.paint({
        clockIcon: { remove: true },
      });
    } else {
      player.paint({
        clockIcon: {
          type: "item",
          x: 8,
          y: 22,
          item: "minecraft:clock",
          alignX: "left",
          alignY: "top",
        },
      });
    }
  }
  if (
    player.age % 100 == 0 &&
    curios.toString().includes("society:bank_meter")
  ) {
    const balance = getPlayerBalance(player);
    const balanceText = balance
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    player.paint({
      coinDisplayDropShadow: {
        type: "text",
        x: 16.5 + xOffset,
        z: -1,
        y: 19,
        text: balanceText,
        color: "#000000",
        alignX: "left",
        alignY: "top",
      },
    });
    player.paint({
      coinDisplay: {
        type: "text",
        x: 1.5 + xOffset,
        y: 18,
        text: `:coin: ${balanceText}`,
        color: "#FFAA00",
        alignX: "left",
        alignY: "top",
      },
    });
  } else if (!curios.toString().includes("society:bank_meter")) {
    player.paint({
      coinDisplay: {
        type: "text",
        text: "",
      },
    });
    player.paint({
      coinDisplayDropShadow: {
        type: "text",
        text: "",
      },
    });
    player.paint({ coinDisplay: { remove: true } });
    player.paint({ coinDisplayDropShadow: { remove: true } });
  }
});
