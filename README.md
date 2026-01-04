# mycash+ - Gestão Financeira Familiar

Sistema completo de gestão financeira familiar desenvolvido com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Roteamento SPA
- **Supabase** - Backend (integração futura)

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse `http://localhost:5173` no navegador

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa linter

## 📁 Estrutura de Pastas

```
src/
├── components/     # Componentes React organizados por domínio
│   ├── layout/    # Componentes de layout (Sidebar, Header)
│   ├── dashboard/ # Componentes do dashboard
│   ├── cards/     # Componentes de card reutilizáveis
│   ├── modals/    # Modais do sistema
│   └── ui/        # Componentes básicos (Button, Input, etc)
├── contexts/      # React Contexts para estado global
├── hooks/         # Custom hooks
├── pages/         # Páginas principais (rotas)
├── types/         # Definições TypeScript
├── utils/         # Funções utilitárias
├── constants/     # Constantes globais
└── styles/        # Estilos globais e CSS
```

## 🎨 Design System

O projeto utiliza um design system baseado em variáveis do Figma:

- **Cores**: Neutral, Brand, Red, Green
- **Espaçamentos**: 0, 12, 16, 24, 32, 64px
- **Tipografia**: Heading, Label, Paragraph em múltiplos tamanhos

Todas as variáveis estão disponíveis como CSS custom properties e classes do Tailwind.

## 📝 Licença

Private project

