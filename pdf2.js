fs = require('fs');
PDFParser = require("pdf2json");
https = require('https');
constant = require('./constant');
pdfParser = new PDFParser();
lineReader = require('line-reader');

file = fs.createWriteStream("/opt/daemon/node/file.pdf");
request = https.get(constant.pdf_URL, function (response) {
    response.pipe(file);
    response.on('end', () => {
        try {
            pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
            pdfParser.on("pdfParser_dataReady", pdfData => {
                // fs.writeFileSync("/opt/daemon/node/pdf.txt", pdfParser.getRawTextContent());
                console.log(pdfParser.getRawTextContent());
            });
            pdfParser.loadPDF("/opt/daemon/node/file.pdf");
        } catch (e) {
            console.error("Caught: During PDF reading");
            console.error(e);
        }
    });
});