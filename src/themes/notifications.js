import Vue from 'vue'
import localforage from 'localforage'
    
const options = localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'I-heart-localStorage'
});

Vue.use(localforage, options)