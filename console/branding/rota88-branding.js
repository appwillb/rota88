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

    // 3. Substituições e Limpezas Visuais no DOM
    function applyBranding() {
        updateTitle();

        // Substituir logos que apontam para o ícone padrão
        const logos = document.querySelectorAll('img[src*="fleetbase-icon"], img[alt="Fleetbase"]');
        logos.forEach(img => {
            if (img.getAttribute('src') !== '/images/rota88-logo.svg') {
                img.src = '/images/rota88-logo.svg';
                img.style.height = '44px';
                img.style.width = 'auto';
                img.style.minWidth = '180px';
                img.style.display = 'inline-block';
            }
        });

        // Ocultar cards e elementos externos do Fleetbase
        const elementsToHide = document.querySelectorAll(
            'a[href*="fleetbase.io"], a[href*="github.com/fleetbase"], .fleetbase-blog, .github-card'
        );
        elementsToHide.forEach(el => {
            const card = el.closest('.grid-stack-item') || el.closest('.next-dashboard-widget-card') || el;
            card.style.display = 'none';
        });

        // Corrigir placeholders ou mensagens de tradução ausente
        const searchInputs = document.querySelectorAll('input[placeholder*="Missing translation"], input[placeholder*="search-input"]');
        searchInputs.forEach(input => {
            input.placeholder = 'Pesquisar...';
        });

        // Renomear abas principais no topo para português claro
        const menuItems = document.querySelectorAll('[role="menubar"] [role="menuitem"]');
        menuItems.forEach(item => {
            const txt = item.textContent.trim();
            if (txt === 'Fleet-Ops') {
                item.textContent = 'Operações de Entrega';
            } else if (txt === 'Storefront') {
                item.textContent = 'Lojas & Pedidos';
            } else if (txt === 'Developers') {
                item.textContent = 'Integrações';
            } else if (txt === 'IAM') {
                item.textContent = 'Acessos & Usuários';
            } else if (txt === 'Ledger') {
                item.textContent = 'Financeiro';
            }
        });

        // Renomear "Default Dashboard"
        const headings = document.querySelectorAll('h1, h2, h3, button');
        headings.forEach(el => {
            if (el.childNodes.length === 1 && el.textContent.trim() === 'Default Dashboard') {
                el.textContent = 'Painel de Controle';
            }
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

    setInterval(applyBranding, 1500);
})();
