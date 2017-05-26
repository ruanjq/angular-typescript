import { Component, HostListener, ElementRef, Inject, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
    selector: 'player',
    templateUrl: './player.component.html',
    styles: [`${require('./player.component.less')}`]
})

export class PlayerComponent implements AfterViewInit {

    private audioList: Array < any > = [{
        id: 0,
        name: "德国 - 德国第一装甲师进行曲",
        images: 'http://www.windhome.win/src/images/1.jpg',
        src: "http://www.windhome.win/src/source/chenparty dj.mp3"
    }, {
        id: 1,
        name: "魔兽世界 - 亡灵序曲",
        images: 'http://www.windhome.win/src/images/2.jpg',
        src: "http://www.windhome.win/src/source/i1.mp3"
    }, {
        id: 2,
        name: "德国童声 - chenparty dj",
        images: 'http://www.windhome.win/src/images/3.jpg',
        src: "http://www.windhome.win/src/source/The Dawn.mp3"
    }];

    private currentAudio = this.audioList[0];

    private audio: any;

    private isPlayer: Boolean = false;
    private isMute: Boolean = false;
    private initVolume:Number = 1;
    private time:String = "00:00";

    @ViewChild('audioMp3') audioViewChild: any;
    @ViewChild('paceVolume') paceVolume: any;
    @ViewChild('sliderHandleVolume') sliderHandleVolume: any;
    @ViewChild('paceTime') paceTime: any;
    @ViewChild('sliderHandleTime') sliderHandleTime: any;







    constructor(renderer: Renderer) {

    }


    ngAfterViewInit() {
        let _self = this;
        this.audio = this.audioViewChild.nativeElement;
        this.audio.addEventListener("timeupdate", function() {
        	_self.time = _self.setPlayTime(Math.floor(this.currentTime));
        });

        this.audio.addEventListener("pause", function() {

            _self.isPlayer = false;
        })

        this.audio.addEventListener("play", function() {
            _self.isPlayer = true;
        })

        this.audio.addEventListener("volumechange", function() {
        	if(this.volume == 0){
        		_self.isMute = true;
        	} else{
        		_self.isMute = false;
        	}
        });





    }
    previous() {
        let index = this.currentAudio.id;
        index--;
        if(index < 0){
            index = this.audioList[this.audioList.length - 1].id;
        }
        
        this.setPlayer(this.audioList[index]);
    }

    next() {
        let index = this.currentAudio.id;
        index++;
        if(index >= this.audioList.length){
            index = this.audioList[0].id;
        }

        this.setPlayer(this.audioList[index]);
    }

    player() {
        if (this.audio.paused) {
            this.audio.play(); //播放

        } else {
            this.audio.pause();
        }
    }

    mute() {
        if (this.audio.volume > 0) {
            this.audio.volume = 0;
        } else {
            this.audio.volume = this.initVolume;
        }
    }


    setPlayer(item: any) {
        this.time = "00:00";
        this.currentAudio = item;
        this.audio.load();
        this.audio.play();
    }


    private setPlayTime(currentTime:any) {
        currentTime = currentTime.toFixed(0);
        if (currentTime >= 60) {
            var minute = Math.floor(currentTime / 60);
            var surplus = currentTime % 60;
            if (surplus < 10) {
                surplus = "0" + surplus;
            }
            return minute < 10 ? "0" + minute + ":" + surplus : minute + ":" + surplus;

        } else {
            return currentTime < 10 ? "00:" + "0" + currentTime : "00:" + currentTime;

        }
    }
}
