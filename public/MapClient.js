/* These two variables control how many cells we divide the canvas into 
 * horizontally (cellsWide) and vertically (cellsHigh). 
 * They are used in the graphics calculations later, to establish the 
 * size of each cell 'on the fly' so that they can change dynamically.
 *
 * They are set upon receipt of the 'maze data' message.
 */
// variables for cellsWide and cellsHigh
var cellsWide;
var cellsHigh;

// creating var for circles
var circles = [];

/* These three variables hold information about the maze.
 * - maze is a two-dimensional array of objects which contain members:
 * -- x is an integer which describes the horizontal position of the cell
 * -- y is an integer the vertical position of the cell
 * -- top is a boolean which describes whether the top edge of the cell has a wall
 * -- bottom is a boolean which describes whether the bottom edge of the cell has a wall
 * -- left is a boolean which describes whether the left edge of the cell has a wall
 * -- right is a boolean which describes whether the right edge of the cell has a wall
 * -- set is an integer which is used in maze generation that can safely be ignored
 *
 * - mazeStart
 * -- x is the row at which players should start in the maze
 * -- y is the column at which players should start in the maze
 *
 * - mazeEnd
 * -- x is the row where the goal space of the maze is located
 * -- y is the column where the goal space of the maze is located
 *
 * These variables are all initialised, and changed, upon receipt of the 'maze data' message.
 */

/*
* creating variables for the game
* MouseX and MouseY is used to crreate mouse control to make the player move using
* the mouse controls.
*/
var maze = [];
var mazeStart = {};
var mazeEnd = {};

var fpsInterval;
var then;

// creating variables for the mouse x and mouse y, for when the user clicks on the screen using the mouse
var mouseX;
var mouseY;




/* 
 * Establishing a connection to the server
 * We will need to reuse the 'socket' variable to both send messages
 * and receive them, by way of adding event handlers for the various
 * messages we expect to receive
 */

// creating variable to connect to socket.io using url localhost:8081
var socket = io.connect("http://localhost:8081");

/*
 * This is the event handler for the 'maze data' message
 * When a 'maze data' message is received from the server, this block of code would be executed
 * 
 * The server is sending us either initial information about a maze, or,
 * updated information about a maze, and so we want to replace our existing
 * maze variables with the new information.
 *
 * We know the specification of the information we receive (from the documentation
 * and design of the server), and use this to help write this handler.
 * Setting the cell width and the height and creating the data for the maze cells.
 * Starting the maze and end maze
 */
// socket.io maze data function
socket.on("maze data", function(data) {
	cellsWide = data.mazeSize.cols;
	cellsHigh = data.mazeSize.rows;
	maze = data.mazeCells;
	mazeStart = data.mazeStart;
	mazeEnd = data.mazeEnd;
}); // close socket.on and function data

/*
 * Once our page is fully loaded and ready, we call startAnimating
 * to kick off our animation loop.
 * We pass in a value - our fps - to control the speed of our animation.
 * The event handler which we would use is the keypress event and the onclik event, to make the player
 * move using the keypress and also making the player move using the mouse controls.
 * We can attach the events to the document.ready function.
 * Start animating and setting the frame rate to 15.
 * setting the size (width) of the circle for when the mouse has been clicked on the page and the height.
* 
 */

function ChatMesasge(username, message) {
    var chat = {
        name: username,
        msg: message
    };
    return chat;
}

function UserObject(x, y) {
    var user = {
        userX: x,
        userY: y
    }
    return user;
}


