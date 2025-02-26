// priority: 1
console.info("[SOCIETY] basicShippingBin.js loaded");

const debug = false;

const basicCoinMap = [
  { coin: "numismatics:sun", value: 4096 },
  { coin: "numismatics:crown", value: 512 },
  { coin: "numismatics:cog", value: 64 },
  { coin: "numismatics:sprocket", value: 16 },
  { coin: "numismatics:bevel", value: 8 },
  { coin: "numismatics:spur", value: 1 },
];

const calculateSlotsNeeded = (coins) => {
  let slots = 0;
  coins.forEach((coinObj) => {
    let { count } = coinObj;
    for (let index = 0; index <= count; index += 64) {
      slots++;
    }
  });
  return slots;
};

StartupEvents.registry("block", (event) => {
  event
    .create("shippingbin:basic_shipping_bin", "cardinal")
    .tagBlock("minecraft:mineable/axe")
    .item((item) => {
      item.tooltip(
        Text.gray("Sells items every morning and leaves coins in its inventory")
      );
      item.modelJson({
        parent: "shippingbin:block/shipping_bin",
      });
    })
    .model("shippingbin:block/shipping_bin")
    .blockEntity((blockInfo) => {
      blockInfo.inventory(9, 4);
      blockInfo.initialData({ owner: "-1" });
      blockInfo.serverTick(10, 0, (entity) => {
        const { inventory, level, block } = entity;
        let dayTime = level.dayTime();
        let morningModulo = dayTime % 24000;
        if (morningModulo >= 5 && morningModulo < 15) {
          let slots = entity.inventory.getSlots();
          let slotItem;
          let slotNbt;
          let value = 0;
          let playerAttributes;
          let binPlayer;
          let removedSlots = [];
          level.players.forEach((p) => {
            if (p.getUuid().toString() === block.getEntityData().data.owner) {
              playerAttributes = p.nbt.Attributes;
              binPlayer = p;
            }
          });
          if (playerAttributes) {
            for (let i = 0; i < slots; i++) {
              slotItem = inventory.getStackInSlot(i).item;
              if (global.trades.has(String(slotItem.id))) {
                let trade = global.trades.get(String(slotItem.id));
                let quality;
                if (inventory.getStackInSlot(i).hasNBT()) {
                  slotNbt = inventory.getStackInSlot(i).nbt;
                  if (slotNbt.quality_food) {
                    quality = slotNbt.quality_food.quality;
                  }
                }
                value +=
                  calculateQualityValue(trade.value, quality) *
                  inventory.getStackInSlot(i).count *
                  (Number(
                    playerAttributes.filter((obj) => {
                      return obj.Name === trade.multiplier;
                    })[0]?.Base
                  ) || 1);
                removedSlots.push(i);
              }
            }
            if (value > 0) {
              value = Math.round(value);
              let outputs = calculateCoinsFromValue(value, [], basicCoinMap);
              if (debug) {
                console.log(`slots: ${slots}`);
                console.log(`countNonEmpty: ${inventory.countNonEmpty()}`);
                console.log(`RemovedSlots: ${removedSlots.length}`);
                console.log(
                  `calculateSlotsNeeded: ${calculateSlotsNeeded(outputs)}`
                );
              }
              if (
                slots -
                  inventory.countNonEmpty() +
                  removedSlots.length -
                  calculateSlotsNeeded(outputs) >=
                0
              ) {
                binPlayer.server.runCommandSilent(
                  `playsound etcetera:item.handbell.ring block @a ${binPlayer.x} ${binPlayer.y} ${binPlayer.z} 0.3`
                );
                binPlayer.server.runCommandSilent(
                  `immersivemessages sendcustom ${
                    binPlayer.username
                  } {anchor:7,background:1,color:"#FFAA00",size:1,y:30,slideleft:1,slideoutleft:1,typewriter:1} 8 :coin: ${value
                    .toString()
                    .replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )} §7worth of goods sold`
                );
                for (let i = 0; i < removedSlots.length; i++) {
                  inventory.setStackInSlot(removedSlots[i], "minecraft:air");
                }
                outputs.forEach((output) => {
                  let { coin, count } = output;
                  for (let index = 0; index <= count; index += 64) {
                    let difference = count - index;
                    for (let i = 0; i < slots; i++) {
                      if (
                        inventory.getStackInSlot(i).item.id === "minecraft:air"
                      ) {
                        inventory.setStackInSlot(
                          i,
                          Item.of(
                            `${difference > 64 ? 64 : difference}x ${coin}`
                          )
                        );
                        break;
                      }
                    }
                  }
                });
              } else {
                binPlayer.server.runCommandSilent(
                  `playsound stardew_fishing:fish_escape block @a ${binPlayer.x} ${binPlayer.y} ${binPlayer.z} 0.3`
                );
                binPlayer.server.runCommandSilent(
                  `immersivemessages sendcustom ${binPlayer.username} {anchor:7,background:1,color:"#FF5555",size:1,y:24,slideleft:1,slideoutleft:1,typewriter:1} 8 Your Basic Shipping Bin was too full to sell...`
                );
              }
            }
          }
        }
      }),
        blockInfo.rightClickOpensInventory();
      blockInfo.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
          .insertItem((blockEntity, slot, stack, simulate) =>
            blockEntity.inventory.insertItem(slot, stack, simulate)
          )
          .extractItem((blockEntity, slot, stack, simulate) =>
            blockEntity.inventory.extractItem(slot, stack, simulate)
          )
          .getSlotLimit((blockEntity, slot) =>
            blockEntity.inventory.getSlotLimit(slot)
          )
          .getSlots((blockEntity) => blockEntity.inventory.slots)
          .getStackInSlot((blockEntity, slot) =>
            blockEntity.inventory.getStackInSlot(slot)
          )
      );
    })
});
