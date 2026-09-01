const fs = require("fs/promises");
const path = require("path");
const AdmZip = require("adm-zip");
const { parseStringPromise } = require("xml2js");
const { v4: uuidv4 } = require("uuid");

async function processScormPackage(file) {

    const packageId = uuidv4();

    const packageDirectory = path.join( __dirname, "../storage/scorm", packageId );

    await fs.mkdir( packageDirectory, { recursive: true } );

    const zip = new AdmZip(file.path);

    zip.extractAllTo( packageDirectory, true );

    const manifestPath = await findManifest( packageDirectory );

    if (!manifestPath) {
        throw new Error(
            "imsmanifest.xml not found in SCORM package"
        );
    }

    const manifestContent = await fs.readFile( manifestPath, "utf-8" );

    const manifest = await parseStringPromise( manifestContent );

    const scormVersion = detectScormVersion( manifestContent );

    const courseInfo = extractCourseInfo( manifest );

    const launchFile = findLaunchFile( manifest );

    return {
        packageId,
        scormVersion,
        courseInfo,
        launchFile,
        packageDirectory
    };
}

//ims manifiest function
async function findManifest(directory) {

    const entries = await fs.readdir( directory, { withFileTypes: true } );

    for (const entry of entries) {

        const fullPath = path.join( directory, entry.name );

        if ( entry.isFile() && entry.name.toLowerCase() === "imsmanifest.xml" ) {
            return fullPath;
        }

        if (entry.isDirectory()) {

            const result = await findManifest( fullPath );

            if (result) {
                return result;
            }
        }
    }

    return null;
}

//detect the scorm version 
function detectScormVersion( manifestContent ) {
if ( manifestContent.includes( "adlcp:scormType" ) ) {

        return "SCORM 2004";
    }

    if ( manifestContent.includes( "adlcp:scormtype" ) ) {

        return "SCORM 1.2";
    }

    return "UNKNOWN";
}

//extract the information of course or unzip the zip course file
function extractCourseInfo( manifest ) {

    const metadata = manifest.manifest?.metadata?.[0];

    const organizations = manifest.manifest?.organizations?.[0];

    const organization = organizations?.organization?.[0];

    const title = organization?.title?.[0] || "Untitled SCORM Course";

    return { title, identifier: organization?.$?.identifier || null };
}

//launch the course 
function findLaunchFile( manifest ) {

    const resources = manifest.manifest?.resources?.[0];

    const resourceList = resources?.resource || [];

    for (const resource of resourceList) {

        const attributes = resource.$ || {};

        const href = attributes.href;

        if (!href) { continue; }

        return href;
    }

    return null;
}

module.exports = {
    processScormPackage,
    extractCourseInfo,
    findLaunchFile,
    detectScormVersion,
    findManifest

};