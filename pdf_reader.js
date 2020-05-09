let fs = require('fs'),
    PDFParser = require("pdf2json");
const https = require('https');
let constant = require('./constant');
let pdfParser = new PDFParser(this, 1);
const lineReader = require('line-reader');

const file = fs.createWriteStream("file.pdf");
const request = https.get(constant.pdf_URL, function (response) {
    response.pipe(file);
    response.on('end', () => {
        try {
            pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
            pdfParser.on("pdfParser_dataReady", pdfData => {
                fs.writeFileSync("pdf.txt", pdfParser.getRawTextContent());
            });
            pdfParser.loadPDF("file.pdf");
        } catch (e) {
            console.error(e);
        }
    });
});

var reachedSection = false;
var headers = ["district_code", "district", "confirmed", "recoverd_count", "active_count", "death_count"];
var json = {}

lineReader.eachLine('file.txt', (line, last) => {
    json = {}
    if (line.includes("Discharged Active Cases Death  Active Cases Death")) {
        reachedSection = true;
    }
    if (reachedSection) {
        var districtInfo = line.split("  ");
        var districDetails = districtInfo[0].split(" ");
        if (districDetails[0] != "" && districDetails[0] >= 0 && districDetails[0] <= 40) {
            districDetails.forEach(print);
            json['lastupdatedtime'] = new Date().toUTCString();
            json['district_ta'] = constant.districtMap.get(json.district);
            constant.logger.info(json.district, json);
            // console.info(json.district, json);
        }
    }
});

function print(value, index, array) {
    if (headers[1] == headers[index]) {
        json[headers[index]] = value.trim().replace('*', '').replace('#', '').replace('/', '');
    } else {
        json[headers[index]] = parseInt(value.trim().replace('*', '').replace('#', '').replace('/', ''));
    }
}