// creating start animating event handle
// I have attached it to the start animating function, which was created above
$(document).ready(function() {
	startAnimating(15);
    // listening to a submit event
    $("form").submit(function (event) {
        event.preventDefault(); // preventing the form submission event

        // getting the name and the message passsed
        var username = $("#name").get(0).value;
        var message = $("#msg").get(0).value;

        // creating a ChatMessage object
        var c = ChatMesasge(username, message);

        // Sending the message to the server
        socket.emit("client message", c);

        // $("#name").get(0).value = "";
        $("#msg").get(0).value = "";
    });
        
    // touch button to move the player down
    $('#movedown').on('touchstart click', function(e){
    e.stopPropagation(); e.preventDefault();
        // if statement for the event type for touch start
        if (event.type == "touchstart")
            $(this).off('click');
        {
            //move the square down
            player.y = player.y +10;
        }
        // if the player goes below the map, the player will be returned to the top
        if (player.y>= 500){
            player.y=0;
        }
        console.log(e);
    }); // close move down selector
    
    // touch button to move player up
    $('#moveup').on('touchstart click', function(e) {
        e.stopPropagation(); e.preventDefault();
        // creating if statement for the event type for the touch start to move the player up.
        if (event.type == "touchstart")
            $(this).off('click');
        {
            //move the player up
            player.y = player.y -10;
        }
        // if the player goes below the map, the player will be returned to the top
        if (player.y>= 500){
            player.y=0;
        }
        console.log(e);
    }); // close function for move up
    
    // touch button to move player to the right
    $('#moveright').on('touchstart click', function(e){
        e.stopPropagation(); e.preventDefault();
        // if statement for the event type for touch start
        if (event.type == "touchstart")
            $(this).off('click');
        {
            //move the player to the right
            player.x = player.x +10;
        } // close if event type touch start
        // if the player goes below the map, the player will be returned to the top
        if (player.x>= 500){
            player.x=0;
        } // close if statement if the player goes end of the map
        console.log(e);
    }); // close function for move right
    
    // touch button to move player to the left
    $('#moveleft').on('touchstart click', function(e){
        e.stopPropagation(); e.preventDefault();
        // if statement for the event type for touch start
        if (event.type == "touchstart")
            $(this).off('click');
        {
            //move the player left
            player.x = player.x -10;
        }
        // if the player goes below the map, the player will be returned to the top
        if (player.x>= 500){
            player.x=0;
        }
        console.log(e);
    });
    
    // touch controls for swipe
    $(function() {
        $("body").swipe( {
            //Generic swipe handler for all directions
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                var a = direction;
                if (a == "down")
                {
                    // move the player down
                    player.y = player.y +10;
                }
                // if statement to move the player up
                if (a == "up")
                {
                    //move the plyer up
                    player.y = player.y -10;
                } 
                // if statment to move player to the left
                if (a == "left")
                {
                    //move the player left
                    player.x = player.x -10;
                }
                // if statement to move the player right
                if (a == "right")
                {
                    // move the player right
                    player.x = player.x +10;
                } // close if statment to mpve player to the right
            } // close funtion for swipe
        });
        //Set some options later
        $("#body").swipe( {fingers:2} );
    });
    
    
    /*
    // calling the canvas from the html file and creating mouse vent
    $("canvas").mousemove(function(event) {
        player.x = event.pageX;
        player.y = event.pageY;
        player.x = MazeStart.x;
        player.y = MazeStart.y;
    });
    // calling the canvas from the html file and creating click event for y and x and the event for pageY and pagex
    $("canvas").click(function(event) {
        // setting the size (height) and (width) of the player for when the mouse has been clicked on the page
        player.y = event.pageY;
        player.x = event.pageX;
        // starting the maze for the player
        player.y = MazeStart.y;
        player.x = MazeStart.x;
    }) // close click event function
    */
    
    /*
    * creating jquery to call the body for the keydown event
    * creating variable for keypressed.
    *  Switch statement for the key pressed.
    */
    $("body").keydown(function(event) {
        var keyPressed = event.which;
        // moving the player left using the left arrow key on the keyboard and A
        switch (keyPressed) {
            case 65: // A key
            case 37:
                console.log("left");
                // if statement for setting the position of the player when moved to the left
                if (player.x - player.size >= 0) {
                    player.x = player.x - player.size;
                    player.x = MazeStart.x;
                } // close if statement for player x position
                break;
             // up arrow key or W to move the player up
            case 87:
            case 38:
                console.log("up");
                // if statement for setting the position of the player when moved up
                if (player.y - player.size >= 0) {
                    player.y = player.y - player.size;
                    player.y = MazeStart.y;
                } // close if statement for player position when moved up
                break;
            // right arrow key or D to move the player to the right
            case 68:
            case 39:
                console.log("right");
                // if statement for setting the position of the player when moved to the right and if it reaches to the end of the canvas it will stop
                if (player.x + player.size < 500) {
                    player.x = player.x + player.size;
                    player.x = MazeStart.x;
                } // close if statement for player position when moved to the right
                break;
            // down arrow key or S to move the player down
            case 83:
            case 40:
                console.log("down");
                // if statement for setting the position of the player when moved down and if it reaches to the end of the canvas it will stop
                if (player.y + player.size < 500) {
                    player.y = player.y + player.size;
                    player.y = MazeStart.y;
                } // close if statement for player position when moved down
                break;
                          } // close switch statement
    }); // close keydown event function
}); // close document ready function



/*
 * The startAnimating function kicks off our animation.
 * Also creating function to start the animation
 *  Setting the fps interval
 * Setting the then equal to date.
 

 */

// function to start animating
function startAnimating(fps) {
	fpsInterval = 1000/fps;
	then = Date.now();
    // calling the animate function
	animate();
} // close start animating function



// making the player animated by setting the slide, shift, width, height and current slide variables
// setting the fps for speed of th animated character
var slide = 8;
var shift = 10;
var width = 1472/slide;
var height= 325;
var current_slide = 1;
var fps = 10;


// creating variable for the player and setting the x, y and size
var player = {
    x : 0,
    y : 0, 
    size : 40
} // close player function

// creating function for the second player
// creating the x and y position and the size
var player1 = {
    x : 10,
    y : 40, 
    size : 35
} // close player 1 function

// creating the third player function
var player3 = {
    x : 450,
    y : 0,
    size : 55
} // close function for player 3


/*
 * The animate function is called repeatedly using requestAnimationFrame (see Games on the Web I - HTML5 Graphics and Animations).
 *  Date.now method returns the number of milliseconds    var now = Date.now(); // creating variable for now and setting the date now.
 * setting the then equal to date
 * Creating var elapsed equal to now take then
 */

