JEIEvents.hideItems((e) => {
  const hiddenItems = [
    // Twigs
    "botania:pebble",
    "decorative_blocks:rocky_dirt",
    "twigs:polished_tuff",
    "twigs:polished_calcite_brick_wall",
    "twigs:polished_calcite_brick_stairs",
    "twigs:polished_calcite_brick_slab",
    "twigs:polished_calcite_bricks",
    "twigs:cracked_polished_calcite_bricks",
    "twigs:polished_calcite",
    "twigs:polished_calcite_stairs",
    "twigs:polished_calcite_slab",
    "twigs:polished_tuff_stairs",
    "twigs:polished_tuff_slab",
    "twigs:polished_tuff_bricks",
    "twigs:oak_table",
    "twigs:spruce_table",
    "twigs:birch_table",
    "twigs:jungle_table",
    "twigs:acacia_table",
    "twigs:dark_oak_table",
    "twigs:cracked_polished_tuff_bricks",
    "twigs:polished_tuff_brick_stairs",
    "twigs:polished_tuff_brick_slab",
    "twigs:polished_tuff_brick_wall",
    "twigs:warped_table",
    "twigs:crimson_table",
    "twigs:bamboo_table",
    "twigs:cherry_table",
    "twigs:mangrove_table",
    "twigs:tuff_stairs",
    "twigs:tuff_slab",
    "twigs:tuff_wall",
    // EMI
    "citadel:icon_item",
    "irons_rpg_tweaks:identification_scroll",
    "amendments:dye_bottle",
    "dragonlib:dragon",
    "quality_food:iron_overlay",
    "quality_food:gold_overlay",
    "quality_food:diamond_overlay",
    "moonlight:placeable_item",
    "citadel:effect_item",
    "citadel:citadel_book",
    "citadel:debug",
    "displaydelight:beetroot_soup",
    "displaydelight:rabbit_stew",
    "displaydelight:hot_cocoa",
    "displaydelight:mushroom_stew",
    "displaydelight:melon_juice",
    "displaydelight:apple_cider",
    "displaydelight:shepherds_pie",
    "displaydelight:honey_glazed_ham",
    "displaydelight:stuffed_pumpkin",
    "displaydelight:roast_chicken",
    "displaydelight:mushroom_rice",
    "displaydelight:grilled_salmon",
    "displaydelight:squid_ink_pasta",
    "displaydelight:ratatouille",
    "displaydelight:vegetable_noodles",
    "displaydelight:steak_and_potatoes",
    "displaydelight:roasted_mutton_chops",
    "displaydelight:pasta_with_mutton_chop",
    "displaydelight:pasta_with_meatballs",
    "displaydelight:bacon_and_eggs",
    "displaydelight:bone_broth",
    "displaydelight:baked_cod_stew",
    "displaydelight:noodle_soup",
    "displaydelight:pumpkin_soup",
    // Botania
    "botania:fertilizer",
    "botania:floating_pollidisiac",
    "botania:pollidisiac",
    // Veggiesdelight
    "veggiesdelight:dandelion_leaf",
    "veggiesdelight:dandelion_juice",
    "veggiesdelight:mature_dandelion",
    "veggiesdelight:vegan_pizza",
    "veggiesdelight:vegan_pizza_slice",
    "veggiesdelight:beetroot_pouch",
    "veggiesdelight:bellpepper_pouch",
    "veggiesdelight:cabbage_pouch",
    "veggiesdelight:cauliflower_pouch",
    "veggiesdelight:garlic_pouch",
    "veggiesdelight:pumpkin_pouch",
    "veggiesdelight:tomato_pouch",
    "veggiesdelight:melon_pouch",
    "veggiesdelight:wheat_pouch",
    "verdantvibes:gardening_table",
    "relics:researching_table",
    "irons_rpg_tweaks:identification_scroll",
    "shippingbin:shipping_bin",
    "sewingkit:file",
    "sewingkit:wood_sewing_needle",
    "sewingkit:stone_sewing_needle",
    "sewingkit:bone_sewing_needle",
    "sewingkit:gold_sewing_needle",
    "sewingkit:diamond_sewing_needle",
    "sewingkit:netherite_sewing_needle",
    "bakery:small_cooking_pot",
    "legendarycreatures:straw_hat",
    "farm_and_charm:cooking_pot",
    //Unusual Fish
    "unusualfishmod:ancient_weapon_smithing_template",
    "unusualfishmod:depth_scythe",
    "unusualfishmod:ripsaw",
    "capsule:capsulemarker",
    "capsule:capsule",
    "farm_and_charm:feeding_trough",
    "minecraft:milk_bucket",
    "minecraft:milk",
    "meadow:wooden_milk_bucket",
    "meadow:wooden_sheep_milk_bucket",
    "meadow:wooden_warped_milk_bucket",
    "meadow:wooden_buffalo_milk_bucket",
    "meadow:wooden_goat_milk_bucket",
    "sophisticatedstorage:xp_pump_upgrade",
    "sophisticatedstorage:advanced_pump_upgrade",
    "sophisticatedstorage:pump_upgrade",
    "quark:blackstone_furnace",
    "quark:dirty_glass",
    "quark:dirty_glass_pane",
    "candlelight:cooking_pan",
    "create:cart_assembler",
    "create:mechanical_bearing",
    "create_power_loader:empty_andesite_chunk_loader",
    "create_power_loader:empty_brass_chunk_loader",
    "createutilities:void_battery",
    "createutilities:void_chest",
    "farm_and_charm:fertilized_soil",
    "farm_and_charm:fertilized_farmland",
    "farmingforblockheads:feeding_trough",
    "farmingforblockheads:red_fertilizer",
    "farmingforblockheads:green_fertilizer",
    "farmingforblockheads:fertilized_farmland_healthy",
    "farmingforblockheads:yellow_fertilizer",
    "farmingforblockheads:fertilized_farmland_stable",
    "farmingforblockheads:fertilized_farmland_healthy_stable",
    "farmingforblockheads:fertilized_farmland_rich_stable",
    "farmingforblockheads:fertilized_farmland_rich",
    "trials:crafter",
    "crafting_on_a_stick:anvil",
    "crafting_on_a_stick:chipped_anvil",
    "crafting_on_a_stick:damaged_anvil",
    "sophisticatedbackpacks:anvil_upgrade",
    "sophisticatedstorage:basic_to_iron_tier_upgrade",
    "sophisticatedstorage:basic_to_diamond_tier_upgrade",
    "sophisticatedstorage:gold_to_netherite_tier_upgrade",
    "sophisticatedstorage:basic_to_gold_tier_upgrade",
    "sophisticatedstorage:copper_to_diamond_tier_upgrade",
    "sophisticatedstorage:copper_to_netherite_tier_upgrade",
    "sophisticatedstorage:iron_to_diamond_tier_upgrade",
    "sophisticatedstorage:iron_to_netherite_tier_upgrade",
    "sophisticatedstorage:basic_to_netherite_tier_upgrade",
    "sophisticatedstorage:copper_to_gold_tier_upgrade",
    "vintagedelight:mason_jar",
    "rehooked:wood_chain",
    "rehooked:blaze_chain",
    "rehooked:ender_chain",
    "etcetera:wrench",
    "translocators:diamond_nugget",
    "cb_microblock:microblock",
    // Vinery
    "nethervinery:crimson_fermentation_barrel",
    "nethervinery:warped_fermentation_barrel",
    "nethervinery:warped_grapevine_pot",
    "nethervinery:crimson_grapevine_pot",
    "nethervinery:warped_apple_press",
    "nethervinery:crimson_apple_press",
    // Furniture Dupes
    "refurbished_furniture:knife",
    "refurbished_furniture:sea_salt",
    "refurbished_furniture:dough",
    "refurbished_furniture:wheat_flour",
    "refurbished_furniture:cheese",
    "refurbished_furniture:sweet_berry_jam",
    "refurbished_furniture:glow_berry_jam",
    "refurbished_furniture:cheese_sandwich",
    "vintagedelight:cheese_pizza",
    "vintagedelight:cheese_pizza_slice",
    "refurbished_furniture:cooked_meatlovers_pizza",
    "refurbished_furniture:meatlovers_pizza_slice",
    "beautify:lamp_candelabra_orange",
    "beautify:lamp_candelabra_yellow",
    "beautify:lamp_candelabra_lime",
    "beautify:lamp_candelabra_green",
    "beautify:lamp_candelabra_cyan",
    "beautify:lamp_candelabra_light_blue",
    "beautify:lamp_candelabra_blue",
    "beautify:lamp_candelabra",
    "beautify:lamp_candelabra_purple",
    "beautify:lamp_candelabra_red",
    "beautify:lamp_candelabra_magenta",
    "beautify:lamp_candelabra_pink",
    "beautify:lamp_candelabra_brown",
    "beautify:lamp_candelabra_black",
    "beautify:lamp_candelabra_gray",
    "beautify:lamp_candelabra_light_gray",
    "beautify:lamp_candelabra_white",
    "beautify:rope",
    // Comforts
    "comforts:hammock_pink",
    "comforts:hammock_gray",
    "comforts:hammock_orange",
    "comforts:hammock_white",
    "comforts:hammock_pink",
    "comforts:hammock_lime",
    "comforts:hammock_yellow",
    "comforts:hammock_light_blue",
    "comforts:hammock_magenta",
    "comforts:hammock_light_gray",
    "comforts:hammock_purple",
    "comforts:hammock_cyan",
    "comforts:hammock_black",
    "comforts:hammock_blue",
    "comforts:hammock_red",
    "comforts:hammock_green",
    "comforts:hammock_brown",
    "comforts:rope_and_nail",
    "comforts:sleeping_bag_pink",
    "comforts:sleeping_bag_gray",
    "comforts:sleeping_bag_orange",
    "comforts:sleeping_bag_pink",
    "comforts:sleeping_bag_lime",
    "comforts:sleeping_bag_yellow",
    "comforts:sleeping_bag_light_blue",
    "comforts:sleeping_bag_magenta",
    "comforts:sleeping_bag_light_gray",
    "comforts:sleeping_bag_purple",
    "comforts:sleeping_bag_cyan",
    "comforts:sleeping_bag_black",
    "comforts:sleeping_bag_blue",
    "comforts:sleeping_bag_red",
    "comforts:sleeping_bag_green",
    "comforts:sleeping_bag_brown",
    // Central kitchen
    "create_central_kitchen:sweet_berry_cake_slice",
    "create_central_kitchen:truffle_pie_slice",
    "create_central_kitchen:cherry_pie_slice",
    "create_central_kitchen:mulberry_pie_slice",
    "create_central_kitchen:chocolate_cake_slice",
    "create_central_kitchen:pumpkin_cake_slice",
    "create_central_kitchen:honey_cake_slice",
    "create_central_kitchen:aloe_cake_slice",
    "create_central_kitchen:pumpkin_cake_slice",
    "create_central_kitchen:passionfruit_cake_slice",
    "create_central_kitchen:yucca_cake_slice",
    "create:dough",
    // Autumnity
    "autumnity:pancake",
    "autumnity:syrup_bottle",
    "autumnity:sap_bottle",
    // Farmers delight compat
    "farmersdelight:bacon_and_eggs",
    "farmersdelight:dog_food",
    "farmersdelight:horse_feed",
    "farmersdelight:organic_compost",
    "farmersdelight:carrot_crate",
    "farmersdelight:potato_crate",
    "farmersdelight:onion_crate",
    "farmersdelight:beetroot_crate",
    "farmersdelight:rich_soil_farmland",
    "farmersdelight:wild_beetroots",
    "farmersdelight:wild_cabbages",
    "farmersdelight:wild_potatoes",
    "farmersdelight:wild_carrots",
    "farmersdelight:wild_rice",
    "farmersdelight:wild_onions",
    "farmersdelight:onion",
    "farmersdelight:raw_pasta",
    "farm_and_charm:bacon",
    "farm_and_charm:tomato_seeds",
    "farm_and_charm:rotten_tomato",
    "farm_and_charm:tomato",
    "farm_and_charm:chicken_parts",
    "vintagedelight:cheese_mold",
    "vintagedelight:salt_dust",
    "vintagedelight:cheese_curds",
    "vintagedelight:cheese_slice",
    "vintagedelight:cyan_chefs_hat",
    "vintagedelight:white_chefs_hat",
    "vintagedelight:cheese_wheel",
    "vintagedelight:oat_seeds",
    "vintagedelight:oat",
    "farm_and_charm:tomato_bag",
    "vintagedelight:oat_dough",
    "farmersdelight:wheat_dough",
    "vintagedelight:oatmeal",
    "vintagedelight:black_chefs_hat",
    "vintagedelight:brown_chefs_hat",
    "vintagedelight:light_gray_chefs_hat",
    "vintagedelight:magenta_chefs_hat",
    "vintagedelight:lime_chefs_hat",
    "vintagedelight:oat_bag",
    "vintagedelight:wild_oats",
    "vintagedelight:oat_bale",
    "vintagedelight:cheese_mold",
    "vintagedelight:blue_chefs_hat",
    "vintagedelight:green_chefs_hat",
    "vintagedelight:light_blue_chefs_hat",
    "vintagedelight:orange_chefs_hat",
    "vintagedelight:raw_oats",
    "vintagedelight:salt_bucket",
    "vintagedelight:yellow_chefs_hat",
    "vintagedelight:lush_grass_block",
    "vintagedelight:gray_chefs_hat",
    "vintagedelight:purple_chefs_hat",
    "vintagedelight:pink_chefs_hat",
    "vintagedelight:red_chefs_hat",
    // Furniture dupes
    "candlelight:dark_oak_cabinet",
    "candlelight:spruce_cabinet",
    "candlelight:birch_cabinet",
    "candlelight:oak_cabinet",
    "candlelight:acacia_cabinet",
    "candlelight:jungle_cabinet",
    "candlelight:mangrove_cabinet",
    "candlelight:warped_cabinet",
    "candlelight:crimson_cabinet",
    "candlelight:cherry_cabinet",
    "candlelight:bamboo_cabinet",
    // Other dupes
    "crabbersdelight:can",
    "crabbersdelight:bucket_of_shrimp_chum",
    "crabbersdelight:bucket_of_clam_chum",
    "crabbersdelight:bucket_of_clawster_chum",
    "crabbersdelight:bucket_of_crab_chum",
    // Pams
    "pamhc2trees:gooseberry_sapling",
    "pamhc2trees:chestnut_sapling",
    "pamhc2trees:avocado_sapling",
    "pamhc2trees:candlenut_sapling",
    "pamhc2trees:acorn_sapling",
    "pamhc2trees:soursop_sapling",
    "pamhc2trees:spiderweb_sapling",
    "pamhc2trees:walnut_sapling",
    "pamhc2trees:pear_sapling",
    "pamhc2trees:nutmeg_sapling",

    "pamhc2trees:grapefruit_sapling",
    "pamhc2trees:pomegranate_sapling",
    "pamhc2trees:guava_sapling",
    "pamhc2trees:jackfruit_sapling",
    "pamhc2trees:tamarind_sapling",
    "pamhc2trees:maple_sapling",
    "pamhc2trees:pinenut_sapling",
    "pamhc2trees:rambutan_sapling",
    "pamhc2trees:olive_sapling",
    "pamhc2trees:papaya_sapling",
    "pamhc2trees:paperbark_sapling",
    "pamhc2trees:pecan_sapling",
    "pamhc2trees:peppercorn_sapling",
    "pamhc2trees:persimmon_sapling",
    "pamhc2trees:pistachio_sapling",
    "pamhc2trees:breadfruit_sapling",
    "pamhc2trees:vanillabean_sapling",
    "pamhc2trees:almond_sapling",
    "pamhc2trees:apricot_sapling",
    "pamhc2trees:cashew_sapling",
    "pamhc2trees:coconut_sapling",
    "pamhc2trees:date_sapling",
    "pamhc2trees:durian_sapling",
    "pamhc2trees:fig_sapling",
    "pamhc2trees:lime_sapling",
    "pamhc2trees:rambutanitem",
    "pamhc2trees:tamarinditem",
    "pamhc2trees:passionfruititem",
    "pamhc2trees:papayaitem",
    "pamhc2trees:guavaitem",
    "pamhc2trees:pecanitem",
    "pamhc2trees:durianitem",
    "pamhc2trees:dateitem",
    "pamhc2trees:breadfruititem",
    "pamhc2trees:coconutitem",
    "pamhc2trees:pistachioitem",
    "pamhc2trees:jackfruititem",
    "pamhc2trees:persimmonitem",
    "pamhc2trees:walnutitem",
    "pamhc2trees:avocadoitem",
    "pamhc2trees:gooseberryitem",
    "pamhc2trees:figitem",
    "pamhc2trees:vanillabeanitem",
    "pamhc2trees:almonditem",
    "pamhc2trees:acornitem",
    "pamhc2trees:pinenut_sapling",
    "pamhc2trees:candlenutitem",
    "pamhc2trees:nutmegitem",
    "pamhc2trees:cashewitem",
    "pamhc2trees:pomegranateitem",
    "pamhc2trees:peppercornitem",
    "pamhc2trees:limeitem",
    "pamhc2trees:oliveitem",
    "pamhc2trees:soursopitem",
    "pamhc2trees:cherryitem",
    "pamhc2trees:apricotitem",
    "pamhc2trees:pearitem",
    "pamhc2trees:maplesyrupitem",
    "pamhc2trees:roastedpecanitem",
    "pamhc2trees:pinenutitem",
    "pamhc2trees:roastedchestnutitem",
    "pamhc2trees:roastedwalnutitem",
    "pamhc2trees:roastedalmonditem",
    "pamhc2trees:roastedcashewitem",
    "pamhc2trees:roastedpistachioitem",
    "pamhc2trees:roastedpinenutitem",
    "pamhc2trees:roastedacornitem",
    "pamhc2trees:pamrambutan",
    "pamhc2trees:pamtamarind",
    "pamhc2trees:pampinenut",
    "pamhc2trees:pammaple",
    "pamhc2trees:grapefruititem",
    "pamhc2trees:pampistachio",
    "pamhc2trees:pamchestnut",
    "pamhc2trees:chestnutitem",
    "pamhc2trees:pamacorn",
    "pamhc2trees:pamspiderweb",
    "pamhc2trees:pamnutmeg",
    "pamhc2trees:pamcoconut",
    "pamhc2trees:pampear",
    "pamhc2trees:pamolive",
    "pamhc2trees:pamgrapefruit",
    "pamhc2trees:pampomegranate",
    "pamhc2trees:pamvanillabean",
    "pamhc2trees:pamcandlenut",
    "pamhc2trees:pamcashew",
    "pamhc2trees:pampapaya",
    "pamhc2trees:pampeppercorn",
    "pamhc2trees:pampersimmon",
    "pamhc2trees:pamsoursop",
    "pamhc2trees:pamjackfruit",
    "pamhc2trees:pampecan",
    "pamhc2trees:pamfig",
    "pamhc2trees:pamdurian",
    "pamhc2trees:pambreadfruit",
    "pamhc2trees:pamguava",
    "pamhc2trees:pamgooseberry",
    "pamhc2trees:pamlime",
    "pamhc2trees:pamdate",
    "pamhc2trees:pamwalnut",
    "pamhc2trees:pamalmond",
    "pamhc2trees:pamapricot",
    "pamhc2trees:pampaperbark",
    "pamhc2trees:pamavocado",
    "sewingkit:common_pattern",
    "sewingkit:uncommon_pattern",
    "sewingkit:rare_pattern",
    "sewingkit:legendary_pattern",
    "sewingkit:leather_strip",
    "sewingkit:leather_sheet",
    "etcetera:prickly_can",
    "gag:time_sand_pouch",
    "gag:fishing_dynamite",
    // Broken
    "farm_and_charm:supply_cart",
    "farm_and_charm:plow",
    // Modpack utils
    "itemfilters:damage",
    "itemfilters:block",
    "itemfilters:max_count",
    "itemfilters:strong_nbt",
    "ftbquests:task_screen_configurator",
    "ftbquests:stage_barrier",
    "ftbquests:detector",
    "ftbquests:loot_crate_opener",
    "ftbquests:screen_1",
    "ftbquests:screen_3",
    "ftbquests:screen_5",
    "ftbquests:screen_7",
    "ftbquests:barrier",
    "itemfilters:weak_nbt",
    "itemfilters:custom",
    "itemfilters:always_true",
    "itemfilters:always_false",
    "itemfilters:or",
    "itemfilters:id_regex",
    "itemfilters:mod",
    "itemfilters:tag",
    "itemfilters:xor",
    "itemfilters:not",
    "itemfilters:and",
    // Nether depths
    "netherdepthsupgrade:grilled_lava_pufferfish",
    "netherdepthsupgrade:grilled_obsidianfish",
    "netherdepthsupgrade:grilled_searing_cod",
    "netherdepthsupgrade:grilled_soulsucker",
    "netherdepthsupgrade:grilled_glowdine",
    "netherdepthsupgrade:grilled_magmacubefish",
    "netherdepthsupgrade:grilled_blazefish",

    // Waystones
    "waystones:light_blue_sharestone",
    "waystones:light_gray_sharestone",
    "waystones:pink_sharestone",
    "waystones:sharestone",
    "waystones:sandy_waystone",
    "waystones:mossy_waystone",
    "waystones:white_sharestone",
    "waystones:orange_sharestone",
    "waystones:magenta_sharestone",
    "waystones:gray_sharestone",
    "waystones:yellow_sharestone",
    "waystones:lime_sharestone",
    "waystones:brown_sharestone",
    "waystones:cyan_sharestone",
    "waystones:black_sharestone",
    "waystones:warp_plate",
    "waystones:portstone",
    "waystones:warp_dust",
    "waystones:return_scroll",
    // Trofers
    "trofers:small_plate",
    "trofers:medium_plate",
    "trofers:large_pillar",
    "trofers:medium_pillar",
    "trofers:large_plate",
    "trofers:small_pillar",
    "fantasyfurniture:furniture_station",
    "brewery:hops_seeds",
    "farm_and_charm:strawberry_seed",
    "pamhc2trees:orangeitem",
    "farm_and_charm:water_sprinkler",
    "atmospheric:golden_dragon_fruit_crate",
    "atmospheric:golden_dragon_fruit",
    "atmospheric:dragon_fruit_crate",
    "atmospheric:dragon_fruit",
  ];

  e.hide(hiddenItems);
});
