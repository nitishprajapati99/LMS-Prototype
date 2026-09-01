const { processScormPackage } = require("../services/scorm.service");
async function uploadScorm(req, res) {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "SCORM ZIP file is required"
            });
        }

        const result = await processScormPackage( req.file );

        return res.status(201).json({
            success: true,
            message: "SCORM package processed successfully",
            data: result
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    uploadScorm
};