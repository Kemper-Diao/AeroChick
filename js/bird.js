function Bird(option){
    this.cvs = option.cvs;
    this.birdImg = option.img;
    this.canvasX = option.canvasX;
    this.canvasY = option.canvasY;
    this.declineSpeed = option.declineSpeed;             //初始下降速度
    this.rotateAngle = option.rotateAngle;               //小鸟图片初始旋转角度

    this.ctx = this.cvs.getContext('2d');
    this.g = 0.0003;                                     //模拟重力加速度，用9.8太快，看不见效果
    this.maxDeclineSpeed = 0.5;                          //下降的最大速度
    this.maxRotateAngle = 45;                            //小鸟旋转的最大角度
    this.displayCol = 0;                                 //绘制当前图片所在的列
    this.imgBirdX = 0,  //绘制当前图片的X坐标
    this.imgBirdY = 0;                                   //绘制当前图片的Y坐标
    this.imgBirdW = this.birdImg.width/3;                //每次绘制的图片宽度
    this.imgBirdH = this.birdImg.height;                 //每次绘制的图片高度
}

Bird.prototype ={
    constructor:Bird,
    draw:function(param){
        var offsetTime = param.offsetTime;
        this.declineSpeed += this.g*offsetTime;           //获取当前下降的实时速度
        var declineDistance = this.declineSpeed*offsetTime+this.g*offsetTime*offsetTime/2;
        this.canvasY += declineDistance;
        this.rotateAngle = this.rotateAngle>this.maxRotateAngle
                          ?this.maxRotateAngle
                          :this.declineSpeed/this.maxDeclineSpeed*this.maxRotateAngle;
        this.imgBirdX = this.imgBirdW*this.displayCol;
        this.ctx.save();
        this.ctx.translate(this.canvasX+this.imgBirdW/2,this.canvasY+this.imgBirdH/2);
        this.ctx.rotate(Math.PI/180*this.rotateAngle);
        this.ctx.drawImage(this.birdImg,
                           this.imgBirdX,
                           this.imgBirdY,
                           this.imgBirdW,
                           this.imgBirdH,
                          -this.imgBirdW/2,
                          -this.imgBirdH/2,
                           this.imgBirdW,
                           this.imgBirdH);
        this.ctx.restore();
        // this.ctx.rect(this.canvasX,this.canvasY, this.imgBirdW,
        //     this.imgBirdH);
        // this.ctx.stroke();
        this.displayCol==2?this.displayCol=0:this.displayCol++;
    }
}