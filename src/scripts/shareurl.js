// todo:
// spinner on when restoring not working.

// dependencies
import L from 'leaflet';
import { Component } from './components';
import { Store } from './store';
import shareurlTemplate from '../templates/shareurl.html';

import {
  googleAnalyticsEvent
} from './utilitys';

const store = new Store({});


// required for bootstrap
window.$ = require('jquery');
// required for tooltip, popup...
window.Popper = require('popper.js');

window.jQuery = window.$;

/**
* handles the identify interactions on the map
* dosen't not deal with lambda api call but it does make that call
* it does deal with the response information
* and generally handles adding any shapes to the map.
*/
export class ShareUrl extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, shareurlTemplate);

    const { mapComponent, URLCls, hasShareURL } = props;
    this.mapComponent = mapComponent;
    this.URL = URLCls;
    this.hasShareURL = hasShareURL;

    this.map = mapComponent.map;
    this.mapComponent = mapComponent;
    this.shareurl = '';

    this.shareurlTemplate = shareurlTemplate;

    // this.addShareUrlControl(this.map);
    store.setStoreItem('nothing', 'nothing');
  }

  // add Identify control to leaflet map
  addShareUrlControl(leafletmap) {
    L.Control.Watermark = L.Control.extend({
      onAdd: ShareUrl.mapShareURLMakerOnAddHandler,

      // Nothing to do here
      onRemove: ShareUrl.mapShareURLakerOnRemoveHandler
    });

    L.control.watermark = opts => new L.Control.Watermark(opts);

    L.control.watermark({ position: 'bottomleft' }).addTo(leafletmap);

    // get btn for share URL add click event
    const leafletControlElement = document.querySelector('.btn-mapshareurl');
    leafletControlElement.addEventListener('click', ShareUrl.makeShareUrlHandler.bind(this));
  }

  // share url (identify) control (button) on add function.
  // fires when the control (button) is removed
  static mapShareURLakerOnRemoveHandler(map) {
    // Nothing to do here yet
    return null;
  }

  static disableShareUrl() {
    // ga event action, category, label
    googleAnalyticsEvent('click', 'shareurl', 'collapse');

    const shareurl = document.getElementById('shareurl-holder');
    if (shareurl) {
      shareurl.classList.add('d-none');
    }
  }

  static enableShareUrl() {
    const shareurl = document.getElementById('shareurl-holder');
    if (shareurl) {
      shareurl.classList.remove('d-none');
    }
  }

  static makeShareUrlHandler() {
    // ga event action, category, label
    googleAnalyticsEvent('click', 'shareurl', 'open');

    const sharebutton = document.querySelector('.btn-copy-share');
    if (!sharebutton) {
      this.makeSharedURL();
    }

    const shareurl = document.getElementById('shareurl-holder');
    if (shareurl) {
      if (shareurl.classList.contains('d-none')) {
        shareurl.classList.remove('d-none');
      }
    }
  }

  static copyToClipboard(e) {
    e.stopPropagation();
    const textArea = document.getElementById('shareurltextarea');
    if (textArea) {
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
    }
  }

  // share url (identify) control (button) on add function.
  // fires when the control (button) is added
  static mapShareURLMakerOnAddHandler() {
    // setup custom style for share url indentify control (button)
    const origsharebtn = document.getElementById('btn-mapshareurl-holder');
    if (origsharebtn) {
      origsharebtn.outerHTML = '';
    }

    const sharebtn = L.DomUtil.create('div', 'btn-mapshareurl-holder');
    sharebtn.setAttribute('id', 'btn-mapshareurl-holder');
    sharebtn.innerHTML = '<a class="btn btn-light btn-mapshareurl" title="Share Map" ' +
                    'role="button" aria-label="Share Map" ' +
                    'data-toggle="tooltip" data-placement="right" data-original-title="Share Map"> ' +
                    '<i class="fas fa-share-alt i-shareurl">' +
                    '</i><div class="btn-med-share-label" >Share Map</div></a>';

    L.DomEvent.disableClickPropagation(sharebtn);
    // initalize new tooltips
    $(() => {
      $('#btn-mapshareurl-holder [data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
    });

    return sharebtn;
  }

  // creates custom icon and adds css class for styling
  static createMapShareURLIcon() {
    return L.divIcon({ className: 'map-shareurl-point' });
  }


  static createShareURLWrapper() {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'shareurl-holder');
    wrapper.innerHTML = '';
    return wrapper;
  }

  buildShareURLBox() {
    const shareBox = new DOMParser();
    const docShareBox = shareBox.parseFromString(this.shareurlTemplate, 'text/html');
    const elemShareBox = docShareBox.getElementById('shareurl-holder');
    const innerHTMLShareBox = elemShareBox.innerHTML;

    const newdiv = document.createElement('div');
    newdiv.setAttribute('id', 'shareurl-holder');
    newdiv.innerHTML = innerHTMLShareBox;
    const checkShareBox = document.getElementById('shareurl-holder');

    // make sure the share box dose not already exist
    if (!checkShareBox) {
      document.getElementById('btn-mapshareurl-holder').appendChild(newdiv);
    }
    return newdiv;
  }

  addShareURLListners() {
    const createShareURLCopyButton = document.querySelector('.btn-copy-share');
    const shareUrlBox = document.getElementById('shareurltextarea');

    shareUrlBox.addEventListener('click', ShareUrl.copyToClipboard);
    shareUrlBox.addEventListener('click', (e) => {
      const shareurl = document.getElementById('shareurltextarea');
      shareurl.value = this.URL.getShareUrl();
      // ga event action, category, label
      googleAnalyticsEvent('click', 'shareurl', shareurl.value);

      ShareUrl.copyToClipboard(e);
    });

    createShareURLCopyButton.addEventListener('click', ShareUrl.copyToClipboard);
    createShareURLCopyButton.addEventListener('click', (e) => {
      const shareurl = document.getElementById('shareurltextarea');
      shareurl.value = this.URL.getShareUrl();
      // ga event action, category, label
      googleAnalyticsEvent('click', 'shareurl', shareurl.value);
      ShareUrl.copyToClipboard(e);
    });

    const collapse = document.querySelector('.btn-close-share');
    collapse.addEventListener('click', ShareUrl.disableShareUrl.bind(this));
    ShareUrl.enableShareUrl();

    // createShareURLCopyButton.classList.remove('disabled');
  }

  // save shapes to s3 so we can share user added shapes from a URL
  // async saveShapesToS3 () {
  makeSharedURL() {
    this.buildShareURLBox();
    this.shareurl = this.URL.getShareUrl();
    const shareUrlBox = document.getElementById('shareurltextarea');
    shareUrlBox.value = this.shareurl;

    this.addShareURLListners();
    return this.shareurl;
  }
}
