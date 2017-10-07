function Background(option){
    this.cvs = option.cvs;
    this.backgroundImg = option.img;
    this.bgX = option.x||0;
    this.bgY = option.y||0;
    this.flySpeed = option.flySpeed||1;
    this.coefficient = option.coefficient||1;

    this.ctx = this.cvs.getContext('2d');
}

Background.prototype = {
    constructor:Background,
    draw:function(){
        this.bgX -=this.flySpeed;
        this.ctx.drawImage(this.backgroundImg,this.bgX,this.bgY); 
        if(this.bgX<=-this.backgroundImg.width){
            this.bgX +=this.coefficient*this.backgroundImg.width
        } 
    }
}