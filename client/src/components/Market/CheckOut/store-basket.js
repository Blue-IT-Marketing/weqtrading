/***
 * this file works together with localStorage to store shopping
 * items to localStorage
 * 
 * the utilities to store items are used by the product and services module
 * services and products will be differentiated by stateKey
 */


import * as store from '../../../localstorage';


export const storeProducts = async (seed,stateKey,products) => {
    let states = [...products];
    let results = [];
    let index = 0;
    await states.forEach(state => {
        store.myStore.setState(seed, stateKey+index, state).then(result => {
                results.push(result);
                index++;
        });
    });

    return results;
};


export const retrieveProducts = async (seed,stateKey) => {
    
    let results = [];
    let index = 0;
    let result = 1;

    while (result !== undefined){

        store.myStore.getState(seed, stateKey+index).then(state => {
            state !== undefined ? results.push(state) : result = state;
            index = index + 1;
        });
        
        if (index === 100){
            result = undefined;
        }
    }
    
    return results;    
};


export const storeServices = (seed, stateKey, services) => {
    let states = [...services];
    let results = [];
    let index = 0;
    states.forEach(state => {
        store.myStore.setState(seed, stateKey + index, state).then(result => {
            results.push(result);
            index++;
        });
    });

    return results;
};


export const retrieveServices = async (seed,stateKey) => {
    let results = [];
    let index = 0;
    let result = 1;
    while (result !== undefined){
        store.myStore.getState(seed, stateKey+index).then(state => {
            state !== undefined ? results.push(state) : result = state;
            index = index + 1;
        })
    }
    
    return results;    
};

