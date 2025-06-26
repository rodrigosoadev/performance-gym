import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, ChevronLeft, ChevronRight, Clock, Users, User, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import CalendarioInterativo from '@/components/CalendarioInterativo';
import GradeHorarios from '@/components/GradeHorarios';
import ModalAgendamento from '@/components/ModalAgendamento';
import PopupCadastro from '@/components/PopupCadastro';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalidadeSelecionada, setModalidadeSelecionada] = useState<'musculacao' | 'natacao' | 'luta'>('musculacao');
  const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>();
  const [isUsuarioLogado] = useState(false); // Simular estado do usuário
  const [showModalAgendamento, setShowModalAgendamento] = useState(false);
  const [showPopupCadastro, setShowPopupCadastro] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState<any>(null);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      alt: 'Treinamento de Musculação - Academia Performance',
      categoria: 'musculacao'
    },
    {
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      alt: 'Aulas de Natação - Academia Performance',
      categoria: 'natacao'
    },
    {
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      alt: 'Artes Marciais e Luta - Academia Performance',
      categoria: 'luta'
    }
  ];

  const modalidades = [
    { value: 'musculacao', label: 'Musculação', desc: 'Fortalecimento e hipertrofia' },
    { value: 'natacao', label: 'Natação', desc: 'Exercício completo e cardio' },
    { value: 'luta', label: 'Luta', desc: 'Artes marciais e defesa pessoal' }
  ];

  // Função para obter recomendações do dia
  const getRecomendacoesHoje = () => {
    const hoje = new Date();
    const dayOfWeek = hoje.getDay();
    const recomendacoes = [];

    // Musculação - sempre disponível
    recomendacoes.push({
      modalidade: 'musculacao',
      nome: 'Musculação',
      icone: '🏋️',
      cor: '#5D9C31',
      motivo: 'Sempre disponível',
      horario: '14:00 - 15:00',
      vagas: 18,
      instrutor: 'João Silva'
    });

    // Natação - Segunda a sexta
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      recomendacoes.push({
        modalidade: 'natacao',
        nome: 'Natação',
        icone: '🏊',
        cor: '#5EBB99',
        motivo: 'Ideal para cardio',
        horario: '18:00 - 19:00',
        vagas: 6,
        instrutor: 'Ana Pereira'
      });
    }

    // Luta - Segunda a sexta + sábados especiais
    if (dayOfWeek === 6) {
      recomendacoes.push({
        modalidade: 'luta',
        nome: 'Defesa Pessoal',
        icone: '🥊',
        cor: '#AD4F16',
        motivo: 'Aula especial de sábado',
        horario: '09:00 - 10:30',
        vagas: 8,
        instrutor: 'Mestre Rafael'
      });
    } else if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      recomendacoes.push({
        modalidade: 'luta',
        nome: 'Muay Thai',
        icone: '🥋',
        cor: '#AD4F16',
        motivo: 'Queima muitas calorias',
        horario: '20:00 - 21:00',
        vagas: 12,
        instrutor: 'Prof. Bruno'
      });
    }

    return recomendacoes;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleDateClick = (date: Date) => {
    setDataSelecionada(date);
  };

  const getHorariosDoDia = () => {
    if (!dataSelecionada) return [];

    const dayOfWeek = dataSelecionada.getDay();
    const horarios: any[] = [];

    // Musculação - TODOS OS DIAS
    const horariosMusculacao = [];
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // Segunda a sexta: 6h às 22h
      for (let hora = 6; hora <= 21; hora++) {
        horariosMusculacao.push({
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
        horariosMusculacao.push({
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
        horariosMusculacao.push({
          inicio: `${hora.toString().padStart(2, '0')}:00`,
          fim: `${(hora + 1).toString().padStart(2, '0')}:00`,
          vagas: Math.floor(Math.random() * 12) + 2,
          total: 15,
          instrutor: ['Lucia Ferreira', 'Roberto Silva'][Math.floor(Math.random() * 2)]
        });
      }
    }

    horarios.push({
      modalidade: 'musculacao',
      nome: 'Musculação',
      icone: '🏋️',
      cor: '#5D9C31',
      horarios: horariosMusculacao
    });

    // Natação - Segunda a sexta
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const horariosNatacao = [
        { inicio: '07:00', fim: '08:00', vagas: 8, total: 12, instrutor: 'Carlos Aquático' },
        { inicio: '08:00', fim: '09:00', vagas: 5, total: 12, instrutor: 'Ana Pereira' },
        { inicio: '18:00', fim: '19:00', vagas: 6, total: 12, instrutor: 'Ana Pereira' },
        { inicio: '19:00', fim: '20:00', vagas: 4, total: 12, instrutor: 'Carlos Aquático' },
        { inicio: '20:00', fim: '21:00', vagas: 8, total: 12, instrutor: 'Roberto Silva' }
      ];

      horarios.push({
        modalidade: 'natacao',
        nome: 'Natação',
        icone: '🏊',
        cor: '#5EBB99',
        horarios: horariosNatacao
      });
    }

    // Luta - Segunda a sexta + Sábado especial
    if (dayOfWeek === 6) {
      horarios.push({
        modalidade: 'luta',
        nome: 'Luta',
        icone: '🥊',
        cor: '#AD4F16',
        horarios: [
          { inicio: '09:00', fim: '10:30', vagas: 8, total: 20, instrutor: 'Mestre Rafael (Defesa Pessoal)' }
        ]
      });
    } else if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const horariosLuta = [
        { inicio: '18:00', fim: '19:00', vagas: 12, total: 18, instrutor: 'Prof. Bruno (Muay Thai)' },
        { inicio: '19:00', fim: '20:00', vagas: 8, total: 18, instrutor: 'Prof. Marcos (Jiu-Jitsu)' },
        { inicio: '20:00', fim: '21:00', vagas: 15, total: 18, instrutor: 'Prof. Diego (Boxe)' }
      ];

      horarios.push({
        modalidade: 'luta',
        nome: 'Luta',
        icone: '🥋',
        cor: '#AD4F16',
        horarios: horariosLuta
      });
    }

    return horarios;
  };

  const getStatusVaga = (vagas: number, total: number) => {
    const percentual = (vagas / total) * 100;
    if (percentual <= 20) return { status: 'lotado', cor: '#BC1B18', emoji: '🔴' };
    if (percentual <= 50) return { status: 'poucas-vagas', cor: '#FED54A', emoji: '🟡' };
    return { status: 'disponivel', cor: '#5D9C31', emoji: '🟢' };
  };

  const handleAgendar = (modalidade: string, horario: any) => {
    setHorarioSelecionado({ modalidade, horario });
    if (isUsuarioLogado) {
      // Simular agendamento direto para usuário logado
      alert(`Agendamento confirmado para ${modalidade} em ${dataSelecionada?.toLocaleDateString('pt-BR')} às ${horario.inicio}`);
    } else {
      setShowPopupCadastro(true);
    }
  };

  const handleCadastro = (dados: any) => {
    console.log('Cadastro realizado:', dados);
    alert('Cadastro realizado com sucesso! Agendamento confirmado.');
    setShowPopupCadastro(false);
  };

  const recomendacoesHoje = getRecomendacoesHoje();
  const horariosDoDia = getHorariosDoDia();

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.alt} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}
        </div>

        <button 
          onClick={prevSlide} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button 
          onClick={nextSlide} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`} 
            />
          ))}
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                <span className="block">SUA MELHOR</span>
                <span className="text-[#5D9C31] block">PERFORMANCE</span>
                <span className="block">COMEÇA AQUI</span>
              </h1>

              <p className="text-lg md:text-xl text-white mb-8 max-w-xl">
                A academia mais completa de Apodi/RN. Equipamentos de última geração, 
                profissionais qualificados e ambiente motivador.
              </p>

              <div className="flex justify-center lg:justify-start mb-8">
                <div className="inline-flex items-center bg-[#5D9C31]/20 border border-[#5D9C31]/30 rounded-full px-6 py-2 backdrop-blur-sm">
                  <span className="text-white font-semibold">📍 Apodi, Rio Grande do Norte</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in mb-8">
                <Button size="lg" className="bg-[#5D9C31] hover:bg-[#4a7d28] text-white font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105">
                  Matricule-se Online
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button variant="outline" size="lg" className="border-white text-white hover:text-[#5D9C31] px-8 py-4 text-lg transition-all duration-300 backdrop-blur-sm bg-zinc-950 hover:bg-zinc-800">
                  <Play className="mr-2 h-5 w-5" />
                  Agende Aula Experimental
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#5D9C31] mb-1">500+</div>
                  <div className="text-white text-sm font-medium">Alunos Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#5D9C31] mb-1">5</div>
                  <div className="text-white text-sm font-medium">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#5D9C31] mb-1">3</div>
                  <div className="text-white text-sm font-medium">Modalidades</div>
                </div>
              </div>
            </div>

            {/* Calendário Principal */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-6 w-full max-w-lg">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    📅 Agende Sua Aula
                  </h3>
                  <p className="text-gray-600">
                    Clique na data para ver os horários disponíveis
                  </p>
                </div>

                {/* Recomendações de Hoje */}
                {recomendacoesHoje.length > 0 && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-[#5D9C31]/10 to-[#5EBB99]/10 rounded-lg border border-[#5D9C31]/20">
                    <div className="flex items-center mb-3">
                      <Star className="h-5 w-5 text-[#5D9C31] mr-2" />
                      <h4 className="font-bold text-gray-800">Recomendações de Hoje</h4>
                      <TrendingUp className="h-4 w-4 text-[#5D9C31] ml-2" />
                    </div>
                    <div className="space-y-2">
                      {recomendacoesHoje.slice(0, 2).map((rec, index) => (
                        <div key={index} className="bg-white/80 rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{rec.icone}</span>
                              <div>
                                <div className="font-medium text-sm text-gray-800">{rec.nome}</div>
                                <div className="text-xs text-gray-600">{rec.horario} • {rec.vagas} vagas</div>
                              </div>
                            </div>
                            <div className="text-xs text-[#5D9C31] font-medium bg-[#5D9C31]/10 px-2 py-1 rounded">
                              {rec.motivo}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      💡 Clique na data de hoje para ver todos os horários
                    </p>
                  </div>
                )}

                {/* Calendário */}
                <CalendarioInterativo
                  modalidade={modalidadeSelecionada}
                  onDateSelect={handleDateClick}
                  selectedDate={dataSelecionada}
                />

                {/* Seleção de Modalidade */}
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Modalidade:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {modalidades.map((modalidade) => (
                      <button
                        key={modalidade.value}
                        onClick={() => {
                          setModalidadeSelecionada(modalidade.value as 'musculacao' | 'natacao' | 'luta');
                        }}
                        className={`p-2 rounded-md border transition-all duration-300 text-center ${
                          modalidadeSelecionada === modalidade.value
                            ? 'border-[#5D9C31] bg-[#5D9C31]/10 text-[#5D9C31]'
                            : 'border-gray-200 hover:border-[#5D9C31]/50 text-gray-700'
                        }`}
                      >
                        <div className="font-medium text-sm">{modalidade.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lista de Horários Disponíveis */}
                {dataSelecionada && (
                  <div className="mt-6 border-t pt-4">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">
                      📅 {dataSelecionada.toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                      })}
                    </h4>

                    {horariosDoDia.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-gray-400 text-4xl mb-2">😴</div>
                        <p className="text-gray-600">Sem aulas programadas para este dia</p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-80 overflow-y-auto">
                        {horariosDoDia.map((modalidade) => (
                          <div key={modalidade.modalidade}>
                            <div className="flex items-center mb-2">
                              <span className="text-xl mr-2">{modalidade.icone}</span>
                              <h5 className="font-bold text-gray-800">{modalidade.nome}</h5>
                            </div>
                            
                            <div className="space-y-2 ml-6">
                              {modalidade.horarios.map((horario: any, index: number) => {
                                const statusInfo = getStatusVaga(horario.vagas, horario.total);
                                const vagasDisponiveis = horario.vagas;
                                
                                return (
                                  <div key={index} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                                    <div className="flex items-center justify-between">
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-3 text-sm">
                                          <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                            <span className="font-medium">{horario.inicio} - {horario.fim}</span>
                                          </div>
                                          
                                          <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-1 text-gray-500" />
                                            <span style={{ color: statusInfo.cor }} className="font-medium">
                                              {statusInfo.emoji} {vagasDisponiveis} vagas
                                            </span>
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center mt-1 text-xs text-gray-600">
                                          <User className="h-3 w-3 mr-1" />
                                          {horario.instrutor}
                                        </div>
                                      </div>
                                      
                                      <Button
                                        onClick={() => handleAgendar(modalidade.modalidade, horario)}
                                        disabled={vagasDisponiveis === 0}
                                        className={`ml-4 px-4 py-2 text-sm font-medium ${
                                          vagasDisponiveis > 0
                                            ? 'bg-[#5D9C31] hover:bg-[#4a7d28] text-white'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                      >
                                        {vagasDisponiveis > 0 ? 'AGENDAR' : 'LOTADO'}
                                      </Button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Status do Usuário */}
                <div className="mt-4 p-3 bg-gray-50 rounded-md text-center">
                  {isUsuarioLogado ? (
                    <p className="text-sm text-gray-600">
                      ✅ Logado - Clique em "AGENDAR" para confirmar
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      👤 Faça login ou cadastre-se ao agendar
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pop-up de Cadastro */}
      <PopupCadastro
        isOpen={showPopupCadastro}
        onClose={() => setShowPopupCadastro(false)}
        selectedDate={dataSelecionada}
        onCadastro={handleCadastro}
      />
    </>
  );
};

export default Hero;
