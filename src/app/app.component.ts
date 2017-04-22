import { Router, NavigationEnd } from '@angular/router';	

import { Component,OnInit  } from '@angular/core';

import '../styles/less/styles';

@Component({
	selector:'app',
	templateUrl:'./app.component.html',
	styleUrls :['./app.component.css']
})

export class AppComponent implements OnInit {

	constructor(private router: Router){

	}

	ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            // NavigationEnd
            // NavigationCancel
            // NavigationError
            // RoutesRecognized
            window.scrollTo(0, 0)
        });
    }
}