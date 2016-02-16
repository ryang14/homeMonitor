# homeMonitor

Disclaimer: This is a learning project and is my first big project using Node, Angular, and MonoDB. There are likely mistakes, so use at your own risk and any feedback would be helpful. There is also no security yet, so this should only be used on a local network and not exposed to the internet.  
  
I started this project because I wanted a web dashboard to display data from sensors around my house. My goal was to have a platform that would allow easy logging of data from remote sensor nodes, display both current and historic data, and generate a dashboard from a list of sensors.

#Setup
##Linux/Raspberry Pi:  
	Install MongoDB:  
    sudo apt-get install mongodb  
	Install NodeJS: 
		curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash –  
		sudo apt-get install -y nodejs  
	Install Git:  
		sudo apt-get install git  
	Clone the repository:  
		Git clone https://github.com/ryang14/homeMonitor  
	Start the server:  
		cd homeMonitor  
		npm start  
		
If you go to `http://<server’s IP>:3000/` you will see a page with just a menu bar. This means that there are no sensors in the database. To add a sensor, go to `http://<server’s IP>:3000/test/forms` and enter the data about the sensor you want to add. Currently the only supported sensor type is temp. Once a sensor is added, a corresponding gauge will show up on the main page. The second form can be used to add readings. The gauges display the latest reading for the corresponding sensor.

#API
I use an API to interface with the database.   
To add a sensor, get `http://<server’s IP>:3000/api/sensor?name=<sensor name>&title=<display title>&type=<sensor type>&min=<minimum reading>&max=<maximum reading>`  
To add a reading, get `http://<server’s IP>:3000/api/reading?name=<sensor name>&reading=<sensor reading>`  
To get a list of sensors, get `http://<server’s IP>:3000/api/sensors?type=<sensor type>`  
To get a list of readings, get `http://<server’s IP>:3000/api/readings?name=<sensor name>`  
