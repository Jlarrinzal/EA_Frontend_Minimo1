import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { PurchaseDetailComponent } from './components/purchase-detail/purchase-detail.component';

const routes: Routes = [
{
  path:'',
  redirectTo: 'inicio',
  pathMatch:'full'
},
{
  path:'inicio',
  component: InicioComponent
},
{
  path:'user',
  component: UserComponent
},
{
  path:'product',
  component: ProductComponent
},
{
  path:'userdetail/:_id',
  component: UserDetailComponent
},
{
  path:'proddetail/:_id',
  component: ProductDetailComponent
},
{
  path: 'purchase',
  component: PurchaseComponent
},
{
  path: 'purchasedetail/:_id',
  component: PurchaseDetailComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
