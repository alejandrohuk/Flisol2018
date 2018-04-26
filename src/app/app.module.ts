import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SalaChatPage } from '../pages/sala-chat/sala-chat';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { TiempoDesdeAhoraPipe} from '../pipes/tiempo-desde-ahora/tiempo-desde-ahora';
@NgModule({
  declarations: [
    TiempoDesdeAhoraPipe,
    MyApp,
    HomePage,
    ListPage,
    SalaChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),// <=
    //AngularFirestoreModule //<=
    AngularFirestoreModule.enablePersistence() //<==

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SalaChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
