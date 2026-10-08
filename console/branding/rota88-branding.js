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

    // 3. Dicionário Mestre Completo de Tradução (Chaves normalizadas em minúsculas)
    // Escapa texto antes de injetar em innerHTML (protecao XSS na tela publica de rastreio)
    function escapeHtml(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    const DICTIONARY = {
        "fleetbase": "Rota88",
        "new": "Novo",
        "create": "Criar",
        "add": "Adicionar",
        "edit": "Editar",
        "update": "Atualizar",
        "save": "Salvar",
        "save changes": "Salvar Alterações",
        "delete": "Excluir",
        "delete selected": "Excluir Selecionados",
        "remove": "Remover",
        "cancel": "Cancelar",
        "confirm": "Confirmar",
        "close": "Fechar",
        "open": "abertos",
        "view": "Visualizar",
        "preview": "Pré-visualizar",
        "upload": "Enviar",
        "download": "Baixar",
        "import": "Importar",
        "export": "Exportar",
        "print": "Imprimir",
        "duplicate": "Duplicar",
        "copy": "Copiar",
        "paste": "Colar",
        "share": "Compartilhamento",
        "refresh": "Atualizar",
        "reset": "Redefinir",
        "retry": "Tentar Novamente",
        "back": "Voltar",
        "next": "Próximo",
        "previous": "Anterior",
        "submit": "Enviar",
        "apply": "Aplicar",
        "continue": "Continuar",
        "proceed": "Prosseguir",
        "select": "Selecionar",
        "deselect": "Desmarcar",
        "search": "Pesquisar",
        "filter": "Filtrar",
        "sort": "Ordenar",
        "view all": "Ver Todos",
        "clear": "Limpar",
        "done": "Concluído",
        "finish": "Finalizar",
        "skip": "Pular",
        "method": "Método",
        "bulk delete": "Exclusão em Massa",
        "bulk cancel": "Cancelamento em Massa",
        "bulk actions": "Ações em Massa",
        "column": "Coluna",
        "row": "Linha",
        "table": "Tabela",
        "list": "Lista",
        "grid": "Grade",
        "form": "Formulário",
        "field": "Campo",
        "section": "Seção",
        "panel": "Painel",
        "card": "Cartão",
        "tab": "Aba",
        "dialog": "Diálogo",
        "sidebar": "Barra Lateral",
        "toolbar": "Barra de Ferramentas",
        "footer": "Rodapé",
        "header": "Cabeçalho",
        "title": "Título",
        "subtitle": "Legenda",
        "description": "Descrição",
        "label": "Etiqueta",
        "button": "Botão",
        "icon": "Ícone",
        "badge": "Distintivo",
        "tag": "Etiqueta",
        "step": "Passo",
        "progress": "Progresso",
        "map": "Mapa",
        "board": "Quadro",
        "loading": "Carregando",
        "saving": "Salvando",
        "processing": "Processando",
        "fetching": "Buscando",
        "updating": "Atualizando",
        "uploading": "Enviando",
        "completed": "Concluído",
        "success": "Sucesso",
        "failed": "Falhou",
        "error": "Erro",
        "warning": "Aviso",
        "info": "Informação",
        "ready": "Pronto",
        "active": "Ativo",
        "inactive": "Inativo",
        "enabled": "Ativado",
        "disabled": "Desativado",
        "pending": "Pendente",
        "archived": "Arquivado",
        "hidden": "Oculto",
        "visible": "Visível",
        "empty": "Vazio",
        "not found": "Não Encontrado",
        "no results": "Sem Resultados",
        "try again": "Tente Novamente",
        "are you sure?": "Você tem certeza?",
        "changes saved successfully.": "Alterações salvas com sucesso.",
        "changes discarded.": "Alterações descartadas.",
        "are you sure you want to delete this item?": "Você tem certeza que deseja excluir este item?",
        "action completed successfully.": "Ação concluída com sucesso.",
        "action failed. please try again.": "Ação falhou. Por favor, tente novamente.",
        "something went wrong.": "Algo deu errado.",
        "please wait...": "Por favor, aguarde...",
        "sign in": "Entrar",
        "sign out": "Sair",
        "sign up": "Cadastrar",
        "log in": "Login",
        "log out": "Logout",
        "register": "Registrar",
        "forgot password": "Esqueceu a Senha",
        "reset password": "Redefinir senha",
        "change password": "Alterar Senha",
        "password": "Senha",
        "confirm password": "Confirmar Senha",
        "username": "Nome de Usuário",
        "remember me": "Lembrar de mim",
        "welcome": "Bem-vindo",
        "welcome back": "Bem-vindo de volta",
        "profile": "Perfil",
        "account": "Conta",
        "settings": "Configurações",
        "preferences": "Preferências",
        "record": "Registro",
        "records": "Registros",
        "items": "Itens",
        "entry": "Entrada",
        "entries": "Entradas",
        "name": "Nome",
        "type": "Tipo",
        "category": "Categoria",
        "overview": "Visão Geral",
        "value": "Valor",
        "amount": "Quantidade",
        "price": "Preço",
        "quantity": "Quantidade",
        "date": "Data",
        "date created": "Data de Criação",
        "date updated": "Data de atualização",
        "time": "Hora",
        "created at": "Criado em",
        "updated at": "Atualizado em",
        "expired at": "Expirado em",
        "last seen at": "Última visualização em",
        "last modified": "Última modificação",
        "actions": "Ações",
        "details": "Detalhes",
        "notes": "Observações",
        "reference": "Referência",
        "filter by": "Filtrar por",
        "sort by": "Ordenar por",
        "ascending": "Ascendente",
        "descending": "Descendente",
        "all": "Todos",
        "none": "Nenhum",
        "select all": "Selecionar Tudo",
        "deselect all": "Desmarcar Tudo",
        "show more": "Mostrar mais",
        "show less": "Mostrar menos",
        "page": "Página",
        "of": "de",
        "items per page": "Itens por página",
        "showing": "Mostrando",
        "to": "até",
        "results": "Resultados",
        "load more": "Carregar mais",
        "no more results": "Sem mais resultados",
        "today": "Hoje",
        "yesterday": "Ontem",
        "tomorrow": "Amanhã",
        "day": "Dia",
        "week": "Semana",
        "month": "Mês",
        "year": "Ano",
        "date range": "Intervalo de Datas",
        "start date": "Data de Início",
        "end date": "Data de Término",
        "time zone": "Fuso Horário",
        "system": "Sistema",
        "dashboard": "Painel",
        "home": "Início",
        "analytics": "Análises",
        "reports": "Relatórios",
        "logs": "Registros",
        "help": "Ajuda",
        "support": "Suporte",
        "contact": "Contato",
        "documentation": "Documentação",
        "language": "Idioma",
        "version": "Versão",
        "theme": "Tema",
        "light mode": "Modo Claro",
        "dark mode": "Modo Escuro",
        "update available": "Atualização Disponível",
        "install update": "Instalar Atualização",
        "maintenance mode": "Modo de Manutenção",
        "notification": "Notificação",
        "notifications": "Notificações",
        "mark as read": "Marcar como Lido",
        "mark all as read": "Marcar Todas como Lidas",
        "clear notifications": "Limpar Notificações",
        "company": "Empresa",
        "companies": "Empresas",
        "user": "Usuário",
        "users": "Usuários",
        "role": "Função",
        "roles": "Funções",
        "permission": "Permissão",
        "permissions": "Permissões",
        "group": "Grupo",
        "groups": "Grupos",
        "unauthorized": "Não Autorizado",
        "forbidden": "Proibido",
        "resource not found": "Recurso Não Encontrado",
        "server error": "Erro do Servidor",
        "validation error": "Erro de Validação",
        "request timed out": "Tempo da Requisição Esgotado",
        "network error": "Erro de Rede",
        "unknown error": "Erro Desconhecido",
        "file": "arquivo",
        "files": "Arquivos",
        "folder": "Pasta",
        "folder's": "Pastas",
        "upload file": "Enviar Arquivo",
        "upload files": "Enviar Arquivos",
        "upload image": "Enviar Imagem",
        "supports pngs, jpegs and gifs": "Suporta PNG, JPEG e GIF",
        "choose file": "Escolher Arquivo",
        "choose files": "Escolher Arquivos",
        "drag and drop": "Arrastar e Soltar",
        "download file": "Baixar Arquivo",
        "file size": "Tamanho do Arquivo",
        "file type": "Tipo de Arquivo",
        "confirm delete": "Confirmar Exclusão",
        "confirm action": "Confirmar Ação",
        "confirm exit": "Confirmar Saída",
        "confirm & save changes": "Confirmar e Salvar Alterações",
        "are you sure you want to exit?": "Tem certeza de que deseja sair?",
        "you have unsaved changes.": "Você tem alterações não salvas.",
        "connected": "Conectado",
        "disconnected": "Desconectado",
        "reconnecting": "Reconectando",
        "connection lost": "Conexão Perdida",
        "connection restored": "Conexão Restaurada",
        "show": "Mostrar",
        "hide": "Ocultar",
        "expand": "Expandir",
        "collapse": "Recolher",
        "enable": "Ativar",
        "disable": "Desativar",
        "minimize": "Minimizar",
        "maximize": "Maximizar",
        "restore": "Restaurar",
        "zoom in": "Aumentar Zoom",
        "zoom out": "Diminuir Zoom",
        "fullscreen": "Tela Cheia",
        "exit fullscreen": "Sair da Tela Cheia",
        "none available": "Nenhum Disponível",
        "default": "Padrão",
        "custom": "Personalizado",
        "general": "Geral",
        "advanced": "Avançado",
        "enter text here...": "Digite o texto aqui...",
        "learn more": "Saiba Mais",
        "this action cannot be undone. once deleted, the record will be permanently removed.": "Esta ação não pode ser desfeita. Uma vez excluído, o registro",
        "config": "Configuração",
        "columns": "Colunas",
        "metadata": "Metadados",
        "continue without saving?": "Continuar sem salvar?",
        "alert": "Alerta",
        "alerts": "Alertas",
        "brand": "Marca",
        "brands": "Marcas",
        "categories": "Categorias",
        "chat attachment": "Anexo de Chat",
        "chat attachments": "Anexos de Chat",
        "chat channel": "Canal de Chat",
        "chat channels": "Canais de Chat",
        "chat log": "Registro de Chat",
        "chat logs": "Registros de Chat",
        "chat message": "Mensagem de Chat",
        "chat messages": "Mensagens de Chat",
        "chat participant": "Participante do Chat",
        "chat participants": "Participantes do Chat",
        "chat receipt": "Recibo de Chat",
        "chat receipts": "Recibos de Chat",
        "comment": "Comentário",
        "comments": "Comentários",
        "custom field value": "Valor de Campo Personalizado",
        "custom field values": "Valores de Campo Personalizado",
        "custom field": "Campo Personalizado",
        "custom fields": "Campos Personalizados",
        "dashboard widget": "Widget do Painel",
        "dashboard widgets": "Widgets do Painel",
        "dashboards": "Painéis",
        "extension": "Extensão",
        "extensions": "Extensões",
        "policy": "Política",
        "policies": "Políticas",
        "report": "Relatório",
        "setting": "Configuração",
        "transaction": "Transação",
        "transactions": "Transações",
        "user device": "Dispositivo do Usuário",
        "user devices": "Dispositivos do Usuário",
        "drop to upload": "Solte para enviar",
        "invalid": "Inválido",
        "upload images & videos": "Enviar Imagens e Vídeos",
        "upload documents": "Enviar Documentos",
        "upload documents & files": "Enviar Documentos e Arquivos",
        "upload custom avatars": "Enviar Avatares Personalizados",
        "drag and drop image and video files onto this dropzone": "Arraste e solte arquivos de imagem e vídeo nesta",
        "drag and drop svg or png files": "Arraste e solte arquivos SVG ou PNG",
        "drag and drop files onto this dropzone": "Arraste e solte arquivos nesta área",
        "or select files to upload.": "ou selecione arquivos para enviar.",
        "upload queue": "Fila de Envio",
        "uploading...": "Enviando...",
        "to enhance the security of your account, your organization requires two-factor authentication (2fa). enable 2fa in your account settings for an additional layer of protection.": "Para aumentar a segurança da sua conta, sua organização exige Autenticação",
        "setup 2fa": "Configurar 2FA",
        "publish comment": "Publicar comentário",
        "publish reply": "Publicar resposta",
        "reply": "Responder",
        "input a new comment...": "Digite um novo comentário...",
        "input your reply...": "Digite sua resposta...",
        "you cannot publish empty comments...": "Você não pode publicar comentários vazios...",
        "comment must be atleast 2 characters": "O comentário deve ter pelo menos 2 caracteres",
        "select dashboard": "Selecionar Painel",
        "create new dashboard": "Criar novo Painel",
        "create a new dashboard": "Criar um novo Painel",
        "create dashboard!": "Criar Painel!",
        "edit layout": "Editar layout",
        "add widgets": "Adicionar widgets",
        "delete dashboard": "Excluir painel",
        "save dashboard": "Salvar Painel",
        "you cannot delete this dashboard.": "Você não pode excluir este painel.",
        "select widgets": "Selecionar Widgets",
        "close and save": "Fechar e Salvar",
        "filters": "Filtros",
        "filter data": "Filtrar Dados",
        "select viewable columns": "Selecionar colunas visíveis",
        "customize columns": "Personalizar Colunas",
        "file actions": "Ações de arquivo",
        "processing import...": "Processando importação...",
        "ready for upload.": "pronto para envio.",
        "upload spreadsheets": "Enviar Planilhas",
        "drag and drop spreadsheet files onto this dropzone": "Arraste e solte arquivos de planilha nesta área",
        "or select spreadsheets to upload": "ou selecione planilhas para enviar",
        "spreadsheets": "planilhas",
        "account verification": "Verificação de Conta",
        "verify your email address": "Verifique seu endereço de e-mail",
        "<strong>almost done!</strong><br> check your email for a verification code.": "<strong>Quase lá!</strong><br> Verifique seu e-mail para um código",
        "enter the verification code you received via email.": "Digite o código de verificação que você recebeu por e-mail.",
        "verification code": "Código de Verificação",
        "verify & continue": "Verificar e Continuar",
        "didn't receive a code yet?": "Ainda não recebeu um código?",
        "use alternaitve options below to verify your account.": "Use as opções alternativas abaixo para verificar sua conta.",
        "resend email": "Reenviar E-mail",
        "send by sms": "Enviar por SMS",
        "check your email or phone": "Verifique seu e-mail ou telefone",
        "we've sent you a verification code. enter the code below to complete the login process.": "Enviamos um código de verificação para você. Digite o código",
        "your 2fa authentication code has expired. you can request another code if you need more time.": "Seu código de autenticação 2FA expirou. Você pode solicitar",
        "resend code": "Reenviar Código",
        "verify code": "Verificar Código",
        "cancel two-factor": "Cancelar Autenticação de Dois Fatores",
        "invalid session. please try again.": "Sessão inválida. Por favor, tente novamente.",
        "verification successful!": "Verificação bem-sucedida!",
        "verification code has expired. please request a new one.": "O código de verificação expirou. Por",
        "verification failed. please try again.": "Falha na verificação. Por favor, tente",
        "new verification code sent.": "Novo código de verificação enviado.",
        "error resending verification code. please try again.": "Erro ao reenviar código de verificação.",
        "check your email to continue!": "Verifique seu e-mail para continuar!",
        "almost done!": "Quase lá!",
        "<strong>check your email!</strong><br> we've sent you a magic link to your email which will allow you to reset your password. the link expires in 15 minutes.": "<strong>Confira seu e-mail!</strong><br> Enviamos um link mágico para",
        "forgot your password?": "Esqueceu sua senha?",
        "your email address": "Seu endereço de e-mail",
        "ok, send me a magic link!": "OK, envie-me um link mágico!",
        "nevermind": "Deixa pra lá",
        "sign in to your account": "Faça login na sua conta",
        "did you forget to enter your email?": "Esqueceu de digitar seu e-mail?",
        "did you forget to enter your password?": "Esqueceu de digitar sua senha?",
        "your account needs to be verified to proceed.": "Sua conta precisa ser verificada para continuar.",
        "a password reset is required to continue.": "É necessário redefinir a senha para continuar.",
        "<strong>forgot your password?</strong><br> click the button below to reset your password.": "<strong>Esqueceu sua senha?</strong><br> Clique no botão abaixo para",
        "ok, help me reset!": "Ok, me ajude a redefinir!",
        "email address": "Endereço de e-mail",
        "create a new account": "Criar uma nova conta",
        "or continue with": "Ou continuar com",
        "signing you in...": "Entrando...",
        "finish setting up your fleetbase account to continue.": "Conclua a configuração da sua conta Rota88 para continuar.",
        "connected accounts": "Contas conectadas",
        "sign in with a provider instead of a password. you can link more than one.": "Entre com um provedor em vez de uma senha. Você pode conectar mais de um.",
        "linked": "Conectadas",
        "available to link": "Disponíveis para conectar",
        "link": "Conectar",
        "unlink": "Desconectar",
        "provider linked to your account.": "Provedor conectado à sua conta.",
        "you already have an account, so we signed you in.": "Você já tem uma conta, então fizemos seu login.",
        "we could not complete that sign-in. please try again.": "Não foi possível concluir o login. Tente novamente.",
        "sign-in was cancelled.": "O login foi cancelado.",
        "the sign-in provider reported a problem. please try again.": "O provedor de login relatou um problema. Tente novamente.",
        "that sign-in method is not available.": "Esse método de login não está disponível.",
        "that sign-in link is no longer valid. please try again.": "Esse link de login não é mais válido. Tente novamente.",
        "we could not reach the sign-in provider. please try again.": "Não foi possível contatar o provedor de login. Tente novamente.",
        "that sign-in session expired. please try again.": "Essa sessão de login expirou. Tente novamente.",
        "your account is not in an allowed domain.": "Sua conta não pertence a um domínio permitido.",
        "new sign-ups are not available.": "Novos cadastros não estão disponíveis.",
        "an account with this email already exists. sign in and link this provider from your account settings.": "Já existe uma conta com este e-mail. Entre e vincule este provedor nas configurações da sua conta.",
        "customer accounts must sign in through the customer portal.": "Contas de cliente devem entrar pelo portal do cliente.",
        "too many attempts. please try again shortly.": "Muitas tentativas. Tente novamente em breve.",
        "that provider is already linked to your account.": "Esse provedor já está conectado à sua conta.",
        "that account is already linked to another fleetbase user.": "Essa conta já está conectada a outro usuário da Rota88.",
        "set a password or link another provider first, or you would not be able to sign in.": "Defina uma senha ou conecte outro provedor primeiro, ou você não conseguirá entrar.",
        "we could not link that provider. please try again.": "Não foi possível conectar esse provedor. Tente novamente.",
        "experiencing connectivity issues.": "Problemas de conexão detectados.",
        "your password has been reset! login to continue.": "Sua senha foi redefinida! Faça login para continuar.",
        "this reset password link is invalid or expired.": "Este link para redefinir a senha é inválido ou expirou.",
        "reset your password": "Redefina sua senha",
        "your reset code": "Seu código de redefinição",
        "the verification code you received in your email.": "O código de verificação que você recebeu no seu e-mail.",
        "new password": "Nova senha",
        "enter a password at-least 6 characters to continue.": "Digite uma senha com pelo menos 6 caracteres para continuar.",
        "confirm new password": "Confirme a nova senha",
        "your email address has been updated.": "Seu endereço de e-mail foi atualizado.",
        "this email change link is invalid or expired.": "Este link de confirmação de e-mail é inválido ou expirou.",
        "confirm email change": "Confirmar alteração de e-mail",
        "confirm this change to update the login email for your fleetbase account.": "Confirme esta alteração para atualizar o e-mail de acesso da sua conta Rota88.",
        "confirmation code": "Código de confirmação",
        "the confirmation code from your email.": "O código de confirmação recebido no seu e-mail.",
        "create or join a organization": "Criar ou entrar em uma organização",
        "you have joined a new organization!": "Você entrou em uma nova organização!",
        "you have created a new organization!": "Você criou uma nova organização!",
        "by confirming your account will remain logged in, but your primary organization will be switched.": "Ao confirmar, sua conta permanecerá conectada, mas sua organização",
        "yes, i want to switch organization": "Sim, quero mudar de organização",
        "you have switched organizations": "Você mudou de organização",
        "upload new": "Enviar novo",
        "your phone number.": "Seu número de telefone.",
        "photos": "fotos",
        "select your timezone.": "Selecione seu fuso horário.",
        "organizations": "Organizações",
        "branding": "Identidade Visual",
        "two-factor auth": "Configuração 2FA",
        "schedule monitor": "Monitor de Agendamento",
        "services": "Serviços",
        "mail": "Serviço de E-mail",
        "filesystem": "Sistema de Arquivos",
        "queue": "Fila de Tarefas",
        "oauth sign-in": "Login OAuth",
        "push notifications": "Notificações Push",
        "timezone": "Fuso Horário",
        "last started": "Última Iniciação",
        "last finished": "Última Finalização",
        "last failure": "Última Falha",
        "memory": "Memória",
        "runtime": "Tempo de Execução",
        "output": "Saída",
        "no output": "Sem saída",
        "database configuration": "Configuração do Banco de Dados",
        "filesystem configuration": "Configuração do Armazenamento de Arquivos",
        "oauth sign-in configuration": "Configuração do login OAuth",
        "mail configuration": "Configuração de E-mail",
        "push notifications configuration": "Configuração de Notificações Push",
        "queue configuration": "Configuração de Fila de Tarefas",
        "services configuration": "Configuração de Serviços",
        "socket configuration": "Configuração de Sockets",
        "reset to default": "Redefinir para padrão",
        "default theme": "Tema Padrão",
        "total users": "Total de Usuários",
        "total organizations": "Total de Organizações",
        "total transactions": "Total de Transações",
        "notification settings": "Configurações de Notificação",
        "owner": "Proprietário",
        "owner phone": "Email do Proprietário",
        "phone": "Telefone",
        "organization settings": "Configurações da Empresa",
        "organization name": "Nome da organização",
        "organization description": "Descrição da organização",
        "organization phone number": "Número de telefone da organização",
        "organization currency": "Moeda da organização",
        "organization id": "ID da organização",
        "organization branding": "Marca da Organização",
        "logo for your organization.": "Logo da sua organização.",
        "upload new logo": "Enviar novo logo",
        "backdrop": "Plano de fundo",
        "optional banner or background image for your organization.": "Banner ou imagem de fundo opcional para sua organização.",
        "upload new backdrop": "Enviar novo plano de fundo",
        "select the default timezone for your organization.": "Selecione o fuso horário padrão para sua organização.",
        "select timezone.": "Selecione o fuso horário.",
        "extensions are coming soon!": "Extensões chegando em breve!",
        "please check back in the upcoming versions as we prepare to launch the extensions repository and marketplace.": "Por favor, volte nas próximas versões enquanto preparamos o lançamento",
        "no notifications to display.": "Nenhuma notificação para exibir.",
        "your invitiation code": "Seu código de convite",
        "accept invitation": "Aceitar Convite",
        "create your account": "Crie sua conta",
        "complete the details required below to get started.": "Complete os detalhes necessários abaixo para começar.",
        "full name": "Nome completo",
        "your full name": "Seu nome completo",
        "phone number": "Número de telefone",
        "your phone number": "Seu número de telefone",
        "your organization name, all your services and resources will be managed under this organization, later you can create as many organizations as you want or need.": "O nome da sua organização, todos os seus serviços e recursos",
        "enter a password": "Digite uma senha",
        "your password, make sure it's a good one.": "Sua senha, certifique-se de que seja uma boa.",
        "confirm your password": "Confirme sua senha",
        "just to confirm the password you entered above.": "Apenas para confirmar a senha que você digitou acima.",
        "your identity is verified. no password needed — you''ll sign in with your provider.": "Sua identidade foi verificada. Não é necessária senha — você entrará com seu provedor.",
        "or sign up with email": "Ou cadastre-se com e-mail",
        "fleetbase is not installed or configured": "Rota88 está inicializando",
        "complete setup from the fleetbase cli or application container, then reload this page once the database, migrations, and seed data are ready.": "Aguarde enquanto os serviços e o banco de dados da Rota88 são carregados.",
        "see running locally docs": "Ver documentação",
        "see cloud deployment docs": "Ver documentação na nuvem",
        "installation complete, refreshing...": "Inicialização concluída, atualizando...",
        "create or join organizations": "Gerenciar Organizações",
        "explore extensions": "Explorar Módulos",
        "view profile": "Meu Perfil",
        "show keyboard shortcuts": "Atalhos do Teclado",
        "changelog": "Novidades",
        "fleetbase console": "Rota88 - Gestão & Entregas",
        "search...": "Pesquisar...",
        "search navigation": "Buscar no menu...",
        "search admin...": "Buscar no Admin...",
        "search admin": "Buscar no Admin...",
        "default dashboard": "Painel de Controle",
        "more extensions": "Mais Módulos",
        "customise navigation": "Personalizar Menu",
        "open chat inbox": "Mensagens",
        "legal": "Termos Legais",
        "starting up...": "Carregando...",
        "operations": "Operações",
        "fleet-ops": "Operações de Entrega",
        "storefront": "Lojas & Pedidos",
        "iam": "Acessos & Usuários",
        "ledger": "Financeiro",
        "developers": "Integrações & API",
        "admin": "Administração",
        "administrator": "Administrador",
        "help & support": "Ajuda & Suporte",
        "terms of service": "Termos de Uso",
        "privacy policy": "Política de Privacidade",
        "logout": "Sair",
        "sign-in": "Entrar",
        "radar": "RADAR",
        "open radar": "Abrir Radar",
        "snoozed": "adiados",
        "revenue": "RECEITA TOTAL",
        "vs previous period": "vs período anterior",
        "vs previous 30d": "vs últimos 30d",
        "current": "Atual",
        "active orders": "PEDIDOS ATIVOS",
        "drivers online": "MOTORISTAS ONLINE",
        "expenses": "DESPESAS",
        "net income": "LUCRO LÍQUIDO",
        "outstanding ar": "A RECEBER",
        "overdue ar": "CONTAS VENCIDAS",
        "overdue": "VENCIDO",
        "next 7d": "PRÓX. 7 DIAS",
        "mtd": "NO MÊS",
        "live fleet map": "Mapa da Frota em Tempo Real",
        "no active drivers or vehicles to display.": "Nenhum motorista ou veículo ativo no momento.",
        "revenue trend": "Tendência de Faturamento",
        "top drivers": "Melhores Motoristas",
        "orders": "Pedidos",
        "on-time": "Pontualidade",
        "distance": "Distância",
        "no driver activity in this period.": "Nenhuma atividade de motorista neste período.",
        "maintenance overview": "Visão de Manutenção",
        "no upcoming maintenance.": "Nenhuma manutenção pendente.",
        "recent financial activity": "Atividades Financeiras Recentes",
        "latest journal entries posted to the ledger": "Últimos lançamentos no livro-razão",
        "no recent journal entries.": "Nenhum lançamento recente.",
        "cash flow summary": "Resumo do Fluxo de Caixa",
        "net cash change": "variação de caixa",
        "admin dashboard": "Painel de Administração",
        "visão geral": "Visão Geral",
        "organizações": "Organizações",
        "personalização": "Personalização",
        "platform api token": "Token da API da Plataforma",
        "monitor de agendamento": "Monitor de Agendamento",
        "fleet-ops config": "Configurações de Entrega",
        "extensions registry": "Registro de Extensões",
        "ai config": "Configurações de IA",
        "api traffic": "Tráfego da API",
        "auth config": "Configuração de Autenticação",
        "system config": "Configurações do Sistema",
        "system configuration": "Configurações do Sistema",
        "2fa config": "Configurações de 2FA",
        "active admins": "ADMINISTRADORES ATIVOS",
        "admin access": "acesso admin",
        "pending attention": "ATENÇÃO PENDENTE",
        "needs review": "requer revisão",
        "new users": "NOVOS USUÁRIOS",
        "new organizations": "NOVAS EMPRESAS",
        "failed jobs": "TAREFAS COM FALHA",
        "queue health": "saúde da fila",
        "suspicious activity": "ATIVIDADE SUSPEITA",
        "last 30d": "últimos 30d",
        "system diagnostics": "DIAGNÓSTICO DO SISTEMA",
        "core service configuration state": "Estado de configuração dos serviços essenciais",
        "admin activity": "ATIVIDADE ADMINISTRATIVA",
        "recent sensitive admin events": "Eventos administrativos recentes",
        "no recent sensitive admin activity.": "Nenhuma atividade administrativa recente.",
        "organization risk queue": "FILA DE RISCO DE ORGANIZAÇÕES",
        "organizations needing operator review": "Empresas que precisam de revisão do operador",
        "no organizations currently need review.": "Nenhuma empresa precisa de revisão no momento.",
        "configuration gaps": "LACUNAS DE CONFIGURAÇÃO",
        "missing configuration that can affect operators": "Configurações pendentes que podem afetar a operação",
        "no configuration gaps detected.": "Nenhuma lacuna de configuração detectada.",
        "notification channels configuration": "Configuração de Canais de Notificação",
        "rate limit configuration": "Configuração de Limites de Requisições",
        "configuration health for mail, queue, filesystem, socket, notifications, and scheduler.": "Status dos serviços de e-mail, filas, disco, sockets e agendador.",
        "create fleet": "Criar Frota",
        "filter resources...": "Filtrar recursos...",
        "vehicles": "Veículos",
        "drivers": "Motoristas",
        "fleets": "Frotas",
        "places": "Locais",
        "positions": "Posições",
        "geofences": "Cercas Virtuais",
        "events": "Eventos",
        "no vehicles visible": "Nenhum veículo visível",
        "vehicles appear here when they are available in the live map context.": "Os veículos aparecerão aqui quando estiverem disponíveis no mapa.",
        "live map:": "Mapa em Tempo Real:",
        "live map": "Mapa em Tempo Real",
        "view route": "Ver Rota",
        "locate driver": "Localizar Entregador",
        "lookup another order": "Rastrear Outro Pedido",
        "lookup order": "Buscar Pedido",
        "lookup another": "Buscar Outro",
        "tracking:": "Rastreamento:",
        "tracking": "Rastreamento",
        "current eta:": "Previsão Atual:",
        "current eta": "Previsão Atual",
        "ect:": "Hora Estimada:",
        "current destination:": "Destino Atual:",
        "current destination": "Destino Atual",
        "next destination:": "Próximo Destino:",
        "next destination": "Próximo Destino",
        "pickup": "Coleta",
        "dropoff": "Entrega",
        "date created:": "Data de Criação:",
        "order details": "Detalhes do Pedido",
        "package details": "Detalhes do Pacote",
        "customer details": "Dados do Cliente",
        "driver details": "Dados do Entregador",
        "delivery route": "Rota de Entrega",
        "back to console": "Voltar ao Painel",
        "new order": "Novo Pedido",
        "create order": "Criar Pedido",
        "edit order": "Editar Pedido",
        "cancel order": "Cancelar Pedido",
        "delete order": "Excluir Pedido",
        "dispatch": "Despachar",
        "dispatch order": "Despachar Pedido",
        "assign driver": "Atribuir Motorista",
        "unassign driver": "Desatribuir Motorista",
        "customer": "Cliente",
        "customers": "Clientes",
        "driver": "Motorista",
        "vehicle": "Veículo",
        "destination": "Destino",
        "origin": "Origem",
        "proof of delivery": "Comprovante de Entrega",
        "signature": "Assinatura",
        "tracking number": "Código de Rastreio",
        "internal id": "ID Interno",
        "route": "Rota",
        "total distance": "Distância Total",
        "duration": "Duração",
        "waypoints": "Pontos da Rota",
        "payload": "Carga",
        "entities": "Itens / Pacotes",
        "api consumers": "Consumidores da API",
        "rate limits": "Limites de Requisições",
        "consumer": "Consumidor",
        "consumers": "Consumidores",
        "scope": "Escopo",
        "requests": "Requisições",
        "avg / min": "Média / min",
        "peak / min": "Pico / min",
        "throttled": "Bloqueado (429)",
        "throttled (429)": "Bloqueado (429)",
        "limit": "Limite",
        "default limit": "Limite Padrão",
        "no limit": "Sem limite",
        "unlimited": "Ilimitado",
        "clear rate-limit window": "Limpar Janela de Limite",
        "view organization": "Visualizar Empresa",
        "manage rate limits": "Gerenciar Limites",
        "remove override": "Remover Exceção",
        "requests / window": "Requisições / Janela",
        "most requests": "Mais Requisições",
        "most throttled": "Mais Bloqueados",
        "api key": "Chave de API",
        "access token": "Token de Acesso",
        "anonymous": "Anônimo",
        "unrecognized": "Não reconhecido",
        "created": "Criado",
        "order created": "Pedido Criado",
        "dispatched": "Despachado",
        "order dispatched": "Pedido Despachado",
        "started": "Iniciado",
        "in progress": "Em Andamento",
        "in transit": "Em Trânsito",
        "delivered": "Entregue",
        "cancelled": "Cancelado",
        "online": "Online",
        "offline": "Offline",
        "available": "Disponível",
        "busy": "Ocupado",
        "complete": "Completo",
        "incomplete": "Incompleto",
        "suspended": "Suspenso",
        "past due": "Atrasado",
        "trialing": "Em Período de Teste",
        "needs setup": "Requer Configuração",
        "needs attention": "Requer Atenção",
        "missing owner": "Sem Proprietário",
        "no owner assigned": "Nenhum proprietário atribuído",
        "no owner is assigned to this organization.": "Nenhum proprietário está atribuído a esta empresa.",
        "last updated": "Última Atualização",
        "last seen": "Último Acesso",
        "last sign-in": "Último Login",
        "registered": "Cadastrado em",
        "status": "Status",
        "yes": "Sim",
        "no": "Não",
        "ok": "OK"
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

        // Substituição case-insensitive de nós de texto em toda a árvore DOM
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    const tag = node.parentElement ? node.parentElement.tagName : '';
                    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'SVG' || tag === 'PATH') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    const text = node.nodeValue;
                    if (!text || text.trim().length === 0) return NodeFilter.FILTER_SKIP;
                    const cleanKey = text.replace(/\s+/g, ' ').trim().toLowerCase();
                    if (DICTIONARY[cleanKey] || text.includes('$')) {
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
            const allLeafletContainers = document.querySelectorAll('.leaflet-container');
            allLeafletContainers.forEach(container => {
                if (container.id === 'rota88-rescue-map-container') return;
                if (container.dataset.rota88Centered) return;
                
                // Verificar se há instância Leaflet acoplada
                let mapObj = container._leaflet_map;
                if (!mapObj && window.L && window.L.map && window.L.map.instances) {
                    mapObj = window.L.map.instances[container._leaflet_id];
                }
                
                // Trindade - GO: -16.6545, -49.4876
                if (mapObj && typeof mapObj.setView === 'function') {
                    mapObj.setView([-16.6545, -49.4876], 13);
                    container.dataset.rota88Centered = 'true';
                }
            });
        } catch (e) {
            // Silencioso se mapa ainda carregando
        }

        // Substituição direta em atributos e elementos de interface
        const elementsToCheck = document.querySelectorAll('.next-header-dd-menu-item, .next-dd-item, [role="menuitem"], .kpi-title, .kpi-value, button, a, th, td, label, span, p, h1, h2, h3, h4, dt, dd, legend, div');
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

            // Se for elemento folha ou com poucos filhos (como cards de KPI $0.00)
            if (el.children.length === 0) {
                let txt = el.textContent ? el.textContent.trim() : '';
                if (txt.includes('$')) {
                    el.textContent = txt.replace(/\$([0-9.,]+)/g, 'R$ $1').replace(/^\$\s*/, 'R$ ');
                }
            } else if (el.children.length <= 2) {
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
                if (clean.includes('search admin') || clean === 'search admin...' || clean === 'search admin') {
                    input.placeholder = 'Buscar no Admin...';
                } else if (clean.includes('missing translation') || clean.includes('search-input') || clean === 'search' || clean === 'search...') {
                    input.placeholder = 'Pesquisar...';
                } else if (DICTIONARY[clean]) {
                    input.placeholder = DICTIONARY[clean];
                }
            }
        });
    }

    // 6. MOTOR DE RESGATE AUTÔNOMO DE RASTREAMENTO LEAFLET
    function autoFixTrackingMap() {
        const isTrackingPage = window.location.pathname.includes('track-order') || window.location.search.includes('order=');
        if (!isTrackingPage) return;

        const urlParams = new URLSearchParams(window.location.search);
        const orderParam = urlParams.get('order') || urlParams.get('tracking');
        if (!orderParam) return;

        const leafletContainer = document.querySelector('.leaflet-container');
        if (!leafletContainer) return;

        if (leafletContainer.dataset.rota88RescueActive === orderParam) return;
        leafletContainer.dataset.rota88RescueActive = orderParam;

        console.log('[Rota88] Iniciando motor de resgate visual para o pedido:', orderParam);

        let rescueDiv = document.getElementById('rota88-rescue-map-container');
        if (!rescueDiv) {
            rescueDiv = document.createElement('div');
            rescueDiv.id = 'rota88-rescue-map-container';
            rescueDiv.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 99999; background: #e5e7eb;';
            document.body.appendChild(rescueDiv);

            // Adicionar botão moderno no topo para fechar/voltar se necessário
            const backBtn = document.createElement('div');
            backBtn.style.cssText = 'position: fixed; top: 16px; left: 16px; z-index: 100001; background: #ffffff; border-radius: 50%; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.25); cursor: pointer; font-size: 18px; font-weight: bold; color: #0f172a;';
            backBtn.innerHTML = '←';
            backBtn.onclick = () => window.history.back();
            document.body.appendChild(backBtn);
        }

        function loadLeafletAssets(callback) {
            if (window.L && window.L.map) {
                callback();
                return;
            }
            if (!document.getElementById('leaflet-css')) {
                const link = document.createElement('link');
                link.id = 'leaflet-css';
                link.rel = 'stylesheet';
                link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                document.head.appendChild(link);
            }
            if (!document.getElementById('leaflet-js')) {
                const script = document.createElement('script');
                script.id = 'leaflet-js';
                script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                script.onload = () => callback();
                document.head.appendChild(script);
            } else {
                const checkInterval = setInterval(() => {
                    if (window.L && window.L.map) {
                        clearInterval(checkInterval);
                        callback();
                    }
                }, 200);
            }
        }

        loadLeafletAssets(() => {
            fetch('/int/v1/fleet-ops/lookup?tracking=' + encodeURIComponent(orderParam))
                .then(r => r.json())
                .then(data => {
                    if (!data || !data.payload) return;
                    const payload = data.payload;
                    const waypoints = payload.waypoints || [];
                    const entities = payload.entities || [];

                    let pickupCoord = null;
                    let dropoffCoord = null;

                    if (payload.pickup && payload.pickup.location && payload.pickup.location.coordinates) {
                        pickupCoord = [payload.pickup.location.coordinates[1], payload.pickup.location.coordinates[0]];
                    }
                    if (payload.dropoff && payload.dropoff.location && payload.dropoff.location.coordinates) {
                        dropoffCoord = [payload.dropoff.location.coordinates[1], payload.dropoff.location.coordinates[0]];
                    }

                    if (!pickupCoord && waypoints.length > 0 && waypoints[0].location && waypoints[0].location.coordinates) {
                        pickupCoord = [waypoints[0].location.coordinates[1], waypoints[0].location.coordinates[0]];
                    }
                    if (!dropoffCoord && waypoints.length > 1 && waypoints[waypoints.length - 1].location && waypoints[waypoints.length - 1].location.coordinates) {
                        dropoffCoord = [waypoints[waypoints.length - 1].location.coordinates[1], waypoints[waypoints.length - 1].location.coordinates[0]];
                    }

                    if (!pickupCoord && !dropoffCoord) return;

                    if (window._rota88RescueMapInstance) {
                        window._rota88RescueMapInstance.remove();
                    }

                    const defaultCenter = pickupCoord || dropoffCoord;
                    const rescueMap = window.L.map('rota88-rescue-map-container', {
                        zoomControl: true,
                        attributionControl: false
                    }).setView(defaultCenter, 14);
                    window._rota88RescueMapInstance = rescueMap;

                    // Mapa OpenStreetMap 100% gratuito e livre sem necessidade de API Key
                    window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(rescueMap);

                    const bounds = [];

                    if (pickupCoord) {
                        bounds.push(pickupCoord);
                        const storeIcon = window.L.divIcon({
                            html: '<div style="background:#10b981; color:#fff; width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(16,185,129,0.5); font-size:20px; border:3px solid #ffffff;">🏪</div>',
                            className: 'rota88-pin-store',
                            iconSize: [38, 38],
                            iconAnchor: [19, 19]
                        });
                        window.L.marker(pickupCoord, { icon: storeIcon }).addTo(rescueMap)
                            .bindPopup('<b>🏪 Farmácia (Ponto de Coleta)</b><br>' + escapeHtml(payload.pickup?.name || 'Farmácia'));
                    }

                    if (dropoffCoord) {
                        bounds.push(dropoffCoord);
                        const clientIcon = window.L.divIcon({
                            html: '<div style="background:#ef4444; color:#fff; width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(239,68,68,0.5); font-size:20px; border:3px solid #ffffff; animation: pulse 2s infinite;">📍</div>',
                            className: 'rota88-pin-client',
                            iconSize: [38, 38],
                            iconAnchor: [19, 19]
                        });
                        window.L.marker(dropoffCoord, { icon: clientIcon }).addTo(rescueMap)
                            .bindPopup('<b>📍 Destino (Cliente)</b><br>' + escapeHtml(payload.dropoff?.street1 || payload.dropoff?.name || 'Endereço de Entrega'));
                    }

                    if (pickupCoord && dropoffCoord) {
                        const osrmUrl = 'https://router.project-osrm.org/route/v1/driving/' +
                            pickupCoord[1] + ',' + pickupCoord[0] + ';' +
                            dropoffCoord[1] + ',' + dropoffCoord[0] +
                            '?overview=full&geometries=geojson';

                        fetch(osrmUrl)
                            .then(r => r.json())
                            .then(routeData => {
                                if (routeData.routes && routeData.routes.length > 0) {
                                    const coords = routeData.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
                                    
                                    // Sombra da rota para profundidade 3D
                                    window.L.polyline(coords, {
                                        color: '#1e3a8a',
                                        weight: 9,
                                        opacity: 0.35
                                    }).addTo(rescueMap);

                                    // Linha principal vibrante estilo Google Maps
                                    const poly = window.L.polyline(coords, {
                                        color: '#2563eb',
                                        weight: 5,
                                        opacity: 0.95
                                    }).addTo(rescueMap);

                                    rescueMap.fitBounds(poly.getBounds(), { padding: [60, 60] });
                                } else {
                                    rescueMap.fitBounds(bounds, { padding: [60, 60] });
                                }
                            })
                            .catch(() => {
                                const directLine = window.L.polyline([pickupCoord, dropoffCoord], {
                                    color: '#2563eb',
                                    weight: 4,
                                    dashArray: '6, 8'
                                }).addTo(rescueMap);
                                rescueMap.fitBounds(directLine.getBounds(), { padding: [60, 60] });
                            });
                    } else if (bounds.length > 0) {
                        rescueMap.fitBounds(bounds, { padding: [60, 60] });
                    }

                    // Criar container de visualização estilo iFood/Rappi se não existir
                    let modernCard = document.getElementById('rota88-modern-tracker-card');
                    if (!modernCard) {
                        modernCard = document.createElement('div');
                        modernCard.id = 'rota88-modern-tracker-card';
                        modernCard.style.cssText = 'position: fixed; bottom: 16px; left: 16px; right: 16px; z-index: 100002; background: #ffffff; border-radius: 20px; box-shadow: 0 12px 35px rgba(0,0,0,0.3); padding: 18px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 500px; margin: 0 auto;';
                        
                        const statusTitle = payload.status === 'dispatched' ? '🛵 Entregador a caminho!' : (payload.status === 'completed' ? '✅ Pedido Entregue!' : '📦 Pedido em Preparação');
                        const pharmacyName = escapeHtml(payload.pickup?.name || 'Farmácia Parceira');
                        const clientAddr = escapeHtml(payload.dropoff?.street1 || payload.dropoff?.name || 'Endereço de Entrega');
                        const clientPhone = payload.dropoff?.phone || '';

                        modernCard.innerHTML = `
                            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 12px;">
                                <div>
                                    <span style="background: #fef3c7; color: #d97706; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 12px; text-transform: uppercase;">ZapFarm Express</span>
                                    <h3 style="margin: 4px 0 0 0; font-size: 16px; font-weight: 800; color: #0f172a;">${statusTitle}</h3>
                                </div>
                                <div style="width: 42px; height: 42px; background: #2563eb; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 4px 10px rgba(37,99,235,0.4);">🛵</div>
                            </div>

                            <!-- Barra de Progresso Visual Estilo App -->
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                                <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                                    <div style="width: 24px; height: 24px; border-radius: 50%; background: #10b981; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">✓</div>
                                    <span style="font-size: 10.5px; color: #64748b; margin-top: 4px; font-weight: 600;">Confirmado</span>
                                </div>
                                <div style="height: 3px; background: #10b981; flex: 1; margin: 0 4px -14px 4px;"></div>
                                <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                                    <div style="width: 24px; height: 24px; border-radius: 50%; background: #10b981; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">✓</div>
                                    <span style="font-size: 10.5px; color: #64748b; margin-top: 4px; font-weight: 600;">Embalado</span>
                                </div>
                                <div style="height: 3px; background: ${payload.status === 'dispatched' || payload.status === 'completed' ? '#10b981' : '#e2e8f0'}; flex: 1; margin: 0 4px -14px 4px;"></div>
                                <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                                    <div style="width: 24px; height: 24px; border-radius: 50%; background: ${payload.status === 'dispatched' || payload.status === 'completed' ? '#2563eb' : '#cbd5e1'}; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">🛵</div>
                                    <span style="font-size: 10.5px; color: ${payload.status === 'dispatched' ? '#2563eb' : '#64748b'}; margin-top: 4px; font-weight: 700;">A Caminho</span>
                                </div>
                            </div>

                            <div style="font-size: 12.5px; color: #334155; line-height: 1.5; margin-bottom: 12px; background: #f8fafc; padding: 12px; border-radius: 12px;">
                                <div style="margin-bottom: 6px;">🏪 <b>Coleta:</b> ${pharmacyName}</div>
                                <div>📍 <b>Entrega:</b> ${clientAddr}</div>
                            </div>

                            <!-- Botões de Ação Rápida -->
                            <div style="display: flex; gap: 8px;">
                                ${dropoffCoord ? `
                                <a href="https://www.google.com/maps/dir/?api=1&destination=${dropoffCoord[0]},${dropoffCoord[1]}" target="_blank" style="flex: 1; text-align: center; background: #0f172a; color: white; padding: 12px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px;">
                                    🗺️ Abrir no Maps
                                </a>` : ''}
                                ${clientPhone ? `
                                <a href="https://wa.me/${clientPhone.replace(/\\D/g, '')}" target="_blank" style="flex: 1; text-align: center; background: #16a34a; color: white; padding: 12px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px;">
                                    💬 WhatsApp
                                </a>` : ''}
                            </div>
                        `;
                        document.body.appendChild(modernCard);
                    }

                    setTimeout(() => {
                        rescueMap.invalidateSize();
                    }, 500);
                })
                .catch(err => {
                    console.error('[Rota88] Erro ao carregar pedido:', err);
                });
        });
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
    // Otimizado: em vez de varrer o DOM em CADA mutacao (loop infinito, pois a
    // propria traducao muta o DOM e re-dispara o observer), acumulamos as
    // mutacoes e processamos em lote com debounce. Reduz drasticamente o uso
    // de CPU no painel e evita travamentos em telas pesadas.
    let brandingTimer = null;
    let trackingTimer = null;

    function scheduleBranding() {
        if (brandingTimer) return;
        brandingTimer = setTimeout(() => {
            brandingTimer = null;
            applyBranding();
        }, 250);
    }

    function scheduleTracking() {
        if (trackingTimer) return;
        trackingTimer = setTimeout(() => {
            trackingTimer = null;
            autoFixTrackingMap();
        }, 1000);
    }

    const observer = new MutationObserver(() => {
        scheduleBranding();
        scheduleTracking();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Rede de seguranca leve (nao mais varredura completa a cada 1s):
    // a cada 15s apenas atualiza titulo e rastreio, sem re-traduzir tudo
    setInterval(() => {
        updateTitle();
        autoFixTrackingMap();
    }, 15000);
})();
