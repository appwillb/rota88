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
