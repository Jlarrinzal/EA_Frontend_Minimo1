import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { ProductComponent } from './components/product/product.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import {PurchaseComponent} from './components/purchase/purchase.component';
import { PurchaseDetailComponent } from './components/purchase-detail/purchase-detail.component';
import { PurchaseNotificationComponent } from './components/notifications/purchase-notification/purchase-notification.component';
import { PurchaseFailureNotificationComponent } from './components/notifications/purchase-failure-notification/purchase-failure-notification.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProductComponent,
    InicioComponent,
    UserDetailComponent,
    ProductDetailComponent,
    PurchaseComponent,
    PurchaseDetailComponent,
    PurchaseNotificationComponent,
    PurchaseFailureNotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
