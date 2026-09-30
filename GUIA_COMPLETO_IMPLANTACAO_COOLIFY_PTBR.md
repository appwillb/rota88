# 🚀 Guia Definitivo: Como Rodar o Fleetbase em Português no Coolify

Este guia foi criado especialmente para você implantar o **Fleetbase** com segurança, alta performance e 100% em Português no seu servidor gerenciado pelo **Coolify**.

---

## 🧭 1. Visão Geral da Arquitetura do Fleetbase

O Fleetbase é um sistema operacional completo de logística modular (*Logistics & Supply Chain Operating System - LSOS*). Sua arquitetura em Docker é composta por:

| Serviço | Função | Imagem / Build | Porta Interna |
| :--- | :--- | :--- | :--- |
| **`console`** | Painel Web do Usuário e Operador (Ember.js) | `./console/Dockerfile` | `4200` |
| **`httpd`** | Gateway Nginx que recebe requisições da API | `./docker/httpd/Dockerfile` | `80` |
| **`application`** | Motor da API (PHP 8.2 / Laravel Octane / FrankenPHP) | `fleetbase/fleetbase-api:latest` | `8000` |
| **`socket`** | Servidor de WebSockets para rastreamento ao vivo no mapa | `socketcluster/socketcluster:v17.4.0` | `8000` |
| **`database`** | Banco de Dados com suporte a GIS/Geolocalização | `mysql:8.0-oracle` | `3306` |
| **`cache`** | Cache e Gerenciador de Filas | `redis:4-alpine` | `6379` |
| **`queue`** | Processamento de tarefas assíncronas (e-mails, rotas, etc.) | `fleetbase/fleetbase-api:latest` | N/A |
| **`scheduler`** | Agendador de tarefas periódicas automáticas | `fleetbase/fleetbase-api:latest` | N/A |

---

## 🇧🇷 2. Como Funciona o Português (pt-BR) no Fleetbase

A melhor notícia: **O Fleetbase já possui suporte nativo oficial ao Português do Brasil!**

### Aonde ficam as traduções?
O arquivo de tradução do painel está localizado em:
`console/translations/pt-br.yaml`

Ele possui centenas de termos traduzidos:
* Cadastro de conta e Onboarding
* Login e recuperação de senha
* Painel de controle, frotas, motoristas, veículos
* Configurações de organização, usuários e convites
* Rastreamento e notificações

### Como ativar o Português:
1. **Pela Interface do Painel:** No canto superior direito, há um **ícone de globo terrestre 🌐**. Ao clicar nele, basta selecionar **Português (Brasil)**. A sua escolha fica salva automaticamente na sua conta!
2. **Definir Português como idioma padrão global (Opcional):**
   No arquivo `console/app/routes/application.js`, na linha 115, a função define o padrão:
   ```javascript
   // De:
   const locale = this.currentUser.getOption('locale', 'en-US');
   // Para:
   const locale = this.currentUser.getOption('locale', 'pt-BR');
   ```
   Dessa forma, qualquer pessoa que acessar seu site verá tudo em português desde o primeiro segundo, mesmo antes de fazer login!

---

## 🖥️ 3. Requisitos Recomendados da VPS

Para rodar o Coolify + Fleetbase com tranquilidade:
* **Memória RAM:** Mínimo de 4 GB (Recomendado: 8 GB para que o build do frontend com Node.js/pnpm ocorra sem gargalos).
* **CPU:** 2 vCPUs ou mais.
* **Armazenamento:** 20 GB SSD/NVMe livres.
* **Sistema Operacional:** Ubuntu 22.04 LTS ou Debian 12 com Coolify instalado.

---

## 🌐 4. Configuração de DNS (Seus Domínios)

Para que o Traefik do Coolify crie os certificados SSL automáticos (HTTPS), aponte 3 registros do tipo **A** no seu provedor de domínio (ex: Cloudflare, Hostinger, GoDaddy, Registro.br) para o IP da sua VPS:

| Tipo | Nome (Subdomínio) | Destino (IP da VPS) | Exemplo de URL |
| :--- | :--- | :--- | :--- |
| **A** | `painel` (ou `app`) | `SEU_IP_VPS` | `https://painel.seudominio.com` (Console) |
| **A** | `api-fleet` | `SEU_IP_VPS` | `https://api-fleet.seudominio.com` (API Backend) |
| **A** | `socket-fleet` | `SEU_IP_VPS` | `https://socket-fleet.seudominio.com` (WebSockets) |

> 💡 **Dica importante no Cloudflare:** Se usar Cloudflare, deixe as nuvens em modo **DNS Only (Cinza)** durante a emissão inicial do certificado SSL no Coolify.

---

## 🛠️ 5. Passo a Passo de Implantação no Coolify

### Método Recomendado: Fork no seu GitHub + Coolify Git Deploy

Esse método é o mais profissional, pois permite personalizar logos, cores, traduções e atualizar seu sistema sempre com 1 clique!

