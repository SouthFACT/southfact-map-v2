// dependencies
import L from 'leaflet';
import { Component } from './components';
// import utilities
import { googleAnalyticsEvent } from './utilitys';

// required for bootstrap
window.$ = require('jquery');
// required for tooltip, popup...
window.Popper = require('popper.js');

window.jQuery = window.$;

/**
* handles adding of points the pointsofinterest of points. Designed to allow
* users to create a set of points to visit. - pointsofinterest or create a google map
* route
*/
export class PointsOfInterest extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props);
    const { mapComponent } = props;
    this.mapComponent = mapComponent.map;

    PointsOfInterest.addPointsOfInterestControl(this.mapComponent);
  }


  static PointsOfInterestControlOnAddHandler() {
    const pointsofinterestBtn = L.DomUtil.create('div', 'btn-pointsofinterest-holder leaflet-bar');
    pointsofinterestBtn.setAttribute('id', 'btn-pointsofinterest-holder');
    pointsofinterestBtn.classList.add('btn-pointsofinterest-holder');
    pointsofinterestBtn.innerHTML = '<a id="pointsofinterest" class="btn btn-light btn-pointsofinterest" title="Add points of interest to map" ' +
                    'role="button" aria-label="Add points of interest to map" ' +
                    'data-toggle="tooltip" data-placement="right" data-original-title="Add points of interest to map"> ' +
                    '<i class="fas fa-map-marker-alt i-pointsofinterest"></a>';

    L.DomEvent.disableClickPropagation(pointsofinterestBtn);
    // initalize new tooltips
    $(() => {
      $('#btn-pointsofinterest-holder [data-toggle="tooltip"]').tooltip({ trigger: 'hover focus' });
    });
    return pointsofinterestBtn;
  }

  // add  points of interest Button control to leaflet map
  static addPointsOfInterestControl(leafletmap) {
    L.Control.Watermark = L.Control.extend({
      onAdd: PointsOfInterest.PointsOfInterestControlOnAddHandler,

      // Nothing to do here
      onRemove: PointsOfInterest.PointsOfInterestOnRemoveHandler
    });

    L.control.watermark = opts => new L.Control.Watermark(opts);
    L.control.watermark({ position: 'topleft' }).addTo(leafletmap);

    // get btn for mapinfo add click event
    const leafletControlElement = document.querySelector('.btn-pointsofinterest');
    leafletControlElement.addEventListener('click', PointsOfInterest.PointsOfInterestHandler.bind(this));
  }

  // points of interest control (button) on add function.
  // fires when the control (button) is removed
  static PointsOfInterestOnRemoveHandler(map) {
    // Nothing to do here yet
    return null;
  }

  static PointsOfInterestHandler() {
    console.log('Add points of interest to map click');
    // ga event action, category, label
    googleAnalyticsEvent('click', 'PointsOfInterest', 'pointsofinterest');
  }
}
