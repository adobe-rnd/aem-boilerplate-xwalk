// Import external script from MoEngage CDN

import { fetchPlaceholders } from "./aem.js";

const placeholders = await fetchPlaceholders();

importScripts(`${placeholders.moengageServiceWorkerURL}`);

// importScripts("https://cdn.moengage.com/release/dc_0.3/serviceworker_cdn.min.latest.js");