#### Passo 5.1: Criar seu Repositório Fork
1. Acesse [github.com/fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) com sua conta GitHub.
2. Clique no botão **Fork** (canto superior direito) para criar uma cópia na sua conta (ex: `seu-usuario/fleetbase`).

#### Passo 5.2: Ajustar o arquivo de configuração do Frontend
No seu repositório no GitHub, edite o arquivo `console/fleetbase.config.json` para apontar para os seus domínios reais:
```json
{
  "API_HOST": "https://api-fleet.seudominio.com",
  "SOCKETCLUSTER_HOST": "socket-fleet.seudominio.com",
  "SOCKETCLUSTER_PORT": 443,
  "SOCKETCLUSTER_SECURE": true
}
```

#### Passo 5.3: Conectar no Coolify
1. Abra seu painel do **Coolify**.
2. Vá no seu **Project** -> **Environment** e clique em **+ New Resource**.
3. Selecione **Git Repository**.
4. Conecte sua conta do GitHub e selecione seu repositório `fleetbase`.
5. Em **Build Pack**, escolha **Docker Compose**.
6. O Coolify detectará automaticamente os serviços do seu `docker-compose.yml`.

#### Passo 5.4: Configurar os Domínios nos Serviços do Coolify
No Coolify, na aba de configurações de cada serviço exposto:
* No serviço **`console`**:
  * Defina o domínio: `https://painel.seudominio.com`
  * Porta de destino: `4200`
* No serviço **`httpd`**:
  * Defina o domínio: `https://api-fleet.seudominio.com`
  * Porta de destino: `80`
* No serviço **`socket`**:
  * Defina o domínio: `https://socket-fleet.seudominio.com`
  * Porta de destino: `8000`

#### Passo 5.5: Definir as Variáveis de Ambiente no Coolify
Na aba **Environment Variables** do Coolify, adicione:
```env
ENVIRONMENT=production
DISABLE_RUNTIME_CONFIG=false
DB_ROOT_PASSWORD=gere_uma_senha_forte_aqui
DB_USERNAME=fleetbase
DB_PASSWORD=gere_outra_senha_forte_aqui
DB_DATABASE=fleetbase
SESSION_DOMAIN=.seudominio.com
```

#### Passo 5.6: Iniciar o Deploy
Clique em **Deploy** no Coolify.
O Coolify vai:
1. Baixar o código.
2. Compilar o frontend Ember.js com pnpm.
3. Baixar as imagens do MySQL, Redis, API e SocketCluster.
4. Subir todos os containers e gerar os certificados HTTPS automáticos via Let's Encrypt!

---

## ⚡ 6. O Passo Mais Importante: Inicialização do Banco (`./deploy.sh`)

Na primeira vez que os containers subirem, o banco de dados estará vazio. Para criar todas as tabelas, permissões de geolocalização e cadastros base:

1. No painel do **Coolify**, clique no container **`application`**.
2. Vá até a aba **Terminal / Execute Command**.
3. Digite e execute o seguinte comando:
   ```bash
   ./deploy.sh
   ```
4. O script executará as migrações do Laravel (`php artisan migrate`), criará o banco secundário `fleetbase_sandbox` e finalizará o bootstrap da aplicação.
5. Quando o script finalizar com sucesso, seu Fleetbase estará 100% pronto!

---

## 🏁 7. Primeiro Acesso e Cadastro

1. Abra seu navegador e acesse: `https://painel.seudominio.com`
2. Você verá a tela de **Onboarding / Criação de Organização**.
3. Cadastre:
   * **Nome da sua empresa/logística**
   * **Seu nome completo**
   * **Seu e-mail de administrador**
   * **Sua senha segura**
4. Pronto! Você entrará no dashboard completo do Fleetbase.
5. Clique no ícone de globo no menu superior e garanta que está em **Português (Brasil)**.

---

## 🔧 8. Resolução de Dúvidas e Problemas Frequentes

### 1. O painel carrega, mas dá erro de conexão com a API
* **Causa:** O arquivo `console/fleetbase.config.json` ainda está apontando para `localhost:8000` ou a variável `DISABLE_RUNTIME_CONFIG=false` não foi definida.
* **Solução:** Verifique se o `API_HOST` em `console/fleetbase.config.json` contém `https://api-fleet.seudominio.com` e reinicie o container `console`.

### 2. O mapa não atualiza os motoristas em tempo real
* **Causa:** O SocketCluster não está conectado.
* **Solução:** Garanta que `socket-fleet.seudominio.com` está respondendo em HTTPS e que `SOCKETCLUSTER_SECURE` está como `true` e a porta é `443`.

### 3. Preciso de mapas mais rápidos no Brasil
* O Fleetbase vem configurado por padrão com o **OSRM** (serviço gratuito de rotas open-source).
* Quando seu negócio começar a faturar, você pode criar uma conta no **Google Cloud Console**, gerar uma chave da **Google Maps Distance Matrix & Directions API** e colar no `.env` (`GOOGLE_MAPS_API_KEY`).
