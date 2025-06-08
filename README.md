# 🛡️ Sentinel-AI

Sistema de Alerta Precoce para Deterioração Clínica baseado em Inteligência Artificial.

## 📌 Visão Geral

Pacientes hospitalizados podem sofrer deterioração clínica súbita, levando a eventos adversos graves, como mortalidade evitável. O Sentinel-AI é uma plataforma inteligente que antecipa sinais de deterioração com até 12 horas de antecedência, permitindo intervenções precoces por equipes clínicas.

> 🎯 Objetivo: Reduzir mortalidade hospitalar, melhorar desfechos clínicos e otimizar recursos com tecnologia avançada de IA.

---

## 🧠 Tecnologias e Diferenciais

| Componente                  | Descrição                                                                 |
|-----------------------------|---------------------------------------------------------------------------|
| **🧬 Digital Twin Clínico**  | Simulação personalizada do paciente em tempo real                         |
| **🔀 Ensemble Multimodal**   | Combinação de LSTM, Transformers e XGBoost para sinais vitais e exames     |
| **🔐 Aprendizado Federado** | Treinamento distribuído entre hospitais, sem troca de dados sensíveis      |
| **🔎 Explicabilidade (SHAP)** | Transparência nas decisões da IA com SHAP Values                          |
| **⚠️ Alertas Contextualizados** | Notificações adaptadas à especialidade e ao perfil do profissional de saúde |

---

## 📦 Estrutura do Projeto

```md
sentinel-ai-frontend/
├── public/ # Arquivos públicos (HTML, favicon etc.)
├── src/ # Código-fonte principal
│ ├── App.js # Componente principal da aplicação
│ ├── App.test.js # Testes do componente App
│ ├── index.js # Ponto de entrada React
│ ├── index.css # Estilo global
│ ├── App.css # Estilo local do App
│ ├── reportWebVitals.js # Métricas de performance
│ └── setupTests.js # Configuração de testes
├── .gitignore
├── package.json
├── package-lock.json
└── README.md # Este arquivo
```

---

## 🚀 Como Rodar Localmente

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/sentinel-ai.git
cd sentinel-ai
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute a aplicação**

```bash
npm start
```

A aplicação estará disponível em: http://localhost:3000

## 📊 Funcionalidades previstas

- Visualização de alertas clínicos em tempo real
- Exibição de informações resumidas dos pacientes (via gêmeo digital)
- Indicadores de risco e explicabilidade (ex: SHAP)
- Personalização dos alertas por perfil profissional

## 📊 Dados Utilizados

- 🧪 Dados sintéticos ou anonimizados de sinais vitais (MIMIC-III, EBSERH)
- 📁 Estrutura de dados compatível com HL7/FHIR
- ⚠️ Atenção: O uso de dados reais requer aprovação ética e anonimização completa.