
import React, { useState } from 'react';
import { Clock, Users, MapPin, Star, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Modalidade {
  id: string;
  nome: string;
  icone: string;
  cor: string;
  dias: string[];
  horarios: any[];
  preco_mensal: number;
  aula_experimental: boolean;
  descricao: string;
  imagem: string;
}

interface CardModalidadeProps {
  modalidade: Modalidade;
  isUsuarioMatriculado: boolean;
  onAgendar: (modalidade: string, horarioId: string) => void;
  onMatricular: (modalidade: string) => void;
}

const CardModalidade = ({ modalidade, isUsuarioMatriculado, onAgendar, onMatricular }: CardModalidadeProps) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'disponivel': return '🟢';
      case 'poucas-vagas': return '🟡';
      case 'lotado': return '🔴';
      case 'lista-espera': return '⏰';
      default: return '⚪';
    }
  };

  const getStatusText = (status: string, vagas_total: number, vagas_ocupadas: number) => {
    const vagasLivres = vagas_total - vagas_ocupadas;
    switch (status) {
      case 'disponivel': return `${vagasLivres} vagas disponíveis`;
      case 'poucas-vagas': return `Apenas ${vagasLivres} vagas`;
      case 'lotado': return 'Lotado';
      case 'lista-espera': return 'Lista de espera';
      default: return 'Status desconhecido';
    }
  };

  const formatDias = (dias: string[]) => {
    const diasAbrev = {
      'segunda': 'Seg',
      'terca': 'Ter', 
      'quarta': 'Qua',
      'quinta': 'Qui',
      'sexta': 'Sex',
      'sabado': 'Sáb',
      'domingo': 'Dom'
    };
    return dias.map(dia => diasAbrev[dia as keyof typeof diasAbrev] || dia).join(', ');
  };

  const proximoHorario = modalidade.horarios.find(h => h.status !== 'lotado');

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Header com imagem */}
      <div 
        className="h-48 bg-gradient-to-r from-gray-400 to-gray-600 relative overflow-hidden"
        style={{ backgroundColor: modalidade.cor }}
      >
        <img 
          src={modalidade.imagem} 
          alt={modalidade.nome}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Badge de aula experimental */}
        {modalidade.aula_experimental && (
          <div className="absolute top-4 right-4 bg-[#5D9C31] text-white px-3 py-1 rounded-full text-sm font-medium">
            Aula Grátis
          </div>
        )}
        
        {/* Ícone e nome */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">{modalidade.icone}</div>
            <div>
              <h3 className="text-2xl font-bold text-white">{modalidade.nome}</h3>
              <p className="text-white/90 text-sm">{modalidade.descricao}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-6">
        {/* Informações principais */}
        <div className="space-y-3 mb-6">
          {/* Dias de funcionamento */}
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              📅 {formatDias(modalidade.dias)}
            </span>
          </div>

          {/* Próximo horário */}
          {proximoHorario && (
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                ⏰ Próximo: {proximoHorario.inicio}
              </span>
              <span className="text-sm font-medium" style={{ color: modalidade.cor }}>
                {getStatusIcon(proximoHorario.status)} {getStatusText(proximoHorario.status, proximoHorario.vagas_total, proximoHorario.vagas_ocupadas)}
              </span>
            </div>
          )}

          {/* Instrutor */}
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              👨‍💼 {modalidade.horarios[0]?.instrutor}
            </span>
          </div>
        </div>

        {/* Horários expandidos */}
        {expanded && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Todos os Horários:</h4>
            <div className="space-y-2">
              {modalidade.horarios.map(horario => (
                <div key={horario.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{horario.inicio} - {horario.fim}</div>
                    <div className="text-sm text-gray-600">
                      {horario.instrutor} • {horario.nivel}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {getStatusIcon(horario.status)} {getStatusText(horario.status, horario.vagas_total, horario.vagas_ocupadas)}
                    </div>
                    {isUsuarioMatriculado && horario.status !== 'lotado' && (
                      <Button
                        size="sm"
                        onClick={() => onAgendar(modalidade.nome, horario.id)}
                        className="mt-1 bg-[#5D9C31] hover:bg-[#4a7d28] text-white"
                      >
                        Agendar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toggle para mostrar/ocultar horários */}
        <Button
          variant="outline"
          onClick={() => setExpanded(!expanded)}
          className="w-full mb-4 border-gray-200 text-gray-600 hover:text-gray-800"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-2" />
              Ocultar Horários
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              Ver Mais Horários ({modalidade.horarios.length})
            </>
          )}
        </Button>

        {/* Preço */}
        <div className="text-center mb-6">
          <div className="text-2xl font-bold" style={{ color: modalidade.cor }}>
            R$ {modalidade.preco_mensal.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">por mês</div>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          {isUsuarioMatriculado ? (
            <Button
              className="w-full bg-[#5D9C31] hover:bg-[#4a7d28] text-white font-bold py-3"
              onClick={() => proximoHorario && onAgendar(modalidade.nome, proximoHorario.id)}
              disabled={!proximoHorario || proximoHorario.status === 'lotado'}
            >
              {proximoHorario && proximoHorario.status !== 'lotado' ? 'Agendar Agora' : 'Sem Vagas Disponíveis'}
            </Button>
          ) : (
            <>
              <Button
                className="w-full font-bold py-3"
                style={{ backgroundColor: modalidade.cor }}
                onClick={() => onMatricular(modalidade.nome)}
              >
                {modalidade.aula_experimental ? 'Experimentar Grátis' : 'Matricule-se'}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                style={{ borderColor: modalidade.cor, color: modalidade.cor }}
              >
                Falar com Consultor
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardModalidade;
