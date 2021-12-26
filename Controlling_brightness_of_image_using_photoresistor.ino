/*
Controlling brightness of an image using photoresistor:

  Note:

  Please refer the same directory for the ciruit diagram, to simulate the circuit on tinkercad refer: https://www.tinkercad.com/things/0x8DoxWbNPq, the  simulation will only give you the values of alpha on serial monitor on TinkerCad, but you won't be able to directly use this values to control brightness of image because NodeJs requires an Arduino(Hardware on the port, to take in serial readings). The simulation is crucial in order to understand the implementation as far as usage of Arduino Electronics is considered.

*/

void setup()
{
  /*Setting Pinmode for the input pin. Actually Arduino generally auto detects analog input on analog pins and it is not a necessity to add the pin separately*/
  pinMode(A0, INPUT);
  /*Starting the Serial Monitor at baud rate of 9600*/
  Serial.begin(9600);
}

void loop()
{
  /*Storing the sampled voltage in a variable*/
  double val = analogRead(A0);
  /*Mapping the sample signal voltage to  values between  (0 to 1)*/
  double alpha = (val / 1023);
  /*Printing the output on the Serial Monitor*/
  Serial.println(alpha);
  delay(10);
}
