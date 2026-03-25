-- ============================================
-- KIWIFY COMMERCIAL - Supabase Schema
-- Execute no SQL Editor do Supabase
-- ============================================

-- 1. Tabela de perfis dos usuários
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text not null,
  full_name   text not null,
  role        text not null check (role in (
    'gestao_comercial',
    'src',
    'setup',
    'success_ops',
    'small_business'
  )),
  avatar_url  text,
  created_at  timestamptz default now()
);

-- 2. Habilitar RLS (Row Level Security)
alter table public.profiles enable row level security;

-- 3. Policies de acesso

-- Usuário lê apenas seu próprio perfil
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Gestão comercial lê todos os perfis
create policy "Gestao can read all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role = 'gestao_comercial'
    )
  );

-- Usuário atualiza apenas seu próprio perfil
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 4. Trigger: cria perfil automaticamente ao registrar novo usuário
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'success_ops')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- COMO CRIAR USUÁRIOS:
-- No painel Supabase > Authentication > Users > Invite user
-- Ou via SQL:
--
-- select auth.admin_create_user(
--   email := 'usuario@kiwify.com',
--   password := 'senha_segura',
--   user_metadata := '{"full_name": "Nome Completo", "role": "success_ops"}'
-- );
-- ============================================
