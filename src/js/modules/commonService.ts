import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class CommonService{

	// Observable string sources
	private currentClass =  new Subject<string>();  

	// Observable string streams
	currentClass$ = this.currentClass.asObservable();



	// Service message commands
	publishCurrentClassData(data: string) {
    	this.currentClass.next(data);
	}


}