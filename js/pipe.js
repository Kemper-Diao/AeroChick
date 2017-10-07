/*
    这里规定：
        1.上管道必须超出顶部50像素；
        2.下管道必须超出陆地50像素；
        3.靠左初始位置留出300像素距离；
        4.两管道之间的初始间隔150像素，最小间隔60像素
        5.每根管道后面的空隙初始为2倍管道宽；
*/
function Pipe(option){
    this.cvs = option.cvs;
    this.imgPipeDown = option.imgPipeDown;
    this.imgPipeUp = option.imgPipeUp;
    this.x = option.x;
    this.moveSpeed = option.speed;
    this.coefficient = option.coefficient;
    
    this.gap = 150;
    this.minHeight = 50;
    this.topY = 0;
    this.bottomY = 0;
    this.moveSpeed = 2;
    this.space = this.imgPipeUp.width*2;
    this.ctx = this.cvs.getContext('2d');
    this.getY();
}
Pipe.prototype = {
    constructor:Pipe,
    draw:function(param){
        this.gap = param.gap;
        this.moveSpeed = param.moveSpeed;
        this.x -= this.moveSpeed;
        if(this.x<-(this.imgPipeUp.width+this.space)){
            this.x += this.coefficient*(this.imgPipeUp.width+this.space);
            this.getY(); //重置的时候重新新生Y坐标值
        }
        this.ctx.drawImage(this.imgPipeUp,this.x,this.topY);
        //画一个虚拟路径用以判断小鸡时候碰撞到管道
        this.ctx.rect(this.x,this.topY,this.imgPipeUp.width,this.imgPipeUp.height);
       

        this.ctx.drawImage(this.imgPipeDown,this.x,this.bottomY);
        this.ctx.rect(this.x,this.bottomY,this.imgPipeDown.width,this.imgPipeDown.height);
    },
    getY:function(){
        //390 = 画布总高度600 - 陆地高度110 - 上下管道最小高度50*2
        this.topY = Math.random()*(390-this.gap) +this.minHeight-this.imgPipeUp.height;
        this.bottomY = this.imgPipeUp.height+this.topY+this.gap;
    }
}