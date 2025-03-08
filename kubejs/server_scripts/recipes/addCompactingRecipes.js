console.info("[SOCIETY] addCompactingRecipes.js loaded");

ServerEvents.recipes((e) => {
  const compact = (output, compactInput, count) => {
    e.shapeless(`${count}x ${compactInput}`, [output]);
    e.shapeless(output, [`${count}x ${compactInput}`]);
  };
  compact("numismatics:bevel", "numismatics:spur", 8);
  compact("numismatics:sprocket", "numismatics:bevel", 2);
  compact("numismatics:cog", "numismatics:sprocket", 4);
  compact("numismatics:crown", "numismatics:cog", 8);
  compact("numismatics:sun", "numismatics:crown", 8);

  compact("herbalbrews:coffee_beans_sack", "herbalbrews:coffee_beans", 9);
  compact("herbalbrews:rooibos_leaf_block", "herbalbrews:rooibos_leaf", 9);
  compact(
    "herbalbrews:yerba_mate_leaf_block",
    "herbalbrews:yerba_mate_leaf",
    9
  );
  compact("society:ancient_fruit_crate", "society:ancient_fruit", 9);
  compact("society:blueberry_crate", "society:blueberry", 9);
  compact("society:eggplant_crate", "society:eggplant", 9);
  compact("society:tubabacco_leaf_block", "society:tubabacco_leaf", 9);
  compact("society:tubasmoke_carton", "society:tubasmoke_stick", 9);
  compact("society:sturdy_bamboo", "minecraft:bamboo_block", 9);
 
  compact("numismatics:ancient_coin", "numismatics:sun", 62);
  compact("numismatics:prismatic_coin", "numismatics:ancient_coin", 64);

  const milks = [
    "milk",
    "goat_milk",
    "buffalo_milk",
    "sheep_milk",
    "warped_milk",
  ];
  milks.forEach((milk) => {
    compact(`society:large_${milk}`, `society:${milk}`, 4);
  });
  e.shapeless('9x nethervinery:warped_grape', ['nethervinery:warped_grape_crate'])
  e.shapeless('9x nethervinery:crimson_grape', ['nethervinery:crimson_grape_crate'])
});
