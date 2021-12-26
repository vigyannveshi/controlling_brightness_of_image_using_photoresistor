# Controlling Brightness of a Image using photoresistor

<img src="featured_img.svg">

## Acknowledgements
***
***Special Thanks to:***
* ***God***, who supported me strongly and helped me to rise every time, I failed in the duration of the project.
* ***Chitresh Sinha***, the photographer who captured the image, used in the project. Reference http://www.chitrr.com/downloads/butterfly/, check the directory for screenshot of purchase reciept.
* ***Adam Thomas (youtube)***, https://www.youtube.com/watch?v=gQYsUjT-IBo&t=4s ,from whom I was able to understand the concept to interact Arduino via serial -port with Nodejs using (serialport) and then transfering the data to the front-end using (socket.io) in the best way possible, which served the crux to complete the project.

## Disclaimer
***
The project is created only for education and learning purpose, and not with any economic intentions. The image used in the project is taken from http://www.chitrr.com/downloads/butterfly/, and the credits of the image, belong to the photographer. If there are any copyrights issues regarding the image, please contact: mailtovigyannveshi@gmail.com

## Do it yourself
***
**Prerequisites:**
 Basic understanding of HTML, CSS, Javascript, Arduino, NodeJS, using terminal and finally problem-solving. The reason for adding the prerequisities is because it is not as simple as installing a game on your local system. You need to be an experienced problem solver (debugger), your circuit may give errors, arduino-local system connection may give errors, one of errors worth mentioning which I faced in my early learning phase was serialport module not working or not getting installed, in my case the issue was absence of python(greater than version 2.7) installed on system. It may be a smooth Mercedes ride to you, but to me it has always been a roller coaster ride.  Yet another reason for the prerequisities is, if you want to apply the concept used in the project to some-other project or modify it as per your needs. Whenever one desires simplified solutions, he must first seek out the science behind the substance.

**Needed:**
* Arduino board (preferably with ATMEGA328p or Atmel ATmega2560 i.e. Board: Arduino Uno, Arduino Nano or Arduino Mega, as the program written specific to arduino will surely work for this boards considering the same circuit connections).
* Photoresistor.
* Resistor (10kohms).
* potentiometer (>=10kohms)--> Not a compulsion but helps to adjust light sensitivity.
* jumper wires.
* cable to connect Arduino to local system.
* local system (desktop PC or Laptop).

**Working:**

-***Electronics Involved:***

<img src="circuit-diagram.png" width="1030px" height="757px">

* Kindly refer the circuit before reading ahead.
* The electronics part is quite simple because the circuit is a simple voltage-divider, and role of the arduino is only to sample voltage across the (resistor 10Kohms + potentiometer) using the analog read function of the board, which uses a 10-bit ADC (parameters specific to boards mentioned in needed) to sample the voltage hence gives 1023--> 5V and 0-->0V. This is linerally mapped to a value between 0 and 1 using the program uploaded to arduino. This  mapped value is passed on to the local system via serial port.
* When light falls on the photoresistor, its resistance is minimum suppose 1k. Majority of voltage applied across the network of photoresistor and (resistor 10kohms + potentiometer) is dropped across the (resistor 10kohms + potentiometer). Hence value obtained from serial port will be close to 1. Similarly when light intensity falling on the photoresistor decreases, its resistance increases, suppose 50k. Majority of voltage will be dropped across photoresistor. Thus voltage dropped across the (resistor 10kohms + potentiometer) decreases. Hence value obtained from serial port will be close to 0. 
* With the varying amount of light falling on photoresistor you will get an set of values from 0 to 1. Stricty speaking due to presence of 10Kohms resistance you won't get values exactly from 0 to 1. You may get somewhere between 0.1 to 0.9, depending on the lighting conditions. The 10Kohms resistor is added for stability. If you just use potentiometer, then when resistance of potentiometer ~0, even for minor changes in intensity of light falling on photoresistor there will be major changes in voltage drop. Flucuations are too fast to be visualised in the image. Hence a resistor 10Kohms is added. You can test this by yourselves by removing the resistance 10Kohms and directly connecting the potentiometer to photoresistor. 
* Potentiometer is not a necessity if you are using a resistance 10Kohms. It is just a way to adjust light sensitivity of circuit. As values of resistance of potentiometer is increases, net resistance of (resistor 10kohms + potentiometer) is increases. So If you want that voltage drop to be maximum across (resistor 10kohms + potentiometer) i.e. output on serial port to be nearly 1 for a particular lighting condition, increasing the resistance of potentiometer.That was all about electronics involved.

-***Interaction of Arduino with the Webpage:***
* Now comes the crux, controlling brightness of image. For this we will use a basic HTML page, image is added to it. The brightness of the image is controlled using CSS filters - brightness(), actually you can control other filters also, but since brightness is clearly seen it is better to control it. We create a CSS variable and pass it as a parameter to brightness(). 
`brightness(var(--alpha));`
* This CSS variable is then changed using JavaScript - DOM ( Document Object Model) which recieves data from the backend (NodeJS) via the socket.io module. 
* We use NodeJS via serialport module to communicate with the serial port and recieve data sent by arduino, for this we need to see that arduino doesn't communicate  with any other application (eg: Serial Monitor on Arduino IDE shouldn't be running). 
* We create a local server in NodeJS to run the HTML file on our localhost at port 3000. The data recieved by backend (NodeJS) is passed to front-end  using socket.io module, which inturn assigns value to CSS variable --alpha using JavaScript- DOM ( Document Object Model). **Hence we are able to change the brightness of image using photoresistor**.

**Procedure:**
 1) Install Arduino IDE and NodeJS on your local system.
 2) Now download the project content from github as a zip-file, extract it and store it as a directory on your local system.
 3) Open the directory in a code editor (preferably in VS-code) and open terminal. 
 4) Install modules: serialport and socket.io.
`npm install serialport`
 Reference for documentation: https://www.npmjs.com/package/serialport
`npm install socket.io`
Reference for documentation: https://socket.io/
 5) Assemble the circuit refering the circuit diagram given and connect your board to your local system. Open up the Arduino IDE, setup the board and also check the port and note it down. Then upload the arduino-code to the arduino board and open up the serial monitor to check the readings, if you are in normal lighting conditions you will get readings between 0 to 1 in decimal. Try varying the light on the photoresistor and check if the readings change. If readings don't change please check your connections. Now close the Serial Monitor, it is necessary.
 6) In VS-code (code-editor), open the file app.js and check up the comment '//Change the "COM4" to the port used in your system.'. Now change the port from COM4 to the port your arduino is connected on your local system.
7) Close all previously opened terminals and open up a new terminal and run the app. 
`node app.js`
8) Open a browser (preferably Google Chrome) and open localhost at port 3000 using the url given below.
`http://localhost:3000/`
9)You can view the image. Try varying light falling on the photoresistor and observe the image on your screen, its brightness will also change and on total elimination of light, brightness of the image will approach zero.

## Extras
***
* You can simulate the circuit shown in the circuit diagram inorder to visualise the electronics involved using Tinkercad, you may not be able to apply it to control brightness of an image, yet it will help you in understanding the working of the circuit and also the program uploaded on arduino. Reference:https://www.tinkercad.com/things/0x8DoxWbNPq.
* You can use the same concept to visualise auto-brightness feature in smart phones. This can be achievable in n - number of ways, one of the way being sampling the voltage across the photoresistor.This can be simply done by interchanging the wires of ground and  5v. Other ways could be via alteration in programs. For example passing the value of (1 - mapped value) to serial port.