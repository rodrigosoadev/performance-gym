
import React, { useState } from 'react';
import { Calendar, Clock, Users, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Agendamento {
  id: string;
  modalidade: string;
  icone: string;
  cor: string;
  data: Date;
  horario: string;
  instrutor: string;
  status: 'confirmado' | 'cancelado' | 'concluido';
}

const AgendamentosUsuario = () => {
  const { toast } = useToast();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
    {
      id: '1',
      modalidade: 'Musculação',
      icone: '🏋️',
      cor: '#5D9C31',
      data: new Date(2024, 11, 28), // 28 de dezembro
      horario: '14:30',
      instrutor: 'João Silva',
      status: 'confirmado'
    },
    {
      id: '2',
      modalidade: 'Natação',
      icone: '🏊',
      cor: '#5EBB99',
      data: new Date(2024, 11, 30), // 30 de dezembro
      horario: '18:00',
      instrutor: 'Ana Pereira',
      status: 'confirmado'
    },
    {
      id: '3',
      modalidade: 'Luta',
      icone: '🥋',
      cor: '#AD4F16',
      data: new Date(2024, 11, 25), // 25 de dezembro (passado)
      horario: '18:00',
      instrutor: 'Mestre Rafael',
      status: 'concluido'
    }
  ]);

  const [filter, setFilter] = useState<'todos' | 'confirmado' | 'concluido' | 'cancelado'>('todos');

  const handleCancelar = (id: string) => {
    setAgendamentos(prev => 
      prev.map(ag => 
        ag.id === id ? { ...ag, status: 'cancelado' as const } : ag
      )
    );
    toast({
      title: "Agendamento Cancelado",
      description: "Seu agendamento foi cancelado com sucesso.",
    });
  };

  const handleReagendar = (id: string) => {
    toast({
      title: "Reagendamento",
      description: "Redirecionando para nova data...",
    });
  };

  const agendamentosFiltrados = agendamentos.filter(ag => 
    filter === 'todos' || ag.status === filter
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmado':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">✅ Confirmado</span>;
      case 'cancelado':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">❌ Cancelado</span>;
      case 'concluido':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">✅ Concluído</span>;
      default:
        return null;
    }
  };

  const isPast = (data: Date) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return data.getTime() < hoje.getTime();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Meus Agendamentos</h2>
        
        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'todos', label: 'Todos', count: agendamentos.length },
            { key: 'confirmado', label: 'Confirmados', count: agendamentos.filter(a => a.status === 'confirmado').length },
            { key: 'concluido', label: 'Concluídos', count: agendamentos.filter(a => a.status === 'concluido').length },
            { key: 'cancelado', label: 'Cancelados', count: agendamentos.filter(a => a.status === 'cancelado').length }
          ].map(({ key, label, count }) => (
            <Button
              key={key}
              variant={filter === key ? 'default' : 'outline'}
              onClick={() => setFilter(key as any)}
              className="text-sm"
            >
              {label} ({count})
            </Button>
          ))}
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div className="space-y-4">
        {agendamentosFiltrados.map(agendamento => (
          <div
            key={agendamento.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              {/* Informações principais */}
              <div className="flex items-start space-x-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${agendamento.cor}20` }}
                >
                  {agendamento.icone}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {agendamento.modalidade}
                    </h3>
                    {getStatusBadge(agendamento.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {agendamento.data.toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{agendamento.horario}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{agendamento.instrutor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="flex flex-col space-y-2">
                {agendamento.status === 'confirmado' && !isPast(agendamento.data) && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReagendar(agendamento.id)}
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reagendar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelar(agendamento.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancelar
                    </Button>
                  </>
                )}
                
                {agendamento.status === 'cancelado' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReagendar(agendamento.id)}
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reagendar
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {agendamentosFiltrados.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum agendamento encontrado
          </h3>
          <p className="text-gray-600">
            {filter === 'todos' 
              ? 'Você ainda não tem agendamentos.' 
              : `Nenhum agendamento ${filter}.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AgendamentosUsuario;
