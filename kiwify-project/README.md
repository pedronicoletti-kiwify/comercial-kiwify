# Kiwify Commercial

Plataforma interna do time comercial da Kiwify.

## Stack
- **Frontend**: Next.js 15 + Tailwind CSS
- **Backend/Auth/DB**: Supabase
- **Deploy**: Vercel

---

## Setup inicial

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env.local` na raiz:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
Valores disponíveis em: **Supabase → Project Settings → API**

### 3. Configurar banco de dados
Execute o arquivo `supabase-schema.sql` no **SQL Editor** do Supabase.

### 4. Deploy na Vercel
```bash
npx vercel deploy
```
Na primeira vez, o CLI vai pedir para fazer login na Vercel e configurar o projeto.

Adicione as variáveis de ambiente também no painel da Vercel:
**Project → Settings → Environment Variables**

---

## Criar usuários

No painel do Supabase: **Authentication → Users → Invite user**

Ou via SQL Editor:
```sql
select auth.admin_create_user(
  email := 'usuario@kiwify.com',
  password := 'senha_segura',
  user_metadata := '{"full_name": "Nome Completo", "role": "success_ops"}'
);
```

### Roles disponíveis
| Role | Acesso |
|------|--------|
| `gestao_comercial` | Todos os painéis |
| `src` | Apenas SRC |
| `setup` | Apenas Setup |
| `success_ops` | Apenas Success Ops |
| `small_business` | Apenas Small Business |

---

## Estrutura do projeto

```
src/
├── app/
│   ├── (auth)/login/         → Página de login
│   └── (dashboard)/
│       ├── layout.tsx        → Layout protegido com sidebar
│       ├── dashboard/        → Home do dashboard
│       ├── gestao-comercial/ → Painel Gestão Comercial
│       ├── src/              → Painel SRC
│       ├── setup/            → Painel Setup
│       ├── success-ops/      → Painel Success Ops
│       └── small-business/   → Painel Small Business
├── components/
│   └── Sidebar.tsx           → Menu lateral com controle de acesso
├── lib/supabase/
│   ├── client.ts             → Cliente browser
│   └── server.ts             → Cliente server-side
├── middleware.ts             → Proteção de rotas + controle por role
└── types/index.ts            → Tipos e configuração de roles
```
