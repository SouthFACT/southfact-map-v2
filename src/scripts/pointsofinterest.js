// dependencies
import L from 'leaflet';
import { saveAs } from 'file-saver';
import { Component } from './components';
import { Store } from './store';
// import utilities
import {
  checkValidObject,
  googleAnalyticsEvent
} from './utilitys';

// required for bootstrap
window.$ = require('jquery');
// required for tooltip, popup...
window.Popper = require('popper.js');

window.jQuery = window.$;

const store = new Store({});
/**
* handles adding of points the pointsofinterest of points. Designed to allow
* users to create a set of points to visit. - pointsofinterest or create a google map
* route
*/
export class PointsOfInterest extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props);
    const { mapComponent } = props;

    this.map = mapComponent.map;
    this.mapComponent = mapComponent;

    // setup marker layer which is not set yet.
    this.marker = undefined;
    this.markersLayer = new L.LayerGroup();

    this.addPointsOfInterestControl(this.map);

    const elem = document.getElementById('btn-pointsofinterest-download-holder');
    if (elem) {
      elem.addEventListener('click', PointsOfInterest.exportCSV.bind(this));
    }

    const cancelelem = document.getElementById('btn-pointsofinterest-cancel-holder');
    if (cancelelem) {
      cancelelem.addEventListener('click', this.cancelPointsOfInterest.bind(this));
    }

    window.addEventListener('added-pointofinterest', (e) => {
      if (elem) {
        elem.classList.remove('d-none');
      }

      if (cancelelem) {
        cancelelem.classList.remove('d-none');
      }
    });

    window.addEventListener('removed-pointofinterest', (e) => {
      if (elem) {
        elem.classList.add('d-none');
        elem.removeEventListener('click', PointsOfInterest.exportCSV, true);
        this.map.off('click');
        this.mapComponent.mapCursorDefault();
      }

      if (cancelelem) {
        cancelelem.classList.add('d-none');
      }
    });
  }

  cancelPointsOfInterest() {
    this.map.off('click');
    this.mapComponent.mapCursorDefault();
    this.removeMapMarker();
  }

  static pointHTML() {
    const elem = L.DomUtil.create('div', 'btn-pointsofinterest-holder leaflet-bar');
    elem.setAttribute('id', 'btn-pointsofinterest-holder');
    elem.classList.add('btn-pointsofinterest-holder');
    elem.innerHTML = '<a id="pointsofinterest" class="btn btn-light btn-pointsofinterest" title="Add points of interest to map" ' +
                    'role="button" aria-label="Add points of interest to map" ' +
                    'data-toggle="tooltip" data-placement="right" data-original-title="Add points of interest to map"> ' +
                    '<i class="fas fa-map-marker-alt i-pointsofinterest"></a>';
    return elem;
  }

  static pointDownloadHTML() {
    const elem = L.DomUtil.create('div', 'btn-pointsofinterest-download-holder leaflet-bar');
    elem.setAttribute('id', 'btn-pointsofinterest-download-holder');
    elem.classList.add('btn-pointsofinterest-download-holder');
    elem.classList.add('d-none');
    elem.innerHTML = '<a id="pointsofinterest-download" class="btn btn-light btn-pointsofinterest-download" title="Download points of interest" ' +
                    'role="button" aria-label="Download points of interest" ' +
                    'data-toggle="tooltip" data-placement="right" data-original-title="Download points of interest"> ' +
                    '<i class="fas fa-download i-pointsofinterest-download"></a>';

    return elem;
  }

  static pointCancelHTML() {
    const elem = L.DomUtil.create('div', 'btn-pointsofinterest-cancel-holder leaflet-bar');
    elem.setAttribute('id', 'btn-pointsofinterest-cancel-holder');
    elem.classList.add('btn-pointsofinterest-cancel-holder');
    elem.classList.add('d-none');
    elem.innerHTML = '<a id="pointsofinterest-cancel" class="btn btn-light btn-pointsofinterest-cancel" title="Remove all points of interest" ' +
                    'role="button" aria-label="Remove all points of interest" ' +
                    'data-toggle="tooltip" data-placement="right" data-original-title="Remove all points of interest"> ' +
                    '<i class="fas fa-times-circle i-pointsofinterest-download"></a>';

    return elem;
  }

  static PointsOfInterestControlOnAddHandler() {
    // add points button
    const pointsofinterestBtn = PointsOfInterest.pointHTML();
    // download points button
    const pointsofinterestDownloadBtn = PointsOfInterest.pointDownloadHTML();
    // cancel points button
    const pointsofinterestCancelBtn = PointsOfInterest.pointCancelHTML();

    const pointsofinterestBtns = L.DomUtil.create('div', 'btn-pointsofinterest-all-holder');
    pointsofinterestBtns.setAttribute('id', 'btn-pointsofinterest-all-holder');
    pointsofinterestBtns.classList.add('btn-pointsofinterest-all-holder');

    L.DomEvent.disableClickPropagation(pointsofinterestBtn);
    L.DomEvent.disableClickPropagation(pointsofinterestDownloadBtn);

    pointsofinterestBtns.appendChild(pointsofinterestBtn);
    pointsofinterestBtns.appendChild(pointsofinterestDownloadBtn);
    pointsofinterestBtns.appendChild(pointsofinterestCancelBtn);

    // initalize new tooltips
    $(() => {
      $('#btn-pointsofinterest-holder [data-toggle="tooltip"]').tooltip({ trigger: 'hover focus' });
      $('#btn-pointsofinterest-download-holder [data-toggle="tooltip"]').tooltip({ trigger: 'hover focus' });
      $('#btn-pointsofinterest-cancel-holder [data-toggle="tooltip"]').tooltip({ trigger: 'hover focus' });
    });
    return pointsofinterestBtns;
  }

  // add  points of interest Button control to leaflet map
  addPointsOfInterestControl(leafletmap) {
    L.Control.Watermark = L.Control.extend({
      onAdd: PointsOfInterest.PointsOfInterestControlOnAddHandler,

      // Nothing to do here
      onRemove: PointsOfInterest.PointsOfInterestOnRemoveHandler
    });

    L.control.watermark = opts => new L.Control.Watermark(opts);
    L.control.watermark({ position: 'topleft' }).addTo(leafletmap);

    // get btn for points of interest add click event
    const leafletControlElement = document.querySelector('.btn-pointsofinterest');
    leafletControlElement.addEventListener('click', this.pointsOfInteresClickHandler.bind(this));
  }

  // points of interest control (button) on add function.
  // fires when the control (button) is removed
  static PointsOfInterestOnRemoveHandler(map) {
    // Nothing to do here yet
    return null;
  }

  // static PointsOfInterestHandler() {
  //   console.log('Add points of interest to map click');
  //   // ga event action, category, label
  //   googleAnalyticsEvent('click', 'PointsOfInterest', 'pointsofinterest');
  // }

  // remove the map maker layer group, points of interest
  // point.
  removeMapMarker(trigger = true) {
    this.markersLayer.clearLayers();
    if (trigger) {
      const navChangeEvent = new CustomEvent('removed-pointofinterest');
      window.dispatchEvent(navChangeEvent);
    }
  }

  // converts the the multple record object to csv and renames headers (field names)
  //
  // @param name | String - data object from state that is properties.mean
  static convertDataToCSV(data) {
    const array = [Object.keys(data[0])].concat(data);

    return array.map(it => Object.values(it).toString()).join('\n');
  }

  // grabs current points of interest and exports them to csv
  static exportCSV() {
    const mapClickPointsOfInterest = store.getStateItem('mapClickPointsOfInterest');
    // make sure there is data.
    if (checkValidObject(mapClickPointsOfInterest)) {
      // this.removeMapMarker();
      const csv = PointsOfInterest.convertDataToCSV(mapClickPointsOfInterest);
      const blob = new Blob([csv], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'pointsofinterest.csv');
      return csv;
    }
    return null;
  }

  // creates custom icon and adds css class for styling
  static createPointsOfInterestIcon() {
    return L.divIcon({ className: 'pointsofinterest-marker' });
  }

  // point of interest point click handler
  pointsOfInterestClickHandler(ev) {
    // save the map action to state store
    store.saveAction('click');

    // get current points if there are any and concateanate the points
    // keep doing this to user clears the points - which we need to figure out...
    const currentPointsOfInterest = store.getStateItem('mapClickPointsOfInterest');
    const newPointOfInterest = [ev.latlng];
    const updatePointsOfInterests = [...currentPointsOfInterest, ...newPointOfInterest];

    // de-dup the array of point objects (avoids double clicks and such)
    const uniq = new Set(updatePointsOfInterests.map(e => JSON.stringify(e)));
    const uniquePointsOfInterests = Array.from(uniq).map(e => JSON.parse(e));

    // get the custom map marker icon
    const myIcon = PointsOfInterest.createPointsOfInterestIcon();

    // add the marker at the clicked point
    this.addPointsOfInterestMarker(ev.latlng, myIcon);

    // save the mapclick location to the state store
    store.setStoreItem('mapClickPointsOfInterest', uniquePointsOfInterests);
    const navChangeEvent = new CustomEvent('added-pointofinterest');
    window.dispatchEvent(navChangeEvent);
    // PointsOfInterest.exportCSV();

    // ga event action, category, label
    googleAnalyticsEvent('click', 'map', 'pointsofinterest');
  }

  // add maker for points of interest points to leaflet layer group
  // @param { Object } mapclick object lat long
  // @param { Object } icon leaflet icon used as maker on map
  addPointsOfInterestMarker(mapClick, icon) {
    const markersLayer = L.marker([mapClick.lat, mapClick.lng], {
      icon,
      alt: 'Point of interest'
    });
    this.markersLayer.addLayer(markersLayer);
    this.map.addLayer(this.markersLayer);
  }

  // re-instiate mapClick Points Of Interest
  // adding not as hanlder callback so I can use this (class) calls
  // would be better to handle this as a traditional callback
  addPointsOfInteresClickHandler() {
    // reset points of interest on new click
    store.removeStateItem('mapClickPointsOfInterest');

    const elem = document.getElementById('btn-pointsofinterest-download-holder');
    if (elem) {
      elem.classList.remove('d-none');
    }

    const cancelelem = document.getElementById('btn-pointsofinterest-cancel-holder');
    if (cancelelem) {
      cancelelem.classList.remove('d-none');
    }

    // remove old maker if it exists
    // this.marker is defined at class creation
    // this.removeMapMarker(false);

    // click
    this.map.on('click', this.pointsOfInterestClickHandler.bind(this));
  }

  // points of interest click handler
  pointsOfInteresClickHandler(ev) {
    this.addPointsOfInteresClickHandler();
    // ga event action, category, label
    googleAnalyticsEvent('click', 'button', 'pointsofinterest');

    // remove previous marker point
    if (this.marker !== undefined) {
      this.mapComponent.map.removeLayer(this.marker);
    }

    // make the map cursor cross hairs
    this.mapComponent.mapCursorCrosshair();

    // remove from state
    store.removeStateItem('pointsofinterest');
  }
}
