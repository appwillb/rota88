(function() {
    'use strict';

    // 1. Forçar o idioma padrão para Português do Brasil (pt-BR) no LocalStorage
    try {
        const storageKey = '@fleetbase/storage:user-options';
        const raw = localStorage.getItem(storageKey);
        const options = raw ? JSON.parse(raw) : {};
        if (options.locale !== 'pt-br') {
            options.locale = 'pt-br';
            localStorage.setItem(storageKey, JSON.stringify(options));
        }
    } catch (e) {
        console.warn('[Rota88] Erro ao definir idioma:', e);
    }

    // 2. Atualizar Título da Página Continuamente
    function updateTitle() {
        if (document.title.includes('Fleetbase')) {
            document.title = document.title.replace(/Fleetbase Console/g, 'Rota88 - Gestão & Entregas')
                                           .replace(/Fleetbase \| Fleetbase/g, 'Rota88')
                                           .replace(/Fleetbase/g, 'Rota88');
        }
    }

    // 3. Dicionário Completo de Tradução (Chaves normalizadas em minúsculas)
    const DICTIONARY = {
        // Dropdown de Usuário e Organizações
        'home': 'Início',
        'organization settings': 'Configurações da Empresa',
        'create or join organizations': 'Gerenciar Organizações',
        'explore extensions': 'Explorar Módulos',
        'admin': 'Administração',
        'administrator': 'Administrador',
        'view profile': 'Meu Perfil',
        'show keyboard shortcuts': 'Atalhos do Teclado',
        'changelog': 'Novidades',
        'developers': 'Integrações & API',
        'help & support': 'Ajuda & Suporte',
        'terms of service': 'Termos de Uso',
        'privacy policy': 'Política de Privacidade',
        'logout': 'Sair',
        'sign out': 'Sair',

        // Cards e Widgets do Dashboard
        'radar': 'RADAR',
        'open radar': 'Abrir Radar',
        'open': 'abertos',
        'snoozed': 'adiados',
        'revenue': 'RECEITA TOTAL',
        'vs previous period': 'vs período anterior',
        'current': 'Atual',
        'active orders': 'PEDIDOS ATIVOS',
        'drivers online': 'MOTORISTAS ONLINE',
        'expenses': 'DESPESAS',
        'net income': 'LUCRO LÍQUIDO',
        'outstanding ar': 'A RECEBER',
        'overdue ar': 'CONTAS VENCIDAS',
        'overdue': 'VENCIDO',
        'next 7d': 'PRÓX. 7 DIAS',
        'mtd': 'NO MÊS',
        'live fleet map': 'Mapa da Frota em Tempo Real',
        'no active drivers or vehicles to display.': 'Nenhum motorista ou veículo ativo no momento.',
        'revenue trend': 'Tendência de Faturamento',
        'top drivers': 'Melhores Motoristas',
        'orders': 'Pedidos',
        'on-time': 'Pontualidade',
        'distance': 'Distância',
        'no driver activity in this period.': 'Nenhuma atividade de motorista neste período.',
        'maintenance overview': 'Visão de Manutenção',
        'no upcoming maintenance.': 'Nenhuma manutenção pendente.',
        'recent financial activity': 'Atividades Financeiras Recentes',
        'latest journal entries posted to the ledger': 'Últimos lançamentos no livro-razão',
        'no recent journal entries.': 'Nenhum lançamento recente.',
        'cash flow summary': 'Resumo do Fluxo de Caixa',
        'net cash change': 'variação de caixa',

        // Menus e Navegação
        'default dashboard': 'Painel de Controle',
        'search navigation': 'Buscar no menu...',
        'more extensions': 'Mais Módulos',
        'customise navigation': 'Personalizar Menu',
        'open chat inbox': 'Mensagens',
        'legal': 'Termos Legais',
        'starting up...': 'Carregando...',
        'fleet-ops': 'Operações de Entrega',
        'storefront': 'Lojas & Pedidos',
        'iam': 'Acessos & Usuários',
        'ledger': 'Financeiro',

        // Fleet-Ops e Recursos
        'create fleet': 'Criar Frota',
        'filter resources...': 'Filtrar recursos...',
        'vehicles': 'Veículos',
        'drivers': 'Motoristas',
        'fleets': 'Frotas',
        'places': 'Locais',
        'positions': 'Posições',
        'geofences': 'Cercas Virtuais',
        'events': 'Eventos',
        'no vehicles visible': 'Nenhum veículo visível',
        'vehicles appear here when they are available in the live map context.': 'Os veículos aparecerão aqui quando estiverem disponíveis no mapa.',

        // Ações e Botões Comuns
        'new': 'Novo',
        'create': 'Criar',
        'add': 'Adicionar',
        'edit': 'Editar',
        'update': 'Atualizar',
        'save': 'Salvar',
        'save changes': 'Salvar Alterações',
        'delete': 'Excluir',
        'delete selected': 'Excluir Selecionados',
        'remove': 'Remover',
        'cancel': 'Cancelar',
        'confirm': 'Confirmar',
        'close': 'Fechar',
        'open': 'Abrir',
        'view': 'Visualizar',
        'preview': 'Pré-visualizar',
        'upload': 'Enviar',
        'download': 'Baixar',
        'import': 'Importar',
        'export': 'Exportar',
        'print': 'Imprimir',
        'duplicate': 'Duplicar',
        'copy': 'Copiar',
        'paste': 'Colar',
        'share': 'Compartilhar',
        'refresh': 'Atualizar',
        'reset': 'Redefinir',
        'retry': 'Tentar Novamente',
        'back': 'Voltar',
        'next': 'Próximo',
        'previous': 'Anterior',
        'submit': 'Enviar',
        'apply': 'Aplicar',
        'continue': 'Continuar',
        'proceed': 'Prosseguir',
        'select': 'Selecionar',
        'deselect': 'Desmarcar',
        'search': 'Pesquisar',
        'filter': 'Filtrar',
        'sort': 'Ordenar',
        'view all': 'Ver Todos',
        'clear': 'Limpar',
        'done': 'Concluído',
        'finish': 'Finalizar',
        'skip': 'Pular',
        'actions': 'Ações',
        'details': 'Detalhes',
        'overview': 'Visão Geral',
        'status': 'Status',
        'date': 'Data',
        'time': 'Hora',
        'name': 'Nome',
        'type': 'Tipo',
        'category': 'Categoria',
        'description': 'Descrição',
        'notes': 'Observações',
        'all': 'Todos',
        'none': 'Nenhum',
        'select all': 'Selecionar Tudo',
        'deselect all': 'Desmarcar Tudo',
        'today': 'Hoje',
        'yesterday': 'Ontem',
        'tomorrow': 'Amanhã',

        // Estados e Status de Pedidos / Entregas
        'created': 'Criado',
        'order created': 'Pedido Criado',
        'dispatched': 'Despachado',
        'order dispatched': 'Pedido Despachado',
        'started': 'Iniciado',
        'in progress': 'Em Andamento',
        'in transit': 'Em Trânsito',
        'completed': 'Concluído',
        'delivered': 'Entregue',
        'cancelled': 'Cancelado',
        'failed': 'Falhou',
        'pending': 'Pendente',
        'active': 'Ativo',
        'inactive': 'Inativo',
        'online': 'Online',
        'offline': 'Offline',
        'available': 'Disponível',
        'busy': 'Ocupado',

        // Rastreamento e Mapa de Entregas (Tracking)
        'live map:': 'Mapa em Tempo Real:',
        'live map': 'Mapa em Tempo Real',
        'view route': 'Ver Rota',
        'locate driver': 'Localizar Entregador',
        'lookup another order': 'Rastrear Outro Pedido',
        'lookup order': 'Buscar Pedido',
        'lookup another': 'Buscar Outro',
        'tracking:': 'Rastreamento:',
        'tracking': 'Rastreamento',
        'current eta:': 'Previsão Atual:',
        'current eta': 'Previsão Atual',
        'ect:': 'Hora Estimada:',
        'current destination:': 'Destino Atual:',
        'current destination': 'Destino Atual',
        'next destination:': 'Próximo Destino:',
        'next destination': 'Próximo Destino',
        'pickup': 'Coleta',
        'dropoff': 'Entrega',
        'date created:': 'Data de Criação:',
        'date created': 'Data de Criação',
        'order details': 'Detalhes do Pedido',
        'package details': 'Detalhes do Pacote',
        'customer details': 'Dados do Cliente',
        'driver details': 'Dados do Entregador',
        'delivery route': 'Rota de Entrega',
        'back to console': 'Voltar ao Painel',

        // Operações de Entrega (FleetOps)
        'orders': 'Pedidos',
        'new order': 'Novo Pedido',
        'create order': 'Criar Pedido',
        'edit order': 'Editar Pedido',
        'cancel order': 'Cancelar Pedido',
        'delete order': 'Excluir Pedido',
        'dispatch': 'Despachar',
        'dispatch order': 'Despachar Pedido',
        'assign driver': 'Atribuir Motorista',
        'unassign driver': 'Desatribuir Motorista',
        'customer': 'Cliente',
        'customers': 'Clientes',
        'driver': 'Motorista',
        'vehicle': 'Veículo',
        'destination': 'Destino',
        'origin': 'Origem',
        'proof of delivery': 'Comprovante de Entrega',
        'signature': 'Assinatura',
        'tracking number': 'Código de Rastreio',
        'internal id': 'ID Interno',
        'route': 'Rota',
        'distance': 'Distância',
        'total distance': 'Distância Total',
        'duration': 'Duração',
        'waypoints': 'Pontos da Rota',
        'payload': 'Carga',
        'entities': 'Itens / Pacotes',

        // Tabela de Motoristas e Veículos
        'new driver': 'Novo Motorista',
        'create driver': 'Cadastrar Motorista',
        'edit driver': 'Editar Motorista',
        'driver name': 'Nome do Motorista',
        'license number': 'Número da CNH',
        'phone number': 'Telefone',
        'vehicle assigned': 'Veículo Vinculado',
        'current location': 'Localização Atual',
        'new vehicle': 'Novo Veículo',
        'create vehicle': 'Cadastrar Veículo',
        'license plate': 'Placa',
        'plate': 'Placa',
        'model': 'Modelo',
        'make': 'Marca',
        'year': 'Ano',

        // Tabela de Locais e Clientes (Places & Contacts)
        'new place': 'Novo Local',
        'create place': 'Cadastrar Local',
        'place name': 'Nome do Local',
        'address': 'Endereço',
        'street': 'Rua',
        'city': 'Cidade',
        'state': 'Estado',
        'postal code': 'CEP',
        'country': 'País',
        'latitude': 'Latitude',
        'longitude': 'Longitude',
        'coordinates': 'Coordenadas',
        'contacts': 'Contatos',
        'new contact': 'Novo Contato',

        // Chaves de API e Integrações (Developers)
        'api keys': 'Chaves de API',
        'new api key': 'Nova Chave de API',
        'create api key': 'Criar Chave de API',
        'public key': 'Chave Pública',
        'secret key': 'Chave Secreta',
        'environment': 'Ambiente',
        'expiration': 'Expiração',
        'last used': 'Último Uso',
        'view test data': 'Visualizar Dados de Teste',
        'webhooks': 'Webhooks',
        'websockets': 'WebSockets',
        'logs': 'Registros de Logs',

        // Lojas & Pedidos (Storefront)
        'stores': 'Lojas',
        'new store': 'Nova Loja',
        'products': 'Produtos',
        'new product': 'Novo Produto',
        'inventory': 'Estoque',
        'categories': 'Categorias',
        'customers': 'Clientes',
        'discounts': 'Descontos',
        'checkout': 'Finalização',

        // Acessos e Usuários (IAM)
        'users': 'Usuários',
        'new user': 'Novo Usuário',
        'create user': 'Cadastrar Usuário',
        'roles': 'Funções & Cargos',
        'permissions': 'Permissões',
        'policies': 'Políticas',
        'groups': 'Grupos',
        'email': 'E-mail',
        'password': 'Senha',
        'confirm password': 'Confirmar Senha',
        'phone': 'Telefone',

        // Financeiro (Ledger)
        'accounts': 'Contas',
        'transactions': 'Transações',
        'invoices': 'Faturas',
        'gateways': 'Meios de Pagamento',
        'balance': 'Saldo',
        'debit': 'Débito',
        'credit': 'Crédito',
        'currency': 'Moeda',

        // Painel e Menu de Administração (Admin Dashboard)
        'admin dashboard': 'Painel de Administração',
        'search admin': 'Buscar no Admin...',
        'visão geral': 'Visão Geral',
        'organizações': 'Organizações',
        'personalização': 'Personalização',
        'platform api token': 'Token da API da Plataforma',
        'monitor de agendamento': 'Monitor de Agendamento',
        'fleet-ops config': 'Configurações de Entrega',
        'extensions registry': 'Registro de Extensões',
        'ai config': 'Configurações de IA',
        'api traffic': 'Tráfego da API',
        'auth config': 'Configuração de Autenticação',
        'system config': 'Configurações do Sistema',
        'active admins': 'ADMINISTRADORES ATIVOS',
        'admin access': 'acesso admin',
        'pending attention': 'ATENÇÃO PENDENTE',
        'needs review': 'requer revisão',
        'new users': 'NOVOS USUÁRIOS',
        'new organizations': 'NOVAS EMPRESAS',
        'organizations': 'EMPRESAS',
        'failed jobs': 'TAREFAS COM FALHA',
        'queue health': 'saúde da fila',
        'suspicious activity': 'ATIVIDADE SUSPEITA',
        'last 30d': 'últimos 30d',
        'system diagnostics': 'DIAGNÓSTICO DO SISTEMA',
        'core service configuration state': 'Estado de configuração dos serviços essenciais',
        'admin activity': 'ATIVIDADE ADMINISTRATIVA',
        'recent sensitive admin events': 'Eventos administrativos recentes',
        'no recent sensitive admin activity.': 'Nenhuma atividade administrativa recente.',
        'organization risk queue': 'FILA DE RISCO DE ORGANIZAÇÕES',
        'organizations needing operator review': 'Empresas que precisam de revisão do operador',
        'no organizations currently need review.': 'Nenhuma empresa precisa de revisão no momento.',
        'configuration gaps': 'LACUNAS DE CONFIGURAÇÃO',
        'missing configuration that can affect operators': 'Configurações pendentes que podem afetar a operação',
        'no configuration gaps detected.': 'Nenhuma lacuna de configuração detectada.',
        'filesystem': 'Sistema de Arquivos',
        'queue': 'Fila de Tarefas',
        'mail': 'Serviço de E-mail',

        // Traduções Automáticas e Abrangentes de Todo o Painel Rota88
        'profile': 'Meu Perfil',
        'your profile': 'Meu Perfil',
        'auth': 'Autenticação',
        'account auth': 'Autenticação da Conta',
        'connected accounts': 'Contas Conectadas',
        'sign-in': 'Entrar',
        'sign in': 'Entrar',
        'two-factor': 'Autenticação em Duas Etapas',
        'two factor': 'Autenticação em Duas Etapas',
        'two-factor authentication': 'Autenticação em Duas Etapas',
        'require users to set-up 2fa': 'Exigir que usuários configurem 2FA',
        'enable two-factor authentication': 'Ativar Autenticação em Duas Etapas',
        'activity stream': 'Fluxo de Atividades',
        'open activity': 'Abrir Atividades',
        'change email': 'Alterar E-mail',
        'change password': 'Alterar Senha',
        'allow users to change their own password': 'Permitir que usuários alterem a própria senha',
        'organization profile': 'Perfil da Empresa',
        'organization settings': 'Configurações da Empresa',
        'organization users': 'Usuários da Empresa',
        'organization status': 'Status da Empresa',
        'organization type': 'Tipo de Empresa',
        'danger zone': 'Área de Perigo',
        'operations and usage': 'Operações e Uso',
        'recent activity': 'Atividades Recentes',
        'access and onboarding': 'Acesso e Integração',
        'onboarding state': 'Status de Integração',
        'incomplete onboarding': 'Integração Incompleta',
        'no owner assigned': 'Nenhum proprietário atribuído',
        'no owner is assigned to this organization.': 'Nenhum proprietário está atribuído a esta empresa.',
        'impersonate': 'Acessar como Usuário',
        'impersonate owner': 'Acessar como Proprietário',
        'end impersonation': 'Encerrar Acesso como Usuário',
        'transfer ownership': 'Transferir Propriedade',
        'remove from organization': 'Remover da Empresa',
        'copy public id': 'Copiar ID Público',
        'copy uuid': 'Copiar UUID',
        'registered': 'Cadastrado em',
        'last updated': 'Última Atualização',
        'last seen': 'Último Acesso',
        'last sign-in': 'Último Login',
        'website': 'Site',
        'owner': 'Proprietário',
        'owner name': 'Nome do Proprietário',
        'owner phone': 'Telefone do Proprietário',
        'owner ip address': 'Endereço IP do Proprietário',
        'api calls': 'Chamadas de API',
        'webhook callbacks': 'Retornos de Webhooks',
        'unavailable': 'Indisponível',
        'api traffic': 'Tráfego da API',
        'api consumers': 'Consumidores da API',
        'rate limits': 'Limites de Requisições',
        'consumer': 'Consumidor',
        'consumers': 'Consumidores',
        'scope': 'Escopo',
        'requests': 'Requisições',
        'avg / min': 'Média / min',
        'peak / min': 'Pico / min',
        'throttled': 'Bloqueado (429)',
        'throttled (429)': 'Bloqueado (429)',
        'limit': 'Limite',
        'share': 'Compartilhamento',
        'default limit': 'Limite Padrão',
        'no limit': 'Sem limite',
        'unlimited': 'Ilimitado',
        'clear rate-limit window': 'Limpar Janela de Limite',
        'view organization': 'Visualizar Empresa',
        'manage rate limits': 'Gerenciar Limites',
        'remove override': 'Remover Exceção',
        'requests / window': 'Requisições / Janela',
        'most requests': 'Mais Requisições',
        'most throttled': 'Mais Bloqueados',
        'api key': 'Chave de API',
        'access token': 'Token de Acesso',
        'user': 'Usuário',
        'anonymous': 'Anônimo',
        'unrecognized': 'Não reconhecido',
        'system configuration': 'Configurações do Sistema',
        '2fa config': 'Configurações de 2FA',
        'review admin dashboard metrics and platform health.': 'Acompanhe as métricas do painel e o status da plataforma.',
        'manage organizations, users, extensions, activity, and settings.': 'Gerencie empresas, usuários, módulos, atividades e ajustes.',
        'configure console branding, logos, colors, and theme defaults.': 'Personalize logotipo, marca, cores e tema visual.',
        'manage the platform api token used by trusted platform integrations.': 'Gerencie a chave de API mestra usada por integrações.',
        'review scheduled tasks and their recent execution logs.': 'Verifique as tarefas automáticas agendadas e os registros.',
        'monitor api consumers and configure rate limiting.': 'Monitore o uso das APIs e configure os limites de chamadas.',
        'see which api keys, users and addresses drive traffic or are being throttled.': 'Veja quais chaves de API, usuários e IPs geram requisições.',
        'configure api rate limits and per-organization overrides.': 'Configure limites de requisições por minuto e exceções por empresa.',
        'configure how people sign in: oauth providers and two-factor authentication.': 'Configure os métodos de login: redes sociais e autenticação 2FA.',
        'configure sign-in with google, microsoft, github and apple.': 'Configure login rápido com Google, Microsoft, GitHub e Apple.',
        'configure administrator two-factor authentication policy.': 'Defina políticas de autenticação em duas etapas para administradores.',
        'configure core platform services, mail, storage, queues, sockets, and notifications.': 'Configure os serviços essenciais, e-mail, filas e notificações.',
        'configure platform service providers.': 'Configure provedores de serviços externos da plataforma.',
        'configure mail delivery.': 'Configure o envio de e-mails do sistema (SMTP).',
        'configure file storage.': 'Configure o armazenamento de arquivos (S3/Local).',
        'configure background queue workers.': 'Configure as filas de processamento em segundo plano.',
        'configure realtime socket settings.': 'Configure a comunicação em tempo real via WebSockets.',
        'configure notification channels.': 'Configure canais de envio de notificações e mensagens.',
        'review each member’s security status and use row actions to manage their access.': 'Revise a segurança de cada usuário e gerencie seus acessos.',
        'review organization-wide activity captured for this company uuid.': 'Revise o histórico de ações e eventos desta empresa.',
        'database configuration': 'Configuração do Banco de Dados',
        'filesystem configuration': 'Configuração do Armazenamento de Arquivos',
        'mail configuration': 'Configuração de E-mail',
        'notification channels configuration': 'Configuração de Canais de Notificação',
        'queue configuration': 'Configuração de Fila de Tarefas',
        'services configuration': 'Configuração de Serviços',
        'socket configuration': 'Configuração de Sockets',
        'rate limit configuration': 'Configuração de Limites de Requisições',
        'configuration health for mail, queue, filesystem, socket, notifications, and scheduler.': 'Status dos serviços de e-mail, filas, disco, sockets e agendador.',
        'active': 'Ativo',
        'inactive': 'Inativo',
        'activate': 'Ativar',
        'deactivate': 'Desativar',
        'disabled': 'Desativado',
        'enabled': 'Ativado',
        'complete': 'Completo',
        'incomplete': 'Incompleto',
        'pending': 'Pendente',
        'suspended': 'Suspenso',
        'canceled': 'Cancelado',
        'past due': 'Atrasado',
        'trialing': 'Em Período de Teste',
        'needs setup': 'Requer Configuração',
        'needs attention': 'Requer Atenção',
        'missing owner': 'Sem Proprietário',
        'are you sure you want to proceed?': 'Tem certeza de que deseja continuar?',
        'this action cannot be undone.': 'Esta ação não poderá ser desfeita.',
        'close and save': 'Fechar e Salvar',
        'save changes': 'Salvar Alterações',
        'export selected': 'Exportar Selecionados',
        'clear view': 'Limpar Visualização',
        'recommended': 'Recomendado',
        'default': 'Padrão',
        'on dashboard': 'No Painel',
        'search widgets…': 'Pesquisar widgets…',
        'create a dashboard to customize widgets.': 'Crie um painel para personalizar seus widgets.',
        'copy this token now. it will not be shown again.': 'Copie este token agora. Ele não será exibido novamente.',
        'rotate platform api token?': 'Deseja rotacionar o token da API da plataforma?',
        'revoke platform api token?': 'Deseja revogar o token da API da plataforma?',
        'generate token': 'Gerar Token',
        'rotate token': 'Rotacionar Token',
        'revoke token': 'Revogar Token',
        'last rotated': 'Última rotação',
        'configured': 'Configurado',
        'not configured': 'Não configurado',
        'never': 'Nunca',
    };

    // 4. Garantir Visibilidade e Funcionamento do Botão de Menu Lateral
    function setupSidebarButton() {
        const btn = document.querySelector('.sidebar-toggle-button');
        if (btn) {
            if (btn.hasAttribute('disabled')) {
                btn.removeAttribute('disabled');
            }
            btn.disabled = false;
            btn.setAttribute('title', 'Alternar Menu Lateral');

            if (!btn.dataset.rota88Ready) {
                btn.dataset.rota88Ready = 'true';
                btn.addEventListener('click', function(e) {
                    const sidebar = document.querySelector('.sidebar, [data-sidebar], .next-sidebar, aside');
                    if (sidebar) {
                        const isHidden = window.getComputedStyle(sidebar).display === 'none';
                        sidebar.style.display = isHidden ? 'flex' : 'none';
                    }
                });
            }
        }
    }

    // 4.1 Garantir Traduções dos Botões do Topo (Tooltips & Aria-Labels)
    function setupHeaderButtons() {
        const moreBtn = document.querySelector('.snm-more-btn');
        if (moreBtn && moreBtn.getAttribute('title') !== 'Mais extensões') {
            moreBtn.setAttribute('title', 'Mais extensões');
            moreBtn.setAttribute('aria-label', 'Mais extensões');
        }
        const custBtn = document.querySelector('.snm-customise-btn');
        if (custBtn && custBtn.getAttribute('title') !== 'Personalizar navegação') {
            custBtn.setAttribute('title', 'Personalizar navegação');
            custBtn.setAttribute('aria-label', 'Personalizar navegação');
        }
        const chatBtn = document.querySelector('.chat-tray-panel-trigger');
        if (chatBtn && chatBtn.getAttribute('title') !== 'Mensagens') {
            chatBtn.setAttribute('title', 'Mensagens');
            chatBtn.setAttribute('aria-label', 'Mensagens');
        }
    }

    // 5. Aplicar Traduções e Limpezas Visuais
    function applyBranding() {
        updateTitle();
        setupSidebarButton();
        setupHeaderButtons();

        // Substituir logotipos padrão
        const logos = document.querySelectorAll('img[src*="fleetbase-icon"], img[alt="Fleetbase"]');
        logos.forEach(img => {
            if (img.getAttribute('src') !== '/images/rota88-logo.svg') {
                img.src = '/images/rota88-logo.svg';
                img.style.height = '38px';
                img.style.width = '170px';
                img.style.minWidth = '170px';
                img.style.display = 'inline-block';
            }
        });

        // Ocultar elementos indesejados (Discord, Fleetbase links, Versão)
        const unwanted = document.querySelectorAll(
            'a[href*="fleetbase.io"], a[href*="github.com/fleetbase"], a[href*="discord.gg"], .fleetbase-blog, .github-card'
        );
        unwanted.forEach(el => {
            const card = el.closest('.grid-stack-item') || el.closest('.next-dashboard-widget-card') || el.closest('li') || el;
            card.style.display = 'none';
        });

        // Ocultar nós de texto de versão como "v0.7.67"
        const versionElements = document.querySelectorAll('div, span, p');
        versionElements.forEach(el => {
            if (el.childNodes.length === 1 && /^v\d+\.\d+\.\d+/.test(el.textContent.trim())) {
                el.style.display = 'none';
            }
        });

        // Substituição case-insensitive de nós de texto
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    const tag = node.parentElement ? node.parentElement.tagName : '';
                    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'SVG' || tag === 'PATH') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    const cleanKey = node.nodeValue.replace(/\s+/g, ' ').trim().toLowerCase();
                    if (DICTIONARY[cleanKey]) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
            }
        );

        let node;
        while ((node = walker.nextNode())) {
            let val = node.nodeValue;
            const cleanKey = val.replace(/\s+/g, ' ').trim().toLowerCase();
            if (DICTIONARY[cleanKey]) {
                node.nodeValue = DICTIONARY[cleanKey];
            } else if (val.includes('$')) {
                // Substituir cifrão de dólar ($) por Real Brasileiro (R$)
                node.nodeValue = val.replace(/\$([0-9.,]+)/g, 'R$ $1').replace(/^\$\s*/, 'R$ ');
            }
        }

        // 5.1 Recentralizar automaticamente o "Mapa da Frota em Tempo Real" do Dashboard para Trindade/Goiás
        try {
            const dashboardMap = document.querySelector('.live-map-container .leaflet-container, .dashboard-widget-content .leaflet-container');
            if (dashboardMap && !dashboardMap.dataset.rota88Centered && window.L) {
                // Se a instância Leaflet estiver disponível
                const mapInstance = dashboardMap._leaflet_map || (dashboardMap._leaflet_id && window.L.map?.instances?.[dashboardMap._leaflet_id]);
                if (mapInstance && typeof mapInstance.setView === 'function') {
                    // Centro de Trindade / Goiânia - GO
                    mapInstance.setView([-16.6545, -49.4876], 13);
                    dashboardMap.dataset.rota88Centered = 'true';
                }
            }
        } catch (e) {
            // Silencioso se mapa ainda carregando
        }

        // Substituição direta em elementos folha com texto (botões, tabelas, menus, títulos)
        const elementsToCheck = document.querySelectorAll('.next-header-dd-menu-item, .next-dd-item, [role="menuitem"], .kpi-title, button, a, th, td, label, span, p, h1, h2, h3, h4');
        elementsToCheck.forEach(el => {
            // Traduzir títulos e atributos de acessibilidade
            ['title', 'aria-label'].forEach(attr => {
                const val = el.getAttribute(attr);
                if (val) {
                    const clean = val.replace(/\s+/g, ' ').trim().toLowerCase();
                    if (DICTIONARY[clean]) {
                        el.setAttribute(attr, DICTIONARY[clean]);
                    }
                }
            });

            // Se for botão ou link que contenha texto direto
            if (el.children.length <= 2) {
                const textOnly = Array.from(el.childNodes)
                    .filter(n => n.nodeType === Node.TEXT_NODE)
                    .map(n => n.nodeValue)
                    .join(' ')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase();

                if (DICTIONARY[textOnly]) {
                    Array.from(el.childNodes).forEach(n => {
                        if (n.nodeType === Node.TEXT_NODE && n.nodeValue.trim().length > 0) {
                            n.nodeValue = DICTIONARY[textOnly];
                        }
                    });
                }
            }
        });

        // Corrigir placeholders
        const searchInputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
        searchInputs.forEach(input => {
            const ph = input.getAttribute('placeholder');
            if (ph) {
                const clean = ph.replace(/\s+/g, ' ').trim().toLowerCase();
                if (clean.includes('missing translation') || clean.includes('search-input') || clean === 'search' || clean === 'search...') {
                    input.placeholder = 'Pesquisar...';
                } else if (DICTIONARY[clean]) {
                    input.placeholder = DICTIONARY[clean];
                }
            }
        });
    }

    // 6. Recuperação e Renderização Garantida do Mapa de Rastreio (Leaflet Rescue)
    // 6. Recuperação e Renderização Garantida do Mapa de Rastreio (Leaflet Rescue)
    async function autoFixTrackingMap() {
        const wrapper = document.querySelector('.order-tracking-lookup-map-wrapper');
        if (!wrapper) return;

        // Se já inicializamos o mapa independente do Rota88 neste container, não refazer
        if (wrapper.dataset.rota88MapActive) return;

        // Verifica se a tela é de rastreamento de pedido
        const params = new URLSearchParams(window.location.search);
        const trackingCode = params.get('order') || (window.location.pathname.match(/track-order\/([^\/?#]+)/)?.[1]);
        if (!trackingCode) return;

        // Aguarda a biblioteca Leaflet global (L) estar presente
        if (!window.L) return;

        wrapper.dataset.rota88MapActive = 'true';
        console.log('[Rota88] Iniciando renderizador garantido de rota para:', trackingCode);

        try {
            // Busca dados do pedido diretamente no backend
            const res = await fetch(`/int/v1/fleet-ops/lookup?tracking=${encodeURIComponent(trackingCode)}`, {
                headers: { 'Accept': 'application/json' }
            });
            if (!res.ok) return;
            const data = await res.json();
            const payload = data.payload;
            if (!payload || !payload.pickup || !payload.dropoff) return;

            const pLat = Number(payload.pickup.location?.coordinates?.[1] || payload.pickup.latitude);
            const pLng = Number(payload.pickup.location?.coordinates?.[0] || payload.pickup.longitude);
            const dLat = Number(payload.dropoff.location?.coordinates?.[1] || payload.dropoff.latitude);
            const dLng = Number(payload.dropoff.location?.coordinates?.[0] || payload.dropoff.longitude);

            if (!pLat || !pLng || !dLat || !dLng) return;

            // Limpa qualquer container quebrado anterior
            wrapper.innerHTML = '<div id="rota88-real-map" style="width: 100%; height: 350px; border-radius: 8px; z-index: 1;"></div>';

            const map = L.map('rota88-real-map', { zoomControl: true });

            // Camada de mapa OpenStreetMap em HTTPS
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Marcador da Farmácia (Pickup)
            const pickupIcon = L.divIcon({
                className: 'r88-pickup-pin',
                html: '<div style="background:#10b981;color:white;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid white;">🏪</div>',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            const pickupMarker = L.marker([pLat, pLng], { icon: pickupIcon }).addTo(map);
            pickupMarker.bindPopup(`<b>Coleta: ${payload.pickup.name || 'Farmácia'}</b><br>${payload.pickup.street1 || ''}`);

            // Marcador do Cliente (Dropoff)
            const dropoffIcon = L.divIcon({
                className: 'r88-dropoff-pin',
                html: '<div style="background:#ef4444;color:white;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid white;">📍</div>',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            const dropoffMarker = L.marker([dLat, dLng], { icon: dropoffIcon }).addTo(map);
            dropoffMarker.bindPopup(`<b>Entrega: ${payload.dropoff.name || 'Cliente'}</b><br>${payload.dropoff.street1 || ''}`);

            // Enquadra a visão entre a farmácia e o cliente
            const bounds = L.latLngBounds([[pLat, pLng], [dLat, dLng]]);
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });

            // Traça a rota real de ruas via OSRM
            try {
                const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${pLng},${pLat};${dLng},${dLat}?overview=full&geometries=geojson`;
                const osrmRes = await fetch(osrmUrl);
                if (osrmRes.ok) {
                    const routeData = await osrmRes.json();
                    if (routeData.routes && routeData.routes.length > 0) {
                        const coords = routeData.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
                        L.polyline(coords, {
                            color: '#3b82f6',
                            weight: 5,
                            opacity: 0.85,
                            lineJoin: 'round'
                        }).addTo(map);
                        map.fitBounds(L.polyline(coords).getBounds(), { padding: [40, 40] });
                    }
                }
            } catch (rErr) {
                // Fallback linha direta
                L.polyline([[pLat, pLng], [dLat, dLng]], { color: '#3b82f6', weight: 4, dashArray: '6, 8' }).addTo(map);
            }

            setTimeout(() => { map.invalidateSize(); }, 300);
            console.log('[Rota88] ✅ Mapa e rota renderizados com sucesso absoluto!');
        } catch (err) {
            console.error('[Rota88] Erro ao renderizar rota garantida:', err);
        }
    }

    // Executar imediatamente e acompanhar transições do Ember
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            applyBranding();
            autoFixTrackingMap();
        });
    } else {
        applyBranding();
        autoFixTrackingMap();
    }

    // MutationObserver para Single Page Application (SPA)
    const observer = new MutationObserver(() => {
        applyBranding();
        autoFixTrackingMap();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    setInterval(() => {
        applyBranding();
        autoFixTrackingMap();
    }, 1000);
})();
