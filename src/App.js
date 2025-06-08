import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { AlertCircle, Activity, Heart, Thermometer, Wind, TrendingUp, TrendingDown, Brain } from 'lucide-react';
import './App.css';

export default function ClinicalDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [riskScore, setRiskScore] = useState(45);
  const [alertLevel, setAlertLevel] = useState('moderate');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(0);

  const patients = [
    { id: 1, name: "João Silva", age: 68, bed: "UTI-01", risk: 78, trend: "up" },
    { id: 2, name: "Maria Santos", age: 45, bed: "UTI-02", risk: 32, trend: "stable" },
    { id: 3, name: "Pedro Costa", age: 72, bed: "UTI-03", risk: 91, trend: "up" },
    { id: 4, name: "Ana Oliveira", age: 55, bed: "UTI-04", risk: 15, trend: "down" }
  ];

  const generateVitalSigns = () => {
    const time = new Date();
    const baseHR = 75 + (riskScore / 100) * 30;
    const baseBP = 120 - (riskScore / 100) * 20;
    const baseRR = 16 + (riskScore / 100) * 8;
    const baseSPO2 = 98 - (riskScore / 100) * 6;
    
    return Array.from({ length: 20 }, (_, i) => ({
      time: new Date(time.getTime() - (19 - i) * 5 * 60000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      hr: baseHR + Math.random() * 10 - 5,
      bp: baseBP + Math.random() * 10 - 5,
      rr: baseRR + Math.random() * 4 - 2,
      spo2: baseSPO2 + Math.random() * 2 - 1,
      risk: Math.max(0, Math.min(100, riskScore + (i - 10) * 2 + Math.random() * 10 - 5))
    }));
  };

  const [vitalData, setVitalData] = useState(generateVitalSigns());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setVitalData(generateVitalSigns());
      
      if (selectedPatient === 2) {
        setRiskScore(prev => Math.min(100, prev + Math.random() * 5));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [riskScore, selectedPatient]);

  useEffect(() => {
    if (riskScore > 80) {
      setAlertLevel('critical');
      setShowAlert(true);
    } else if (riskScore > 60) {
      setAlertLevel('high');
    } else if (riskScore > 40) {
      setAlertLevel('moderate');
    } else {
      setAlertLevel('low');
      setShowAlert(false);
    }
  }, [riskScore]);

  const getAlertColor = () => {
    switch (alertLevel) {
      case 'critical': return 'alert-critical';
      case 'high': return 'alert-high';
      case 'moderate': return 'alert-moderate';
      default: return 'alert-low';
    }
  };

  const getAlertText = () => {
    switch (alertLevel) {
      case 'critical': return 'ALERTA CRÍTICO - Deterioração Iminente';
      case 'high': return 'Risco Alto - Monitoramento Intensivo';
      case 'moderate': return 'Risco Moderado - Atenção Aumentada';
      default: return 'Estável - Monitoramento Padrão';
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>
          <Brain className="icon-large" />
          SENTINEL-AI - Sistema de Alerta Precoce
        </h1>
        <p className="subtitle">Monitoramento em Tempo Real - {currentTime.toLocaleString('pt-BR')}</p>
      </div>

      {showAlert && (
        <div className={`alert-banner ${getAlertColor()}`}>
          <AlertCircle className="icon" />
          <span className="alert-text">{getAlertText()}</span>
          <span className="alert-time">Tempo estimado até evento crítico: 2-4 horas</span>
        </div>
      )}

      <div className="patient-grid">
        {patients.map((patient, idx) => (
          <div
            key={patient.id}
            onClick={() => {
              setSelectedPatient(idx);
              setRiskScore(patient.risk);
            }}
            className={`patient-card ${selectedPatient === idx ? 'selected' : ''}`}
          >
            <div className="patient-header">
              <div>
                <h3>{patient.name}</h3>
                <p className="patient-info">{patient.age} anos - {patient.bed}</p>
              </div>
              {patient.trend === 'up' && <TrendingUp className="trend-icon trend-up" />}
              {patient.trend === 'down' && <TrendingDown className="trend-icon trend-down" />}
            </div>
            <div className="patient-risk">
              <div className="risk-value">{patient.risk}%</div>
              <div className="risk-bar-container">
                <div
                  className={`risk-bar ${
                    patient.risk > 80 ? 'risk-critical' : 
                    patient.risk > 60 ? 'risk-high' : 
                    patient.risk > 40 ? 'risk-moderate' : 'risk-low'
                  }`}
                  style={{ width: `${patient.risk}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="main-grid">
        <div className="panel">
          <h2>
            <Activity className="icon" />
            Score de Deterioração
          </h2>
          <div className="score-display">
            <div className={`score-value ${
              riskScore > 80 ? 'text-critical' : 
              riskScore > 60 ? 'text-high' : 
              riskScore > 40 ? 'text-moderate' : 'text-low'
            }`}>
              {riskScore.toFixed(0)}%
            </div>
            <p className="score-status">{getAlertText()}</p>
            
            <div className="ai-insights">
              <p className="insights-title">Insights da IA:</p>
              <ul className="insights-list">
                <li>• Taquicardia progressiva detectada</li>
                <li>• Variabilidade da FC reduzida em 30%</li>
                <li>• Padrão similar a 89% dos casos de sepse</li>
                <li>• Recomenda: Hemograma + Lactato urgente</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="panel">
          <h2>Sinais Vitais</h2>
          <div className="vitals-list">
            <div className="vital-item">
              <div className="vital-label">
                <Heart className="icon vital-icon-heart" />
                <span>FC</span>
              </div>
              <span className="vital-value">{vitalData[vitalData.length - 1].hr.toFixed(0)} bpm</span>
            </div>
            <div className="vital-item">
              <div className="vital-label">
                <Activity className="icon vital-icon-bp" />
                <span>PA</span>
              </div>
              <span className="vital-value">{vitalData[vitalData.length - 1].bp.toFixed(0)}/80</span>
            </div>
            <div className="vital-item">
              <div className="vital-label">
                <Wind className="icon vital-icon-rr" />
                <span>FR</span>
              </div>
              <span className="vital-value">{vitalData[vitalData.length - 1].rr.toFixed(0)} rpm</span>
            </div>
            <div className="vital-item">
              <div className="vital-label">
                <Thermometer className="icon vital-icon-temp" />
                <span>SpO2</span>
              </div>
              <span className="vital-value">{vitalData[vitalData.length - 1].spo2.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="panel">
          <h2>Tendência de Risco</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={vitalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Area 
                type="monotone" 
                dataKey="risk" 
                stroke="#EF4444" 
                fill="#EF4444" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-grid">
        <div className="panel">
          <h2>Frequência Cardíaca - Últimas 2h</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={vitalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Line 
                type="monotone" 
                dataKey="hr" 
                stroke="#EF4444" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h2>Saturação O2 - Últimas 2h</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={vitalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" domain={[90, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Line 
                type="monotone" 
                dataKey="spo2" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}