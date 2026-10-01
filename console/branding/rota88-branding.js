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
        'vehicles appear here when they are available in the live map context.': 'Os veículos aparecerão aqui quando estiverem disponíveis no mapa.'
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
            const cleanKey = node.nodeValue.replace(/\s+/g, ' ').trim().toLowerCase();
            if (DICTIONARY[cleanKey]) {
                node.nodeValue = DICTIONARY[cleanKey];
            }
        }

        // Substituição direta em elementos folha com texto
        const elementsToCheck = document.querySelectorAll('.next-header-dd-menu-item, .next-dd-item, [role="menuitem"], .kpi-title, h1, h2, h3, h4');
        elementsToCheck.forEach(el => {
            if (el.children.length <= 1) {
                const textOnly = Array.from(el.childNodes)
                    .filter(n => n.nodeType === Node.TEXT_NODE)
                    .map(n => n.nodeValue)
                    .join(' ')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase();

                if (DICTIONARY[textOnly]) {
                    // Encontrar e atualizar o nó de texto específico sem matar ícones svg
                    Array.from(el.childNodes).forEach(n => {
                        if (n.nodeType === Node.TEXT_NODE && n.nodeValue.trim().length > 0) {
                            n.nodeValue = DICTIONARY[textOnly];
                        }
                    });
                }
            }
        });

        // Corrigir placeholders
        const searchInputs = document.querySelectorAll('input[placeholder*="Missing translation"], input[placeholder*="search-input"], input[placeholder*="Search"]');
        searchInputs.forEach(input => {
            input.placeholder = 'Pesquisar...';
        });
    }

    // Executar imediatamente e acompanhar transições do Ember
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyBranding);
    } else {
        applyBranding();
    }

    // MutationObserver para Single Page Application (SPA)
    const observer = new MutationObserver(() => {
        applyBranding();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    setInterval(applyBranding, 1000);
})();
