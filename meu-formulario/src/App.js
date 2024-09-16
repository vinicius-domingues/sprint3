import React, { useState } from 'react';
import './App.css';

const Modal = ({ message, formData, onClose, onFormReset }) => {
  const handleOkClick = () => {
    onClose(); // Fecha o modal
    onFormReset(); // Limpa o formulário se todos os campos forem válidos
  };

  const renderFormData = () => {
    const entries = [
      { label: 'Nome', value: formData.nome },
      { label: 'Telefone', value: formData.telefone },
      { label: 'Data do Serviço', value: formData.data },
      { label: 'Tipo de Veículo', value: formData.veiculo },
      { label: 'Descrição do Problema', value: formData.descricao }
    ];
  
    return (
      <ul>
        {entries.map((entry, index) => (
          formData[entry.label.toLowerCase().replace(' ', '_')] && (
            <li key={index}>
              <strong>{entry.label}:</strong> {entry.value}
            </li>
          )
        ))}
      </ul>
    );
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        {formData && renderFormData()}
        <button onClick={handleOkClick} className="modal-close-button">OK</button>
      </div>
    </div>
  );
};

const Oracamento = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    data: '',
    veiculo: '',
    descricao: '',
  });

  const [touched, setTouched] = useState({
    nome: false,
    telefone: false,
    data: false,
    veiculo: false,
    descricao: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nome) newErrors.nome = true;
    if (!formData.telefone) newErrors.telefone = true;
    if (!formData.data) newErrors.data = true;
    if (!formData.veiculo) newErrors.veiculo = true;
    if (!formData.descricao) newErrors.descricao = true;
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setTouched({
      nome: true,
      telefone: true,
      data: true,
      veiculo: true,
      descricao: true,
    });
    if (Object.keys(errors).length === 0) {
      setModalMessage('Formulário enviado com sucesso!');
      setShowModal(true);
    } else {
      setModalMessage('Preencha todos os campos obrigatórios. Até agora foram preenchidos:');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormReset = () => {
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setFormData({
        nome: '',
        telefone: '',
        data: '',
        veiculo: '',
        descricao: '',
      });
      setTouched({
        nome: false,
        telefone: false,
        data: false,
        veiculo: false,
        descricao: false,
      });
    }
  };

  const getInputClass = (field) => {
    return touched[field] && !formData[field] ? 'input-error' : 'input-success';
  };

  return (
    <div className="form-container">
      <h2>Orçamento Mecânico</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome completo</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className={getInputClass('nome')}
            placeholder="Seu nome completo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Celular</label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className={getInputClass('telefone')}
            placeholder="Seu telefone"
          />
        </div>

        <div className="form-group">
          <label htmlFor="data">Data do Serviço:</label>
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
            className={getInputClass('data')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="veiculo">Veículo</label>
          <select
            name="veiculo"
            value={formData.veiculo}
            onChange={handleChange}
            className={getInputClass('veiculo')}
          >
            <option value="">Selecione o tipo do veículo</option>
            <option value="carro">Carro</option>
            <option value="moto">Moto</option>
            <option value="caminhão">Caminhão</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Problema detalhado</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className={getInputClass('descricao')}
            placeholder="Descreva o problema do veículo"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="confirm-button">Confirmar</button>
          <button type="button" onClick={() => handleFormReset()} className="cancel-button">Cancelar</button>
        </div>
      </form>

      {showModal && (
        <Modal
          message={modalMessage}
          formData={formData}
          onClose={handleCloseModal}
          onFormReset={handleFormReset}
        />
      )}
    </div>
  );
};

export default Oracamento;
