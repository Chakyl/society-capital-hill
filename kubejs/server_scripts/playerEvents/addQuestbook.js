console.info('[SOCIETY] addQuestbook.js loaded')

PlayerEvents.loggedIn(e => {
  const { player } = e
  if (!player.stages.has('starting_items')) {
    player.stages.add('starting_items')
    player.give('ftbquests:book')
  }
})