
import { Component } from '@angular/core';

@Component({
	selector:'player',
	templateUrl:'./player.component.html',
	styles:[`${require('./player.component.less')}`]
})

export class PlayerComponent{
	



	private audioList:Array<any> = [{
        id:1,
        name:"德国 - 德国第一装甲师进行曲",
        images:'./images/1.jpg',
        src:"./source/i1.mp3"
    },{
        id:2,
        name:"魔兽世界 - 亡灵序曲",
        images:'./images/2.jpg',
        src:"./source/The Dawn.mp3"
    },{
        id:3,
        name:"德国童声 - chenparty dj",
        images:'./images/3.jpg',
        src:"./source/chenparty dj.mp3"
    }]; 

    private currentAudio:any = this.audioList[0];
	constructor(){

	}    

}