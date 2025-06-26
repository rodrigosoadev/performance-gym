
import React, { useState } from 'react';
import { X, User, Mail, Phone, Calendar, Target, CheckCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PopupCadastroProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  onCadastro: (dados: any) => void;
}

const PopupCadastro = ({ isOpen, onClose, selectedDate, onCadastro }: PopupCadastroProps) => {
  const [modo, setModo] = useState<'escolha' | 'login' | 'cadastro'>('escolha');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    senha: ''
  });
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    nascimento: '',
    objetivos: '',
    experiencia: '',
    comoConheceu: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLoginChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setCadastroSucesso(true);
    
    // Após 2 segundos, finalizar login
    setTimeout(() => {
      setCadastroSucesso(false);
      onCadastro({ ...loginData, tipo: 'login' });
      resetForm();
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setCadastroSucesso(true);
    
    // Após 2 segundos, finalizar cadastro
    setTimeout(() => {
      setCadastroSucesso(false);
      onCadastro({ ...formData, tipo: 'cadastro' });
      resetForm();
    }, 2000);
  };

  const resetForm = () => {
    setModo('escolha');
    setStep(1);
    setLoginData({ email: '', senha: '' });
    setFormData({
      nome: '',
      email: '',
      whatsapp: '',
      nascimento: '',
      objetivos: '',
      experiencia: '',
      comoConheceu: ''
    });
  };

  const isStep1Valid = formData.nome && formData.email && formData.whatsapp && formData.nascimento;
  const isLoginValid = loginData.email && loginData.senha;

  if (cadastroSucesso) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-[#5D9C31] rounded-full flex items-center justify-center mb-4 animate-scale-in">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {modo === 'login' ? 'Login Realizado!' : 'Cadastro Realizado!'} 🎉
            </h3>
            <p className="text-gray-600 mb-4">
              {modo === 'login' 
                ? 'Bem-vindo de volta! Agendamento confirmado.' 
                : 'Bem-vindo à Academia Performance! Agendamento confirmado.'}
            </p>
            <p className="text-sm text-gray-500">
              Você receberá uma confirmação por WhatsApp.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => { onClose(); resetForm(); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#5D9C31]">
            🏃‍♂️ FAÇA LOGIN OU CADASTRE-SE
          </DialogTitle>
        </DialogHeader>

        <div className="text-center mb-6">
          <p className="text-gray-600">
            Para agendar aula para{' '}
            <span className="font-semibold text-[#5D9C31]">
              {selectedDate?.toLocaleDateString('pt-BR')}
            </span>
            :
          </p>
        </div>

        {modo === 'escolha' && (
          <div className="space-y-4">
            <Button
              onClick={() => setModo('login')}
              className="w-full bg-[#5D9C31] hover:bg-[#4a7d28] text-white py-4 text-lg font-semibold"
            >
              <User className="mr-2 h-5 w-5" />
              JÁ SOU ALUNO - FAZER LOGIN
            </Button>
            
            <Button
              onClick={() => setModo('cadastro')}
              variant="outline"
              className="w-full border-[#5D9C31] text-[#5D9C31] hover:bg-[#5D9C31]/10 py-4 text-lg font-semibold"
            >
              <Mail className="mr-2 h-5 w-5" />
              QUERO ME CADASTRAR
            </Button>

            <div className="text-center pt-4 border-t">
              <button
                onClick={onClose}
                className="text-gray-500 hover:underline"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {modo === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                E-mail *
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => handleLoginChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31] focus:border-transparent"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline h-4 w-4 mr-1" />
                Senha *
              </label>
              <input
                type="password"
                value={loginData.senha}
                onChange={(e) => handleLoginChange('senha', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31] focus:border-transparent"
                placeholder="Sua senha"
                required
              />
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                onClick={() => setModo('escolha')}
                variant="outline"
                className="flex-1 py-3"
              >
                ← Voltar
              </Button>
              
              <Button
                type="submit"
                disabled={!isLoginValid || isLoading}
                className="flex-1 bg-[#5D9C31] hover:bg-[#4a7d28] text-white py-3 text-lg font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Entrando...
                  </div>
                ) : (
                  'ENTRAR E AGENDAR'
                )}
              </Button>
            </div>
          </form>
        )}

        {modo === 'cadastro' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31] focus:border-transparent"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    E-mail *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31] focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31] focus:border-transparent"
                    placeholder="(84) 99999-9999"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    value={formData.nascimento}
                    onChange={(e) => handleInputChange('nascimento', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31] focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    onClick={() => setModo('escolha')}
                    variant="outline"
                    className="flex-1 py-3"
                  >
                    ← Voltar
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid}
                    className="flex-1 bg-[#5D9C31] hover:bg-[#4a7d28] text-white py-3"
                  >
                    Continuar →
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target className="inline h-4 w-4 mr-1" />
                    Seus Objetivos (opcional)
                  </label>
                  <select
                    value={formData.objetivos}
                    onChange={(e) => handleInputChange('objetivos', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31] focus:border-transparent"
                  >
                    <option value="">Selecione seu objetivo</option>
                    <option value="perder-peso">Perder peso</option>
                    <option value="ganhar-massa">Ganhar massa muscular</option>
                    <option value="condicionamento">Melhorar condicionamento</option>
                    <option value="saude">Saúde e bem-estar</option>
                    <option value="competicao">Competição esportiva</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experiência Prévia (opcional)
                  </label>
                  <select
                    value={formData.experiencia}
                    onChange={(e) => handleInputChange('experiencia', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31] focus:border-transparent"
                  >
                    <option value="">Selecione sua experiência</option>
                    <option value="iniciante">Iniciante (nunca pratiquei)</option>
                    <option value="basico">Básico (pratiquei pouco)</option>
                    <option value="intermediario">Intermediário (pratico regularmente)</option>
                    <option value="avancado">Avançado (muito experiente)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Como conheceu a academia? (opcional)
                  </label>
                  <select
                    value={formData.comoConheceu}
                    onChange={(e) => handleInputChange('comoConheceu', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D9C31] focus:border-transparent"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="google">Google</option>
                    <option value="indicacao">Indicação de amigo</option>
                    <option value="passando">Passando na rua</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 py-3"
                  >
                    ← Voltar
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-[#5D9C31] hover:bg-[#4a7d28] text-white py-3 text-lg font-semibold"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Cadastrando...
                      </div>
                    ) : (
                      'CADASTRAR E AGENDAR'
                    )}
                  </Button>
                </div>
              </>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PopupCadastro;
