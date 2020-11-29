import parseKML from 'parse-kml';
import insidePolygon from 'point-in-polygon';
import geocoder from 'node-geocoder';

const fetchOutlet = async (req, res) => {
    const body = req.body;
    let found = 'not found';
    if (!body) {
        return res.status(400).json({
            error: 'customer location missing',
        })
    }
    const address = body.address;
    let geoCoder = geocoder({ provider: 'openstreetmap' });
    const coordinates = await geoCoder.geocode(address)

    const kmlFile = await parseKML.toJson('./FullStackTest_DeliveryAreas.kml');
    coordinates.length && kmlFile.features.map(obj => {
        if (obj.geometry.type == 'Polygon') {
            const isInside = insidePolygon([coordinates[0].longitude, coordinates[0].latitude], obj.geometry.coordinates[0]);
            if (isInside) {
                found = obj.properties.name;
            }
        }
    });
    return res.status(200).json({
            name: found
    });
    
};
export default fetchOutlet;