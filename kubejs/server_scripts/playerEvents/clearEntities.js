console.info('[SOCIETY] clearEntities.js loaded')

PlayerEvents.loggedIn(e => {
    // Janky way to reset the ballon cap for ones that get stuck  
    e.server.runCommandSilent('tp @e[type=balloonbox:balloonbox] ~ -100000 ~')
    e.server.runCommandSilent('kill @e[type=relics:shadow_glaive]')
})