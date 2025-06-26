
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarioSemanalProps {
  modalidades: any[];
  onAgendar: (modalidade: string, horarioId: string) => void;
  isUsuarioMatriculado: boolean;
}

const CalendarioSemanal = ({ modalidades, onAgendar, isUsuarioMatriculado }: CalendarioSemanalProps) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const horariosBase = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

  const getWeekDays = () => {
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getAulasParaHorario = (dia: Date, horario: string) => {
    const diaSemanaMap = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    const diaSemana = diaSemanaMap[dia.getDay()];
    
    const aulas = [];
    
    modalidades.forEach(modalidade => {
      if (modalidade.dias.includes(diaSemana)) {
        modalidade.horarios.forEach((h: any) => {
          if (h.inicio === horario) {
            aulas.push({
              ...h,
              modalidade: modalidade.nome,
              cor: modalidade.cor,
              icone: modalidade.icone
            });
          }
        });
      }
    });
    
    return aulas;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel': return 'bg-green-100 border-green-300';
      case 'poucas-vagas': return 'bg-yellow-100 border-yellow-300';
      case 'lotado': return 'bg-red-100 border-red-300';
      case 'lista-espera': return 'bg-blue-100 border-blue-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const weekDays = getWeekDays();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header do calendário */}
      <div className="bg-[#5D9C31] text-white p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => {
              const newWeek = new Date(currentWeek);
              newWeek.setDate(currentWeek.getDate() - 7);
              setCurrentWeek(newWeek);
            }}
            className="text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h2 className="text-xl font-bold">
            Semana de {weekDays[0].toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} a {weekDays[6].toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
          </h2>
          
          <Button
            variant="ghost"
            onClick={() => {
              const newWeek = new Date(currentWeek);
              newWeek.setDate(currentWeek.getDate() + 7);
              setCurrentWeek(newWeek);
            }}
            className="text-white hover:bg-white/20"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grade do calendário */}
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Cabeçalho dos dias */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-3 font-semibold text-gray-600 bg-gray-50">Horário</div>
            {weekDays.map((day, index) => (
              <div key={index} className="p-3 text-center bg-gray-50">
                <div className="font-semibold text-gray-900">{diasSemana[day.getDay()]}</div>
                <div className="text-sm text-gray-600">{day.getDate()}</div>
              </div>
            ))}
          </div>

          {/* Linhas de horários */}
          {horariosBase.map(horario => (
            <div key={horario} className="grid grid-cols-8 border-b hover:bg-gray-50">
              <div className="p-3 font-medium text-gray-700 bg-gray-50/50 border-r">
                {horario}
              </div>
              {weekDays.map((day, dayIndex) => {
                const aulas = getAulasParaHorario(day, horario);
                return (
                  <div key={dayIndex} className="p-2 min-h-[80px] border-r">
                    {aulas.map((aula, aulaIndex) => (
                      <div
                        key={aulaIndex}
                        className={`p-2 rounded-lg mb-1 border-2 ${getStatusColor(aula.status)} hover:shadow-md transition-shadow cursor-pointer`}
                        onClick={() => isUsuarioMatriculado && aula.status !== 'lotado' && onAgendar(aula.modalidade, aula.id)}
                      >
                        <div className="flex items-center space-x-1 mb-1">
                          <span className="text-xs">{aula.icone}</span>
                          <span className="text-xs font-medium truncate">{aula.modalidade}</span>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">{aula.instrutor}</div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs">
                            <Users className="h-3 w-3 inline mr-1" />
                            {aula.vagas_total - aula.vagas_ocupadas}
                          </div>
                          {isUsuarioMatriculado && aula.status !== 'lotado' && (
                            <Button
                              size="sm"
                              className="h-5 px-2 text-xs bg-[#5D9C31] hover:bg-[#4a7d28]"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAgendar(aula.modalidade, aula.id);
                              }}
                            >
                              +
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legenda */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
            <span>🟢 Disponível</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
            <span>🟡 Poucas vagas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
            <span>🔴 Lotado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
            <span>⏰ Lista de espera</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarioSemanal;
