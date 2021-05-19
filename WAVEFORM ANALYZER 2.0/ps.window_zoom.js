//Pedro Santos 2017

inlets  = 1;
outlets = 0;

//global vars
var currentSize;
var previousSize = [-1,-1];
var originalSize = [300, 200];
if (jsarguments.length > 1)
	originalSize = [jsarguments[1], jsarguments[2]];
var updateRate = 5;
if (jsarguments.length > 2)
	updateRate = jsarguments[3];
var tsk = new Task(mytask, this);


function start()
	{
		tsk.cancel();
		tsk.interval = updateRate;
		tsk.repeat();
	}

function stop()
	{
		tsk.cancel();
	}

function msg_float(v)
	{
		this.patcher.message("zoomfactor", v);
		this.patcher.wind.scrollto(0,0);
		scaledSize = [originalSize[0]*v, originalSize[1]*v];
		this.patcher.wind.size = scaledSize;
	}
	
	
function mytask() {
	currentSize = this.patcher.wind.size;
	//Process only if the current window size has changed!
	if (currentSize[0] != previousSize[0] || currentSize[1] != previousSize[1])
	{
		var zoomX = currentSize[0] / originalSize[0];
		var zoomY = currentSize[1] / originalSize[1];
		//use the the lowest zoom value
		if (zoomX < zoomY)
		{var finalZoom = zoomX} else {var finalZoom = zoomY}
		
		this.patcher.message("zoomfactor", finalZoom);
		this.patcher.wind.scrollto(0, 0);
		previousSize = currentSize;
	}
}
