import express from 'express';
import { 
    getAllLocation,
    getLocation, 
    postLocation, 
    updateLocation, 
    deleteLocation
} from '../controllers/Location.controller';

let router = express.Router();

    // Retrieve all Location
    router.get('/location', getAllLocation);

    // Retrieve a single Location with LocationId
    router.get('/location/:locationId', getLocation);

    // Create a new Location
    router.post('/location', postLocation);

    // Update a Location with LocationId
    router.put('/location/:locationId', updateLocation);

    // Delete a Location with LocationId
    router.delete('/location/:locationId', deleteLocation);
    
export default router;