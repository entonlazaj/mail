var keys={};
var background;
var gameArea2D={
	canvas: canvas=document.createElement("canvas"),
	start: function(width,height,fps)
	{
		this.fps=fps;
		this.canvas.width=width;
		this.canvas.height=height;
		this.context=this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas,document.body.childNodes[0]);
		this.interval=setInterval(update,1000/fps);
		onkeydown=onkeyup=function(e)
		{
			e=e||event;
			keys[e.keyCode]=e.type=='keydown';
		}
	},
	
	clear: function()
	{
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	},
	stop: function()
	{
		clearInterval(this.interval);	
	},
}
function setBackground(color){
		background=new piece(gameArea2D.canvas.width,gameArea2D.canvas.height,color,0,0);
		
		
	}

	
function tile(x,y,mapholder,map,elementholder,elementNo,tilewidth,tileheight){
	this.y=y;
	this.k=0;
	this.elementNo=elementNo;
	this.i;this.j;this.l;
	for(this.i=0; this.i<22;this.i++){
		for(this.j=0;this.j<30;this.j++){
			for (this.l=0;this.l<this.elementNo;this.l++)
				if(map[this.i*30+this.j]==this.l+1){
					
					mapholder[this.k]=new piece(elementholder[this.l*5+1],elementholder[this.l*5+2],elementholder[this.l*5],x+this.j*tilewidth+elementholder[this.l*5+3],y+this.i*tileheight+elementholder[this.l*5+4],'img');
				mapholder[this.k].value=this.l+1;
				this.k=this.k+1}
	}}
	this.redo=function(newx,newy,newmap){
		this.n=0;
		this.y=newy;
		for(this.i=0; this.i<22;this.i++){
		for(this.j=0;this.j<30;this.j++){
			for (this.l=0;this.l<this.elementNo;this.l++){
				
			if( newmap[this.i*30+this.j]==this.l+1){
					if(this.n<this.k){
						
						mapholder[this.n].width=elementholder[this.l*5+1];
						mapholder[this.n].height=elementholder[this.l*5+2];
						mapholder[this.n].image.src=elementholder[this.l*5];
						mapholder[this.n].x=newx+this.j*tilewidth+elementholder[this.l*5+3];
						mapholder[this.n].y=newy+this.i*tileheight+elementholder[this.l*5+4];
						mapholder[this.n].value=this.l+1;
						
					this.n=this.n+1;}
					
					else
					{
						mapholder[this.n]=new piece(elementholder[this.l*5+1],elementholder[this.l*5+2],elementholder[this.l*5],newx+this.j*tilewidth+elementholder[this.l*5+3],newy+this.i*tileheight+elementholder[this.l*5+4],'img');
				mapholder[this.n].value=this.l+1;
				this.n=this.n+1;}
		
		
	}
			}
}}this.k=this.n;}}

/*  Game pieces */

function piece(width,height,color,x,y,type,no,speed){
	
	this.value=0;
	this.type=type;
	this.nextFrame=1;
	this.image= new Image();
	if(type=='img'||type=='anime-s')
		this.image.src=color;
	if(type=='anime')
		this.image.src=color+this.nextFrame+'.png';
    this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
    this.speedX=0;
    this.speedY=0;
	this.animeFrame=0;
	this.animation=color;
	this.updateCheck=0;
	if(type=='anime'||type=='anime-s')
	{
		this.animeSpeed=speed;
		this.frameNo=no;
	}
	
	//UPDATE:
	this.changeAnimation=function(newanime,newframe,newspeed)
	{
		this.type='anime';
		this.animation=newanime;
		this.frameNo=newframe;
		this.animeSpeed=newspeed;
		this.animeFrame=0;
	    this.nextFrame=1;
	},
	
	this.update=function()
	{
		ctx=gameArea2D.context;
		if(this.type=="text")
		{
			ctx.font=this.width+" "+this.height;
			ctx.fillStyle=color;
			ctx.fillText(this.text, this.x, this.y);
		}
		else if(this.type=="img")
		{	ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		}
		else if (this.type=='anime'){
			
			if(this.animeFrame<this.animeSpeed)
				this.animeFrame=this.animeFrame+1;
			else
			{
				this.animeFrame=0;
				this.nextFrame=1;
			}
			if(this.animeFrame==this.animeSpeed/this.frameNo*this.nextFrame)
			{
				this.image.src=this.animation+this.nextFrame+'.png';
				ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
				this.nextFrame=this.nextFrame+1;		
			}
			else
				this.image.src=this.animation+this.nextFrame+'.png';
				ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
			}
			else if (this.type=='anime-s'){
			
			if(this.animeFrame<this.animeSpeed)
				this.animeFrame=this.animeFrame+1;
			else
			{
				this.animeFrame=0;
				
			}
			if(this.nextFrame==this.frameNo)
				this.nextFrame=0;
			if(this.animeFrame==(this.animeSpeed/this.frameNo)*this.nextFrame)
			{
				
				ctx.drawImage(this.image,this.nextFrame*(this.width/this.frameNo),0,this.width/this.frameNo,this.height,this.x,this.y,this.width/this.frameNo,this.height);
				this.nextFrame=this.nextFrame+1;		
			}
			else{
				ctx.drawImage(this.image,this.nextFrame*(this.width/this.frameNo),0,this.width/this.frameNo,this.height,this.x,this.y,this.width/this.frameNo,this.height);
				
			}
			}
			
		else
		{
			ctx.fillStyle=color;
			ctx.fillRect(this.x,this.y,this.width,this.height);
		}
	},
	
	this.newPos=function()
	{
		this.y=this.y+this.speedY;
		this.x=this.x+this.speedX;	
			
	}
    this.follow=function(object,atX,atY)
	{
		this.x=object.x+atX;
		this.y=object.y+atY;
	}
}
/*simple collision*/
function collision(el1,el2,value)
{
	if(el1.value==value){
	if(el1.x+el1.width>=el2.x&&el1.x+el1.width<=el2.x+el2.width&&el1.y>=el2.y&&el1.y<=el2.y+el2.height)
		return true;
	else if(el1.x>=el2.x&&el1.x<=el2.x+el2.width&&el1.y>=el2.y&&el1.y<=el2.y+el2.height)
		return true
	else if(el1.x+el1.width>=el2.x&&el1.x+el1.width<=el2.x+el2.width&&el1.y+el1.heigh>=el2.y&&el1.y+el1.height<=el2.y+el2.height)
		return true;
	else if(el1.x>=el2.x&&el1.x<=el2.x+el2.width&&el1.y+el1.height>=el2.y&&el1.y+el1.height<=el2.y+el2.height)
		return true;
	else return false;}
	else return false;
}

/*key database
ex. key('a'); returns true when 'a' keye is pressed*/
function key(key){
	
	switch(key)
	{
	
		case "left arrow":  this.code=37; break;
		case "up arrow":  this.code=38; break; 
		case "right arrow":  this.code=39; break; 
		case "down arrow":  this.code=40; break; 
		case "x":  this.code=88; break;
		case "y":  this.code=89; break;
		case "z":  this.code=90; break;
		
	    default: this.code=0;
	}
	if (keys[this.code]) return true;
	
	
}






