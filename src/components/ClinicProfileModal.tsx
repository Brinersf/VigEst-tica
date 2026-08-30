import React, { useState, useEffect, useRef } from 'react';
import { X, Save, ShieldCheck, Plus, Trash2, Sliders, Building2, User, UserCheck, Stethoscope, Sparkles, Palette, Image, Upload, RefreshCw } from 'lucide-react';
import { ClinicData } from '../types';

interface ClinicProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinicData: ClinicData;
  onSave: (data: ClinicData) => void;
}

export const ClinicProfileModal: React.FC<ClinicProfileModalProps> = ({
  isOpen,
  onClose,
  clinicData,
  onSave,
}) => {
  const [formData, setFormData] = useState<ClinicData>(clinicData);
  const [activeTab, setActiveTab] = useState<'clinica' | 'identidade' | 'responsavel' | 'paciente' | 'equipamento' | 'personalizadas'>('clinica');
  const [newKey, setNewKey] = useState('');
  const [newVal, setNewVal] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(clinicData);
  }, [clinicData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        logoUrl: base64
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddCustomVariable = () => {
    const cleanKey = newKey.trim().replace(/^\{\{/, '').replace(/\}\}$/, '').toLowerCase().replace(/\s+/g, '_');
    if (!cleanKey) return;

    setFormData((prev) => ({
      ...prev,
      customVariables: {
        ...(prev.customVariables || {}),
        [cleanKey]: newVal.trim(),
      },
    }));
    setNewKey('');
    setNewVal('');
  };

  const handleRemoveCustomVariable = (keyToRemove: string) => {
    setFormData((prev) => {
      const updated = { ...(prev.customVariables || {}) };
      delete updated[keyToRemove];
      return {
        ...prev,
        customVariables: updated,
      };
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-[680px] bg-[#121c28] border border-[#1e2d40] rounded-[24px] p-5 sm:p-6 shadow-2xl animate-[slideUp_0.2s_ease] my-auto">
        <div className="flex justify-between items-center pb-4 border-b border-[#1e2d40]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D3A1] to-[#00B1EA] flex items-center justify-center text-black shadow-md shadow-[#00D3A1]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[18px] text-white leading-tight flex items-center gap-2">
                <span>Dados da Clínica & Personalização</span>
                <span className="text-[10px] font-black bg-[#00D3A1] text-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Documentos ANVISA
                </span>
              </h3>
              <p className="text-[12px] text-[#94A3B8] mt-0.5">
                Informe o nome da sua clínica, Responsável Técnico, logotipo e paleta de cores para todos os documentos.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#0a1018] flex items-center justify-center text-[#8aa0b8] hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1.5 mt-4 p-1 bg-[#0a1018] rounded-xl border border-[#1e2d40] overflow-x-auto scrollbar-none text-[12px]">
          <button
            type="button"
            onClick={() => setActiveTab('clinica')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'clinica' ? 'bg-[#00d3a1] text-black shadow-sm' : 'text-[#8aa0b8] hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Clínica & Endereço</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('identidade')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'identidade' ? 'bg-[#00d3a1] text-black shadow-sm' : 'text-[#8aa0b8] hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Logo & Cores</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('responsavel')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'responsavel' ? 'bg-[#00d3a1] text-black shadow-sm' : 'text-[#8aa0b8] hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Responsável Técnico</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('paciente')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'paciente' ? 'bg-[#00d3a1] text-black shadow-sm' : 'text-[#8aa0b8] hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Paciente / Cliente</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('equipamento')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'equipamento' ? 'bg-[#00d3a1] text-black shadow-sm' : 'text-[#8aa0b8] hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Equipamentos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('personalizadas')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'personalizadas' ? 'bg-[#00d3a1] text-black shadow-sm' : 'text-[#8aa0b8] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Chaves Extras</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* TAB: IDENTIDADE (LOGO & CORES) */}
          {activeTab === 'identidade' && (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoUpload}
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                className="hidden"
              />

              {/* Upload do Logo */}
              <div className="p-4 rounded-xl bg-[#0a1018] border border-[#1e2d40] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Image className="w-4 h-4 text-[#00d3a1]" />
                    <span>Logotipo da Clínica</span>
                  </label>
                  {formData.logoUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, logoUrl: undefined }))}
                      className="text-[11px] text-red-400 hover:text-red-300 font-bold"
                    >
                      Remover Logo
                    </button>
                  )}
                </div>

                {formData.logoUrl ? (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#14202d] border border-[#1e2d40]">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 bg-white rounded p-1 flex items-center justify-center">
                        <img src={formData.logoUrl} alt="Logo" className="max-h-full max-w-full object-contain" />
                      </div>
                      <span className="text-[12px] text-[#00d3a1] font-bold">Logo configurada com sucesso</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-8 px-3 rounded-lg bg-[#0a1018] text-white text-[11px] font-bold border border-[#1e2d40]"
                    >
                      Trocar
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#1e2d40] hover:border-[#00d3a1] rounded-xl p-5 text-center cursor-pointer transition"
                  >
                    <Upload className="w-6 h-6 text-[#8aa0b8] mx-auto mb-2" />
                    <div className="text-[12px] text-white font-bold">Clique para carregar a Logo da Clínica</div>
                    <div className="text-[10px] text-[#8aa0b8] mt-0.5">PNG, JPG, SVG ou WebP (máx 2MB)</div>
                  </div>
                )}
              </div>

              {/* Cor Principal dos Documentos */}
              <div className="p-4 rounded-xl bg-[#0a1018] border border-[#1e2d40] space-y-3">
                <label className="text-[12px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#00d3a1]" />
                  <span>Cor Primária dos Documentos</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.themeColor || '#00D3A1'}
                    onChange={(e) => setFormData((prev) => ({ ...prev, themeColor: e.target.value }))}
                    className="w-10 h-10 rounded-lg bg-transparent border-0 cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={formData.themeColor || '#00D3A1'}
                    onChange={(e) => setFormData((prev) => ({ ...prev, themeColor: e.target.value }))}
                    className="w-32 h-10 px-3 rounded-xl bg-[#14202d] border border-[#1e2d40] text-[13px] text-white font-mono uppercase"
                  />
                  <span className="text-[11px] text-[#8aa0b8]">
                    Aplicada nos cabeçalhos, títulos e molduras dos POPs
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* TAB 1: CLÍNICA & ENDEREÇO */}
          {activeTab === 'clinica' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    Nome da Clínica
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{nome_clinica}}`}
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={formData.nomeClinica}
                  onChange={(e) => setFormData({ ...formData, nomeClinica: e.target.value })}
                  placeholder="Ex: Studio Estética Avançada & Biomedicina"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    Alvará Sanitário
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{alvara}}`} / {`{{alvara_sanitario}}`}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.alvara}
                  onChange={(e) => setFormData({ ...formData, alvara: e.target.value })}
                  placeholder="ALV-2025-VISA-88"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    Endereço Comercial
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{endereco}}`}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.endereco || ''}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  placeholder="Av. Paulista, 1000 - Conj. 50"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    Cidade / UF
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{cidade}}`} / {`{{cidade_uf}}`}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.cidade || ''}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  placeholder="São Paulo - SP"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    Telefone de Contato
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{telefone}}`}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.whatsapp || formData.telefone || ''}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value, telefone: e.target.value })}
                  placeholder="(11) 99999-8888"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    E-mail da Clínica
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{email}}`}
                  </span>
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contato@suaclinica.com.br"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: RESPONSÁVEL TÉCNICO */}
          {activeTab === 'responsavel' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    Nome do Responsável Técnico(a)
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{responsavel_tecnico}}`} / {`{{responsavel}}`}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.responsavel}
                  onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                  placeholder="Dra. Mariana Silva"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    Registro do Conselho de Classe (CRBM / CRM / COREN / CRF / CREFITO)
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{registro_conselho}}`} / {`{{registro_profissional}}`}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.registroConselho || ''}
                  onChange={(e) => setFormData({ ...formData, registroConselho: e.target.value })}
                  placeholder="CRM 124580 / SP - Médica"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: PACIENTE / CLIENTE */}
          {activeTab === 'paciente' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    Nome Padrão do Paciente / Cliente
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{nome_cliente}}`}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.nomeCliente}
                  onChange={(e) => setFormData({ ...formData, nomeCliente: e.target.value })}
                  placeholder="Ana Paula Vasconcelos"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    RG do Paciente
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{rg_cliente}}`}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.rgCliente || ''}
                  onChange={(e) => setFormData({ ...formData, rgCliente: e.target.value })}
                  placeholder="12.345.678-9 SSP/SP"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 4: EQUIPAMENTOS & PROCEDIMENTOS */}
          {activeTab === 'equipamento' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    Equipamento / Aparelho Padrão
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{equipamento}}`}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.equipamento || ''}
                  onChange={(e) => setFormData({ ...formData, equipamento: e.target.value })}
                  placeholder="Laser Diodo / Ultrassom Microfocado"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    Nº Registro ANVISA do Equipamento
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{registro_anvisa}}`}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.registroAnvisa || ''}
                  onChange={(e) => setFormData({ ...formData, registroAnvisa: e.target.value })}
                  placeholder="MS nº 80000000000"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    Procedimento Padrão
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{procedimento}}`}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.procedimento || ''}
                  onChange={(e) => setFormData({ ...formData, procedimento: e.target.value })}
                  placeholder="Aplicação de Toxina Botulínica / Preenchimento"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    Honorários / Valor
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{valor}}`} / {`{{valor_honorarios}}`}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.valorHonorarios || ''}
                  onChange={(e) => setFormData({ ...formData, valorHonorarios: e.target.value })}
                  placeholder="R$ 1.500,00"
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold">
                    Data do Documento
                  </label>
                  <span className="text-[10px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-1.5 py-0.5 rounded">
                    {`{{data}}`}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.dataDocumento || ''}
                  onChange={(e) => setFormData({ ...formData, dataDocumento: e.target.value })}
                  placeholder={new Date().toLocaleDateString('pt-BR')}
                  className="w-full h-10 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 5: VARIÁVEIS PERSONALIZADAS */}
          {activeTab === 'personalizadas' && (
            <div className="space-y-3">
              <div className="p-3 bg-[#0a1018] rounded-xl border border-[#1e2d40]">
                <h4 className="text-[12px] font-bold text-white mb-1 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-[#00d3a1]" /> Adicionar Nova Variável Personalizada
                </h4>
                <p className="text-[11px] text-[#8aa0b8] mb-2.5">
                  Crie qualquer chave para usar no texto com <code className="text-[#00d3a1]">{`{{nome_da_chave}}`}</code>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                      placeholder="Nome da chave (ex: lote_toxina)"
                      className="w-full h-9 px-2.5 rounded-lg bg-[#14202d] border border-[#1e2d40] text-[12px] text-white focus:border-[#00d3a1] outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      value={newVal}
                      onChange={(e) => setNewVal(e.target.value)}
                      placeholder="Valor / Conteúdo que será inserido"
                      className="w-full h-9 px-2.5 rounded-lg bg-[#14202d] border border-[#1e2d40] text-[12px] text-white focus:border-[#00d3a1] outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCustomVariable}
                    className="h-9 px-3 rounded-lg bg-[#00d3a1] text-black font-bold text-[11px] flex items-center justify-center gap-1 hover:bg-[#00c291] transition active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 mt-2">
                <label className="text-[11px] uppercase tracking-wider text-[#8aa0b8] font-bold block">
                  Chaves Personalizadas Criadas ({Object.keys(formData.customVariables || {}).length})
                </label>

                {Object.keys(formData.customVariables || {}).length === 0 ? (
                  <div className="p-4 text-center text-[12px] text-[#8aa0b8] bg-[#0a1018] rounded-xl border border-dashed border-[#1e2d40]">
                    Nenhuma variável personalizada cadastrada ainda. Use o campo acima para adicionar.
                  </div>
                ) : (
                  Object.entries(formData.customVariables || {}).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#0a1018] border border-[#1e2d40]"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[11px] font-mono text-[#00d3a1] bg-[#00d3a1]/10 px-2 py-1 rounded shrink-0">
                          {`{{${k}}}`}
                        </span>
                        <input
                          type="text"
                          value={v}
                          onChange={(e) => {
                            const updatedVal = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              customVariables: {
                                ...(prev.customVariables || {}),
                                [k]: updatedVal,
                              },
                            }));
                          }}
                          className="h-7 px-2 rounded bg-[#14202d] border border-[#1e2d40] text-[12px] text-white focus:border-[#00d3a1] outline-none flex-1 min-w-0"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomVariable(k)}
                        className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition shrink-0"
                        title="Remover variável"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[#1e2d40] flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black font-extrabold flex items-center justify-center gap-2 hover:brightness-110 transition active:scale-95 text-[13px] shadow-lg shadow-[#00D3A1]/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Substituir e Finalizar Todos os 40+ Documentos em 1 Clique</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-12 px-5 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[#8aa0b8] hover:text-white transition text-[13px] font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

