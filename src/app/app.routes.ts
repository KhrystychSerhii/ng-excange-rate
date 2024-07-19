import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// routes component
import { AboutComponent, ExcangeComponent } from "./routes";

export const routes: Routes = [
  { path: "", redirectTo: "/exchange", pathMatch: "full" },
  { path: "exchange", component: ExcangeComponent },
  { path: "about", component: AboutComponent },
  { path: '**', redirectTo: '/exchange' }
];
