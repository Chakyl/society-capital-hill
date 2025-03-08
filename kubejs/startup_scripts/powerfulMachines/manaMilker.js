console.info("[SOCIETY] manaMilker.js loaded");

const MANA_PER_MILK = 100;
const MAX_MANA = MANA_PER_MILK * 10;
StartupEvents.registry("block", (event) => {
  event
    .create("society:mana_milker")
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:needs_stone_tool")
    .box(0, 0, 0, 16, 16, 16)
    .defaultCutout()
    .item((item) => {
      item.tooltip(Text.gray("Milks farm animals up to 8 blocks"));
      item.tooltip(Text.aqua("Requires Botania mana from spreader"));
      item.modelJson({
        parent: "society:block/mana_milker",
      });
    })
    .model("society:block/mana_milker")
    .blockEntity((blockInfo) => {
      blockInfo.inventory(9, 1);
      blockInfo.serverTick(100, 0, (entity) => {
        const { inventory, block, level } = entity;
        let slots = inventory.getSlots();

        let mana = entity.persistentData.getInt("mana");
        inventory.allItems;
        let nearbyFarmAnimals;
        nearbyFarmAnimals = level
          .getEntitiesWithin(AABB.ofBlock(block).inflate(10))
          .filter((entity) =>
            global.checkEntityTag(entity, "society:milkable_animal")
          );
        nearbyFarmAnimals.forEach((animal) => {
          let data = animal.persistentData;
          let interactionCooldown = 12000;
          if (mana >= MANA_PER_MILK) {
            if (
              animal.type === "minecraft:goat" ||
              animal.type === "species:mammutilation"
            ) {
              interactionCooldown *= 2;
            } else if (animal.type === "minecraft:sheep") {
              interactionCooldown *= 1.5;
            }

            let milkItem = global.getMilk(
              level,
              animal,
              data,
              undefined,
              interactionCooldown
            );
            if (milkItem !== -1) {
              let success = false;
              let slotItem;
              for (let i = 0; i < slots; i++) {
                slotItem = inventory.getStackInSlot(i)
                if (slotItem.item.id === milkItem.id) {
                  if (slotItem.nbt && milkItem.nbt) {
                    if (
                      slotItem.nbt.quality_food.quality ===
                      milkItem.nbt.quality_food.quality
                    ) {
                      milkItem.count = slotItem.count + 1;
                      inventory.setStackInSlot(i, milkItem);
                      success = true;
                      break;
                    }
                  } else if (!slotItem.nbt && !milkItem.nbt) {
                    milkItem.count = slotItem.count + 1;
                    inventory.setStackInSlot(i, milkItem);
                    success = true;
                    break;
                  }
                }
              }
              if (!success) {
                for (let i = 0; i < slots; i++) {
                  if (inventory.getStackInSlot(i).item.id === "minecraft:air") {
                    inventory.setStackInSlot(i, milkItem);
                    success = true;
                    break;
                  }
                }
              }

              if (success) {
                entity.persistentData.putInt("mana", mana - MANA_PER_MILK);
                level.spawnParticles(
                  "atmospheric:aloe_blossom",
                  true,
                  animal.x,
                  animal.y + 1.5,
                  animal.z,
                  0.1 * rnd(1, 4),
                  0.1 * rnd(1, 4),
                  0.1 * rnd(1, 4),
                  5,
                  0.01
                );
              }
            }
          }
        });
      }),
        blockInfo.rightClickOpensInventory();
      blockInfo.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
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
      blockInfo.attachCapability(
        BotaniaCapabilityBuilder.MANA.blockEntity()
          .canReceiveManaFromBurst((be) => {
            let mana = be.persistentData.getInt("mana");
            return mana < MAX_MANA;
          })
          .receiveMana((be, amount) => {
            let currentMana = be.persistentData.getInt("mana");
            let received = Math.min(MAX_MANA - currentMana, amount);
            be.persistentData.putInt("mana", currentMana + received);
          })
          .getCurrentMana((be) => be.persistentData.getInt("mana"))
          .isFull((be) => {
            let mana = be.persistentData.getInt("mana");
            return mana >= MAX_MANA;
          })
      );
    });
});
