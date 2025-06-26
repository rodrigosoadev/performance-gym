
import React, { useState } from 'react';
import { X, Clock, Users, User, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Aula {
  id: string;
  modalidade: 'musculacao' | 'natacao' | 'luta';
  horario_inicio: string;
  horario_fim: string;
  vagas_total: number;
  vagas_ocupadas: number;
  instrutor: string;
  nivel: string;
  icone: string;
  cor: string;
}

interface ModalAgendamentoProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  modalidade: 'musculacao' | 'natacao' | 'luta';
  onAgendar: (aula: Aula) => void;
}

const ModalAgendamento = ({ isOpen, onClose, selectedDate, modalidade, onAgendar }: ModalAgendamentoProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [agendamentoSucesso, setAgendamentoSucesso] = useState(false);

  // Mock data das aulas baseado na data e modalidade
  const getAulasDoDia = (): Aula[] => {
    if (!selectedDate) return [];

    const dayOfWeek = selectedDate.getDay();
    const aulas: Aula[] = [];

    // Musculação - todos os dias
    if (modalidade === 'musculacao') {
      const horarios = [];
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        // Segunda a sexta: 6h às 22h
        for (let hora = 6; hora <= 21; hora++) {
          horarios.push({
            inicio: `${hora.toString().padStart(2, '0')}:00`,
            fim: `${(hora + 1).toString().padStart(2, '0')}:00`,
            vagas: Math.floor(Math.random() * 20) + 5,
            total: 25,
            instrutor: ['João Silva', 'Maria Santos', 'Pedro Costa'][Math.floor(Math.random() * 3)]
          });
        }
      } else if (dayOfWeek === 6) {
        // Sábado: 8h às 18h
        for (let hora = 8; hora <= 17; hora++) {
          horarios.push({
            inicio: `${hora.toString().padStart(2, '0')}:00`,
            fim: `${(hora + 1).toString().padStart(2, '0')}:00`,
            vagas: Math.floor(Math.random() * 15) + 3,
            total: 20,
            instrutor: ['Ana Oliveira', 'Carlos Mendes'][Math.floor(Math.random() * 2)]
          });
        }
      } else if (dayOfWeek === 0) {
        // Domingo: 9h às 17h
        for (let hora = 9; hora <= 16; hora++) {
          horarios.push({
            inicio: `${hora.toString().padStart(2, '0')}:00`,
            fim: `${(hora + 1).toString().padStart(2, '0')}:00`,
            vagas: Math.floor(Math.random() * 12) + 2,
            total: 15,
            instrutor: ['Lucia Ferreira', 'Roberto Silva'][Math.floor(Math.random() * 2)]
          });
        }
      }

      horarios.forEach((h, index) => {
        aulas.push({
          id: `musculacao-${index}`,
          modalidade: 'musculacao',
          horario_inicio: h.inicio,
          horario_fim: h.fim,
          vagas_total: h.total,
          vagas_ocupadas: h.total - h.vagas,
          instrutor: h.instrutor,
          nivel: 'Todos os níveis',
          icone: '🏋️',
          cor: '#5D9C31'
        });
      });
    }

    // Natação - Segunda a sexta
    if (modalidade === 'natacao' && dayOfWeek >= 1 && dayOfWeek <= 5) {
      const horariosNatacao = [
        { inicio: '07:00', fim: '08:00', vagas: 8, total: 12, instrutor: 'Carlos Aquático', nivel: 'Iniciante' },
        { inicio: '08:00', fim: '09:00', vagas: 5, total: 12, instrutor: 'Ana Pereira', nivel: 'Intermediário' },
        { inicio: '09:00', fim: '10:00', vagas: 3, total: 12, instrutor: 'Roberto Silva', nivel: 'Avançado' },
        { inicio: '18:00', fim: '19:00', vagas: 6, total: 12, instrutor: 'Ana Pereira', nivel: 'Iniciante' },
        { inicio: '19:00', fim: '20:00', vagas: 4, total: 12, instrutor: 'Carlos Aquático', nivel: 'Intermediário' },
        { inicio: '20:00', fim: '21:00', vagas: 8, total: 12, instrutor: 'Roberto Silva', nivel: 'Avançado' }
      ];

      horariosNatacao.forEach((h, index) => {
        aulas.push({
          id: `natacao-${index}`,
          modalidade: 'natacao',
          horario_inicio: h.inicio,
          horario_fim: h.fim,
          vagas_total: h.total,
          vagas_ocupadas: h.total - h.vagas,
          instrutor: h.instrutor,
          nivel: h.nivel,
          icone: '🏊',
          cor: '#5EBB99'
        });
      });
    }

    // Luta - Segunda a sexta + Sábado especial
    if (modalidade === 'luta') {
      if (dayOfWeek === 6) {
        // Sábado especial
        aulas.push({
          id: 'luta-defesa',
          modalidade: 'luta',
          horario_inicio: '09:00',
          horario_fim: '10:30',
          vagas_total: 20,
          vagas_ocupadas: 12,
          instrutor: 'Mestre Rafael',
          nivel: 'Defesa Pessoal',
          icone: '🥊',
          cor: '#AD4F16'
        });
      } else if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        const horarios = [
          { inicio: '18:00', fim: '19:00', instrutor: 'Professor Bruno', nivel: 'Muay Thai' },
          { inicio: '19:00', fim: '20:00', instrutor: 'Professor Marcos', nivel: 'Jiu-Jitsu' },
          { inicio: '20:00', fim: '21:00', instrutor: 'Professor Diego', nivel: 'Boxe' }
        ];

        horarios.forEach((h, index) => {
          aulas.push({
            id: `luta-${index}`,
            modalidade: 'luta',
            horario_inicio: h.inicio,
            horario_fim: h.fim,
            vagas_total: 18,
            vagas_ocupadas: Math.floor(Math.random() * 12) + 2,
            instrutor: h.instrutor,
            nivel: h.nivel,
            icone: '🥋',
            cor: '#AD4F16'
          });
        });
      }
    }

    return aulas;
  };

  const getStatusVaga = (vagas_ocupadas: number, vagas_total: number) => {
    const percentual = (vagas_ocupadas / vagas_total) * 100;
    if (percentual >= 100) return { status: 'lotado', cor: '#BC1B18', emoji: '🔴' };
    if (percentual >= 80) return { status: 'poucas-vagas', cor: '#FED54A', emoji: '🟡' };
    return { status: 'disponivel', cor: '#5D9C31', emoji: '🟢' };
  };

  const handleAgendar = async (aula: Aula) => {
    setIsLoading(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setAgendamentoSucesso(true);
    
    // Após 2 segundos, fechar o modal
    setTimeout(() => {
      setAgendamentoSucesso(false);
      onAgendar(aula);
      onClose();
    }, 2000);
  };

  const aulas = getAulasDoDia();

  if (agendamentoSucesso) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-[#5D9C31] rounded-full flex items-center justify-center mb-4 animate-scale-in">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Agendamento Confirmado! 🎉
            </h3>
            <p className="text-gray-600">
              Sua aula foi agendada com sucesso. Você receberá uma confirmação por WhatsApp.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            📅 {selectedDate?.toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            }).toUpperCase()}
          </DialogTitle>
        </DialogHeader>

        {aulas.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">😴</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Sem aulas programadas
            </h3>
            <p className="text-gray-600">
              Não há aulas de {modalidade} programadas para este dia.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {aulas.map((aula) => {
              const statusInfo = getStatusVaga(aula.vagas_ocupadas, aula.vagas_total);
              const vagasDisponiveis = aula.vagas_total - aula.vagas_ocupadas;
              
              return (
                <div key={aula.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${aula.cor}20` }}
                      >
                        {aula.icone}
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {aula.modalidade.toUpperCase()}
                        </h4>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {aula.horario_inicio} - {aula.horario_fim}
                          </div>
                          
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span style={{ color: statusInfo.cor }} className="font-medium">
                              {statusInfo.emoji} {vagasDisponiveis > 0 ? `${vagasDisponiveis} vagas` : 'LOTADO'}
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {aula.instrutor}
                          </div>
                        </div>
                        
                        <div className="mt-1">
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {aula.nivel}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {vagasDisponiveis > 0 ? (
                        <Button
                          onClick={() => handleAgendar(aula)}
                          disabled={isLoading}
                          className="bg-[#5D9C31] hover:bg-[#4a7d28] text-white px-6 py-2"
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Agendando...
                            </div>
                          ) : (
                            'AGENDAR'
                          )}
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="border-[#FED54A] text-[#AD4F16] hover:bg-[#FED54A]/10 px-6 py-2"
                        >
                          LISTA DE ESPERA
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalAgendamento;
