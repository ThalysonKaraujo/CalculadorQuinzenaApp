# 🏗️ Calculador de Quinzena

Uma aplicação mobile moderna desenvolvida para simplificar e automatizar o controle de refeições (lanches, almoços e jantares) fornecidas para construtoras durante a quinzena, garantindo agilidade no faturamento e controle de custos.

## 📱 Demonstração

> *Screenshots da aplicação em breve.*

## 🚀 Funcionalidades Principais

* **Gestão de Construtoras:** Cadastro e controle de diferentes clientes (construtoras) num só lugar.
* **Controle de Refeições:** Criação de tipos de refeição customizados (Ex: Almoço, Café, Jantar) com valores dinâmicos em Reais.
* **Lançamentos Diários:** Interface ágil para lançamento de quantidades de refeições consumidas com datas específicas.
* **Cálculo Automático:** O sistema calcula dinamicamente o valor acumulado da quinzena usando agregações em banco de dados local.
* **Exportação Profissional:** Geração de relatórios automáticos em PDF prontos para compartilhamento via WhatsApp ou e-mail.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as melhores práticas do ecossistema Mobile:

* **React Native / Expo** - Framework principal para construção da interface nativa.
* **TypeScript** - Tipagem estática para garantir um código seguro e livre de bugs.
* **SQLite** - Banco de dados local robusto para persistência das construtoras e lançamentos de forma offline.
* **React Navigation** - Gestão do fluxo de telas e pacotes de dados.
* **Expo Print & Sharing** - Para transformação de HTML em relatórios PDF compartilháveis.

## 🧠 Arquitetura e Decisões Técnicas

Durante a construção do app, adotamos práticas de Engenharia de Software modernas:
* **Offload de Cálculos para o Banco:** Em vez de realizar laços de repetição (`map`/`reduce`) custosos no JavaScript para calcular totais históricos, utilizamos queries SQL otimizadas (`LEFT JOIN` com `SUM()`) para transferir o trabalho pesado para o SQLite.
* **Custom Hooks:** Toda a lógica de comunicação com o banco de dados foi isolada em Custom Hooks (ex: `useGetMealsByCompanyId`), garantindo componentes visuais limpos e reaproveitamento de código.
* **State Management Inteligente:** Utilização do `useFocusEffect` para re-hidratação passiva dos dados na tela ao retornar da navegação.

## 💻 Como Rodar o Projeto Localmente

1. Clone este repositório:
```bash
git clone https://github.com/SEU_USUARIO/calculador-quinzena.git
```

2. Instale as dependências:
```bash
cd calculador-quinzena
npm install
```

3. Inicie o servidor do Expo:
```bash
npm run start
```

4. Escaneie o QR Code com o aplicativo **Expo Go** no seu celular ou rode no Emulador (pressionando `a` para Android ou `i` para iOS).
