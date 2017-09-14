import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'photos',
    templateUrl: './photos.component.html',
    styles: [`${require('./photos.component.less')}`]
})

export class PhotosComponent implements OnInit {


    photosList: Array < string > = [];

    constructor() {

    }

    ngOnInit() {
        this.photosList = this.generateUrl();
    }




    private generateUrl() {
        let list: Array < string > = [];
        let prefix_url = "http://www.windhome.win/src/images/My%20Photos/";
        list.push("photo (1).PNG");
        list.push("photo (2).JPG");
        list.push("photo (4).JPG");
        list.push("photo (7).JPG");
        list.push("photo (8).JPG");
        list.push("photo (9).JPG");
        list.push("photo (10).JPG")
        list.push("photo (11).JPG");
        list.push("photo (12).JPG");
        list.push("photo (13).JPG");
        list.push("photo (14).JPG");
        list.push("photo (15).JPG");
        list.push("photo (16).JPG");
        list.push("photo (17).JPG");
        list.push("photo (18).JPG");
        list.push("photo (19).JPG");
        list.push("photo (20).JPG");
        list.push("photo (21).JPG");
        list.push("photo (22).JPG");
        list.push("photo (23).JPG");
        list.push("photo (24).JPG");
        list.push("photo (25).JPG");
        list.push("photo (26).jpg");
        list.push("photo (28).jpg");
        list.push("photo (29).jpg");
        list.push("photo (30).JPG");
        list.push("photo (31).JPG");
        list.push("photo (32).JPG");
        list.push("photo (33).JPG");
        list.push("photo (34).JPG");
        list.push("photo (35).JPG");
        list.push("photo (36).JPG");
        list.push("photo (37).JPG");
        list.push("photo (38).JPG");
        list.push("photo (39).JPG");
        list.push("photo (40).JPG");
        list.push("photo (41).JPG");
        list.push("photo (44).JPG");
        list.push("photo (45).JPG");
        list.push("photo (46).JPG");
        list.push("photo (47).JPG");
        list.push("photo (48).JPG");
        list.push("photo (49).JPG");
        list.push("photo (51).JPG");
        list.push("photo (52).JPG");
        list.push("photo (53).JPG");
        list.push("photo (54).JPG");
        list.push("photo (55).JPG");
        list.push("photo (56).JPG");
        list.push("photo (57).JPG");
        list.push("photo (58).JPG");
        list.push("photo (59).JPG");
        list.push("photo (60).JPG");
        list.push("photo (61).jpg");

        return list.map(item => prefix_url + item);
    }
}
