const mocha = require('mocha');
const chai = require('chai');

import 'babel-polyfill';

const expect = chai.expect;

import { HubIntersectionApi } from '../src/scripts/HubIntersectionAPI';
const Api = new HubIntersectionApi();

const featureForEmptyIntersection = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          -112.20199584960938,
          45.45916739594383
        ],
        [
          -112.19375610351562,
          45.273920035433605
        ],
        [
          -111.68563842773436,
          45.3627600954673
        ],
        [
          -111.89437866210938,
          45.592900208269825
        ],
        [
          -112.20199584960938,
          45.45916739594383
        ]
      ]
    ]
  }
}

const featureToIntersect = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          -72.17863082885741,
          41.35555127193843
        ],
        [
          -72.16987609863281,
          41.321009473884324
        ],
        [
          -72.11013793945312,
          41.32887320983297
        ],
        [
          -72.12661743164062,
          41.36856413680967
        ],
        [
          -72.17863082885741,
          41.35555127193843
        ]
      ]
    ]
  }
}


describe('Hub Intersection API Functions', function () {
  it('Return an empty Array for a polygon that does not intersect any hubs.', async function () {
    const result = await Api.getIntersectedHubs(featureForEmptyIntersection);
    expect(result).to.have.lengthOf(0);
  });

  it('Returns an array of geojson features', async function () {
    const result = await Api.getIntersectedHubs(featureToIntersect);
    result.forEach((f) => {
      expect(f).to.have.property('type');
      expect(f.type).to.equal('Feature');
      expect(f).to.have.property('properties');
      expect(f).to.have.property('geometry');
      expect(f.geometry).to.have.property('coordinates');
    });
  });

  it('Returns an error object for broken features', async function () {
    const result = await Api.getIntersectedHubs({});
    expect(result).to.have.be.an('error');
  });
});
