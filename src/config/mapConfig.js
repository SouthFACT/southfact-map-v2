export var mapConfig = {

  //ESRI Vector BaseMap
  ESRIVectorBasemap: {
    name: "DarkGray"
  },

  //tile layers (WMS)
  TMSLayers:[
    {
      id: "southeast_swir_threshold",
      layer: "southeast_swir_threshold TMS",
      label: "SWIR Differencing (Threshold)",
      apikey: 'southeast_swir_threshold',
      hubsapikey: 'southeast_swir_threshold',
      chartLabel: 'swir',
      chartLegendValues: 4,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#ff8000',
        2: '#ff0000',
        3: '#a30000',
        4: '#590000',
      },
      chartDriver: false,
      chartSummary: true,
      chartOrder: 1,
      chartInputName: 'summary',
      chartInpuLabel: 'Summary',
      chartCSSSelector: 'southeast_swir_threshold',
      chartMaxValue: 5,
      chartMinValue: 0,
      chartScale: 0,
      chartScaleGroups: 1,
      chartNoDataOverRide: 1,
      url: "https://tiles.southfact.com/latest_change_SWIR_threshold/{z}/{x}/{y}.png",
      attribution: "SouthFACT 2020",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: true,
      legend: "swir",
      description: "Indicator of drastic vegetation change, showing change greater than 60 percent. The Shortwave Infrared (SWIR) Band Differencing (Band 7 provided by Landsat satellites) method represents the most simplistic of the three current methods used on the LandsatFACT project. This method is intended to focus on vegetation moisture while minimizing interference of atmosphere and light cloud cover. State forestry agency personnel have found this method to be a simple and quick approach to identify more drastic vegetation changes on the landscape, particularly forest harvesting.",
      source: 'regional',
      region: 'southeast'
    },
    {
      id: "southeast_swir_current",
      layer: "southeast_swir_current TMS",
      label: "SWIR Differencing (All Change)",
      apikey: 'southeast_swir_current',
      hubsapikey: 'southeast_swir_current',
      chartLabel: 'swir',
      chartLegendValues: 14,
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#00003c',
          2: '#000059',
          3: '#000080',
          4: '#0000e8',
          5: '#0080ff',
          6: '#00c080',
          7: '#01ff00',
          8: '#c0ff00',
          9: '#ffff00',
          10: '#ffc100',
          11: '#ff8000',
          12: '#ff0000',
          13: '#a30000',
          14: '#590000',
        },
      chartDriver: false,
      chartSummary: true,
      chartOrder: 2,
      chartInputName: 'summary',
      chartInpuLabel: 'Summary',
      chartCSSSelector: 'southeast_swir_current',
      chartMaxValue: 15,
      chartMinValue: 0,
      chartScale: 0,
      chartScaleGroups: 1,
      chartNoDataOverRide: 1,
      url: "https://tiles.southfact.com/latest_change_SWIR/{z}/{x}/{y}.png",
      attribution: "SouthFACT 2020",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 1.0,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: true,
      legend: "swir",
      description: "Indicator of drastic vegetation change, showing all change. The Shortwave Infrared (SWIR) Band Differencing (Band 7 provided by Landsat satellites) method represents the most simplistic of the three current methods used on the LandsatFACT project. This method is intended to focus on vegetation moisture while minimizing interference of atmosphere and light cloud cover. State forestry agency personnel have found this method to be a simple and quick approach to identify more drastic vegetation changes on the landscape, particularly forest harvesting.",
      source: 'regional',
      region: 'southeast'
    },
    {
      id: "southeast_ndvi_current",
      layer: "southeast_ndvi_current TMS",
      label: "NDVI",
      apikey: 'southeast_ndvi_current',
      hubsapikey: 'southeast_ndvi_current',
      chartLabel: 'NDVI',
      chartLegendValues: 14,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#006100',
        2: '#2d7500',
        3: '#4d8c00',
        4: '#70a300',
        5: '#97bd00',
        6: '#bdd600',
        7: '#e8f000',
        8: '#fff200',
        9: '#ffd000',
        10: '#ffb300',
        11: '#ff9100',
        12: '#ff7300',
        13: '#ff5100',
        14: '#ff2200',
      },
      chartDriver: false,
      chartSummary: true,
      chartOrder: 3,
      chartInputName: 'summary',
      chartInpuLabel: 'Summary',
      chartCSSSelector: 'southeast_ndvi_current',
      chartMaxValue: 15,
      chartMinValue: 0,
      chartScale: 0,
      chartScaleGroups: 1,
      chartNoDataOverRide: 1,
      url: "https://tiles.southfact.com/latest_change_NDVI/{z}/{x}/{y}.png",
      attribution: "SouthFACT 2020",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: true,
      legend: "NDVI",
      description: 'The Normalized Differential Vegetation Index (NDVI) method is a commonly used vegetation index, generically referred to as a measure of vegetation "greenness." In general, this method relies on the characteristics of healthy vegetation to absorb red light (for energy / photosynthesis) and reflect near-infrared light. As a result, evaluating the change in NDVI from one image to another roughly equates to evaluating the change in vegetation health / productivity.',
      source: 'regional',
      region: 'southeast'
    },
    {
      id: "southeast_ndmi_current",
      layer: "southeast_ndmi_current TMS",
      label: "NDMI",
      apikey: 'southeast_ndmi_current',
      hubsapikey: 'southeast_ndmi_current',
      chartLabel: 'NDMI',
      chartLegendValues: 14,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#4575b5',
        2: '#6388b8',
        3: '#7f9aba',
        4: '#9bafbd',
        5: '#b7c4bd',
        6: '#d3dbbf',
        7: '#f0f2bf',
        8: '#fff0b3',
        9: '#fcce95',
        10: '#faaf7d',
        11: '#f28e63',
        12: '#eb6f4d',
        13: '#e05138',
        14: '#d62f27',
      },
      chartDriver: false,
      chartSummary: true,
      chartOrder: 4,
      chartInputName: 'summary',
      chartInpuLabel: 'Summary',
      chartCSSSelector: 'southeast_ndmi_current',
      chartMaxValue: 15,
      chartMinValue: 0,
      chartScale: 0,
      chartScaleGroups: 1,
      chartNoDataOverRide: 1,
      url: "https://tiles.southfact.com/latest_change_NDMI/{z}/{x}/{y}.png",
      attribution: "SouthFACT 2020",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: true,
      legend: "ndmi",
      description: 'The Normalized Differential Moisture Index (NDMI) method is another relatively common Vegetation Index and is generically referred to as a measure of vegetation moisture. NDMI is more frequently being used in drought monitoring but is also capable of detecting more subtle changes in vegetation moisture conditions. Researchers have also evaluated the use of NDMI to determine fuel moistures for wildfire hazard assessments.',
      source: 'regional',
      region: 'continental_us'
    },

    {
      id: "southeast_swir_threshold_1yr",
      layer: "southeast_swir_threshold_1yr TMS",
      label: "SWIR Differencing 2019 - 2018",
      apikey: 'southeast_swir_threshold_1yr',
      hubsapikey: 'southeast_swir_threshold_1yr',
      chartLabel: 'SWIR Differencing 2019 - 2018',
      chartLegendValues: 4,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#ff8000',
        2: '#ff0000',
        3: '#a30000',
        4: '#590000',
      },
      chartDriver: false,
      chartSummary: true,
      chartOrder: 1,
      chartInputName: 'summary',
      chartInpuLabel: 'Summary',
      chartCSSSelector: 'southeast_swir_threshold',
      chartMaxValue: 5,
      chartMinValue: 0,
      chartScale: 0,
      chartScaleGroups: 1,
      chartNoDataOverRide: 1,
      url: "https://tiles.southfact.com/SWIR_2019_2018/{z}/{x}/{y}.png",
      attribution: "SouthFACT 2020",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: true,
      legend: "hub",
      description: "Indicator of drastic vegetation change, showing change greater than 60 percent between year years 2019 and 2018. The Shortwave Infrared (SWIR) Band Differencing (Band 7 provided by Landsat satellites) method represents the most simplistic of the three current methods used on the LandsatFACT project. This method is intended to focus on vegetation moisture while minimizing interference of atmosphere and light cloud cover. State forestry agency personnel have found this method to be a simple and quick approach to identify more drastic vegetation changes on the landscape, particularly forest harvesting.",
      source: 'regional',
      region: 'southeast'
    },
    {
      id: "southeast_swir_threshold_2yr",
      layer: "southeast_swir_threshold_2yr TMS",
      label: "SWIR Differencing 2018 - 2017",
      apikey: 'southeast_swir_threshold_2yr',
      hubsapikey: 'southeast_swir_threshold_2yr',
      chartLabel: 'SWIR Differencing 2018 - 2017',
      chartLegendValues: 4,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#ff8000',
        2: '#ff0000',
        3: '#a30000',
        4: '#590000',
      },
      chartDriver: false,
      chartSummary: true,
      chartOrder: 1,
      chartInputName: 'summary',
      chartInpuLabel: 'Summary',
      chartCSSSelector: 'southeast_swir_threshold',
      chartMaxValue: 5,
      chartMinValue: 0,
      chartScale: 0,
      chartScaleGroups: 1,
      chartNoDataOverRide: 1,
      url: "https://tiles.southfact.com/SWIR_2018_2017/{z}/{x}/{y}.png",
      attribution: "SouthFACT 2020",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: true,
      legend: "hub",
      description: "Indicator of drastic vegetation change, showing change greater than 60 percent between year years 2018 and 2017. The Shortwave Infrared (SWIR) Band Differencing (Band 7 provided by Landsat satellites) method represents the most simplistic of the three current methods used on the LandsatFACT project. This method is intended to focus on vegetation moisture while minimizing interference of atmosphere and light cloud cover. State forestry agency personnel have found this method to be a simple and quick approach to identify more drastic vegetation changes on the landscape, particularly forest harvesting.",
      source: 'regional',
      region: 'southeast'
    },
    {
      id: "southeast_swir_threshold_3yr",
      layer: "southeast_swir_threshold_3yr TMS",
      label: "SWIR Differencing 2017 - 2016",
      apikey: 'southeast_swir_threshold_3yr',
      hubsapikey: 'southeast_swir_threshold_3yr',
      chartLabel: 'SWIR Differencing 2017 - 2016',
      chartLegendValues: 4,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#ff8000',
        2: '#ff0000',
        3: '#a30000',
        4: '#590000',
      },
      chartDriver: false,
      chartSummary: true,
      chartOrder: 1,
      chartInputName: 'summary',
      chartInpuLabel: 'Summary',
      chartCSSSelector: 'southeast_swir_threshold',
      chartMaxValue: 5,
      chartMinValue: 0,
      chartScale: 0,
      chartScaleGroups: 1,
      chartNoDataOverRide: 1,
      url: "https://tiles.southfact.com/SWIR_2017_2016/{z}/{x}/{y}.png",
      attribution: "SouthFACT 2020",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 14,
      tms: true,
      legend: "hub",
      description: "Indicator of drastic vegetation change, showing change greater than 60 percent between year years 2017 and 2016. The Shortwave Infrared (SWIR) Band Differencing (Band 7 provided by Landsat satellites) method represents the most simplistic of the three current methods used on the LandsatFACT project. This method is intended to focus on vegetation moisture while minimizing interference of atmosphere and light cloud cover. State forestry agency personnel have found this method to be a simple and quick approach to identify more drastic vegetation changes on the landscape, particularly forest harvesting.",
      source: 'regional',
      region: 'southeast'
    },
  ],

  //tile layers (WMS)
  WMSLayers:[
 ],

 zoomRegions: [
   {
     region: 'southeast',
     label: 'Southeast U.S',
     center: [ 40.979898, -81.474609 ], // update
     extent: [ -132.97, 25.16, -62.49, 50.00], // update
     zoom: 4
   },
 ],

 mapDefaults: {
    center: [ 36.914764288955936, -82.33154296875001],
    zoom: 5,
 },

  //leaflet optoins expand as needed
  mapOptions: {
    // center: [ 32.7765, -79.9311 ],
    zoom: 4,
    maxZoom: 16,
    minZoom: 4,
    crs: L.CRS.EPSG3857
  }

};

export default mapConfig;
