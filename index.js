const turf = require('@turf/turf');

// TODO: Clean up the file structure

/**
 * Generates interpolated intermediate coordinates between two given coordinates based on speed.
 * @param {Array} startCoord - The starting coordinate [longitude, latitude].
 * @param {Array} endCoord - The ending coordinate [longitude, latitude].
 * @param {number} speedKmph - The speed in kilometers per hour.
 * @returns {Array} - An array of coordinates including the start and end.
 */

// TODO: Modify this function to account for the varying speeds of the moving trains
function interpolateCoordinates(startCoord, endCoord, speedKmph) {

    const distancePerMinute = speedKmph / 60;

    const line = turf.lineString([startCoord, endCoord]);

    const totalDistance = turf.length(line, { units: 'kilometers' });

    const intermediatePointCount = Math.floor(totalDistance / distancePerMinute);

    // Generate intermediate points
    const intermediatePoints = [];
    for (let i = 1; i <= intermediatePointCount; i++) {
        const interpolatedPoint = turf.along(line, distancePerMinute * i, { units: 'kilometers' });
        intermediatePoints.push(interpolatedPoint.geometry.coordinates);
    }

    return [startCoord, ...intermediatePoints, endCoord];
}

// example use (startCoord - endCoord has a distance of approx 2km here)
const startCoord = [6.122575348236659, 81.0229983036393];
const endCoord = [6.1213308434665805, 81.00606884607016];
const speedKmph = 20;

const routeCoordinates = interpolateCoordinates(startCoord, endCoord, speedKmph);

console.log(routeCoordinates);