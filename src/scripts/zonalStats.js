import L from 'leaflet';
import ColorRampHub from '../templates/colorramp_hub.html';
import ColorRampAquatic from '../templates/colorramp_aquatic.html';
import ColorRampTerrestrial from '../templates/colorramp_terrestrial.html';
import ColorRampExposure from '../templates/colorramp_exposure.html';
import ColorRampAsset from '../templates/colorramp_asset.html';
import ColorRampThreat from '../templates/colorramp_threat.html';;
import { Store } from './store';
import {
  checkValidObject,
  googleAnalyticsEvent,
} from './utilitys';

// required for bootstrap
window.$ = require('jquery');
// required for tooltip, popup...
window.Popper = require('popper.js');

window.jQuery = window.$;

const store = new Store({});

// This function finds the scaled position of a value from [0,100]
// It does the addition of scale and division by scaleGroups since the value falls into one of
// multiple ranges and so it needs to put the scaled value into the correct area.
//
// @param val - float
// @param rangeMin - int
// @param rangeMax - int
// @param scale - int. [0,scaleGroups - 1]
// @param scaleGroups - int. Number of groups the value could be scaled for. [1,]
function getValuePosition(val, rangeMin, rangeMax, scale, scaleGroups) {
  let valOveride = val;
  // no data overide
  if (val === '255') {
    valOveride = 0;
  }
  let position = (valOveride - rangeMin) / (rangeMax - rangeMin); // [0,1]
  position += scale; // [0,scaleGroups]
  position = (position / scaleGroups) * 100; // [0, 100]
  if (position === 100) {
    position = 99;
  }
  return position;
}

// Finds the scaled position for the drivers
// @param driver | float - value from the api for a driver
// @return float - [0,100]
function getDriverHeight(driver) {
  const LOW_RANGE = 0;
  const HIGH_RANGE = 5;
  const SCALE = 0;
  const SCALE_GROUPS = 1;

  return getValuePosition(driver, LOW_RANGE, HIGH_RANGE, SCALE, SCALE_GROUPS);
}

// Finds the scaled position for the drivers
// @param driver | float - value from the api for a driver
// @return float - [0,100]
function getTwoHeight(driver) {
  const LOW_RANGE = 0;
  const HIGH_RANGE = 5;
  const SCALE = 0;
  const SCALE_GROUPS = 2;

  return getValuePosition(driver, LOW_RANGE, HIGH_RANGE, SCALE, SCALE_GROUPS);
}

// Finds the scaled position for the drivers
// @param driver | float - value from the api for a driver
// @return float - [0,100]
function getThreeHeight(driver) {
  const LOW_RANGE = 0;
  const HIGH_RANGE = 3;
  const SCALE = 0;
  const SCALE_GROUPS = 1;

  return getValuePosition(driver, LOW_RANGE, HIGH_RANGE, SCALE, SCALE_GROUPS);
}

// Finds the scaled position for the drivers
// @param driver | float - value from the api for a driver
// @return float - [0,100]
function getSixHeight(driver) {
  const LOW_RANGE = 0;
  const HIGH_RANGE = 6;
  const SCALE = 0;
  const SCALE_GROUPS = 1;

  return getValuePosition(driver, LOW_RANGE, HIGH_RANGE, SCALE, SCALE_GROUPS);
}

// Finds the scaled position for the drivers
// @param driver | float - value from the api for a driver
// @return float - [0,100]
function getTenHeight(driver) {
  const LOW_RANGE = 0;
  const HIGH_RANGE = 10;
  const SCALE = 0;
  const SCALE_GROUPS = 1;

  return getValuePosition(driver, LOW_RANGE, HIGH_RANGE, SCALE, SCALE_GROUPS);
}

// Returns a position formatted as a percentage
// @param position | float
// @return String
function formatPosition(position) {
  return `${position}%`;
}

