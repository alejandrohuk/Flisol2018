import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { chat } from '../../clases/chat';

import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sala-chat',
  templateUrl: 'sala-chat.html',
})
export class SalaChatPage {


		//difino los atributos
		coleccionTipadaFirebase:AngularFirestoreCollection<chat>;
		ListadoDeChatsObservable:Observable<chat[]>;
		mostrarSpinner:boolean;


		// en el constructor instancio el objeto AngularFireStore
		constructor(public VentanaAlert:AlertController, private objFirebase: AngularFirestore) {
	    this.mostrarSpinner=true;

	  	}
	  	   agregarMensaje(mensaje:string)
	  {
	     let nuevoMensaje:chat;
	     nuevoMensaje= new chat(mensaje);     
	     let objetoJsonGenerico= nuevoMensaje.dameJSON();
	     console.log (objetoJsonGenerico );
	     
	      this.objFirebase.collection<chat>('chatTest').add(objetoJsonGenerico).then(
	      Retorno=>
	      {
	        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	        console.log(`id= ${Retorno.id} ,  mensaje= ${mensaje}`);
	      }
	      ).catch( error=>{
	        console.error(error);
	      });
	  }

	  nuevoMensaje()
	  {
	    let prompt= this.VentanaAlert.create({
	        title: "Nuevo mensaje",
	        message:"ingrese un nuevo mensaje",
	        inputs:[{
	            name : 'mensaje',
	            placeholder:' aqui va el mensaje...'
	        }],
	        buttons:[{
	          text:'Cancelar'
	          },{
	          text:'Enviar',
	          handler:data=>{
	            this.agregarMensaje(data.mensaje);
	          }
	        }]
	    });
	    prompt.present();
	  }

		//enlazo los datos con firebase 
		ionViewDidEnter(){
		  	this.coleccionTipadaFirebase= this.objFirebase.collection<chat>('chatTest', ref=> ref.orderBy('tiempo')); 
		  	//para el filtrado mirar la documentación https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
		  	this.ListadoDeChatsObservable=this.coleccionTipadaFirebase.valueChanges();
		  	this.ListadoDeChatsObservable.subscribe(x => {
		    	console.info("conexión correcta con Firebase",x);
		    	 this.mostrarSpinner=false;
		    })
		  	 console.log("fin de ionViewDidEnter");
		}//fin ionViewDidEnter

}
