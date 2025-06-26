
import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FiltrosProps {
  filtros: {
    modalidade: string;
    diaSemana: string;
    periodo: string;
    disponibilidade: string;
    instrutor: string;
    busca: string;
  };
  onFiltrosChange: (filtros: any) => void;
  modalidades: any[];
}

const FiltrosAgendamento = ({ filtros, onFiltrosChange, modalidades }: FiltrosProps) => {
  const diasSemana = [
    { value: 'segunda', label: 'Segunda' },
    { value: 'terca', label: 'Terça' },
    { value: 'quarta', label: 'Quarta' },
    { value: 'quinta', label: 'Quinta' },
    { value: 'sexta', label: 'Sexta' },
    { value: 'sabado', label: 'Sábado' },
    { value: 'domingo', label: 'Domingo' }
  ];

  const periodos = [
    { value: 'manha', label: 'Manhã (6h-12h)' },
    { value: 'tarde', label: 'Tarde (12h-18h)' },
    { value: 'noite', label: 'Noite (18h-22h)' }
  ];

  const disponibilidades = [
    { value: 'disponivel', label: '🟢 Disponível' },
    { value: 'poucas-vagas', label: '🟡 Poucas vagas' },
    { value: 'lotado', label: '🔴 Lotado' },
    { value: 'lista-espera', label: '⏰ Lista de espera' }
  ];

  const updateFiltro = (key: string, value: string) => {
    onFiltrosChange({ ...filtros, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltrosChange({
      modalidade: '',
      diaSemana: '',
      periodo: '',
      disponibilidade: '',
      instrutor: '',
      busca: ''
    });
  };

  const hasActiveFilters = Object.values(filtros).some(v => v !== '');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Busca */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar por modalidade, instrutor..."
            value={filtros.busca}
            onChange={(e) => updateFiltro('busca', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31] focus:border-transparent"
          />
        </div>
      </div>

      {/* Filtros em Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {/* Modalidade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modalidade
          </label>
          <select
            value={filtros.modalidade}
            onChange={(e) => updateFiltro('modalidade', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31]"
          >
            <option value="">Todas</option>
            {modalidades.map(m => (
              <option key={m.id} value={m.id}>
                {m.icone} {m.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Dia da Semana */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dia da Semana
          </label>
          <select
            value={filtros.diaSemana}
            onChange={(e) => updateFiltro('diaSemana', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31]"
          >
            <option value="">Todos os dias</option>
            {diasSemana.map(dia => (
              <option key={dia.value} value={dia.value}>
                {dia.label}
              </option>
            ))}
          </select>
        </div>

        {/* Período */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Período
          </label>
          <select
            value={filtros.periodo}
            onChange={(e) => updateFiltro('periodo', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31]"
          >
            <option value="">Todos os períodos</option>
            {periodos.map(periodo => (
              <option key={periodo.value} value={periodo.value}>
                {periodo.label}
              </option>
            ))}
          </select>
        </div>

        {/* Disponibilidade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disponibilidade
          </label>
          <select
            value={filtros.disponibilidade}
            onChange={(e) => updateFiltro('disponibilidade', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31]"
          >
            <option value="">Todas</option>
            {disponibilidades.map(disp => (
              <option key={disp.value} value={disp.value}>
                {disp.label}
              </option>
            ))}
          </select>
        </div>

        {/* Instrutor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instrutor
          </label>
          <input
            type="text"
            placeholder="Nome do instrutor"
            value={filtros.instrutor}
            onChange={(e) => updateFiltro('instrutor', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31]"
          />
        </div>
      </div>

      {/* Limpar Filtros */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={clearAllFilters}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="h-4 w-4 mr-2" />
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default FiltrosAgendamento;