// convert a number to to the word representation
// of the number.  We are using the word in the HTML class
// and will use this to highlight the value in the chart details
function numberToWord(number) {
  let numberWord = 'none';

  switch (number) {
    case 0:
      numberWord = 'none';
      break;
    case 1:
      numberWord = 'one';
      break;
    case 2:
      numberWord = 'two';
      break;
    case 3:
      numberWord = 'three';
      break;
    case 4:
      numberWord = 'four';
      break;
    case 5:
      numberWord = 'five';
      break;
    case 6:
      numberWord = 'six';
      break;
    case 7:
      numberWord = 'seven';
      break;
    case 8:
      numberWord = 'eight';
      break;
    case 9:
      numberWord = 'nine';
      break;
    case 10:
      numberWord = 'ten';
      break;
    case 11:
      numberWord = 'eleven';
      break;
    case 12:
      numberWord = 'twelve';
      break;
    case 13:
      numberWord = 'thirteen';
      break;
    case 14:
      numberWord = 'fourteen';
      break;
    case 15:
      numberWord = 'fifteen';
      break;
    case 16:
      numberWord = 'sixteen';
      break;
    case 17:
      numberWord = 'seventeen';
      break;
    case 18:
      numberWord = 'eightteen';
      break;
    case 19:
      numberWord = 'nineteen';
      break;
    case 20:
      numberWord = 'twenty';
      break;
    default:
  }
  return numberWord;
}

function selectChartCell(wrapper, type, value) {
  const roundedValue = parseInt(value, 10);

  const roundedValueWord = numberToWord(roundedValue);
  let tooltipValue = Math.round(value * 100) / 100;
  if (Number.isNaN(tooltipValue)) {
    tooltipValue = 'None';
  }

  if (tooltipValue === 0) {
    tooltipValue = 'None';
  }

  if (checkValidObject(roundedValue)) {
    const selector = `.zonal-long-table-cell-${type}-${roundedValueWord}`;
    const cell = wrapper.querySelector(selector);
    if (cell) {
      cell.classList.add('selected-cell');
      cell.setAttribute('title', `${tooltipValue}`);
      cell.setAttribute('aria-label', `${tooltipValue}`);
      cell.setAttribute('data-toggle', 'tooltip');
      cell.setAttribute('data-placement', 'top');
    }
  }
}

// Configures each driver bar
// @param graph | DOM element
// @param driver | Object
function drawDriver(graph, name, type, driver) {
  let height = getDriverHeight(driver.value);
  let cssKey = driver.key;
  let csstype = type;
  let cssExtra = '';
  const activeNav = store.getStateItem('activeNav');

  switch (activeNav) {
    case 'main-nav-map-searchhubs':
      cssExtra = '';
      break;
    case 'main-nav-map-examples':
      cssExtra = '';
      break;
    case 'main-nav-map-searchNShubs':
      cssExtra = 'ns-';
      break;
    default:
      cssExtra = '';
      break;
  }

  if (driver.key === 'hubs') {
    height = getTenHeight(driver.value);
    cssKey = 'hub';
  }

  if (driver.key === 'aquatic') {
    height = getSixHeight(driver.value);
    cssKey = 'fish';
  }

  if (driver.key === 'terrestrial') {
    height = getSixHeight(driver.value);
    cssKey = 'wildlife';
  }

  if (driver.key === 'exposure') {
    height = getTenHeight(driver.value);
    cssKey = 'exposure-box';
  }

  if (driver.key === 'threat') {
    height = getTenHeight(driver.value);
    cssKey = 'threat';
  }

  if (driver.key === 'asset') {
    height = getTenHeight(driver.value);
    cssKey = 'asset';
  }

  if (driver.key === 'population-density') {
    height = getSixHeight(driver.value);
    csstype = 'popdensity';
  }

  if (driver.key === 'social-vulnerability') {
    height = getThreeHeight(driver.value);
    csstype = 'socvuln';
  }

  if (driver.key === 'critical-facilities') {
    height = getSixHeight(driver.value);
    csstype = 'critfac';
  }

  if (driver.key === 'critical-infrastructure') {
    height = getTwoHeight(driver.value);
    csstype = 'critinfra';
  }

  if (driver.key === 'drainage') {
    height = getSixHeight(driver.value);
    csstype = 'drainage';
  }

  if (driver.key === 'erosion') {
    height = getSixHeight(driver.value);
    csstype = 'erosion';
  }

  if (driver.key === 'floodprone-areas') {
    height = getSixHeight(driver.value);
    csstype = 'floodprone';
  }

  if (driver.key === 'sea-level-rise') {
    height = getSixHeight(driver.value);
    csstype = 'slr';
  }

  if (driver.key === 'storm-surge') {
    height = getSixHeight(driver.value);
    csstype = 'stormsurge';
  }

  if (driver.key === 'geostress') {
    height = getThreeHeight(driver.value);
    csstype = 'geostress';
  }

  if (driver.key === 'slope') {
    height = getSixHeight(driver.value);
    csstype = 'slope';
  }

  const roundedValue = parseInt(driver.value, 10);
  const roundedValueWord = numberToWord(roundedValue);
  // const bar = graph.querySelector(`.zonal-long-graph-bar-${cssExtra}${driver.key}`);
  const bar = graph.querySelector(`.zonal-long-graph-bar-${driver.key}`);
  const tooltipValue = Math.round(driver.value * 100) / 100;
  const toolTipword = numberToWord(roundedValue);

  if (bar) {
    bar.setAttribute('id', `zonal-long-graph-bar-${cssExtra}${name}`);
    bar.style.height = formatPosition(height);
    if (name) {
      bar.classList.add(`zonal-long-table-cell-${cssKey}-${toolTipword}`);
    // } else {
      // bar.style.backgroundColor = getDriverColor(height);
    }

    bar.classList.add(`driver-chart-backgroundColor-${csstype}-${roundedValueWord}`);
    bar.setAttribute('title', `${tooltipValue}`);
    bar.setAttribute('aria-label', `${tooltipValue}`);
    bar.setAttribute('data-toggle', 'tooltip');
    bar.setAttribute('data-placement', 'top');
  }
}


