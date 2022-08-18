const https = require("https");
const fs = require("fs");
const path = require("path"); //for rename the image

// const url = "https://books.toscrape.com/media/cache/b8/e9/b8e91bd2fc74c3954118999238abb4b8.jpg";

function downloadFile(url, callback) {
  const filename = path.basename(url);
  console.log(filename);

  const req = https.get(url, function (res) {
    const fileStream = fs.createWriteStream(filename);
    res.pipe(fileStream);

    fileStream.on("error", function (err) {
      console.log("Error writing to the storage!");
      console.log(err);
    });

    fileStream.on("close", function () {
      callback(filename);
    });

    fileStream.on("finish", function () {
      fileStream.close();
      console.log("Done!");
    });
  });

  req.on("error", function (err) {
    console.log("Error downloaging the file!");
    console.log(err);
  });
}
downloadFile("https://images.unsplash.com/photo-1652231594615-ca8698fe1ed9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", function (fn) {
  console.log(fn);
});

// downloadFile("https://images.unsplash.com/photo-1652274409064-c277337a5f6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80");
