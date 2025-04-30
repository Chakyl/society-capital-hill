console.info("[SOCIETY] recyclingMachine.js loaded");

global.recyclingMachineRecipes = [
  { input: "aquaculture:tin_can", output: ["6x minecraft:iron_ingot"] },
  { input: "aquaculture:driftwood", output: ["1x meadow:fire_log"] },
  { input: "furniture:trash_bag", output: ["4x society:bouquet_bag"] },
  { input: "society:fire_quartz", output: ["24x minecraft:quartz"] },
  { input: "betterarcheology:artifact_shards", output: ["1x society:sparkstone"] },
];

StartupEvents.registry("block", (event) => {
  event
    .create("society:recycling_machine", "cardinal")
    .property(booleanProperty.create("working"))
    .property(booleanProperty.create("mature"))
    .property(booleanProperty.create("upgraded"))
    .property(integerProperty.create("stage", 0, 1))
    .property(
      integerProperty.create("type", 0, global.recyclingMachineRecipes.length)
    )
    .box(2, 0, 3, 14, 15, 13)
    .defaultCutout()
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:mineable/axe")
    .tagBlock("minecraft:needs_stone_tool")
    .item((item) => {
      item.tooltip(Text.gray("Turns junk into usable resources"));
      item.modelJson({
        parent: "society:block/recycling_machine_off",
      });
    })
    .defaultState((state) => {
      state
        .set(booleanProperty.create("working"), false)
        .set(booleanProperty.create("mature"), false)
        .set(booleanProperty.create("upgraded"), false)
        .set(integerProperty.create("stage", 0, 1), 0)
        .set(
          integerProperty.create(
            "type",
            0,
            global.recyclingMachineRecipes.length
          ),
          0
        );
    })
    .placementState((state) => {
      state
        .set(booleanProperty.create("working"), false)
        .set(booleanProperty.create("mature"), false)
        .set(booleanProperty.create("upgraded"), false)
        .set(integerProperty.create("stage", 0, 1), 0)
        .set(
          integerProperty.create(
            "type",
            0,
            global.recyclingMachineRecipes.length
          ),
          0
        );
    })
    .rightClick((click) => {
      global.handleBERightClick(
        "farmersdelight:block.skillet.add_food",
        click,
        global.recyclingMachineRecipes,
        1,
        false,
        false,
        false
      );
    })
    .blockEntity((blockInfo) => {
      blockInfo.serverTick(artMachineTickRate, 0, (entity) => {
        global.handleBETick(entity, global.recyclingMachineRecipes, 1);
      });
    }).blockstateJson = {
    multipart: [
      {
        apply: { model: "society:block/recycling_machine_particle" },
      },
      {
        when: { mature: true },
        apply: { model: "society:block/machine_done" },
      },
    ].concat(getCardinalMultipartJson("recycling_machine")),
  };
});
