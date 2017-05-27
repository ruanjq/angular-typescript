

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule,Routes} from '@angular/router';

import { HttpModule } from '@angular/http';

import { Variable } from '../js/modules/constConfig';
import { CommonService } from '../js/modules/commonService';

// 自定义组件
import { AppComponent } from './app.component';
import { HomeComponent } from '../component/home/home.component';
import { DetailsComponent } from '../component/detail/details.component';
import { BlogsListComponent } from '../component/list/list.component';
import { ResumeComponent } from '../component/resume/resume.component';
import { AboutComponent } from '../component/about/about.component';
import { SideBarComponent } from '../component/sideBar/sideBar.component';
import { PlayerComponent } from '../component/player/player.component';
import { PhotosComponent } from '../component/photos/photos.component';
// 自定义管道
import { DateFormatPipe } from '../js/modules/dateFormat.pipe';


// 自定义指令
import { LazyDirective } from '../js/modules/lazy.directive';


/**
 * [ app router config constant ]
 * @type {Routes}
 */
const routerConfig:Routes = [
	{path:'home',component:HomeComponent},
	{path:'blogs-list/:page_index',component:HomeComponent},
	{path:'blogs-category/:category_id',component:HomeComponent},
	{path:'blogs-tags/:tags',component:HomeComponent},
	{path:'blogs-search/:keywords',component:HomeComponent},
	{path:'about',component:AboutComponent},
	{path:'blogs-read/:blog_id',component:DetailsComponent},
	{path:'resume',component:ResumeComponent},
	{path:'photos',component:PhotosComponent},
	{path:'',redirectTo:'/home',pathMatch:'full'}
]


@NgModule({
	imports:[
		BrowserModule,
		HttpModule,
		FormsModule,
		RouterModule.forRoot(routerConfig,{ useHash: true })
	],
	declarations:[
		AppComponent,
		HomeComponent,
		DetailsComponent,
		BlogsListComponent,
		ResumeComponent,
		PlayerComponent,
		PhotosComponent,
		AboutComponent,SideBarComponent,DateFormatPipe,LazyDirective
	],
	providers:[Variable,CommonService],
	bootstrap: [ AppComponent ]
})

export class AppModule {
	constructor(){
		
	}
}