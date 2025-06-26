
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SistemaAgendamento from '@/components/SistemaAgendamento';

const Agendamento = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        <SistemaAgendamento />
      </div>
      <Footer />
    </div>
  );
};

export default Agendamento;
