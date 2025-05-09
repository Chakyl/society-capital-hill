console.info("[SOCIETY] autoTapper.js loaded");

StartupEvents.registry("block", (event) => {
  event
    .create("society:auto_tapper", "cardinal")
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:needs_stone_tool")
    .box(0, 0, 0, 16, 16, 16)
    .defaultCutout()
    .item((item) => {
      item.tooltip(Text.gray("Collects Tapper resources automatically."));
      item.tooltip(
        Text.gray("Stores tapped fluid in its tank to be pumped out.")
      );
      item.modelJson({
        parent: "society:block/auto_tapper",
      });
    })
    .model("society:block/auto_tapper")
    .blockEntity((blockInfo) => {
      blockInfo.initialData({ Fluid: 0, FluidType: "" });
      blockInfo.serverTick(200, 0, (entity) => {
        global.runAutoTapper(entity);
      });
      blockInfo.attachCapability(
        CapabilityBuilder.FLUID.customBlockEntity()
          .getCapacity(() => 10000)
          .getFluid((blockInfo, fl) => {
            const foundFluid = blockInfo.persistentData.getString("FluidType");
            if (!foundFluid) return Fluid.of("minecraft:water", 0);
            return Fluid.of(
              foundFluid,
              blockInfo.persistentData.getInt("Fluid")
            );
          })
          .onFill((blockInfo, fluid, sim) => {
            const fluidData = blockInfo.persistentData.getInt("Fluid");
            const filled = Math.min(10000 - fluidData, fluid.getAmount());
            if (!sim) {
              console.log(fluid.getFluidStack().toString());
              console.log(fluid.getFluidStack().getName());
              console.log(fluid.getFluid());
              blockInfo.persistentData.putString(
                "FluidType",
                "society:pine_tar"
              );
              blockInfo.persistentData.putInt("Fluid", fluidData + filled);
            }
            return filled;
          })
          .onDrain((blockInfo, fluid, sim) => {
            const fluidData = blockInfo.persistentData.getInt("Fluid");
            const drained = Math.min(fluidData, fluid.getAmount());
            if (!sim)
              blockInfo.persistentData.putInt("Fluid", fluidData - drained);
            return drained;
          })
      );
    });
});
global.runAutoTapper = (blockInfo) => {
  const { block } = blockInfo;

  console.log("yeet");
  const fluidHandler = blockInfo
    .getCapability(ForgeCapabilities.FLUID_HANDLER)
    .orElse(null);
  const blockData = blockInfo.persistentData;
  console.log("yoot");
  console.log(blockData);
  console.log(fluidHandler.getFluidInTank(0));
  blockData.putString("FluidType", "society:pine_tar");
  fluidHandler.fill(Fluid.of("society:pine_tar", 100), "execute");
};
