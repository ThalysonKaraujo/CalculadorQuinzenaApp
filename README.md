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
* **Biome** - Ferramenta super rápida e moderna para Linting e Formatação de código.

## 🧪 Qualidade e Testes Automatizados

O projeto leva a confiabilidade a sério, implementando uma suíte robusta de testes:

* **Testes de Componentes (Jest + React Native Testing Library):** Garantem que a interface visual, botões e formulários reajam corretamente aos toques do usuário e renderizem os dados corretos sem precisar abrir um emulador.
* **Testes E2E End-to-End (Maestro):** Robôs que navegam fisicamente pelo aplicativo no emulador, garantindo que os fluxos completos do usuário (como adicionar uma construtora ou uma refeição) funcionem perfeitamente em cenários reais.

### Como rodar os testes:
**Testes de Componente (Jest):**
```bash
npm test
```

**Testes E2E (Maestro):**
Com o app rodando no emulador, execute:
```bash
maestro test .maestro/
```

## 🧠 Arquitetura e Decisões Técnicas

Durante a construção do app, adotamos práticas de Engenharia de Software modernas:
* **Offload de Cálculos para o Banco:** Em vez de realizar laços de repetição (`map`/`reduce`) custosos no JavaScript para calcular totais históricos, utilizamos queries SQL otimizadas (`LEFT JOIN` com `SUM()`) para transferir o trabalho pesado para o SQLite.
* **Custom Hooks:** Toda a lógica de comunicação com o banco de dados foi isolada em Custom Hooks (ex: `useGetMealsByCompanyId`), garantindo componentes visuais limpos e reaproveitamento de código.
* **State Management Inteligente:** Utilização do `useFocusEffect` para re-hidratação passiva dos dados na tela ao retornar da navegação.
* **Design Testável:** Uso extensivo de `testID`s na camada de UI para expor a Árvore de Acessibilidade, permitindo automação de testes E2E ultra-resiliente.

## 💻 Como Rodar o Projeto Localmente

1. Clone este repositório:
```bash
git clone https://github.com/ThalysonKaraujo/CalculadorQuinzenaApp.git
```

2. Instale as dependências:
```bash
cd CalculadorQuinzenaApp
npm install
```

3. Inicie o servidor do Expo:
```bash
npm run start
```

4. Escaneie o QR Code com o aplicativo **Expo Go** no seu celular ou rode no Emulador (pressionando `a` para Android ou `i` para iOS).
