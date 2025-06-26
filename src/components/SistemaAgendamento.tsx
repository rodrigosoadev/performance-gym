
import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Users, Filter, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FiltrosAgendamento from '@/components/FiltrosAgendamento';
import CardModalidade from '@/components/CardModalidade';
import CalendarioSemanal from '@/components/CalendarioSemanal';
import AgendamentosUsuario from '@/components/AgendamentosUsuario';
import { useToast } from '@/hooks/use-toast';

interface HorarioAula {
  id: string;
  inicio: string;
  fim: string;
  vagas_total: number;
  vagas_ocupadas: number;
  instrutor: string;
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Todos os níveis';
  status: 'disponivel' | 'poucas-vagas' | 'lotado' | 'lista-espera';
}

interface Modalidade {
  id: string;
  nome: string;
  icone: string;
  cor: string;
  dias: string[];
  horarios: HorarioAula[];
  preco_mensal: number;
  aula_experimental: boolean;
  descricao: string;
  imagem: string;
}

interface FiltrosState {
  modalidade: string;
  diaSemana: string;
  periodo: string;
  disponibilidade: string;
  instrutor: string;
  busca: string;
}

const SistemaAgendamento = () => {
  const [isUsuarioMatriculado] = useState(false); // Simular estado do usuário
  const [viewMode, setViewMode] = useState<'cards' | 'calendario' | 'meus-agendamentos'>('cards');
  const [filtros, setFiltros] = useState<FiltrosState>({
    modalidade: '',
    diaSemana: '',
    periodo: '',
    disponibilidade: '',
    instrutor: '',
    busca: ''
  });
  const { toast } = useToast();

  // Dados mockados das modalidades
  const modalidades: Modalidade[] = [
    {
      id: 'musculacao',
      nome: 'Musculação',
      icone: '🏋️',
      cor: '#5D9C31',
      dias: ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'],
      horarios: [
        {
          id: '1',
          inicio: '06:00',
          fim: '07:00',
          vagas_total: 20,
          vagas_ocupadas: 8,
          instrutor: 'João Silva',
          nivel: 'Todos os níveis',
          status: 'disponivel'
        },
        {
          id: '2',
          inicio: '14:30',
          fim: '15:30',
          vagas_total: 15,
          vagas_ocupadas: 12,
          instrutor: 'Maria Santos',
          nivel: 'Intermediário',
          status: 'poucas-vagas'
        }
      ],
      preco_mensal: 89.90,
      aula_experimental: true,
      descricao: 'Fortalecimento muscular com equipamentos de última geração',
      imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'natacao',
      nome: 'Natação',
      icone: '🏊',
      cor: '#5EBB99',
      dias: ['segunda', 'terca', 'quarta', 'quinta', 'sexta'],
      horarios: [
        {
          id: '3',
          inicio: '07:00',
          fim: '08:00',
          vagas_total: 12,
          vagas_ocupadas: 12,
          instrutor: 'Carlos Aquático',
          nivel: 'Iniciante',
          status: 'lotado'
        },
        {
          id: '4',
          inicio: '18:00',
          fim: '19:00',
          vagas_total: 15,
          vagas_ocupadas: 6,
          instrutor: 'Ana Pereira',
          nivel: 'Avançado',
          status: 'disponivel'
        }
      ],
      preco_mensal: 119.90,
      aula_experimental: true,
      descricao: 'Exercício completo em piscina aquecida',
      imagem: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'luta',
      nome: 'Luta',
      icone: '🥋',
      cor: '#AD4F16',
      dias: ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'],
      horarios: [
        {
          id: '5',
          inicio: '18:00',
          fim: '19:30',
          vagas_total: 20,
          vagas_ocupadas: 16,
          instrutor: 'Mestre Rafael',
          nivel: 'Intermediário',
          status: 'poucas-vagas'
        }
      ],
      preco_mensal: 99.90,
      aula_experimental: false,
      descricao: 'Artes marciais e defesa pessoal',
      imagem: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Filtrar modalidades baseado nos filtros ativos
  const modalidadesFiltradas = useMemo(() => {
    return modalidades.filter(modalidade => {
      // Filtro por modalidade
      if (filtros.modalidade && modalidade.id !== filtros.modalidade) return false;
      
      // Filtro por dia da semana
      if (filtros.diaSemana && !modalidade.dias.includes(filtros.diaSemana)) return false;
      
      // Filtro por instrutor
      if (filtros.instrutor) {
        const temInstrutor = modalidade.horarios.some(h => 
          h.instrutor.toLowerCase().includes(filtros.instrutor.toLowerCase())
        );
        if (!temInstrutor) return false;
      }
      
      // Filtro por busca
      if (filtros.busca) {
        const termo = filtros.busca.toLowerCase();
        const corresponde = modalidade.nome.toLowerCase().includes(termo) ||
                          modalidade.descricao.toLowerCase().includes(termo) ||
                          modalidade.horarios.some(h => h.instrutor.toLowerCase().includes(termo));
        if (!corresponde) return false;
      }
      
      return true;
    });
  }, [modalidades, filtros]);

  const handleAgendar = (modalidade: string, horarioId: string) => {
    if (isUsuarioMatriculado) {
      toast({
        title: "Agendamento Confirmado!",
        description: `Sua aula de ${modalidade} foi agendada com sucesso.`,
      });
    } else {
      toast({
        title: "Faça sua matrícula",
        description: "Para agendar aulas, você precisa ser matriculado.",
      });
    }
  };

  const handleMatricular = (modalidade: string) => {
    toast({
      title: "Redirecionando...",
      description: `Direcionando para matrícula em ${modalidade}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de <span className="text-[#5D9C31]">Agendamento</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Agende suas aulas de forma fácil e intuitiva
          </p>
        </div>

        {/* Navegação entre views */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'ghost'}
              onClick={() => setViewMode('cards')}
              className="mr-1"
            >
              <Users className="h-4 w-4 mr-2" />
              Modalidades
            </Button>
            <Button
              variant={viewMode === 'calendario' ? 'default' : 'ghost'}
              onClick={() => setViewMode('calendario')}
              className="mr-1"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendário
            </Button>
            {isUsuarioMatriculado && (
              <Button
                variant={viewMode === 'meus-agendamentos' ? 'default' : 'ghost'}
                onClick={() => setViewMode('meus-agendamentos')}
              >
                <Clock className="h-4 w-4 mr-2" />
                Meus Agendamentos
              </Button>
            )}
          </div>
        </div>

        {/* Filtros */}
        <FiltrosAgendamento
          filtros={filtros}
          onFiltrosChange={setFiltros}
          modalidades={modalidades}
        />

        {/* Conteúdo baseado na view selecionada */}
        {viewMode === 'cards' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modalidadesFiltradas.map(modalidade => (
              <CardModalidade
                key={modalidade.id}
                modalidade={modalidade}
                isUsuarioMatriculado={isUsuarioMatriculado}
                onAgendar={handleAgendar}
                onMatricular={handleMatricular}
              />
            ))}
          </div>
        )}

        {viewMode === 'calendario' && (
          <CalendarioSemanal
            modalidades={modalidadesFiltradas}
            onAgendar={handleAgendar}
            isUsuarioMatriculado={isUsuarioMatriculado}
          />
        )}

        {viewMode === 'meus-agendamentos' && isUsuarioMatriculado && (
          <AgendamentosUsuario />
        )}

        {modalidadesFiltradas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma modalidade encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros para encontrar o que procura
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SistemaAgendamento;
