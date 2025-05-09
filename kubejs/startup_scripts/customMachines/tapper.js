console.info("[SOCIETY] tapper.js loaded");
global.tapperRecipes = [
  {
    input: "minecraft:spruce_log",
    leaves: ["minecraft:spruce_leaves"],
    output: ["1x society:pine_tar"],
    time: 5,
  },
  {
    input: "meadow:pine_log",
    leaves: ["meadow:pine_leaves", "meadow:pine_leaves_2"],
    output: ["1x society:pine_tar"],
    time: 5,
  },
  {
    input: "minecraft:oak_log",
    output: ["1x society:oak_resin"],
    leaves: ["minecraft:oak_leaves"],
    time: 7,
  },
  {
    input: "minecraft:dark_oak_log",
    leaves: ["minecraft:dark_oak_leaves"],
    output: ["1x society:oak_resin"],
    time: 7,
  },
  {
    input: "autumnity:maple_log",
    leaves: [
      "autumnity:maple_leaves",
      "autumnity:orange_maple_leaves",
      "autumnity:yellow_maple_leaves",
      "autumnity:red_maple_leaves",
    ],
    output: ["1x society:maple_syrup"],
    time: 7,
  },
];
StartupEvents.registry("block", (event) => {
  event
    .create("society:tapper", "cardinal")
    .property(booleanProperty.create("working"))
    .property(booleanProperty.create("mature"))
    .property(booleanProperty.create("upgraded"))
    .property(booleanProperty.create("error"))
    .property(integerProperty.create("stage", 0, 7))
    .property(integerProperty.create("type", 0, global.tapperRecipes.length))
    .soundType("copper")
    .box(4, 1, 8, 12, 14, 16)
    .defaultCutout()
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:mineable/axe")
    .tagBlock("minecraft:needs_stone_tool")
    .item((item) => {
      item.tooltip(
        Text.gray("Place on tree to tap for resources")
      );
      item.modelJson({
        parent: "society:block/tapper",
      });
    })
    .defaultState((state) => {
      state
        .set(booleanProperty.create("working"), false)
        .set(booleanProperty.create("mature"), false)
        .set(booleanProperty.create("upgraded"), false)
        .set(booleanProperty.create("error"), false)
        .set(integerProperty.create("stage", 0, 7), 0)
        .set(integerProperty.create("type", 0, global.tapperRecipes.length), 0);
    })
    .placementState((state) => {
      state
        .set(booleanProperty.create("working"), false)
        .set(booleanProperty.create("mature"), false)
        .set(booleanProperty.create("upgraded"), false)
        .set(booleanProperty.create("error"), false)
        .set(integerProperty.create("stage", 0, 7), 0)
        .set(integerProperty.create("type", 0, global.tapperRecipes.length), 0);
    })
    .rightClick((click) => {
      const { player, item, block, hand, level, server } = click;
      const upgraded = block.properties.get("upgraded").toLowerCase() == "true";

      if (hand == "OFF_HAND") return;
      if (hand == "MAIN_HAND") {
        if (!upgraded && item == "society:slime_gel") {
          if (!player.isCreative()) item.count--;
          level.spawnParticles(
            "farmersdelight:star",
            true,
            block.x,
            block.y + 1,
            block.z,
            0.2 * rnd(1, 2),
            0.2 * rnd(1, 2),
            0.2 * rnd(1, 2),
            3,
            0.01
          );
          block.set(block.id, {
            working: block.properties.get("working"),
            mature: block.properties.get("mature"),
            upgraded: true,
            error: block.properties.get("error"),
            stage: block.properties.get("stage"),
          });
        }
      }
      global.handleBERightClick(
        "vinery:cabinet_close",
        click,
        global.tapperRecipes,
        7,
        false,
        false,
        false,
        true
      );

    })
    .randomTick((tick) => {
      global.handleTapperRandomTick(tick)
    })
    .blockEntity((blockInfo) => {
      blockInfo.serverTick(artMachineTickRate, 0, (entity) => {
        if (entity.block.properties.get("error") !== "true") global.handleBETick(entity, global.tapperRecipes, 7);
      });
    }).blockstateJson = {
    multipart: [
      {
        apply: { model: "society:block/tapper_particle" },
      },
      {
        when: { mature: true },
        apply: { model: "society:block/machine_done" },
      },
      {
        when: { error: true },
        apply: { model: "society:block/error" },
      },
    ].concat(getCardinalMultipartJsonBasic("tapper")),
  };
});
