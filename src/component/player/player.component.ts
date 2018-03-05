import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
    selector: 'player',
    templateUrl: './player.component.html',
    styles: [`${require('./player.component.less')}`]
})

export class PlayerComponent implements AfterViewInit {

    private audioList: Array < any > = [{
        id: 0,
        name: "DJ OKAWARI - Flower Dance.mp3",
        images: 'http://p1.music.126.net/P1ac-TWkFzjDqcvl5_oK7Q==/881808325476577.jpg?param=130y130',
        src: "http://www.windhome.win/src/source/DJ OKAWARI - Flower Dance.mp3"
    }, {
        id: 1,
        name: "Shirfine - Illusionary Daytime.mp3",
        images: 'http://p3.music.126.net/8xNVCemkSNQptEyNw1PHKg==/8914840278033758.jpg?param=130y130',
        src: "http://www.windhome.win/src/source/Shirfine - Illusionary Daytime.mp3"
    }, {
        id: 2,
        name: "DJ OKAWARI - Luv Letter.mp3",
        images: 'http://p4.music.126.net/YXY1vPG5rtdV7w_cWDnNWw==/884007348732141.jpg?param=130y130',
        src: "http://www.windhome.win/src/source/DJ OKAWARI - Luv Letter.mp3"
    },{
        id: 3,
        name: "Alan Walker - Faded.mp3",
        images: 'http://p1.music.126.net/8dzD62VK8jLDbhEqkmpIAg==/18277181788626198.jpg?param=130y130',
        src: "http://www.windhome.win/src/source/Alan Walker - Faded.mp3"
    },{
        id: 4,
        name: "Two Steps From Hell - Victory.mp3",
        images: 'http://p4.music.126.net/Cn65Vr_LgPzS-Slkmuz8Hg==/2919203372658131.jpg?param=130y130',
        src: "http://www.windhome.win/src/source/Two Steps From Hell - Victory.mp3"
    },{
        id: 5,
        name: "石进-夜的钢琴曲五.mp3",
        images: 'http://pic.xiami.net/images/album/img1/77201/4065321287132984.jpg@1e_1c_100Q_185w_185h',
        src: "http://www.windhome.win/src/source/shijin - ydgqq5.mp3"
    }];

    private currentAudio = this.audioList[0];

    private audio: any;

    private isPlayer: boolean = false;
    private isMute: boolean = false;
    private initVolume: number = 1;
    private time: string = "00:00";

    private volumeWidth: string = "100%";
    private timeWidth: string = "0";
    private loaded: string = "0";

    private x_axis: Array < number > = [0, 0];

    @ViewChild('audioMp3') audioViewChild: any;
    @ViewChild('sliderVolume') sliderVolume: any;
    @ViewChild('sliderTime') sliderTime: any;
    @ViewChild('paceVolume') paceVolume: any;
    @ViewChild('sliderHandleVolume') sliderHandleVolume: any;
    @ViewChild('paceTime') paceTime: any;
    @ViewChild('sliderHandleTime') sliderHandleTime: any;

    constructor(@Inject(DOCUMENT) private document: Document) {

    }


    ngAfterViewInit() {
        let _self = this;
        this.audio = this.audioViewChild.nativeElement;
        this.audio.play();
        this.audio.addEventListener("timeupdate", function() {
            let percent = (this.currentTime / this.duration * 100).toFixed(2);
            _self.time = _self.setPlayTime(Math.floor(this.currentTime));
            _self.timeWidth = percent + "%";

        });

        this.audio.addEventListener("pause", function() {

            _self.isPlayer = false;
        })

        this.audio.addEventListener("play", function() {
            _self.isPlayer = true;
        })

        this.audio.addEventListener("ended", function() {
            _self.next();
        })

        this.audio.addEventListener("volumechange", function() {
            _self.volumeWidth = this.volume * 100 + "%";
            if (this.volume == 0) {
                _self.isMute = true;
            } else {
                _self.isMute = false;
            }
        });

        this.audio.addEventListener('progress', function() {
            if (this.readyState === 4) {
                let w = 100 * (this.buffered.end(0)) / this.duration;
                _self.loaded = w + "%";
            }
        });



    }
    previous() {
        let index = this.currentAudio.id;
        index--;
        if (index < 0) {
            index = this.audioList[this.audioList.length - 1].id;
        }

        this.setPlayer(this.audioList[index]);
    }

