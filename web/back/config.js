'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig :{
        apiKey: "AIzaSyBraINM_HqgjNg1gviG4unJUmc6wGXHy7U",
        authDomain: "databaseapp-c4f4f.firebaseapp.com",
        databaseURL: "https://databaseapp-c4f4f-default-rtdb.firebaseio.com",
        projectId: "databaseapp-c4f4f",
        storageBucket: "databaseapp-c4f4f.appspot.com",
        messagingSenderId: "460561601188",
        appId: "1:460561601188:web:b2df42eec573385c790c31",
        measurementId: "G-1NFDGCGBB2"
      }
};