function drawMapInfoChart(drivers, name, graph) {
  const activeNav = store.getStateItem('activeNav');
  const mapInfoElemCalss = '.default-mapinfo';
  const mapInfoGraph = graph.querySelector(`#mapinfodata ${mapInfoElemCalss} .zonal-long-graph`);
  drivers.forEach(drawDriver.bind(null, mapInfoGraph, name, ''));
}

// @return Array
function getShortDataChartData(data) {
  return [
    {
      label: 'hubs',
      key: 'hubs',
      value: data.hubs
    },
    {
      label: 'exposure',
      key: 'exposure',
      value: data.exposure
    },
    {
      label: 'asset',
      key: 'asset',
      value: data.asset
    },
    {
      label: 'threat',
      key: 'threat',
      value: data.threat
    },
    {
      label: 'aquatic',
      key: 'aquatic',
      value: data.aquatic
    },
    {
      label: 'terrestrial',
      key: 'terrestrial',
      value: data.terrestrial
    },
    {
      label: 'ns-hubs',
      key: 'ns-hubs',
      value: data.ns_hubs
    },
    {
      label: 'ns-fishandwildlife',
      key: 'ns-fishandwildlife',
      value: data.ns_fishandwildlife
    },
    {
      label: 'ns-asset',
      key: 'ns-asset',
      value: data.ns_asset
    },
    {
      label: 'ns-threat',
      key: 'ns-threat',
      value: data.ns_threat
    },
    {
      label: 'ns-exposure',
      key: 'ns-exposure',
      value: data.ns_exposure
    }
  ];
}

// Configures each asset driver bar
// @param wrapper | DOM element
// @param drivers | Array
function drawAssetDrivers(wrapper, drivers) {
  const assetGraph = wrapper.querySelector('.zonal-long-graph-wrapper-asset .zonal-long-graph');
  drivers.forEach(drawDriver.bind(null, assetGraph, '', 'asset'));
}

// draw the mapinfo chart. This is the indentify click function
function drawMapInfoStats(data, doc) {
  drawMapInfoChart(getShortDataChartData(data), 'mapInfo', doc);
}


function drawRawValues(wrapper, data) {
  data.forEach(populateRawTableRow.bind(null, wrapper));
}

function drawName(wrapper, name) {
  wrapper.querySelector('#zonal-long-name').textContent = name;
}


export {
  drawMapInfoStats,
};

// Polyfill for Element.closest for IE9+ and Safari
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = (s) => {
    let el = this;

    if (!document.documentElement.contains(el)) {
      return null;
    }

    do {
      if (el.matches(s)) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}
