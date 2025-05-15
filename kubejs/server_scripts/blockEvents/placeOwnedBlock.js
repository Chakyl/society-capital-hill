console.info("[SOCIETY] placeOwnedBlock.js loaded");

BlockEvents.placed(
  [
    "shippingbin:smart_shipping_bin",
    "shippingbin:basic_shipping_bin",
    "society:artisan_hopper",
    "society:fish_pond_basket",
    "society:auto_grabber",
  ],
  (e) => {
    const playerUUID = e.player.getUuid().toString();
    let nbt = e.block.entityData;
    nbt.merge({ data: { owner: playerUUID } });
    e.block.setEntityData(nbt);
  }
);
