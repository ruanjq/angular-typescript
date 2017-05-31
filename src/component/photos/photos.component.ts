import { Component,OnInit } from '@angular/core';


@Component({
	selector:'photos',
	templateUrl:'./photos.component.html',
	styles: [`${require('./photos.component.less')}`]
})

export class PhotosComponent implements OnInit{


	photosList:Array<string> = [];

	constructor(){
		
	}

	ngOnInit(){
		this.photosList = this.generateUrl();
	}




	private generateUrl(){
		let list: Array<string> = [];
		let prefix_url = "http://www.windhome.win/src/images/My%20Photos/";
		list[0] = "photo (1).PNG";
		list[1] = "photo (2).JPG";
		list[2] = "photo (3).JPG";
		list[3] = "photo (4).JPG";
		list[4] = "photo (5).JPG";
		list[5] = "photo (6).JPG";
		list[6] = "photo (7).JPG";
		list[7] = "photo (8).JPG";
		list[8] = "photo (9).JPG";
		list[9] = "photo (10).JPG";
		list[10] = "photo (11).JPG";
		list[11] = "photo (12).JPG";
		list[12] = "photo (13).JPG";
		list[13] = "photo (14).JPG";
		list[14] = "photo (15).JPG";
		list[15] = "photo (16).JPG";
		list[16] = "photo (17).JPG";
		list[17] = "photo (18).JPG";
		list[18] = "photo (19).JPG";
		list[19] = "photo (20).JPG";
		list[20] = "photo (21).JPG";
		list[21] = "photo (22).JPG";
		list[22] = "photo (23).JPG";
		list[23] = "photo (24).JPG";
		list[24] = "photo (25).JPG";
		list[25] = "photo (26).jpg";
		list[26] = "photo (27).JPG";
		list[27] = "photo (28).JPG";
		list[28] = "photo (29).JPG";
		list[29] = "photo (30).JPG";
		list[30] = "photo (31).JPG";
		list[31] = "photo (32).JPG";
		list[32] = "photo (33).JPG";
		list[33] = "photo (34).JPG";
		list[34] = "photo (35).JPG";
		list[35] = "photo (36).JPG";
		list[36] = "photo (37).JPG";
		list[37] = "photo (38).JPG";
		list[38] = "photo (39).JPG";
		list[39] = "photo (40).JPG";
		list[40] = "photo (41).JPG";
		list[41] = "photo (42).JPG";
		list[42] = "photo (43).JPG";
		list[43] = "photo (44).JPG";
		list[44] = "photo (45).JPG";
		list[45] = "photo (46).JPG";
		list[46] = "photo (47).JPG";
		list[47] = "photo (48).JPG";
		list[48] = "photo (49).JPG";
		list[49] = "photo (50).jpg";
		list[50] = "photo (51).JPG";
		list[51] = "photo (52).JPG";
		list[52] = "photo (53).JPG";
		list[53] = "photo (54).JPG";
		list[54] = "photo (55).JPG";
		list[55] = "photo (56).JPG";
		list[56] = "photo (57).JPG";
		list[57] = "photo (58).JPG";
		list[58] = "photo (59).JPG";
		list[59] = "photo (60).JPG";

		return list.map(item => prefix_url + item);
	}
}