// Bootstrap dependencies
import 'bootstrap';
import '../css/index.scss';

// required for bootstrap
window.$ = require('jquery');
// required for tooltip, popup...
window.Popper = require('popper.js');

window.jQuery = window.$;

// // tooltip and popover require javascript side modification to enable them (new in Bootstrap 4)
// // use tooltip and popover components everywhere
// $(() => {
//   $('[data-toggle="tooltip"]').tooltip({
//     trigger: 'hover focus'
//   });
//
//   $('[data-toggle="popover"]').popover();
// });
