# mycash+ — Documentação

## Progresso

- [x] PROMPT 1: Estrutura Base e Configuração
- [x] PROMPT 2: Sistema de Layout e Navegação Desktop
- [x] PROMPT 3: Sistema de Layout e Navegação Mobile
- [ ] PROMPT 4: Context Global e Gerenciamento de Estado
- [ ] PROMPT 5: Cards de Resumo Financeiro
- [ ] PROMPT 6: Header do Dashboard com Controles
- [ ] PROMPT 7: Carrossel de Gastos por Categoria
- [ ] PROMPT 8: Gráfico de Fluxo Financeiro
- [ ] PROMPT 9: Widget de Cartões de Crédito
- [ ] PROMPT 10: Widget de Calendário e Agenda
- [ ] PROMPT 11: Seção de Objetivos Financeiros
- [ ] PROMPT 12: Tabela de Transações Detalhada
- [ ] PROMPT 13: Modal de Nova Transação
- [ ] PROMPT 14: Modal de Adicionar Membro
- [ ] PROMPT 15: Modal de Adicionar Cartão
- [ ] PROMPT 16: Modal de Detalhes do Cartão
- [ ] PROMPT 17: Modal de Filtros Mobile
- [ ] PROMPT 18: View Completa de Objetivos
- [ ] PROMPT 19: View Completa de Cartões
- [ ] PROMPT 20: View Completa de Transações
- [ ] PROMPT 21: View de Perfil - Aba Informações
- [ ] PROMPT 22: View de Perfil - Aba Configurações
- [ ] PROMPT 23: Animações e Transições Globais
- [ ] PROMPT 24: Formatação e Utilitários
- [ ] PROMPT 25: Responsividade e Ajustes Finais
- [ ] PROMPT 26: Testes e Validação Final

---

## PROMPT 1: Estrutura Base e Configuração

**Status**: ✅ | **Data**: 04/01/2025 | **Build**: ✅ (1 tentativa)

### Implementado

- Estrutura de pastas completa seguindo boas práticas React
- Configuração do projeto Vite + React + TypeScript
- Configuração do Tailwind CSS com todas as variáveis do design system do Figma
- Tipos TypeScript fundamentais para as 5 entidades principais:
  - `Transaction` - Transações financeiras
  - `Goal` - Objetivos financeiros
  - `CreditCard` - Cartões de crédito
  - `BankAccount` - Contas bancárias
  - `FamilyMember` - Membros da família
- Configuração do React Router com 5 rotas principais (Dashboard, Objetivos, Cartões, Transações, Perfil)
- Estrutura de pastas de componentes organizadas por domínio
- Scripts de desenvolvimento, build e preview configurados
- Arquivos auxiliares (.gitignore, README.md)

### Tokens

**Semânticas**: Ainda não aplicadas (serão criadas nos próximos prompts)

**Primitivas** (mapeadas do Figma):
- Cores:
  - `color-neutral-0`: #ffffff
  - `color-neutral-200`: #f3f4f6
  - `color-neutral-300`: #e5e7eb
  - `color-neutral-400`: #d1d5db
  - `color-neutral-500`: #9ca3af
  - `color-neutral-1100`: #080b12
  - `color-brand-500`: #dffe35 (verde-limão)
  - `color-red-400`: #f07884
  - `color-red-500`: #eb4b5b
  - `color-green-600`: #15be78
- Espaçamentos:
  - `space-0`, `space-12`, `space-16`, `space-24`, `space-32`, `space-64`
- Tipografia:
  - Heading (XS, SM, MD)
  - Label (XS, SM, MD, LG)
  - Paragraph (XS, SM, MD, LG)

**Conversões**: N/A (primeiro prompt, apenas mapeamento inicial)

### Build

**Tentativas**: 1 | **Erros**: 0 | **Status**: ✅ Sucesso

### Commit

**Hash**: a45f188  
**Mensagem**: feat: estrutura base do projeto mycash+ - configuração inicial  
**Status**: ✅ Commit realizado e push para GitHub concluído

### Arquivos Criados

- `package.json` - Dependências e scripts
- `vite.config.ts` - Configuração do Vite
- `tsconfig.json` - Configuração do TypeScript
- `tsconfig.node.json` - Configuração TypeScript para Node
- `tailwind.config.js` - Configuração do Tailwind com variáveis do Figma
- `postcss.config.js` - Configuração do PostCSS
- `index.html` - HTML base
- `src/main.tsx` - Entry point React
- `src/App.tsx` - Componente App com React Router
- `src/styles/globals.css` - Estilos globais com CSS custom properties
- `src/types/index.ts` - Tipos TypeScript fundamentais
- `src/pages/Dashboard.tsx` - Página Dashboard
- `src/pages/Objetivos.tsx` - Página Objetivos
- `src/pages/Cartoes.tsx` - Página Cartões
- `src/pages/Transacoes.tsx` - Página Transações
- `src/pages/Perfil.tsx` - Página Perfil
- `src/constants/index.ts` - Constantes globais
- `.gitignore` - Arquivos ignorados pelo Git
- `README.md` - Documentação do projeto
- Estrutura de pastas: `src/components/{layout,dashboard,cards,modals,ui}/`, `src/contexts/`, `src/hooks/`, `src/utils/`

