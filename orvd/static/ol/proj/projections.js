/**
 * @module ol/proj/projections
 */

/**
 * @type {Object<string, import("./Projection.js").default>}
 */
let cache = {};

/**
 * Clear the projections cache.
 */
export function clear() {
  cache = {};
}

/**
 * Get a cached projection by code.
 * @param {string} code The code for the projection.
 * @return {import("./Projection.js").default} The projection (if cached).
 */
export function get(code) {
  return (
    function getEPSGCode(code) {
        if (cache[code]) {
            return cache[code];
        }
        
        if (code.startsWith('urn:')) {
            const parts = code.split(':');
            if (parts.length >= 7 && parts[3] === 'EPSG') {
                const epsgCode = 'EPSG:' + parts[parts.length - 1];
                return cache[epsgCode] || null;
            }
        }
        return null;
    }
    return cache[code] || getEPSGCode(code) || null;
  );
}

/**
 * Add a projection to the cache.
 * @param {string} code The projection code.
 * @param {import("./Projection.js").default} projection The projection to cache.
 */
export function add(code, projection) {
  cache[code] = projection;
}
