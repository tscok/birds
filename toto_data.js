// TODO: Load data from firebase
// 
// 1. Approach on firebase data
// Put firebase listeners outside init function in stores,
// then use riotcontrol events to get/load data to views.
// This gives the advantage of data being loaded at 'app init',
// and no need to wait for data to load on each route.
// Possible caveat is a little slower 'app init'?
// 
// list = []
// ref.child('...').on('child_added', fnc)
// 
// function fnc(snap) {
//  list.push(...)
// }
// 
// riotcontrol.on('route_x', function(args) {
//  if (!dataChanged) {
//     return;
//  }
//  self.trigger('load_data', list)
//  dataChanged = false;
// })
// 
// 2. Approach on secondary data
// Investigate the use of promises when loading secondary data from lists of id's,
// or use nested 'firebase listeners', using onChildAdded.
// 
// ----
//   
// - Public code that doesn't rely on uid, runs in the background:
//   - login, onAuth (watch state), router, etc.
//   
// - Private code that triggers on login / reload:
//   - Firebase listeners that require uid (trigger data initially and on user action).
//   - Returned data should be complete.
//   - Have stores listen to riotcontrol events, using self.on('..')
//   - Look at http://jimsparkman.github.io/RiotControl/routing_demo/
//   
