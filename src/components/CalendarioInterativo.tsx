
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarioProps {
  modalidade: 'musculacao' | 'natacao' | 'luta';
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
}

const CalendarioInterativo = ({ modalidade, onDateSelect, selectedDate }: CalendarioProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const meses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  // Função para obter status com os novos indicadores visuais
  const getStatusDia = (date: Date) => {
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    
    switch (modalidade) {
      case 'musculacao':
        // Musculação: TODOS OS DIAS com horários amplos
        const modulo = dayOfMonth % 10;
        if (modulo <= 1) return 'lotado'; // 🔴 Lotado/Sem vagas
        if (modulo <= 3) return 'poucas-vagas'; // 🟡 Poucas vagas disponíveis
        return 'muitas-vagas'; // 🟢 Muitas vagas disponíveis
        
      case 'natacao':
        // Natação: apenas segunda a sexta
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          return 'sem-aulas'; // ⚪ Sem aulas programadas
        }
        const moduloNat = dayOfMonth % 8;
        if (moduloNat <= 1) return 'lotado';
        if (moduloNat <= 3) return 'poucas-vagas';
        return 'muitas-vagas';
        
      case 'luta':
        // Luta: sábado especial para defesa pessoal
        if (dayOfWeek === 6) {
          return 'especial'; // Aula especial
        }
        // Domingo sem aulas
        if (dayOfWeek === 0) {
          return 'sem-aulas';
        }
        const moduloLuta = dayOfMonth % 7;
        if (moduloLuta <= 1) return 'lotado';
        if (moduloLuta <= 3) return 'poucas-vagas';
        return 'muitas-vagas';
        
      default:
        return 'muitas-vagas';
    }
  };

  const getCorStatus = (status: string) => {
    switch (status) {
      case 'muitas-vagas':
        return 'bg-[#5D9C31] text-white hover:bg-[#4a7d28] cursor-pointer'; // 🟢
      case 'poucas-vagas':
        return 'bg-[#FED54A] text-black hover:bg-[#fed843] cursor-pointer'; // 🟡
      case 'lotado':
        return 'bg-[#BC1B18] text-white hover:bg-[#a01713] cursor-pointer'; // 🔴
      case 'especial':
        return 'bg-[#5EBB99] text-white hover:bg-[#4da88a] cursor-pointer';
      case 'sem-aulas':
        return 'bg-gray-100 text-gray-400 cursor-default'; // ⚪
      case 'passado':
        return 'bg-gray-50 text-gray-300 cursor-not-allowed';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  const getIndicadorEmoji = (status: string) => {
    switch (status) {
      case 'muitas-vagas':
        return '🟢';
      case 'poucas-vagas':
        return '🟡';
      case 'lotado':
        return '🔴';
      case 'especial':
        return '⭐';
      case 'sem-aulas':
        return '⚪';
      default:
        return '';
    }
  };

  const getTooltipText = (status: string, date: Date) => {
    const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    switch (status) {
      case 'muitas-vagas':
        return `${dateStr}: Muitas vagas disponíveis`;
      case 'poucas-vagas':
        return `${dateStr}: Poucas vagas disponíveis`;
      case 'lotado':
        return `${dateStr}: Lotado/Sem vagas`;
      case 'especial':
        return `${dateStr}: Aula especial`;
      case 'sem-aulas':
        return `${dateStr}: Sem aulas programadas`;
      default:
        return dateStr;
    }
  };

  const gerarCalendario = () => {
    const ano = currentMonth.getFullYear();
    const mes = currentMonth.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const primeiroDiaSemana = primeiroDia.getDay();
    
    const dias = [];
    
    // Dias vazios do início
    for (let i = 0; i < primeiroDiaSemana; i++) {
      dias.push(null);
    }
    
    // Dias do mês
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      const date = new Date(ano, mes, dia);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const isPast = date.getTime() < hoje.getTime();
      
      if (isPast) {
        dias.push({ date, status: 'passado' });
      } else {
        dias.push({ date, status: getStatusDia(date) });
      }
    }
    
    return dias;
  };

  const navegarMes = (direcao: number) => {
    const novoMes = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direcao, 1);
    const hoje = new Date();
    const mesAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    
    if (direcao > 0) {
      if (novoMes.getTime() > mesAtual.getTime()) {
        console.log('Agendamentos limitados ao mês atual');
        return;
      }
    }
    
    setCurrentMonth(novoMes);
  };

  const podeAvancarMes = () => {
    const proximoMes = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    const hoje = new Date();
    const mesAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    return proximoMes.getTime() <= mesAtual.getTime();
  };

  const isSelected = (date: Date) => {
    return selectedDate && 
           date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  return (
    <div className="bg-gray-50 rounded-md p-3">
      {/* Header do calendário */}
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navegarMes(-1)}
          className="h-6 w-6"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
        
        <h4 className="text-sm font-semibold">
          {meses[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h4>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => navegarMes(1)}
          disabled={!podeAvancarMes()}
          className={`h-6 w-6 ${!podeAvancarMes() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {diasSemana.map((dia) => (
          <div key={dia} className="text-center text-xs font-medium text-gray-600 p-1">
            {dia}
          </div>
        ))}
      </div>

      {/* Grid do calendário */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {gerarCalendario().map((item, index) => (
          <div key={index} className="aspect-square relative">
            {item && (
              <button
                onClick={() => {
                  if (item.status !== 'sem-aulas' && item.status !== 'passado') {
                    onDateSelect(item.date);
                  }
                }}
                disabled={item.status === 'sem-aulas' || item.status === 'passado'}
                title={getTooltipText(item.status, item.date)}
                className={`
                  w-full h-full rounded text-xs font-medium transition-all duration-200 relative
                  ${getCorStatus(item.status)}
                  ${isSelected(item.date) ? 'ring-2 ring-[#5D9C31] ring-offset-1' : ''}
                `}
              >
                <span className="relative z-10">{item.date.getDate()}</span>
                {/* Indicador visual no canto */}
                <div className="absolute top-0 right-0 text-[8px] leading-none">
                  {getIndicadorEmoji(item.status)}
                </div>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Legenda atualizada com novos indicadores */}
      <div className="grid grid-cols-2 gap-1 text-xs">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-[#5D9C31] rounded mr-1"></div>
          <span>🟢 Muitas vagas</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-[#FED54A] rounded mr-1"></div>
          <span>🟡 Poucas vagas</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-[#BC1B18] rounded mr-1"></div>
          <span>🔴 Lotado</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-gray-100 border border-gray-300 rounded mr-1"></div>
          <span>⚪ Sem aulas</span>
        </div>
        {modalidade === 'luta' && (
          <div className="flex items-center col-span-2">
            <div className="w-2 h-2 bg-[#5EBB99] rounded mr-1"></div>
            <span>⭐ Especial</span>
          </div>
        )}
      </div>
      
      {/* Dica de interação */}
      <div className="mt-2 text-center">
        <p className="text-xs text-gray-500">
          💡 Clique na data para ver horários
        </p>
      </div>
    </div>
  );
};

export default CalendarioInterativo;
