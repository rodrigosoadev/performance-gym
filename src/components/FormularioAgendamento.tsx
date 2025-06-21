
import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const FormularioAgendamento = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    modalidade: '',
    mensagem: ''
  });

  const modalidades = [
    { value: 'musculacao', label: 'Musculação' },
    { value: 'natacao', label: 'Natação' },
    { value: 'luta', label: 'Luta/Artes Marciais' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    //  formulário
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-6 w-full max-w-md">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Agende sua Aula
        </h3>
        <p className="text-gray-600">
          Preencha os dados e entraremos em contato
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <User className="h-4 w-4 mr-2" />
            Nome completo
          </label>
          <Input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Seu nome completo"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Phone className="h-4 w-4 mr-2" />
            Telefone/WhatsApp
          </label>
          <Input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(84) 99999-9999"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Mail className="h-4 w-4 mr-2" />
            E-mail
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar className="h-4 w-4 mr-2" />
            Modalidade de interesse
          </label>
          <select
            name="modalidade"
            value={formData.modalidade}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5D9C31] focus:border-transparent"
          >
            <option value="">Selecione uma modalidade</option>
            {modalidades.map((modalidade) => (
              <option key={modalidade.value} value={modalidade.value}>
                {modalidade.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Clock className="h-4 w-4 mr-2" />
            Mensagem (opcional)
          </label>
          <Textarea
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            placeholder="Horário de preferência, dúvidas, etc..."
            rows={3}
            className="w-full resize-none"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#5D9C31] hover:bg-[#4a7d28] text-white font-bold py-3 text-lg transition-all duration-300 hover:scale-105"
        >
          Solicitar Agendamento
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Resposta em até 2 horas • WhatsApp: (84) 99999-9999
        </p>
      </div>
    </div>
  );
};

export default FormularioAgendamento;
