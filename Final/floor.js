// Part 1: firebase notification

MsgElem = document.getElementById("msg");
TokenElem = document.getElementById("token");
NotisElem = document.getElementById("notis");
ErrElem = document.getElementById("err");
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var firebaseConfig = {
    apiKey: "AIzaSyDzTtrPVa296z-7cu0pOkJ7PVsDdEyqDPU",
    authDomain: "test-508c4.firebaseapp.com",
    databaseURL: "https://test-508c4-default-rtdb.firebaseio.com",
    projectId: "test-508c4",
    storageBucket: "test-508c4.appspot.com",
    messagingSenderId: "986920374298",
    appId: "1:986920374298:web:38b6afde8f7d778bc541a3",
    measurementId: "G-WXYVX1BLZC"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

if('serviceWorker' in navigator) { 
    // regist webpage with a service worker(firebase-messaging-sw.js)
    navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then(function(registration) 
    {
        console.log("Service Worker Registered");
        const messaging = firebase.messaging();
        messaging.useServiceWorker(registration);  
        messaging
        .requestPermission()
        .then(function () {
            console.log("Notification permission granted.");
            // get the token in the form of promise
            return messaging.getToken()
        })
        .then(function(token) {
            console.log("token is : " + token);
        })
        .catch(function (err) {
            console.log("Unable to get permission to notify.", err);
        });

        let enableForegroundNotification = true;
        messaging.onMessage(function(payload) 
        {
            // show in web console
			console.log("Message received. ", payload);
			const {title, ...options} = JSON.parse(payload.data.notification);
			console.log({uuid: title, counter: 5})
			var stringArr = title.split(" ")
			stringArr.forEach(function(item){
				flags.push({uuid: item, counter: 5})
			});			

            if(enableForegroundNotification) {
				// show in notify
                //const {title, ...options} = JSON.parse(payload.data.notification);
                navigator.serviceWorker.getRegistrations().then(registration => {
                    registration[0].showNotification(title, options);
                });
            }
        });    
    }); 
}
//Part 2: draw floor

//set canvas & patient message board and image
//canvas has two parts: image & patient message(mesboard)
//mesboard is right under image with height 100
var img = document.getElementById("myImage")
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
var mesBoard = 100
canvas.width = img.width
canvas.height = img.height + mesBoard

//mouse event: 
//http request(show) after click on the patient circle
var mx = 0;
var my = 0;
canvas.addEventListener('click', e => {
    mx = e.offsetX;
    my = e.offsetY;
    ctx.clearRect(0, img.height, img.width, mesBoard);	
	for(var i = 0; i < balls.length; ++ i) {
		var x = balls[i].x;
		var y = balls[i].y;
        if(((mx - x) ** 2 + (my - y) ** 2) <= r * r) {
	        show(balls[i].uuid)
			break;
        }
	}
});

function show(uuid) {
	//http request(TODO)
	
	//show message 
	//fillText(string, x, y)
	ctx.font = '20pt Times Roman';
	ctx.fillStyle = "black";
	ctx.fillText("patient:", 30, img.height + 20);
	ctx.fillText(uuid, 150, img.height + 20);
	ctx.fillText("position:", 30, img.height + 50);
	ctx.fillText(mx, 150, img.height + 50);
	ctx.fillText(my, 200, img.height + 50);
}

//set ball and radius, can handle both json object & json array
//balls is a array of object
//ball object = {x, y, uuid, flag}
var r = 5;
var balls = [];
var flags = [];
function drawBalls(jsobj) {
	var num = 1
    if(Array.isArray(jsobj)) {
	    num = jsobj.length	
	}
	
	if(num == 1) {
		balls[0] = { x: jsobj.x/3, y: jsobj.y/3, uuid: jsobj.uuid, flag: 0 };
		if(0+r > balls[i].x || balls[i].x > img.width-r || 0+r > balls[i].y || balls[i].y > img.height-r) return;
		for(var j = 0; j < flags.length; ++ j) {
		    if(balls[i].uuid == flags[j].uuid) {
				balls[i].flag = 1;
				continue;
			}
		}
		ctx.beginPath();
        ctx.arc(balls[0].x, balls[0].y, r, 0, Math.PI * 2);
        if(balls[0].flag == 1) ctx.fillStyle = "red";
        else ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
		ctx.font = '15pt Times Roman bold';
        ctx.fillText(balls[0].uuid, balls[0].x-r, balls[0].y-r);
	}
    else {
        for(var i = 0; i < num; ++ i) {
            balls[i] = { x: jsobj[i].x/3, y: jsobj[i].y/3, uuid: jsobj[i].uuid, flag: 0 };
			if(0+r > balls[i].x || balls[i].x > img.width-r || 0+r > balls[i].y || balls[i].y > img.height-r) continue;
			for(var j = 0; j < flags.length; ++ j) {
			    if(balls[i].uuid == flags[j].uuid) {
					balls[i].flag = 1;
					continue;
				}
			}
			ctx.beginPath();
            ctx.arc(balls[i].x, balls[i].y, r, 0, Math.PI * 2);
            if(balls[i].flag == 1) ctx.fillStyle = "red";
            else ctx.fillStyle = "green";
            ctx.fill();
            ctx.closePath();
		    ctx.font = '15pt Times Roman bold';
            ctx.fillText(balls[i].uuid, balls[i].x-r, balls[i].y-r);
        }
    }
}

function draw() {
	//clear the whole canvas
    ctx.clearRect(0, 0, img.width, img.height);
	//transparent whole canvas
    //ctx.globalAlpha = 0.2;
	//ctx.drawImage(img, 0, 0);
    //ctx.globalAlpha = 1;	
	//http request database(json response), then draw balls(patient)
	for(var i = 0; i < flags.length; ++ i) {
		flags[i].counter -= 1;
		if(flags[i].counter == 0) flags.splice(i, 1);
	}
	
	var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'http://localhost/connect2.php');
    httpRequest.responseType = 'json';
    httpRequest.send();
	httpRequest.onload = function() {
        var req = httpRequest.response;
        //console.log(req)
        drawBalls(req)
    }  	
}

// repeat function
// setINterval(callback, time interval(msec))
timeoutId = setInterval(draw, 1000);

