import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { loadRemoteModule } from '@angular-architects/native-federation';

function loadRemoteComponent(remoteName: string, componentName: string, expose: string) {
  return loadRemoteModule<Record<string, Type<unknown>>>(remoteName, expose).then(
    (m) => m[componentName],
  );
}

export const routes: Routes = [
  {
    path: 'produtos',
    loadComponent: () => loadRemoteComponent('produtos', 'App', './Component'),
  },
  {
    path: 'carrinho',
    loadComponent: () => loadRemoteComponent('produtos', 'Carrinho', './Carrinho'),
  },
  {
    path: 'grafico',
    loadComponent: () => loadRemoteComponent('grafico', 'App', './Component'),
  },
  { path: 'home', component: Home },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
