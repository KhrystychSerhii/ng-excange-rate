import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// routes component
import { AboutComponent, ExchangeComponent } from "./routes";

export const routes: Routes = [
  { path: "", redirectTo: "/exchange", pathMatch: "full" },
  { path: "exchange", component: ExchangeComponent },
  { path: "about", component: AboutComponent },
  { path: '**', redirectTo: '/exchange' }
];
