import { Injectable } from '@angular/core';
import { Tarefa } from './tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor() { }

  listarTodos(): Tarefa[] {
    const tarefas = localStorage['tarefas'];
    return tarefas ? JSON.parse(tarefas) : [];
  }

  cadastrarTarefa(tarefa: Tarefa): void {
    let tarefas = this.listarTodos();
    tarefa.id = new Date().getTime();
    tarefas = [...tarefas, tarefa];
    localStorage['tarefas'] = JSON.stringify(tarefas)
  }

  buscarTarefaPorId(id: number): Tarefa {
    const tarefas: Tarefa[] = this.listarTodos();
    return tarefas.find(tarefa => tarefa.id === id);
  }

  atualizarTarefa(tarefa: Tarefa): void {
    const tarefas: Tarefa[] = this.listarTodos();
    tarefas.forEach((obj, index, objs) => { // ta verificando a tarefa, o index, e a lista das tarefas
      if (tarefa.id === obj.id) {
        objs[index] = tarefa;
      }
    });
    localStorage['tarefas'] = JSON.stringify(tarefas)
  }

  removerTarefa(id: number): void {
    let tarefas: Tarefa[] = this.listarTodos();
    tarefas = tarefas.filter(tarefa => tarefa.id !== id)
    localStorage['tarefas'] = JSON.stringify(tarefas)
  }

  alterarStatusDaTarefa(id: number): void {
    const tarefas: Tarefa[] = this.listarTodos();
    tarefas.map(tarefa => {
      if (tarefa.id === id) {
        tarefa.concluida = !tarefa.concluida;
      }
    });
    localStorage['tarefas'] = JSON.stringify(tarefas)
  }

  
}
