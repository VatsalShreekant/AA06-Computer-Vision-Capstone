# AA06-Computer-Vision-Capstone

## Install

### Dependencies
#### I. p5.js- a JavaScript library for creative coding:

- Project Files--> to be accessed by the p5 manager. The p5-manager allows the user to 
create a collection of sketches.
	- Index.html
	- Sketch.js
	- Library files
	

- Text editor (either of these)
	- Atom (recommended)
	- Sublime text
	- Visual studio


- Server (viewing the results in a webpage)
	- Atom server package (recommended)
	- Node server--> lets us run javascript program on computers/servers
	- Python server

		
Steps for dependencies installation:
1. Install node.js: 

https://nodejs.org/en/

2. Install p5-manager
	- Terminal command as administrator: 

		$ npm install -g p5-manager
	
	- Terminal command as non-administrator: 
	
		$ sudo npm install -g p5-manager
	
3. Create a folder in documents and name it "p5_projects".
4. Change the directory in cmd to p5_projects: 
		
		$ cd Documents/p5_projects
		
5. Install the bundle: 

		$ p5 generate --bundle demo
		
6. Install the text editor: https://atom.io/
7. Go to atom->file->settings->install->
enter "live server" in the search box->install 'atom-live-server'.
8. Under atom->view->developer->toggler developer tools (for windows)/
Javascript console (for MAC OS)->
customize and control dev tools (the 3 vertical dots)-> settings-> network-> 
check 'Disable cache (while DevTools is open)'. 

#### II. ml5.js is a library provides access to machine learning algorithms and models in the browser, building on top of TensorFlow.js with no other external dependencies.
- The ml5.js file can be downloaded to the local drive and can be used offline purposes. 
However, I chose to reference the URL listed on https://learn.ml5js.org/#/. 

- Under 'Quickstart', copy the URL in a script tag and paste it in the index.html file in your folder. 
