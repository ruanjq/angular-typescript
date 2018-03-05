 


import { Component,AfterViewInit } from "@angular/core";

const particle = require("./particle.js");

@Component({
	selector:"particle",
	template:`<div id="particle-canvas"></div>`,
	styles:[`
		#particle-canvas {
			width: 100%;
			height: 100%;
		}
	`]
})

export class ParticleComponent implements AfterViewInit{

	private canvasDiv:any = document.getElementById('particle-canvas');
	private options:any = {
		particleColor: '#888',
	 	background: 'https://raw.githubusercontent.com/JulianLaval/canvas-particle-network/master/img/demo-bg.jpg',
	  	interactive: true,
	  	speed: 'medium',
	  	density: 'high'
	};
	

	constructor(){

		
	}

	ngAfterViewInit(){
		// new particle.ParticleNetwork(this.canvasDiv, this.options);
	}

}