import GeoLocation from '../models/Location.model';
import mongoose from 'mongoose';
import apiqueryparameters from 'api-query-params';

mongoose.set('useFindAndModify', false);

// Retrieve and return all notes from the database.
export const getAllLocation = (req, res) => {

    let query = apiqueryparameters(req.query);

    if (req.query.sortBy === "createdAt") {
        query.sortBy = { createdAt: -1 }
    }
    console.log(req.query.sort)
    console.log(query.sort)
    console.log(query)
    let { filter, page, limit, sortBy, projection, population } = query;
    GeoLocation.find(filter)
        .skip(page)
        .limit(limit)
        .sort(sortBy)
        .select(projection)
        .exec((err, geoLocation) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while retrieving notes."
                });
            }
            if (geoLocation.length === 0) {
                return res.status(404).send({
                    message: "Note not found"
                });
            }
            return res.status(200).send(geoLocation);
        });
};

// Create and Save a new Location
export const postLocation = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Location name can not be empty"
        });
    }
    if (!req.body.year) {
        return res.status(400).send({
            message: "Location year can not be empty"
        });
    }

    // Create a Location
    let geoLocation = new GeoLocation({
        name: req.body.name,
        year: req.body.year,
        activate: req.body.activate,
        location: {
            lat: req.body.location.lat,
            long: req.body.location.long
        }
    });

    // Save Location in the database
    geoLocation.save()
        .then(geoLocation => {
            return res.status(200).send({
                message: "location added successfully",
                geoLocation
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the Location."
            });
        });
};

// Find a single Location with a LocationId
export const getLocation = (req, res) => {
    GeoLocation.findById(req.params.locationId)
        .then(geoLocation => {
            if (!geoLocation) {
                return res.status(404).send({
                    message: "Location not found with id " + req.params.locationId
                });
            }
            return res.status(200).send(geoLocation);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Location not found with id " + req.params.locationId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Location with id " + req.params.locationId
            });
        });
};

// Update a Location identified by the LocationId in the request
export const updateLocation = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Location name can not be empty"
        });
    }
    if (!req.body.year) {
        return res.status(400).send({
            message: "Location year can not be empty"
        });
    }

    // Find Location and update it with the request body
    GeoLocation.findByIdAndUpdate(req.params.locationId, {
        name: req.body.name,
        year: req.body.year,
        activate: req.body.activate,
        location: {
            lat: req.body.location.lat,
            long: req.body.location.long
        }
    }, { new: true })
        .then(geoLocation => {
            if (!geoLocation) {
                return res.status(404).send({
                    message: "Location not found with id " + req.params.locationId
                });
            }
            return res.status(201).send(geoLocation);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Location not found with id " + req.params.locationId
                });
            }
            return res.status(500).send({
                message: "Error updating Location with id " + req.params.locationId
            });
        });
};

// Delete a Location with the specified LocationId in the request
export const deleteLocation = (req, res) => {
    GeoLocation.findByIdAndRemove(req.params.locationId)
        .then(geoLocation => {
            if (!geoLocation) {
                return res.status(404).send({
                    message: "Location not found with id " + req.params.locationId
                });
            }
            return res.status(200).send({ message: "Location deleted successfully" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Location not found with id " + req.params.locationId
                });
            }
            return res.status(500).send({
                message: "Could not delete Location with id " + req.params.locationId
            });
        });
};