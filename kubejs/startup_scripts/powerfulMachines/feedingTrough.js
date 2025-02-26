console.info("[SOCIETY] feedingTrough.js loaded");

StartupEvents.registry("block", (event) => {
  event
    .create("society:feeding_trough", "cardinal")
    .property(integerProperty.create("fill", 0, 4))
    .tagBlock("minecraft:mineable/axe")
    .tagBlock("minecraft:needs_stone_tool")
    .box(0, 0, 2, 16, 12, 14)
    .defaultCutout()
    .item((item) => {
      item.tooltip(
        Text.gray("Feeds farm animals up to 5 blocks away using Animal Feed")
      );
      item.modelJson({
        parent: "farm_and_charm:block/feeding_trough_size_0",
      });
    })
    .defaultState((state) => {
      state.set(integerProperty.create("fill", 0, 4), 0);
    })
    .placementState((state) => {
      state.set(integerProperty.create("fill", 0, 4), 0);
    })
    .blockEntity((blockInfo) => {
      blockInfo.inventory(9, 1);
      blockInfo.initialData({ fill: "0" });
      blockInfo.serverTick(600, 0, (entity) => {
        const { inventory, block, level } = entity;
        let slots = inventory.getSlots();
        let feedCount = 0;

        inventory.allItems;
        let nearbyFarmAnimals;
        if (inventory.toString().includes("animal_feed")) {
          nearbyFarmAnimals = level
            .getEntitiesWithin(AABB.ofBlock(block).inflate(6))
            .filter((entity) =>
              [
                "minecraft:cow",
                "minecraft:goat",
                "minecraft:sheep",
                "minecraft:pig",
                "minecraft:panda",
                "snowpig:snow_pig",
                "minecraft:rabbit",
                "meadow:wooly_cow",
                "meadow:water_buffalo",
                "meadow:wooly_sheep",
                "minecraft:chicken",
                "untitledduckmod:duck",
                "untitledduckmod:goose",
                "autumnity:turkey",
                "autumnity:snail",
                "minecraft:mooshroom",
                "buzzier_bees:moobloom",
                "minecraft:sniffer",
                "etcetera:chapple",
                "species:mammutilation",
              ].includes(entity.type)
            );
          nearbyFarmAnimals.forEach((animal) => {
            let data = animal.persistentData;
            if (
              !data.getInt("ageLastFed") ||
              level.time < data.getInt("ageLastFed")
            ) {
              data.ageLastFed = level.time;
            }
            if (level.time - data.ageLastFed > 12000) {
              for (let i = 0; i < slots; i++) {
                if (
                  inventory.getStackInSlot(i).item.id === "society:animal_feed"
                ) {
                  inventory.getStackInSlot(i).count--;
                  data.ageLastFed = level.time;
                  level.spawnParticles(
                    "legendarycreatures:wisp_particle",
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
                  break;
                }
              }
            }
          });
          for (let i = 0; i < slots; i++) {
            if (inventory.getStackInSlot(i).item.id === "society:animal_feed")
              feedCount += inventory.getStackInSlot(i).count;
          }
          let fill = 0;
          if (feedCount >= 512) fill = 4;
          else if (feedCount >= 256) fill = 3;
          else if (feedCount >= 128) fill = 2;
          else if (feedCount >= 8) fill = 1;
          entity.block.set(entity.block.id, {
            fill: String(fill),
          });
        }
      }),
        blockInfo.rightClickOpensInventory();
      blockInfo.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
          .insertItem((blockEntity, slot, stack, simulate) =>
            blockEntity.inventory.insertItem(slot, stack, simulate)
          )
          .getSlotLimit((blockEntity, slot) =>
            blockEntity.inventory.getSlotLimit(slot)
          )
          .getSlots((blockEntity) => blockEntity.inventory.slots)
          .getStackInSlot((blockEntity, slot) =>
            blockEntity.inventory.getStackInSlot(slot)
          )
      );
    }).blockstateJson = {
    multipart: [
      {
        when: { fill: 0, facing: "north" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_0",
          y: 0,
          uvlock: false,
        },
      },
      {
        when: { fill: 0, facing: "east" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_0",
          y: 90,
          uvlock: false,
        },
      },
      {
        when: { fill: 0, facing: "south" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_0",
          y: 180,
          uvlock: false,
        },
      },
      {
        when: { fill: 0, facing: "west" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_0",
          y: -90,
          uvlock: false,
        },
      },
      {
        when: { fill: 1, facing: "north" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_1",
          y: 0,
          uvlock: false,
        },
      },
      {
        when: { fill: 1, facing: "east" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_1",
          y: 90,
          uvlock: false,
        },
      },
      {
        when: { fill: 1, facing: "south" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_1",
          y: 180,
          uvlock: false,
        },
      },
      {
        when: { fill: 1, facing: "west" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_1",
          y: -90,
          uvlock: false,
        },
      },
      {
        when: { fill: 2, facing: "north" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_2",
          y: 0,
          uvlock: false,
        },
      },
      {
        when: { fill: 2, facing: "east" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_2",
          y: 90,
          uvlock: false,
        },
      },
      {
        when: { fill: 2, facing: "south" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_2",
          y: 180,
          uvlock: false,
        },
      },
      {
        when: { fill: 2, facing: "west" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_2",
          y: -90,
          uvlock: false,
        },
      },
      {
        when: { fill: 3, facing: "north" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_3",
          y: 0,
          uvlock: false,
        },
      },
      {
        when: { fill: 3, facing: "east" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_3",
          y: 90,
          uvlock: false,
        },
      },
      {
        when: { fill: 3, facing: "south" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_3",
          y: 180,
          uvlock: false,
        },
      },
      {
        when: { fill: 3, facing: "west" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_3",
          y: -90,
          uvlock: false,
        },
      },
      {
        when: { fill: 4, facing: "north" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_4",
          y: 0,
          uvlock: false,
        },
      },
      {
        when: { fill: 4, facing: "east" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_4",
          y: 90,
          uvlock: false,
        },
      },
      {
        when: { fill: 4, facing: "south" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_4",
          y: 180,
          uvlock: false,
        },
      },
      {
        when: { fill: 4, facing: "west" },
        apply: {
          model: "farm_and_charm:block/feeding_trough_size_4",
          y: -90,
          uvlock: false,
        },
      },
    ],
  };
});
