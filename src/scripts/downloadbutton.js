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
* handles download of map data
*/
export class DownloadButton extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props);
    const { mapComponent } = props;
    this.mapComponent = mapComponent;

    DownloadButton.addDownloadButtonControl(this.mapComponent);
  }


  static DownloadButtonControlOnAddHandler() {
    const downloadBtn = L.DomUtil.create('div', 'btn-download-holder');
    downloadBtn.setAttribute('id', 'btn-download-holder');
    downloadBtn.classList.add('btn-mapshareurl-holder');
    downloadBtn.innerHTML = '<a id="downloaddata" class="btn btn-light btn-downloaddata"  href="#" title="Download map data" ' +
                          'role="button" aria-label="Download map data" ' +
                          'data-toggle="tooltip" data-placement="right" data-original-title="Download map data"> ' +
                          '<i class="fas fa-download icon-download"></i>' +
                          '<div class="btn-med-download-label" >Download</div></a>';

    L.DomEvent.disableClickPropagation(downloadBtn);
    // initalize new tooltips
    $(() => {
      $('#btn-download-holder [data-toggle="tooltip"]').tooltip({ trigger: 'hover focus' });
    });
    return downloadBtn;
  }

  // add  Download Button control to leaflet map
  static addDownloadButtonControl(leafletmap) {
    L.Control.Watermark = L.Control.extend({
      onAdd: DownloadButton.DownloadButtonControlOnAddHandler,

      // Nothing to do here
      onRemove: DownloadButton.DownloadButtonOnRemoveHandler
    });

    L.control.watermark = opts => new L.Control.Watermark(opts);
    L.control.watermark({ position: 'bottomleft' }).addTo(leafletmap);

    // get btn for share URL add click event
    const leafletControlElement = document.querySelector('.btn-downloaddata');
    leafletControlElement.addEventListener('click', DownloadButton.DownloadButtonHandler.bind(this));
  }

  // share url (identify) control (button) on add function.
  // fires when the control (button) is removed
  static DownloadButtonOnRemoveHandler(map) {
    // Nothing to do here yet
    return null;
  }

  static DownloadButtonHandler() {
    console.log('download data click');
    // ga event action, category, label
    googleAnalyticsEvent('click', 'DownloadButton', 'download');
  }
}
