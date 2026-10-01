(function() {
    'use strict';

    // 1. Forçar o idioma padrão para Português do Brasil (pt-BR)
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

    // 3. Dicionário Completo de Tradução para Interface (pt-BR)
    const DICTIONARY = {
        // Dropdown de Usuário e Organizações
        'Home': 'Início',
        'Create or join organizations': 'Gerenciar Organizações',
        'Administrator': 'Administrador',
        'View Profile': 'Meu Perfil',
        'Show keyboard shortcuts': 'Atalhos do Teclado',
        'Changelog': 'Novidades',
        'Developers': 'Integrações & API',
        'Help & Support': 'Ajuda & Suporte',
        'Terms of Service': 'Termos de Uso',
        'Privacy Policy': 'Política de Privacidade',
        'Logout': 'Sair',
        'Sign out': 'Sair',

        // Cards e Widgets do Dashboard
        'RADAR': 'RADAR',
        'Open Radar': 'Abrir Radar',
        'open': 'abertos',
        'snoozed': 'adiados',
        'REVENUE': 'RECEITA TOTAL',
        'vs previous period': 'vs período anterior',
        'Current': 'Atual',
        'ACTIVE ORDERS': 'PEDIDOS ATIVOS',
        'DRIVERS ONLINE': 'MOTORISTAS ONLINE',
        'EXPENSES': 'DESPESAS',
        'NET INCOME': 'LUCRO LÍQUIDO',
        'OUTSTANDING AR': 'CONTAS A RECEBER',
        'OVERDUE AR': 'CONTAS VENCIDAS',
        'Live Fleet Map': 'Mapa da Frota em Tempo Real',
        'No active drivers or vehicles to display.': 'Nenhum motorista ou veículo ativo no momento.',
        'Revenue Trend': 'Tendência de Faturamento',
        'Top Drivers': 'Melhores Motoristas',
        'Orders': 'Pedidos',
        'On-time': 'Pontualidade',
        'Distance': 'Distância',
        'No driver activity in this period.': 'Nenhuma atividade de motorista neste período.',
        'Maintenance Overview': 'Visão de Manutenção',
        'OVERDUE': 'VENCIDO',
        'NEXT 7D': 'PRÓXIMOS 7 DIAS',
        'MTD': 'NO MÊS',
        'No upcoming maintenance.': 'Nenhuma manutenção pendente.',
        'Recent Financial Activity': 'Atividades Financeiras Recentes',
        'Latest journal entries posted to the ledger': 'Últimos lançamentos no livro-razão',
        'No recent journal entries.': 'Nenhum lançamento recente.',
        'Cash Flow Summary': 'Resumo do Fluxo de Caixa',
        'net cash change': 'variação de caixa',

        // Menus e Navegação
        'Default Dashboard': 'Painel de Controle',
        'Search navigation': 'Buscar no menu...',
        'More extensions': 'Mais Módulos',
        'Customise navigation': 'Personalizar Menu',
        'Open chat inbox': 'Mensagens',
        'Legal': 'Termos Legais',
        'Starting up...': 'Carregando...',
        'Fleet-Ops': 'Operações de Entrega',
        'Storefront': 'Lojas & Pedidos',
        'IAM': 'Acessos & Usuários',
        'Ledger': 'Financeiro'
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

    // 5. Aplicar Traduções e Limpezas Visuais
    function applyBranding() {
        updateTitle();
        setupSidebarButton();

        // Substituir logotipos padrão
        const logos = document.querySelectorAll('img[src*="fleetbase-icon"], img[alt="Fleetbase"]');
        logos.forEach(img => {
            if (img.getAttribute('src') !== '/images/rota88-logo.svg') {
                img.src = '/images/rota88-logo.svg';
                img.style.height = '40px';
                img.style.width = '190px';
                img.style.minWidth = '190px';
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

        // Substituição de textos com base no dicionário
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    const tag = node.parentElement ? node.parentElement.tagName : '';
                    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'SVG' || tag === 'PATH') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    const trimmed = node.nodeValue.trim();
                    if (DICTIONARY[trimmed]) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
            }
        );

        let node;
        while ((node = walker.nextNode())) {
            const trimmed = node.nodeValue.trim();
            if (DICTIONARY[trimmed]) {
                node.nodeValue = DICTIONARY[trimmed];
            }
        }

        // Corrigir inputs e placeholders
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