// creating function for animate
function animate() {
	requestAnimationFrame(animate);
    // Creating variable name called now and setting the number of milliseconds
	var now = Date.now();
    var elapsed = now - then;
    // creating if statement for elapsed more than the fpsInterval
	if (elapsed > fpsInterval) {
        /*
        * creating variable for then equal to now and taking it away by elapsed 
        * and finding the percentage of elapsed and fpsInterval.
        */
        then = now - (elapsed % fpsInterval);
		// Acquire both a canvas (using jQuery) and it's associated context 2d
        // Also creating jquery to call the canvas		
        var canvas = $("canvas").get(0);
		var context = canvas.getContext("2d");
        	
		// Calculating the width and height of each cell in the maze
		var cellWidth = canvas.width/cellsWide;
		var cellHeight = canvas.height/cellsHigh;
		
		// Clear the drawing area each animation cycle and drawing the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Adding variable for the first img (player) and calling the image
        Player = new Image();
        Player.src = "walk.png";
        
        // Adding variable for the second img (player) and calling it
        var Player1 = new Image;
        Player1.src = "bird.jpg";
        
        // Adding variable for the third img (player) and calling it
        var Player3 = new Image;
        Player3.src = "player3.png";
        
        
        //  WHen the second player goes over an edge, it will stop
        context.drawImage(Player1, player1.x, player1.y, player1.size, player1.size);
        
        //  WHen the third player goes over an edge, it will stop
        context.drawImage(Player3, player3.x, player3.y, player3.size, player3.size);

                
        
        //  WHen the img goes over an edge, it will stop and draw the image
		// shift the width by 1 each time
        context.drawImage(Player,shift,0,width,height,player.x, player.y, player.size, player.size);
		shift+= width + 1;
		// if statment for current_slide equal to 0
        // creating variable for shift equal to 0
        // Setting the current_slide variable to 0
		if(current_slide == slide){
			shift = 0;
			current_slide = 0;
		} // close if statement for current_slide equal equal to slide
		current_slide++; // each time add the current_slide
        
		/*
        *  Creating the goal
        */
        
		// Changing the current colour to yellow, to draw the 'goal state
		context.fillStyle = "blue";
		// The goal is calculated by multiplying the cell location (mazeEnd.x, mazeEnd.y)
		// by the cellWidth and cellHeight respectively
		context.fillRect(mazeEnd.x * cellWidth,
						 mazeEnd.y * cellHeight,
						 cellWidth, cellHeight);
	
		// Change the current colour to black, and the line width to 2
		context.fillStyle = "black";
		context.lineWidth = 2;
			
		/*
        * Looping through the 2D array, in both rows and columns.
        * For every cell in the maze, check where it has walls and for every wall we have found, drawing that wall in an appropriate place.
        * 
        */
		for (i = 0; i < maze.length; i++) {
			for (j = 0; j < maze[i].length; j++) {
				if (maze[i][j].top) {
					context.beginPath();// beginning the path for the maze walls
                    // draw the walls for the top maze
					context.moveTo(maze[i][j].x*cellWidth, maze[i][j].y*cellHeight);
					context.lineTo((maze[i][j].x+1)*cellWidth,maze[i][j].y*cellHeight);
					context.stroke(); // creating stroke for walls
					context.closePath(); // closing the path for the context
				} // close if statement to draw the top cell
                
				// drawing the right maze and checking where it has walls
				if (maze[i][j].right) {
					context.beginPath();  // begin the path for the context
                    // draw the walls for the right maze
					context.moveTo((maze[i][j].x+1)*cellWidth,maze[i][j].y*cellHeight);
					context.lineTo((maze[i][j].x+1)*cellWidth,(maze[i][j].y+1)*cellHeight);
					context.stroke(); // creating stroke for the right maze
					context.closePath();// close path for the context
				} // close if statement to draw the right cell
                
                // drawing the bottom maze and checking where it has walls
				if (maze[i][j].bottom) {
					context.beginPath(); // begin the path for the context
                    // draw the walls for the bottom maze
					context.moveTo((maze[i][j].x+1)*cellWidth,(maze[i][j].y+1)*cellHeight);
					context.lineTo(maze[i][j].x*cellWidth,(maze[i][j].y+1)*cellHeight);
					context.stroke(); // creating stroke for the bottom maze
					context.closePath(); // close path for the context
				} // close if statement to draw the bottom cell
                
                // drawing the left maze and checking where it has walls
				if (maze[i][j].left) {
					context.beginPath(); // begin the path for the context
                    // draw the walls for the left maze
					context.moveTo(maze[i][j].x*cellWidth,(maze[i][j].y+1)*cellHeight);
					context.lineTo(maze[i][j].x*cellWidth, maze[i][j].y*cellHeight);
					context.stroke();// creating stroke for the left maze
					context.closePath(); // close path for the context
				} // close if statement to draw the left cell	
			} // close for loop for maze length
		} // close for loop for the 2d array
    } // close if statement for elapsed > fpsInterval
} // close function animate