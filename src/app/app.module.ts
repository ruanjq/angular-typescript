

import { NgModule } from '@angular/core';

import { BrowserModule }  from '@angular/platform-browser';

import { RouterModule,Routes } from '@angular/router';


// 自定义组件
import { AppComponent } from './app.component';
import { HomeComponent } from '../component/home/home.component';
import { DetailsComponent } from '../component/detail/details.component';
import { BlogsListComponent } from '../component/list/list.component';
import { ResumeComponent } from '../component/resume/resume.component';
import { AboutComponent } from '../component/about/about.component';
import { SideBarComponent } from '../component/sideBar/sideBar.component';

/**
 * [ app router config constant ]
 * @type {Routes}
 */
const routerConfig:Routes = [
	{path:'home',component:HomeComponent},
	{path:'blogs-list',component:BlogsListComponent},
	{path:'about',component:AboutComponent},
	{path:'blogs-read',component:DetailsComponent},
	{path:'resume',component:ResumeComponent},
	{path:'',redirectTo:'/home',pathMatch:'full'}
]


@NgModule({
	imports:[
		BrowserModule,
		RouterModule.forRoot(routerConfig)
	],
	declarations:[
		AppComponent,
		HomeComponent,
		DetailsComponent,
		BlogsListComponent,
		ResumeComponent,
		AboutComponent,SideBarComponent
	],
	bootstrap: [ AppComponent ]
})

export class AppModule {}