/*
  Note: 
  
  Using delimeter as "\r\n":
  \r = CR (Carriage Return) → Used as a new line character in Mac OS before X.
  \n = LF (Line Feed) → Used as a new line character in Unix/Mac OS X.
  \r\n = CR + LF → Used as a new line character in Windows.

  In the program: COM4 is used as the serial port, the serial port to which your arduino is connected depends on the operating system, can be found under ports in the Arduino IDE.

  Creation of a local server using NodeJs is necessary and you can't just run the index.html on live server extension of VS-code and expect that you will get the result, and if you find a way to do it, request to please do help me too, along with others letting us know it. 

  Make sure that your index.html and the image file are placed by creating a directory named public, this is because it has a crucial role for serving. This point is mentioned considering case of people with no idea about NodeJs.

  Since the project involves controlling brightness of image using photoresistor, inorder to serve the image you need to make sure for the existence of code marked as IMP_1 and IMP_2 depending on extension of image.


*/

/*Serial Port Configurations:*/

//Importing serialport
var SerialPort = require("serialport");

const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
  delimiter: "\r\n",
});

//Change the "COM3" to the port used in your system.
var port = new SerialPort("COM3", {
  baudRate: 9600, //Set your baud rate based on your declaration in the code for arduino
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  flowControl: false,
});

port.pipe(parser);

/*Creating Server*/
var http = require("http");
var fs = require("fs");
var path = require("path");

var app = http.createServer(function (req, res) {
  if (req.url === "/") {
    fs.readFile("./public/index.html", "UTF-8", function (err, html) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    });

    /*IMP_1: Needed to serve image with extension jpg */
  } else if (req.url.match(".jpg$")) {
    var imagePath = path.join(__dirname, "public", req.url);
    var fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { "Content-Type": "image/jpg" });
    fileStream.pipe(res);
  } 
  
    /*IMP_1: Needed to serve image with extension png */
  // else if (req.url.match(".png$")) {
  //   var imagePath = path.join(__dirname, "public", req.url);
  //   var fileStream = fs.createReadStream(imagePath);
  //   res.writeHead(200, { "Content-Type": "image/png" });
  //   fileStream.pipe(res);
  // } 

  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("No Page Found");
  }
});

/*Connecting socket.io */
var io = require("socket.io").listen(app);

io.on("connection", function (data) {
  console.log("Node-Js is listening");
});

parser.on("data", function (data) {
  /*Use this when you need to check your serial connection */
  // console.log(data);
  io.emit("data", data);
});

/*Serving Application */
app.listen(3000);
