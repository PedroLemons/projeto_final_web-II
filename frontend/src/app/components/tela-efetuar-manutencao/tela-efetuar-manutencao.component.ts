import { Component, Input } from '@angular/core';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tela-visualizar',
  imports: [CommonModule, RouterLink, MatButtonModule],
  templateUrl: './tela-efetuar-manutencao.component.html',
  styleUrl: './tela-efetuar-manutencao.component.css'
})
export class TelaEfetuarManutencaoComponent {
  @Input() solicitacao: any;
  isLoaded = false;

  constructor (private solicitacaoService: SolicitacaoService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      const solicitacaoExistente = this.solicitacaoService.getSolicitacaoById(id);

      this.solicitacao = this.mergeWithDefault(solicitacaoExistente || { id });

      this.solicitacao.idFormatado = 'OS-' + this.solicitacao.id.toString().padStart(6, '0');

      setTimeout(() => {
        this.isLoaded = true;
      }, 100);
    });
  }

  private mergeWithDefault(solicitacao: any): any {
    const cliente = typeof solicitacao.cliente === 'string' 
      ? { nome: solicitacao.cliente }
      : solicitacao.cliente || {};
  
    const endereco = cliente.endereco || {};
    
    return {
      id: solicitacao.id || 0,
      idFormatado: 'OS-' + (solicitacao.id || 0).toString().padStart(6, '0'),
      equipamento: solicitacao.equipamento || 'Teclado DELL KB216 USB',
      categoria: solicitacao.categoria || 'Periférico',
      problema: solicitacao.defeito || solicitacao.problema || 'N/A',
      cliente: {
        nome: cliente.nome || 'Joana Joaquina',
        cpf: cliente.cpf || '000.000.000-00',
        email: cliente.email || 'joana@gmail.com',
        telefone: cliente.telefone || '(00) 00000-0000',
        endereco: {
          cep: endereco.cep || '00000-000',
          logradouro: endereco.logradouro || 'Rua dos bobos',
          complemento: endereco.complemento || 'N/A',
          cidade: endereco.cidade || 'Bobolópolis',
          estado: endereco.estado || 'Bobolândia'
        }
      },
      estado: solicitacao.estado === 'ORCADA' ? 'ORÇADA' : solicitacao.estado || 'ABERTA',
      dataHora: solicitacao.dataHora || new Date().toISOString()
    };
  }

  efetuarManutencao() {
    this.solicitacaoService.atualizarSolicitacao(this.solicitacao.id, 'ARRUMADA')
      .subscribe({
        next: () => {
          this.solicitacao.estado = 'ARRUMADA';
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erro ao atualizar a solicitação:', error);
        }
      });
  }

  redirecionarManutencao() {

  }
}
