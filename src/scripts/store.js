import { StorageAPI } from './localStorageAPI';

/**
 * This component is intended to handle the storage and retrieval of the state of
 * the NFWF application. As of this writing it is using localStorage to do this.
 * Uses simple class instance methods with the short-hand method declaration
 * pattern.
 *
 * To note: There is a difference between the Store and the State. As of 0a3106e
 * the Store is a String saved to the browsers localStorage and is a serialized
 * version of the State. The State is an Object which is interacted with by
 * parsing the State string from the Store, modifying the results of the parse,
 * and re-serializing it back to the Store.
 */
export class Store {
  // ..and an (optional) custom class constructor. If one is
  // not supplied, a default constructor is used instead:
  // constructor() { }
  constructor() {
    // this.state = state;
    this.store = new StorageAPI();

    // this.state = {};
    // if(this.isStateExists){
    //   this.state = this.getState();
    // } else {
    //   const state = {};
    //   this.state = {state};
    // }
  }

  // // GETTERS

  // As of 0a3106e this is probably intended to be used as a getter for the
  // Store. However it is pulling an unused and undeclared variable _state so it
  // probably just returns undefined.
  get Store() {
    return this._state;
  }

  // Gets an individual top level item from the state
  //
  // @param item - string
  // @return string || object
  getStateItem(item) {
    return this.checkItem(item) ? this.getState()[item] : {};
  }

  // Gets the entire state object
  //
  // @return object
  getState() {
    return this.store.getState();
  }

  // // SETTERS

  // Setter for the state to the Store, preserving any non-overwritten
  // properties in the Store.
  //
  // @param state - object
  saveState(state) {
    const currentState = this.getState();
    const newState = { ...currentState, ...state };
    this.store.setState(newState);
  }

  // Setter for the state to the Store, overriding any non-overwritten
  // properties in the Store.
  //
  // @param state - object
  saveNewState(state) {
    this.store.setState(state);
  }

  // Setter which overrides the entire Store with a new State object.
  //
  // @param StateObject - object
  setStateFromObject(StateObject) {
    this.saveNewState(StateObject);
  }

  // Setter for a key value pair to the State, which means that it writes it to
  // the Store.
  //
  // @param key - string
  // @param value - string
  addStateItem(key, value) {
    const state = this.getState();
    state[key] = value;
    this.saveNewState(state);
  }

  // Setter for a key value pair to the Store.
  //
  // @param key - string
  // @param value - string
  setStoreItem(key, value) {
    const storeObj = { [key]: value };
    const newStateObj = { ...this.getState(), ...storeObj };
    this.saveNewState(newStateObj);
  }

  // // REMOVERS

  // Removes the entire state from the browser.
  clearState() {
    this.store.removeState();
  }

  // Removes a key value pair from the State and the Store.
  //
  // @param key - string
  removeStateItem(key) {
    const currentState = this.getState();
    delete currentState[key];
    this.saveNewState(currentState);
  }

  // // UTILITIES

  // Check if localStorage available.
  // Taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  //
  // @return boolean
  static storageAvailable() {
    return StorageAPI.storageAvailable();
  }

  // Check if the state has been saved to the browser store
  //
  // @return boolean
  isStateExists() {
    return this.store.checkStateExists();
  }

  // Check if an item has been saved to the store
  // unused as of 0a3106e
  //
  // @param item - string
  // @return boolean
  isStateItemExist(item) {
    if (this.isStateExists()) {
      const stateStr = this.store.getStateAsString();
      if (stateStr.indexOf(item) > 0) {
        return true;
      }
    }
    return false;
  }

  // Also checks if an item has been saved to the store
  // TODO: Rewrite the indexOf check to parse the deeply nested keys of an object since the current
  // code will give an error in some edge cases. EX:
  //
  // this.store.setStateAsString('{foo:"bar",bars:"baz"}');
  // checkItem('bar'); // returns TRUE ();
  //
  // @param item - string
  // @return boolean
  checkItem(item) {
    return this.isStateExists() && this.store.getStateAsString().indexOf(item) > 0;
  }

  //  const ele.addEventListener('click', (e) => {
  //    this.setStateFromObject();
  //  })

  // We will look at static and subclassed methods shortly

  // save map action.
  // ensures the state map action is consistent
  saveAction(type) {
    this.setStoreItem('lastaction', type);
  }
}
