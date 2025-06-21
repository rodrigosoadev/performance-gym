import React from 'react';
import { Button } from '@/components/ui/button';

interface HorarioItem {
  hora: string;
  vagas: number;
  totalVagas: number;
  professor?: string;
  nivel?: string;
}

interface GradeHorariosProps {
  modalidade: 'musculacao' | 'natacao' | 'luta';
  selectedDate?: Date;
  onAgendar: (horario: HorarioItem) => void;
}

const GradeHorarios = ({ modalidade, selectedDate, onAgendar }: GradeHorariosProps) => {
  const getHorarios = (): HorarioItem[] => {
    if (!selectedDate) return [];

    const dayOfWeek = selectedDate.getDay();
    
    switch (modalidade) {
      case 'musculacao':
        // Musculação disponível todos os dias da semana
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          // Segunda a sexta: 6h às 22h
          const horarios: HorarioItem[] = [];
          for (let hora = 6; hora <= 22; hora++) {
            horarios.push({
              hora: `${hora.toString().padStart(2, '0')}:00`,
              vagas: Math.floor(Math.random() * 15) + 1,
              totalVagas: 15,
              professor: Math.random() > 0.5 ? 'João Silva' : 'Maria Santos'
            });
          }
          return horarios;
        } else if (dayOfWeek === 6) {
          // Sábado: 8h às 18h
          const horarios: HorarioItem[] = [];
          for (let hora = 8; hora <= 18; hora++) {
            if (hora === 13) continue; // Pausa para almoço
            horarios.push({
              hora: `${hora.toString().padStart(2, '0')}:00`,
              vagas: Math.floor(Math.random() * 12) + 1,
              totalVagas: 12,
              professor: Math.random() > 0.5 ? 'Pedro Costa' : 'Ana Oliveira'
            });
          }
          return horarios;
        } else if (dayOfWeek === 0) {
          // Domingo: 8h às 17h
          const horarios: HorarioItem[] = [];
          for (let hora = 8; hora <= 17; hora++) {
            if (hora === 12 || hora === 13) continue; // Pausa para almoço
            horarios.push({
              hora: `${hora.toString().padStart(2, '0')}:00`,
              vagas: Math.floor(Math.random() * 10) + 1,
              totalVagas: 10,
              professor: Math.random() > 0.5 ? 'Carlos Mendes' : 'Lucia Ferreira'
            });
          }
          return horarios;
        }
        break;

      case 'natacao':
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          return [
            // Manhã
            { hora: '07:00', vagas: 8, totalVagas: 12, nivel: 'Iniciante', professor: 'Carlos Aquático' },
            { hora: '08:00', vagas: 5, totalVagas: 12, nivel: 'Intermediário', professor: 'Ana Pereira' },
            { hora: '09:00', vagas: 3, totalVagas: 12, nivel: 'Avançado', professor: 'Roberto Silva' },
            { hora: '10:00', vagas: 10, totalVagas: 15, nivel: 'Hidroginástica', professor: 'Lucia Santos' },
            { hora: '11:00', vagas: 6, totalVagas: 12, nivel: 'Livre', professor: 'Carlos Aquático' },
            // Tarde
            { hora: '14:00', vagas: 9, totalVagas: 12, nivel: 'Iniciante', professor: 'Ana Pereira' },
            { hora: '15:00', vagas: 4, totalVagas: 12, nivel: 'Intermediário', professor: 'Roberto Silva' },
            { hora: '16:00', vagas: 7, totalVagas: 12, nivel: 'Avançado', professor: 'Carlos Aquático' },
            { hora: '17:00', vagas: 12, totalVagas: 15, nivel: 'Hidroginástica', professor: 'Lucia Santos' },
            // Noite
            { hora: '18:00', vagas: 2, totalVagas: 12, nivel: 'Iniciante', professor: 'Ana Pereira' },
            { hora: '19:00', vagas: 6, totalVagas: 12, nivel: 'Intermediário', professor: 'Roberto Silva' },
            { hora: '20:00', vagas: 8, totalVagas: 12, nivel: 'Avançado', professor: 'Carlos Aquático' },
            { hora: '21:00', vagas: 5, totalVagas: 12, nivel: 'Livre', professor: 'Ana Pereira' },
          ];
        }
        break;

      case 'luta':
        // Sábado especial para defesa pessoal
        if (dayOfWeek === 6) {
          return [
            { hora: '09:00', vagas: 8, totalVagas: 20, nivel: 'Defesa Pessoal', professor: 'Mestre Rafael' }
          ];
        }
        
        // Segunda a sexta
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          const horarios: HorarioItem[] = [];
          
          // Muay Thai: Segunda, Quarta, Sexta
          if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
            horarios.push({
              hora: '18:00',
              vagas: 6,
              totalVagas: 20,
              nivel: 'Muay Thai',
              professor: 'Professor Bruno'
            });
          }
          
          // Jiu-Jitsu: Terça, Quinta
          if (dayOfWeek === 2 || dayOfWeek === 4) {
            horarios.push({
              hora: '19:00',
              vagas: 4,
              totalVagas: 15,
              nivel: 'Jiu-Jitsu',
              professor: 'Professor Marcos'
            });
          }
          
          // Boxe: Segunda, Quarta
          if (dayOfWeek === 1 || dayOfWeek === 3) {
            horarios.push({
              hora: '20:00',
              vagas: 8,
              totalVagas: 18,
              nivel: 'Boxe',
              professor: 'Professor Diego'
            });
          }
          
          return horarios;
        }
        break;
    }
    
    return [];
  };

  const getStatusVaga = (vagas: number, total: number) => {
    const percentual = (vagas / total) * 100;
    if (percentual <= 20) return 'lotado';
    if (percentual <= 50) return 'limitado';
    return 'disponivel';
  };

  const getCorStatus = (status: string) => {
    switch (status) {
      case 'disponivel':
        return 'bg-[#5D9C31] text-white hover:bg-[#4a7d28]';
      case 'limitado':
        return 'bg-[#FED54A] text-black hover:bg-[#fed843]';
      case 'lotado':
        return 'bg-[#BC1B18] text-white hover:bg-[#a01713]';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  const horarios = getHorarios();

  if (!selectedDate) {
    return (
      <div className="bg-gray-50 rounded-md p-4 text-center">
        <p className="text-sm text-gray-600">Selecione uma data</p>
      </div>
    );
  }

  if (horarios.length === 0) {
    const dayName = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][selectedDate.getDay()];
    return (
      <div className="bg-gray-50 rounded-md p-4 text-center">
        <p className="text-sm text-gray-600">Sem horários para {dayName}</p>
      </div>
    );
  }

  // Mostrar apenas os primeiros 4 horários para economizar espaço
  const horariosLimitados = horarios.slice(0, 4);

  return (
    <div className="bg-gray-50 rounded-md p-3">
      <h4 className="text-sm font-semibold mb-3 text-center">
        {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
      </h4>
      
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {horariosLimitados.map((horario, index) => {
          const status = getStatusVaga(horario.vagas, horario.totalVagas);
          const isDisponivel = horario.vagas > 0;
          
          return (
            <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{horario.hora}</span>
                  {horario.nivel && (
                    <span className="px-2 py-0.5 bg-[#5D9C31]/10 text-[#5D9C31] rounded text-xs">
                      {horario.nivel}
                    </span>
                  )}
                </div>
                
                <div className="text-xs text-gray-600 truncate">
                  <span className={`font-medium ${status === 'lotado' ? 'text-red-600' : 'text-gray-700'}`}>
                    {horario.vagas > 0 ? `${horario.vagas} vagas` : 'Lotado'}
                  </span>
                </div>
              </div>
              
              <Button
                onClick={() => onAgendar(horario)}
                disabled={!isDisponivel}
                size="sm"
                className={`ml-2 text-xs ${isDisponivel ? getCorStatus(status) : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                {isDisponivel ? 'Agendar' : 'Lotado'}
              </Button>
            </div>
          );
        })}
      </div>
      
      {horarios.length > 4 && (
        <div className="text-center mt-2">
          <span className="text-xs text-gray-500">+{horarios.length - 4} horários</span>
        </div>
      )}
    </div>
  );
};

export default GradeHorarios;