### Notas

- Todas as variáveis do design system do Figma foram mapeadas no Tailwind config
- Tipos TypeScript foram criados com base no contexto do sistema (sem acesso à documentação específica mencionada)
- React Router configurado para SPA com 5 rotas principais
- Projeto está pronto para desenvolvimento dos componentes

---

## PROMPT 2: Sistema de Layout e Navegação Desktop

**Status**: ✅ | **Data**: 04/01/2025 | **Build**: ✅ (1 tentativa)

### Implementado

- Componente Sidebar com dois estados visuais (expandido e colapsado)
  - Estado expandido: mostra logo completo "Mycash+", nomes das seções e informações completas do perfil
  - Estado colapsado: mostra apenas ícone do logo, ícones das seções e avatar do perfil
- Botão de alternância circular na borda direita da sidebar
  - Ícone muda entre seta esquerda (expandida) e seta direita (colapsada)
  - Posicionado absolutamente com sombra e hover
- Transições suaves entre estados (300ms duration)
  - Largura da sidebar anima entre 414px (expandida) e 80px (colapsada)
  - Conteúdo principal ajusta margem esquerda automaticamente
  - Opacidade do logo e texto animam suavemente
- Sistema de tooltips quando sidebar está colapsada
  - Tooltips aparecem ao passar mouse sobre itens de navegação
  - Aparecem à direita do item com delay de 200ms
  - Fundo preto com texto branco
- Comportamento de item ativo
  - Item da seção atual tem fundo preto (neutral-1100)
  - Texto branco (neutral-0)
  - Ícone verde-limão (brand-500)
  - Itens inativos têm fundo transparente, texto preto e ícone preto
- Integração com React Router
  - Navegação funcional entre todas as seções
  - Detecção automática de rota ativa
  - 5 rotas principais: Home, Objetivos, Cartões, Transações, Perfil
- Componente AppLayout criado
  - Wrapper principal que inclui Sidebar e conteúdo
  - Sidebar aparece apenas em desktop (acima de 1024px)
  - Layout responsivo preparado para mobile (PROMPT 3)
- Componentes de ícones SVG inline criados
  - HomeIcon, GolfIcon, CreditCardIcon, TransactionsIcon, ProfileIcon, SignOutIcon
  - ChevronLeftIcon, ChevronRightIcon para toggle
  - Todos usando SVG inline sem dependências externas

### Tokens

**Semânticas**: N/A (ainda não aplicadas)

**Primitivas** (utilizadas):
- Cores:
  - `bg-neutral-0` - Fundo branco da sidebar
  - `bg-neutral-1100` - Fundo preto para item ativo
  - `text-neutral-0` - Texto branco em item ativo
  - `text-neutral-1100` - Texto preto padrão
  - `bg-brand-500` - Verde-limão para ícone ativo e logo
  - `text-red-500` - Vermelho para botão Sair
  - `bg-neutral-200` - Fundo cinza claro do card de perfil
  - `bg-neutral-300` - Fundo cinza médio para avatar
- Espaçamentos:
  - `px-16` (64px) - Padding horizontal quando expandida
  - `px-4` (16px) - Padding horizontal quando colapsada
  - `py-8` (32px) - Padding vertical
  - `gap-3` (12px) - Espaçamento entre itens de navegação
  - `gap-16` (64px) - Espaçamento entre logo e navegação
  - `gap-4` (16px) - Espaçamento no rodapé
- Tipografia:
  - `text-heading-xs` - Logo "Mycash+"
  - `text-label-lg` - Labels de navegação
  - `text-paragraph-md` - Email no card de perfil
- Shapes:
  - `rounded-[100px]` - Botões de navegação (pill shape)
  - `rounded-xl` (20px) - Card de perfil
  - `rounded-full` - Avatar circular

**Conversões**: N/A (todos os valores usam tokens do design system)

### Build

**Tentativas**: 1 | **Erros**: 0 | **Status**: ✅ Sucesso

### Commit

**Hash**: e5c4ca9  
**Mensagem**: feat: sistema de layout e navegação desktop com sidebar  
**Status**: ✅ Commit realizado e push para GitHub concluído

### Arquivos Criados

- `src/components/layout/Sidebar.tsx` - Componente principal da sidebar
- `src/components/layout/AppLayout.tsx` - Layout wrapper com sidebar
- `src/components/ui/Icons.tsx` - Componentes de ícones SVG inline
- Arquivos modificados:
  - `src/App.tsx` - Integração do AppLayout com rotas

### Notas

- Sidebar implementada seguindo design do Figma
- Estados expandido/colapsado funcionando perfeitamente
- Tooltips implementados com delay para melhor UX
- Item ativo usa ícone verde-limão conforme especificado no prompt
- Layout preparado para responsividade (mobile será implementado no PROMPT 3)
- Todos os estilos usam exclusivamente variáveis do design system