    volumemousedown(ev: any) {
        let _self = this;
        let sliderVolume = this.sliderVolume.nativeElement;
        let sliderHandleVolume = this.sliderHandleVolume.nativeElement;
        let paceVolume = this.paceVolume.nativeElement;
        let audio = this.audioViewChild.nativeElement;
        _self.x_axis[0] = ev.clientX;
        this.document.onmousemove = function(ev1) {
            let moveX = ev1.clientX - _self.x_axis[0];
            let left = parseInt(_self.getStyle(sliderHandleVolume, "left")) + moveX;
            let percent = _self.calcPercent(left, sliderVolume.clientWidth);
            if (percent >= 100) {
                percent = 100;
            } else if (percent <= 0) {
                percent = 0;
            }
            if (ev1.clientX >= paceVolume.getBoundingClientRect().left && ev1.clientX <= paceVolume.getBoundingClientRect().left + sliderVolume.clientWidth) {
                audio.volume = percent / 100;
                _self.initVolume = audio.volume;
                _self.volumeWidth = percent + "%";
            }

            _self.x_axis[0] = ev1.clientX;
        }

        this.document.onmouseup = function(ev) {
            _self.document.onmousemove = null;
            _self.document.onmouseup = null;

        }
    }

    timemousedown(ev: any) {
        let _self = this;
        let audio = this.audioViewChild.nativeElement;
        let sliderTime = this.sliderTime.nativeElement;
        let sliderHandleTime = this.sliderHandleTime.nativeElement;
        let paceTime = this.paceTime.nativeElement;
        _self.x_axis[1] = ev.clientX;

        this.document.onmousemove = function(ev1) {
            audio.pause(); //播放
            let moveX = ev1.clientX - _self.x_axis[1];
            let left = parseInt(_self.getStyle(sliderHandleTime, "left")) + moveX;
            let percent = _self.calcPercent(left, sliderTime.clientWidth);
            if (percent >= 100) {
                percent = 100;
            } else if (percent <= 0) {
                percent = 0;
            }
            if (ev1.clientX >= paceTime.getBoundingClientRect().left && ev1.clientX <= paceTime.getBoundingClientRect().left + sliderTime.clientWidth) {
                audio.currentTime = percent / 100 * audio.duration;
                _self.timeWidth = percent + "%";
            }


            _self.x_axis[1] = ev1.clientX;
        }

        this.document.onmouseup = function(ev) {
            audio.play(); //播放
            _self.document.onmousemove = null;
            _self.document.onmouseup = null;

        }
    }

    next() {
        let index = this.currentAudio.id;
        index++;
        if (index >= this.audioList.length) {
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
        this.timeWidth = "0";
        this.loaded = "0";
        this.time = "00:00";
        this.currentAudio = item;
        this.audio.load();
        this.audio.play();
    }


    private setPlayTime(currentTime: any) {
        currentTime = currentTime.toFixed(0);
        if (currentTime >= 60) {
            var minute = Math.floor(currentTime / 60);
            var surplus = currentTime % 60;
            if (surplus < 10) {
                return minute < 10 ? "0" + minute + ":" + "0" + surplus : minute + ":" + surplus;
            } else {
                return minute < 10 ? "0" + minute + ":" + surplus : minute + ":" + surplus;
            }

        } else {
            return currentTime < 10 ? "00:" + "0" + currentTime : "00:" + currentTime;

        }
    }

    private calcPercent(current: any, total: any) {
        return (current / total * 100);
    }

    private getStyle(obj: any, name: string) {
        if (obj.currentStyle) {
            return obj.currentStyle[name];
        } else {
            return window.getComputedStyle(obj)[name];
        }
    }
}
