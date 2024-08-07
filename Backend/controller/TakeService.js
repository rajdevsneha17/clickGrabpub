const GiveService = require("../model/GiveService");
const moment = require('moment');

exports.takeService = async (req, res) => {
    try {
        // Get today's date in YYYY-MM-DD format
        const todayDate = moment().startOf('day').toDate();

        // Find documents where currentDate is today or later
        const data = await GiveService.find({
            currentDate: { $gte: todayDate }
        });

        res.status(200).json(data); // Send a 200 status code for a successful request
    } catch (error) {
        console.error("Error in giving data", error);
        res.status(500).json({ message: "Internal Server Error" }); // Send a 500 status code for an error
    }
};
