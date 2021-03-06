import { Cliente } from './../../modelo/cliente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClienteServicio } from 'src/app/servicios/clente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  id: string;

constructor(private clienteServicio: ClienteServicio,
            private flashMessages: FlashMessagesService,
            private router: Router,
            private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteServicio.getCliente(this.id).subscribe( cliente => {
      this.cliente = cliente;
    });
  }

  guardar({value, valid}: {value: Cliente, valid: boolean}){
    if (!valid) {
      this.flashMessages.show('Todos los campos son requeridos', {cssClass: 'alert-danger',
    timeout: 3000});
    } else {
      value.id = this.id;
      //Modificar el cliente
      this.clienteServicio.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }

  eliminar(){
    if (confirm('Esta seguro de eliminar este cliente?')) {
      this.clienteServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }
}
