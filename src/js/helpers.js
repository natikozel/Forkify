import {TIMEOUT_SEC} from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const AJAX = async function (url, uploadData = undefined) {
    const fetchPro = uploadData
      ? await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      })
      : await fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data.data;
};
/*
export const getJSON = async url => {

    let res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    if (!res.ok)
      throw new Error(res.data.message);
    res = await res.json();
    return res.data
};

export const sendJSON = async (url, uploadData) => {

    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    })
    let res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    if (!res.ok)
      throw new Error(res.data.message);
    res = await res.json();
    return res.data;
};
*/
const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};