// Menu mobile toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Navegação entre módulos
const navItems = document.querySelectorAll('.nav-item');
const mainContent = document.getElementById('mainContent');

// Conteúdo dos módulos
const moduleContents = {
    'dashboard': `
        <h1 class="page-title">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard Geral</span>
        </h1>

        <!-- Cards de Métricas -->
        <div class="dashboard-cards">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Total de Usuários</h3>
                    <div class="card-icon blue">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="card-value" id="totalUsuarios">0</div>
                <div class="card-change" id="statusUsuarios">
                    <i class="fas fa-sync-alt loader"></i> Carregando...
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Total de Métricas</h3>
                    <div class="card-icon green">
                        <i class="fas fa-chart-line"></i>
                    </div>
                </div>
                <div class="card-value" id="totalMetricas">0</div>
                <div class="card-change" id="statusMetricas">
                    <i class="fas fa-sync-alt loader"></i> Carregando...
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Taxa Média de Resolução</h3>
                    <div class="card-icon orange">
                        <i class="fas fa-percentage"></i>
                    </div>
                </div>
                <div class="card-value" id="mediaResolucao">0%</div>
                <div class="card-change" id="statusResolucao">
                    <i class="fas fa-sync-alt loader"></i> Carregando...
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Tempo Médio de Atendimento</h3>
                    <div class="card-icon purple">
                        <i class="fas fa-clock"></i>
                    </div>
                </div>
                <div class="card-value" id="mediaTempoAtendimento">0 min</div>
                <div class="card-change" id="statusTempo">
                    <i class="fas fa-sync-alt loader"></i> Carregando...
                </div>
            </div>
        </div>

        <!-- Gráficos -->
        <div class="charts-container">
            <div class="chart-card">
                <h3 class="chart-title">Desempenho de Métricas (Últimos 30 dias)</h3>
                <div>
                    <canvas id="chartMetricas" class="chart-canvas"></canvas>
                </div>
            </div>

            <div class="chart-card">
                <h3 class="chart-title">Distribuição de Chat por Usuário</h3>
                <div>
                    <canvas id="chartDistribuicao" class="chart-canvas"></canvas>
                </div>
            </div>
        </div>

        <!-- Atividade Recente -->
        <div class="recent-activity">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3 class="activity-title">Métricas Recentes</h3>
                <button id="refreshDashboard" class="btn btn-secondary" style="padding: 8px 16px;">
                    <i class="fas fa-sync-alt"></i> Atualizar
                </button>
            </div>
            <div id="recentMetricsContainer">
                <table class="activity-table">
                    <thead>
                        <tr>
                            <th>Usuário</th>
                            <th>Data</th>
                            <th>Taxa Resolução</th>
                            <th>Tempo Médio</th>
                            <th>Chats Atendidos</th>
                        </tr>
                    </thead>
                    <tbody id="recentMetricsBody">
                        <tr>
                            <td colspan="5" style="text-align: center; padding: 40px;">
                                <div class="loader" style="margin: 0 auto 10px;"></div>
                                <p>Carregando métricas...</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    'cadastro-metricas': `
        <div class="metricas-manager-container">
            <h1 class="page-title">
                <i class="fas fa-chart-bar"></i>
                <span>Cadastro de Métricas</span>
            </h1>
            
            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-value" id="totalMetricasCadastro">0</div>
                    <div class="stat-label">Total de Métricas</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="mediaResolucaoCadastro">0%</div>
                    <div class="stat-label">Taxa Média de Resolução</div>
                </div>
            </div>
            
            <div class="message" id="messageMetricas"></div>
            
            <div class="metricas-form-container">
                <div class="form-section">
                    <h2 class="section-title">
                        <i class="fas fa-chart-line"></i>
                        <span>Cadastrar Nova Métrica</span>
                    </h2>
                    
                    <form id="metricasForm">
                        <div class="form-group">
                            <label for="users_id">Usuário *</label>
                            <select id="users_id" required>
                                <option value="">Selecione um usuário</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="data_referencia">Data de Referência *</label>
                            <input type="date" id="data_referencia" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="taxa_resolucao">Taxa de Resolução (%)</label>
                            <input type="number" id="taxa_resolucao" min="0" max="100" step="0.1" placeholder="Ex: 85.5">
                        </div>
                        
                        <div class="form-group">
                            <label for="tempo_medio_atendimento">Tempo Médio de Atendimento (minutos)</label>
                            <input type="number" id="tempo_medio_atendimento" min="0" step="0.1" placeholder="Ex: 12.5">
                        </div>
                        
                        <div class="form-group">
                            <label for="percentual_atendimentos_avaliados">% Atendimentos Avaliados</label>
                            <input type="number" id="percentual_atendimentos_avaliados" min="0" max="100" step="0.1" placeholder="Ex: 92.0">
                        </div>
                        
                        <div class="form-group">
                            <label for="chats_atendidos">Chats Atendidos</label>
                            <input type="number" id="chats_atendidos" min="0" placeholder="Ex: 150">
                        </div>
                        
                        <div class="form-group">
                            <label for="resolvidos_primeiro_atendimento">Resolvidos no 1º Atendimento</label>
                            <input type="number" id="resolvidos_primeiro_atendimento" min="0" placeholder="Ex: 120">
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">Salvar Métrica</button>
                            <button type="button" id="clearBtnMetricas" class="btn btn-secondary">Limpar Formulário</button>
                        </div>
                    </form>
                </div>
                
                <div class="list-section">
                    <h2 class="section-title">
                        <i class="fas fa-list"></i>
                        <span>Lista de Métricas</span>
                    </h2>
                    
                    <div class="search-container">
                        <input type="text" id="searchInputMetricas" class="search-input" placeholder="Buscar por usuário ou data...">
                    </div>
                    
                    <div class="tabs">
                        <button class="tab-btn active" data-filter="all">Todas</button>
                        <button class="tab-btn" data-filter="recentes">Recentes</button>
                        <button class="tab-btn" data-filter="antigas">Antigas</button>
                    </div>
                    
                    <div class="members-list" id="metricasList">
                        <div class="empty-state">
                            <h3>Nenhuma métrica encontrada</h3>
                            <p>Adicione métricas usando o formulário ao lado</p>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; text-align: right;">
                        <button id="exportBtnMetricas" class="btn btn-secondary">Exportar para CSV</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    'cadastro-usuario': `
        <div class="member-manager-container">
            <h1 class="page-title">
                <i class="fas fa-user-plus"></i>
                <span>Cadastro de Usuários</span>
            </h1>
            
            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-value" id="totalMembers">0</div>
                    <div class="stat-label">Total de Usuários</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="activeMembers">0</div>
                    <div class="stat-label">Usuários Ativos</div>
                </div>
            </div>
            
            <div class="message" id="message"></div>
            
            <div class="member-form-container">
                <div class="form-section">
                    <h2 class="section-title">
                        <i class="fas fa-user-plus"></i>
                        <span>Cadastrar Novo Usuário</span>
                    </h2>
                    
                    <form id="memberForm">
                        <div class="form-group">
                            <label for="name">Nome Completo *</label>
                            <input type="text" id="name" placeholder="Digite o nome completo" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="birthDate">Data de Nascimento</label>
                            <input type="date" id="birthDate">
                        </div>
                        
                        <div class="form-group">
                            <label for="phone">Telefone *</label>
                            <input type="tel" id="phone" placeholder="(11) 99999-9999" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" id="email" placeholder="usuario@empresa.com" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="position">Cargo *</label>
                            <select id="position" required>
                                <option value="">Selecione um cargo</option>
                                <option value="gestor">Gestor</option>
                                <option value="coordenador">Coordenador</option>
                                <option value="analista N2">Analista N2</option>
                                <option value="analista N1">Analista N1</option>
                                <option value="estagiario">Estagiário</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="status">Status *</label>
                            <select id="status" required>
                                <option value="">Selecione um status</option>
                                <option value="active">Ativo</option>
                                <option value="inactive">Inativo</option>
                                <option value="pending">Pendente</option>
                            </select>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">Salvar Usuário</button>
                            <button type="button" id="clearBtn" class="btn btn-secondary">Limpar Formulário</button>
                        </div>
                    </form>
                </div>
                
                <div class="list-section">
                    <h2 class="section-title">
                        <i class="fas fa-users"></i>
                        <span>Lista de Usuários</span>
                    </h2>
                    
                    <div class="search-container">
                        <input type="text" id="searchInput" class="search-input" placeholder="Buscar por nome, email ou telefone...">
                    </div>
                    
                    <div class="tabs">
                        <button class="tab-btn active" data-filter="all">Todos</button>
                        <button class="tab-btn" data-filter="active">Ativos</button>
                        <button class="tab-btn" data-filter="inactive">Inativos</button>
                        <button class="tab-btn" data-filter="pending">Pendentes</button>
                    </div>
                    
                    <div class="members-list" id="membersList">
                        <div class="empty-state">
                            <h3>Nenhum usuário encontrado</h3>
                            <p>Adicione usuários usando o formulário ao lado</p>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; text-align: right;">
                        <button id="exportBtn" class="btn btn-secondary">Exportar para CSV</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    'permissoes-usuario': `
        <h1 class="page-title">
            <i class="fas fa-user-shield"></i>
            <span>Permissões de Usuário</span>
        </h1>
        <div class="card" style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 15px; color: #222;">Gerenciar Permissões</h3>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <label style="margin-right: 10px; font-weight: 600;">Selecionar Usuário:</label>
                <select style="padding: 8px 15px; border: 1px solid #ddd; border-radius: 5px; width: 300px;">
                    <option>João Silva</option>
                    <option>Maria Santos</option>
                    <option>Carlos Oliveira</option>
                    <option>Ana Costa</option>
                </select>
            </div>
            
            <h4 style="margin: 20px 0 10px; color: #333;">Permissões por Módulo</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                <div class="card" style="padding: 15px;">
                    <h5 style="margin-bottom: 10px; color: #222;">Dashboard</h5>
                    <div>
                        <label style="display: flex; align-items: center; margin-bottom: 8px;">
                            <input type="checkbox" checked style="margin-right: 8px;"> Visualizar
                        </label>
                        <label style="display: flex; align-items: center; margin-bottom: 8px;">
                            <input type="checkbox" checked style="margin-right: 8px;"> Exportar
                        </label>
                    </div>
                </div>
                <div class="card" style="padding: 15px;">
                    <h5 style="margin-bottom: 10px; color: #222;">Cadastro de Métricas</h5>
                    <div>
                        <label style="display: flex; align-items: center; margin-bottom: 8px;">
                            <input type="checkbox" checked style="margin-right: 8px;"> Visualizar
                        </label>
                        <label style="display: flex; align-items: center; margin-bottom: 8px;">
                            <input type="checkbox" style="margin-right: 8px;"> Criar
                        </label>
                        <label style="display: flex; align-items: center; margin-bottom: 8px;">
                            <input type="checkbox" style="margin-right: 8px;"> Editar
                        </label>
                        <label style="display: flex; align-items: center; margin-bottom: 8px;">
                            <input type="checkbox" style="margin-right: 8px;"> Excluir
                        </label>
                    </div>
                </div>
                <div class="card" style="padding: 15px;">
                    <h5 style="margin-bottom: 10px; color: #222;">Cadastro de Usuários</h5>
                    <div>
                        <label style="display: flex; align-items: center; margin-bottom: 8px;">
                            <input type="checkbox" style="margin-right: 8px;"> Visualizar
                        </label>
                        <label style="display: flex; align-items: center; margin-bottom: 8px;">
                            <input type="checkbox" style="margin-right: 8px;"> Criar
                        </label>
                        <label style="display: flex; align-items: center; margin-bottom: 8px;">
                            <input type="checkbox" style="margin-right: 8px;"> Editar
                        </label>
                    </div>
                </div>
                <div class="card" style="padding: 15px;">
                    <h5 style="margin-bottom: 10px; color: #222;">Permissões</h5>
                    <div>
                        <label style="display: flex; align-items: center; margin-bottom: 8px;">
                            <input type="checkbox" style="margin-right: 8px;"> Visualizar
                        </label>
                        <label style="display: flex; align-items: center; margin-bottom: 8px;">
                            <input type="checkbox" style="margin-right: 8px;"> Editar
                        </label>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px; text-align: right;">
                <button style="background-color: #1591EA; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: 600;">Salvar Permissões</button>
            </div>
        </div>
    `
};

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove a classe active de todos os itens
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
        });
        
        // Adiciona a classe active ao item clicado
        item.classList.add('active');
        
        // Obtém o módulo correspondente
        const module = item.getAttribute('data-module');
        
        // Verifica se é o módulo de sair
        if (module === 'sair') {
            alert('Você saiu do sistema. Em uma aplicação real, isso redirecionaria para a página de login.');
            return;
        }
        
        // Verifica se é o módulo de configurações (não implementado)
        if (module === 'configuracoes') {
            alert('Módulo de configurações em desenvolvimento.');
            return;
        }
        
        // Atualiza o conteúdo principal
        if (moduleContents[module]) {
            mainContent.innerHTML = moduleContents[module];
            
            // Se for o módulo dashboard, inicializar o DashboardManager
            if (module === 'dashboard') {
                setTimeout(() => {
                    if (typeof dashboardManager !== 'undefined') {
                        // Se já existe, apenas atualizar dados
                        dashboardManager.loadDashboardData();
                    } else {
                        // Inicializar o DashboardManager
                        window.dashboardManager = new DashboardManager();
                    }
                }, 100);
            }
            
            // Se for o módulo de cadastro de métricas, inicializar o MetricasManager
            if (module === 'cadastro-metricas') {
                setTimeout(() => {
                    if (typeof metricasManager !== 'undefined') {
                        // Se já existe, apenas renderizar
                        metricasManager.renderStats();
                        metricasManager.renderMetricas();
                    } else {
                        // Inicializar o MetricasManager
                        window.metricasManager = new MetricasManager();
                    }
                }, 100);
            }
            
            // Se for o módulo de cadastro de usuário, inicializar o MemberManager
            if (module === 'cadastro-usuario') {
                setTimeout(() => {
                    if (typeof memberManager !== 'undefined') {
                        // Se já existe, apenas renderizar
                        memberManager.renderStats();
                        memberManager.renderMembers();
                    } else {
                        // Inicializar o MemberManager
                        window.memberManager = new MemberManager();
                    }
                }, 100);
            }
        }
        
        // Fecha o menu lateral em dispositivos móveis
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});

// Inicializar com o dashboard
mainContent.innerHTML = moduleContents['dashboard'];

// DashboardManager - para gerenciar os dados do dashboard
class DashboardManager {
    constructor() {
        this.metricas = [];
        this.users = [];
        this.charts = {};
        
        // Inicializar Supabase
        this.SUPABASE_URL = 'https://aoctwedwlrdibnqyeevj.supabase.co';
        this.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvY3R3ZWR3bHJkaWJucXllZXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjIwOTUsImV4cCI6MjA4MzIzODA5NX0.bZz3Wnqk8Ag7BZ4Ue9_wwNutWToD0YUeGrLupJ6YFBc';
        this.supabaseClient = supabase.createClient(this.SUPABASE_URL, this.SUPABASE_ANON_KEY);
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboardData();
    }

    setupEventListeners() {
        const refreshBtn = document.getElementById('refreshDashboard');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadDashboardData();
            });
        }
    }

    async loadDashboardData() {
        try {
            // Atualizar status dos cards
            this.updateCardStatus('Carregando dados...', 'loading');
            
            // Carregar dados de usuários e métricas simultaneamente
            await Promise.all([
                this.loadUsersData(),
                this.loadMetricasData()
            ]);
            
            // Atualizar os cards do dashboard
            this.updateDashboardCards();
            
            // Carregar métricas recentes
            await this.loadRecentMetrics();
            
            // Inicializar gráficos
            this.initCharts();
            
        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
            this.updateCardStatus('Erro ao carregar dados', 'error');
        }
    }

    async loadUsersData() {
        try {
            const { data, error } = await this.supabaseClient
                .from('users')
                .select('*')
                .order('data_cadastro', { ascending: false });

            if (error) {
                console.error('Erro ao carregar usuários:', error);
                return;
            }

            this.users = data || [];
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    async loadMetricasData() {
        try {
            const { data, error } = await this.supabaseClient
                .from('metricas')
                .select('*, users(nome)')
                .order('data_referencia', { ascending: false });

            if (error) {
                console.error('Erro ao carregar métricas:', error);
                return;
            }

            this.metricas = data || [];
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    async loadRecentMetrics() {
        try {
            // Pegar as 5 métricas mais recentes
            const recentMetrics = this.metricas.slice(0, 5);
            const tbody = document.getElementById('recentMetricsBody');
            
            if (!tbody) return;
            
            if (recentMetrics.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align: center; padding: 40px;">
                            <p>Nenhuma métrica cadastrada ainda</p>
                        </td>
                    </tr>
                `;
                return;
            }
            
            let html = '';
            recentMetrics.forEach(metrica => {
                const dataRef = new Date(metrica.data_referencia);
                const dataFormatada = dataRef.toLocaleDateString('pt-BR');
                const userName = metrica.users ? metrica.users.nome : 'Usuário não encontrado';
                
                html += `
                    <tr>
                        <td>${userName}</td>
                        <td>${dataFormatada}</td>
                        <td>${metrica.taxa_resolucao ? metrica.taxa_resolucao + '%' : 'N/A'}</td>
                        <td>${metrica.tempo_medio_atendimento ? metrica.tempo_medio_atendimento + ' min' : 'N/A'}</td>
                        <td>${metrica.chats_atendidos || 'N/A'}</td>
                    </tr>
                `;
            });
            
            tbody.innerHTML = html;
            
        } catch (error) {
            console.error('Erro ao carregar métricas recentes:', error);
        }
    }

    updateDashboardCards() {
        // Atualizar card de Total de Usuários
        const totalUsuarios = this.users.length;
        const totalUsuariosEl = document.getElementById('totalUsuarios');
        const statusUsuariosEl = document.getElementById('statusUsuarios');
        
        if (totalUsuariosEl) totalUsuariosEl.textContent = totalUsuarios;
        if (statusUsuariosEl) {
            statusUsuariosEl.innerHTML = `
                <i class="fas fa-arrow-up" style="color: #2ecc71;"></i> 
                ${totalUsuarios} usuários cadastrados
            `;
        }
        
        // Atualizar card de Total de Métricas
        const totalMetricas = this.metricas.length;
        const totalMetricasEl = document.getElementById('totalMetricas');
        const statusMetricasEl = document.getElementById('statusMetricas');
        
        if (totalMetricasEl) totalMetricasEl.textContent = totalMetricas;
        if (statusMetricasEl) {
            statusMetricasEl.innerHTML = `
                <i class="fas fa-chart-line" style="color: #2ecc71;"></i> 
                ${totalMetricas} métricas registradas
            `;
        }
        
        // Calcular e atualizar Taxa Média de Resolução
        let mediaResolucao = 0;
        if (this.metricas.length > 0) {
            const metricasComTaxa = this.metricas.filter(m => m.taxa_resolucao);
            if (metricasComTaxa.length > 0) {
                const soma = metricasComTaxa.reduce((acc, m) => acc + m.taxa_resolucao, 0);
                mediaResolucao = soma / metricasComTaxa.length;
            }
        }
        
        const mediaResolucaoEl = document.getElementById('mediaResolucao');
        const statusResolucaoEl = document.getElementById('statusResolucao');
        
        if (mediaResolucaoEl) mediaResolucaoEl.textContent = mediaResolucao.toFixed(1) + '%';
        if (statusResolucaoEl) {
            const diff = mediaResolucao > 85 ? 'positivo' : 'negativo';
            const arrow = mediaResolucao > 85 ? 'fa-arrow-up' : 'fa-arrow-down';
            const color = mediaResolucao > 85 ? '#2ecc71' : '#e74c3c';
            
            statusResolucaoEl.innerHTML = `
                <i class="fas ${arrow}" style="color: ${color};"></i> 
                ${diff === 'positivo' ? 'Acima' : 'Abaixo'} da meta (85%)
            `;
        }
        
        // Calcular e atualizar Tempo Médio de Atendimento
        let mediaTempo = 0;
        if (this.metricas.length > 0) {
            const metricasComTempo = this.metricas.filter(m => m.tempo_medio_atendimento);
            if (metricasComTempo.length > 0) {
                const soma = metricasComTempo.reduce((acc, m) => acc + m.tempo_medio_atendimento, 0);
                mediaTempo = soma / metricasComTempo.length;
            }
        }
        
        const mediaTempoEl = document.getElementById('mediaTempoAtendimento');
        const statusTempoEl = document.getElementById('statusTempo');
        
        if (mediaTempoEl) mediaTempoEl.textContent = mediaTempo.toFixed(1) + ' min';
        if (statusTempoEl) {
            const diff = mediaTempo < 15 ? 'positivo' : 'negativo';
            const arrow = mediaTempo < 15 ? 'fa-arrow-down' : 'fa-arrow-up';
            const color = mediaTempo < 15 ? '#2ecc71' : '#e74c3c';
            
            statusTempoEl.innerHTML = `
                <i class="fas ${arrow}" style="color: ${color};"></i> 
                ${diff === 'positivo' ? 'Abaixo' : 'Acima'} da meta (15 min)
            `;
        }
    }

    updateCardStatus(message, type) {
        const statusElements = [
            document.getElementById('statusUsuarios'),
            document.getElementById('statusMetricas'),
            document.getElementById('statusResolucao'),
            document.getElementById('statusTempo')
        ];
        
        statusElements.forEach(el => {
            if (el) {
                if (type === 'loading') {
                    el.innerHTML = `<i class="fas fa-sync-alt loader"></i> ${message}`;
                } else if (type === 'error') {
                    el.innerHTML = `<i class="fas fa-exclamation-triangle" style="color: #e74c3c;"></i> ${message}`;
                }
            }
        });
    }

    initCharts() {
        // Destruir gráficos existentes
        if (this.charts.metricas) {
            this.charts.metricas.destroy();
        }
        if (this.charts.distribuicao) {
            this.charts.distribuicao.destroy();
        }
        
        // Gráfico 1: Desempenho de Métricas (últimos 30 dias)
        this.createMetricasChart();
        
        // Gráfico 2: Distribuição de Chat por Usuário
        this.createDistribuicaoChart();
    }

    createMetricasChart() {
        const ctx = document.getElementById('chartMetricas');
        if (!ctx) return;
        
        // Preparar dados dos últimos 30 dias
        const last30Days = [];
        const hoje = new Date();
        
        for (let i = 29; i >= 0; i--) {
            const date = new Date(hoje);
            date.setDate(hoje.getDate() - i);
            last30Days.push(date.toISOString().split('T')[0]);
        }
        
        // Agrupar métricas por data
        const metricasPorData = {};
        last30Days.forEach(date => {
            metricasPorData[date] = this.metricas.filter(m => m.data_referencia === date);
        });
        
        // Calcular médias diárias
        const taxasMedias = last30Days.map(date => {
            const metricasDoDia = metricasPorData[date];
            if (metricasDoDia.length === 0) return null;
            
            const metricasComTaxa = metricasDoDia.filter(m => m.taxa_resolucao);
            if (metricasComTaxa.length === 0) return null;
            
            const soma = metricasComTaxa.reduce((acc, m) => acc + m.taxa_resolucao, 0);
            return soma / metricasComTaxa.length;
        });
        
        // Formatar datas para exibição
        const labels = last30Days.map(date => {
            const d = new Date(date);
            return `${d.getDate()}/${d.getMonth() + 1}`;
        });
        
        this.charts.metricas = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Taxa de Resolução (%)',
                    data: taxasMedias,
                    borderColor: '#1591EA',
                    backgroundColor: 'rgba(21, 145, 234, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    }

    createDistribuicaoChart() {
        const ctx = document.getElementById('chartDistribuicao');
        if (!ctx) return;
        
        // Agrupar chats atendidos por usuário
        const chatsPorUsuario = {};
        const usuariosMap = {};
        
        // Mapear usuários por ID para fácil acesso
        this.users.forEach(user => {
            usuariosMap[user.id] = user.nome;
        });
        
        // Contar chats por usuário
        this.metricas.forEach(metrica => {
            if (metrica.chats_atendidos && metrica.users_id) {
                const userName = usuariosMap[metrica.users_id] || `Usuário ${metrica.users_id}`;
                if (!chatsPorUsuario[userName]) {
                    chatsPorUsuario[userName] = 0;
                }
                chatsPorUsuario[userName] += metrica.chats_atendidos;
            }
        });
        
        // Preparar dados para o gráfico
        const labels = Object.keys(chatsPorUsuario);
        const data = Object.values(chatsPorUsuario);
        
        // Cores para o gráfico
        const backgroundColors = [
            '#1591EA', '#2ecc71', '#e67e22', '#9b59b6', 
            '#1abc9c', '#f1c40f', '#e74c3c', '#3498db'
        ];
        
        this.charts.distribuicao = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }
            }
        });
    }
}

// MemberManager integrado
class MemberManager {
    constructor() {
        this.members = [];
        this.currentFilter = 'all';
        this.currentEditId = null;
        
        // Inicializar Supabase
        this.SUPABASE_URL = 'https://aoctwedwlrdibnqyeevj.supabase.co';
        this.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvY3R3ZWR3bHJkaWJucXllZXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjIwOTUsImV4cCI6MjA4MzIzODA5NX0.bZz3Wnqk8Ag7BZ4Ue9_wwNutWToD0YUeGrLupJ6YFBc';
        this.supabaseClient = supabase.createClient(this.SUPABASE_URL, this.SUPABASE_ANON_KEY);
        
        this.init();
    }

    init() {
        this.loadFromLocalStorage();
        this.renderStats();
        this.renderMembers();
        this.setupEventListeners();
        this.loadDataFromSupabase();
    }

    setupEventListeners() {
        const memberForm = document.getElementById('memberForm');
        const clearBtn = document.getElementById('clearBtn');
        const searchInput = document.getElementById('searchInput');
        const exportBtn = document.getElementById('exportBtn');
        
        if (memberForm) {
            memberForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.saveMember();
            });
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearForm();
            });
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.renderMembers(e.target.value);
            });
        }
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportToCSV();
            });
        }

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderMembers();
            });
        });
    }

    async saveMember() {
        const member = {
            id: this.currentEditId || Date.now(),
            name: document.getElementById('name').value.trim(),
            birthDate: document.getElementById('birthDate').value,
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            position: document.getElementById('position').value,
            status: document.getElementById('status').value,
            registrationDate: new Date().toISOString().split('T')[0]
        };

        // VALIDAÇÃO
        if (!member.name) {
            this.showMessage('O campo Nome é obrigatório!', 'error');
            document.getElementById('name').focus();
            return;
        }
        
        if (!member.email) {
            this.showMessage('O campo Email é obrigatório!', 'error');
            document.getElementById('email').focus();
            return;
        }
        
        if (!member.phone) {
            this.showMessage('O campo Telefone é obrigatório!', 'error');
            document.getElementById('phone').focus();
            return;
        }
        
        if (!member.position) {
            this.showMessage('Selecione um Cargo!', 'error');
            document.getElementById('position').focus();
            return;
        }
        
        if (!member.status) {
            this.showMessage('Selecione um Status!', 'error');
            document.getElementById('status').focus();
            return;
        }

        try {
            // Preparar dados para o Supabase
            const supabaseData = {
                nome: member.name,
                telefone: member.phone,
                email: member.email,
                cargo: member.position,
                status: member.status,
                data_cadastro: new Date().toISOString()
            };

            let supabaseError = null;
            let result = null;
            
            if (this.currentEditId) {
                const existingMember = this.members.find(m => m.id === this.currentEditId);
                if (existingMember?.supabaseId) {
                    const { data, error } = await this.supabaseClient
                        .from('users')
                        .update(supabaseData)
                        .eq('id', existingMember.supabaseId)
                        .select();
                    
                    supabaseError = error;
                    result = data;
                } else {
                    // Se não tem supabaseId, criar novo registro
                    const { data, error } = await this.supabaseClient
                        .from('users')
                        .insert([supabaseData])
                        .select();
                    
                    supabaseError = error;
                    result = data;
                }
            } else {
                const { data, error } = await this.supabaseClient
                    .from('users')
                    .insert([supabaseData])
                    .select();
                
                supabaseError = error;
                result = data;
            }

            if (supabaseError) {
                // Se o erro for sobre coluna não existente, sugerir criar a coluna
                if (supabaseError.message.includes('status') && supabaseError.message.includes('column')) {
                    console.error('ERRO: A coluna "status" não existe na tabela users. Crie-a no Supabase.');
                    this.showMessage('Erro: A coluna "status" não existe no banco. Crie a coluna "status" na tabela users.', 'error');
                } else {
                    console.error('Erro ao salvar no Supabase:', supabaseError);
                    this.showMessage('Erro ao salvar: ' + supabaseError.message, 'error');
                }
                return;
            }

            // Atualizar o member com o supabaseId se disponível
            if (result && result[0]) {
                member.supabaseId = result[0].id;
                
                // Se for um novo registro, usar o ID do Supabase como ID principal
                if (!this.currentEditId) {
                    member.id = result[0].id;
                }
            }

            // Salvar localmente
            if (this.currentEditId) {
                const index = this.members.findIndex(m => m.id === this.currentEditId);
                this.members[index] = member;
                this.showMessage('Usuário atualizado com sucesso!', 'success');
            } else {
                this.members.push(member);
                this.showMessage('Usuário cadastrado com sucesso!', 'success');
            }

            this.saveToLocalStorage();
            this.renderStats();
            this.renderMembers();
            this.clearForm();
            this.currentEditId = null;
            
            await this.loadDataFromSupabase();

        } catch (error) {
            console.error('Erro:', error);
            this.showMessage('Erro ao salvar usuário!', 'error');
        }
    }

    editMember(id) {
        const member = this.members.find(m => m.id === id);
        if (member) {
            document.getElementById('name').value = member.name;
            document.getElementById('birthDate').value = member.birthDate;
            document.getElementById('phone').value = member.phone;
            document.getElementById('email').value = member.email;
            document.getElementById('position').value = member.position;
            document.getElementById('status').value = member.status;
            
            this.currentEditId = id;
            
            document.querySelector('#memberForm button[type="submit"]').textContent = 'Atualizar Usuário';
            document.getElementById('name').focus();
            
            this.showMessage('Editando usuário', 'success');
        }
    }

    async deleteMember(id) {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                const member = this.members.find(m => m.id === id);
                
                if (member?.supabaseId) {
                    const { error } = await this.supabaseClient
                        .from('users')
                        .delete()
                        .eq('id', member.supabaseId);

                    if (error) {
                        this.showMessage('Erro ao excluir: ' + error.message, 'error');
                        return;
                    }
                }

                this.members = this.members.filter(m => m.id !== id);
                this.saveToLocalStorage();
                this.renderStats();
                this.renderMembers();
                this.showMessage('Usuário excluído com sucesso!', 'success');
                
            } catch (error) {
                console.error('Erro:', error);
                this.showMessage('Erro ao excluir usuário!', 'error');
            }
        }
    }

    renderMembers(search = '') {
        const container = document.getElementById('membersList');
        if (!container) return;
        
        let filtered = this.members;

        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(m => m.status === this.currentFilter);
        }

        if (search) {
            const term = search.toLowerCase();
            filtered = filtered.filter(m => 
                m.name.toLowerCase().includes(term) ||
                m.email.toLowerCase().includes(term) ||
                m.position.toLowerCase().includes(term) ||
                m.phone.includes(term)
            );
        }

        if (filtered.length === 0) {
            container.innerHTML = '<div class="empty-state"><h3>Nenhum usuário encontrado</h3><p>' + (search ? 'Tente ajustar sua busca' : 'Adicione usuários usando o formulário ao lado') + '</p></div>';
            return;
        }

        container.innerHTML = filtered.map(member => {
            const statusText = member.status === 'active' ? 'Ativo' : 
                             member.status === 'inactive' ? 'Inativo' : 'Pendente';
            const statusClass = member.status === 'active' ? 'active' : 
                              member.status === 'inactive' ? 'inactive' : 'pending';
            
            return `
                <div class="member-card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <h4>${member.name}</h4>
                            <span class="status-badge ${statusClass}">
                                ${statusText}
                            </span>
                        </div>
                        <small style="color: #636e72;">ID: ${member.id}</small>
                    </div>
                    
                    <div class="member-info">
                        <div>
                            <span>Email:</span>
                            <span>${member.email}</span>
                        </div>
                        <div>
                            <span>Telefone:</span>
                            <span>${member.phone}</span>
                        </div>
                        <div>
                            <span>Cargo:</span>
                            <span>${this.getPositionLabel(member.position)}</span>
                        </div>
                        <div>
                            <span>Data Nasc.:</span>
                            <span>${member.birthDate || 'Não informada'}</span>
                        </div>
                    </div>
                    
                    <div class="member-actions">
                        <button onclick="memberManager.editMember('${member.id}')" class="btn btn-secondary" style="padding: 8px 16px; font-size: 14px;">
                            Editar
                        </button>
                        <button onclick="memberManager.deleteMember('${member.id}')" class="btn btn-danger">
                            Excluir
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderStats() {
        const total = this.members.length;
        const active = this.members.filter(m => m.status === 'active').length;
        
        const totalEl = document.getElementById('totalMembers');
        const activeEl = document.getElementById('activeMembers');
        
        if (totalEl) totalEl.textContent = total;
        if (activeEl) activeEl.textContent = active;
    }

    getPositionLabel(position) {
        const positions = {
            'gestor': 'Gestor',
            'coordenador': 'Coordenador',
            'analista N2': 'Analista N2',
            'analista N1': 'Analista N1',
            'estagiario': 'Estagiário'
        };
        return positions[position] || position;
    }

    clearForm() {
        const memberForm = document.getElementById('memberForm');
        if (memberForm) {
            memberForm.reset();
            document.querySelector('#memberForm button[type="submit"]').textContent = 'Salvar Usuário';
            this.currentEditId = null;
            this.showMessage('Formulário limpo!', 'success');
        }
    }

    showMessage(text, type) {
        const messageDiv = document.getElementById('message');
        if (!messageDiv) return;
        
        messageDiv.textContent = text;
        messageDiv.className = 'message ' + type;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    saveToLocalStorage() {
        localStorage.setItem('members', JSON.stringify(this.members));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('members');
        if (stored) {
            this.members = JSON.parse(stored);
        }
    }

    async loadDataFromSupabase() {
        try {
            const { data, error } = await this.supabaseClient
                .from('users')
                .select('*')
                .order('data_cadastro', { ascending: false });

            if (error) {
                console.error('Erro ao carregar dados:', error);
                this.showMessage('Erro ao carregar dados do banco!', 'error');
                return;
            }

            if (data && data.length > 0) {
                // Primeiro, mapear dados do Supabase
                const supabaseMembers = data.map(item => {
                    // Verificar se status existe, senão usar 'active' como padrão
                    const status = item.status || 'active';
                    
                    return {
                        supabaseId: item.id,
                        id: item.id, // Usar o ID do Supabase como ID principal
                        name: item.nome || '',
                        phone: item.telefone || '',
                        email: item.email || '',
                        position: item.cargo || '',
                        birthDate: '', // Não temos data_nascimento no banco
                        status: status,
                        registrationDate: item.data_cadastro ? 
                        new Date(item.data_cadastro).toISOString().split('T')[0] : 
                        new Date().toISOString().split('T')[0]
                    };
                });

                // Criar um mapa dos membros do Supabase por ID
                const supabaseMap = new Map();
                supabaseMembers.forEach(member => {
                    supabaseMap.set(member.id, member);
                });

                // Manter membros locais que não estão no Supabase (por precaução)
                const localMembersNotInSupabase = this.members.filter(m => !m.supabaseId && !supabaseMap.has(m.id));
                
                // Para membros que já temos localmente, mesclar dados mantendo birthDate
                const mergedMembers = this.members
                    .filter(m => m.supabaseId || supabaseMap.has(m.id))
                    .map(localMember => {
                        const supabaseId = localMember.supabaseId || localMember.id;
                        const supabaseMember = supabaseMap.get(supabaseId);
                        
                        if (supabaseMember) {
                            supabaseMap.delete(supabaseId); // Remover do mapa para não adicionar duplicado
                            return {
                                ...supabaseMember,
                                birthDate: localMember.birthDate // Manter a data de nascimento local
                            };
                        }
                        return localMember;
                    });

                // Adicionar membros restantes do Supabase (que não tinham correspondência local)
                const remainingSupabaseMembers = Array.from(supabaseMap.values());
                this.members = [...mergedMembers, ...remainingSupabaseMembers, ...localMembersNotInSupabase];
                
                this.saveToLocalStorage();
                this.renderStats();
                this.renderMembers();
                this.showMessage('Dados sincronizados com o banco!', 'success');
            }
        } catch (error) {
            console.error('Erro ao carregar do Supabase:', error);
        }
    }

    exportToCSV() {
        if (this.members.length === 0) {
            this.showMessage('Não há usuários para exportar!', 'error');
            return;
        }

        const headers = ['Nome', 'Email', 'Telefone', 'Cargo', 'Status', 'Data Nasc.', 'Data Cad.'];
        const csvContent = [
            headers.join(','),
            ...this.members.map(m => [
                '"' + m.name + '"',
                '"' + m.email + '"',
                '"' + m.phone + '"',
                '"' + this.getPositionLabel(m.position) + '"',
                '"' + (m.status === 'active' ? 'Ativo' : m.status === 'inactive' ? 'Inativo' : 'Pendente') + '"',
                '"' + (m.birthDate || '') + '"',
                '"' + (m.registrationDate || '') + '"'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'usuarios_' + new Date().toISOString().split('T')[0] + '.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showMessage('Lista exportada com sucesso!', 'success');
    }
}

// MetricasManager - para gerenciar o cadastro de métricas
class MetricasManager {
    constructor() {
        this.metricas = [];
        this.users = [];
        this.currentFilter = 'all';
        this.currentEditId = null;
        
        // Inicializar Supabase
        this.SUPABASE_URL = 'https://aoctwedwlrdibnqyeevj.supabase.co';
        this.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvY3R3ZWR3bHJkaWJucXllZXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjIwOTUsImV4cCI6MjA4MzIzODA5NX0.bZz3Wnqk8Ag7BZ4Ue9_wwNutWToD0YUeGrLupJ6YFBc';
        this.supabaseClient = supabase.createClient(this.SUPABASE_URL, this.SUPABASE_ANON_KEY);
        
        this.init();
    }

    init() {
        this.loadFromLocalStorage();
        this.renderStats();
        this.renderMetricas();
        this.setupEventListeners();
        this.loadUsersFromSupabase();
        this.loadDataFromSupabase();
    }

    setupEventListeners() {
        const metricasForm = document.getElementById('metricasForm');
        const clearBtnMetricas = document.getElementById('clearBtnMetricas');
        const searchInputMetricas = document.getElementById('searchInputMetricas');
        const exportBtnMetricas = document.getElementById('exportBtnMetricas');
        
        if (metricasForm) {
            metricasForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.saveMetrica();
            });
        }
        
        if (clearBtnMetricas) {
            clearBtnMetricas.addEventListener('click', () => {
                this.clearForm();
            });
        }
        
        if (searchInputMetricas) {
            searchInputMetricas.addEventListener('input', (e) => {
                this.renderMetricas(e.target.value);
            });
        }
        
        if (exportBtnMetricas) {
            exportBtnMetricas.addEventListener('click', () => {
                this.exportToCSV();
            });
        }

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderMetricas();
            });
        });
    }

    async loadUsersFromSupabase() {
        try {
            const { data, error } = await this.supabaseClient
                .from('users')
                .select('id, nome')
                .order('nome', { ascending: true });

            if (error) {
                console.error('Erro ao carregar usuários:', error);
                return;
            }

            this.users = data || [];
            this.populateUsersSelect();
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    populateUsersSelect() {
        const select = document.getElementById('users_id');
        if (!select) return;
        
        // Limpar opções existentes (exceto a primeira)
        while (select.options.length > 1) {
            select.remove(1);
        }
        
        // Adicionar usuários
        this.users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.nome;
            select.appendChild(option);
        });
    }

    async saveMetrica() {
        const metrica = {
            id: this.currentEditId || Date.now(),
            users_id: document.getElementById('users_id').value,
            taxa_resolucao: document.getElementById('taxa_resolucao').value,
            tempo_medio_atendimento: document.getElementById('tempo_medio_atendimento').value,
            percentual_atendimentos_avaliados: document.getElementById('percentual_atendimentos_avaliados').value,
            chats_atendidos: document.getElementById('chats_atendidos').value,
            resolvidos_primeiro_atendimento: document.getElementById('resolvidos_primeiro_atendimento').value,
            data_referencia: document.getElementById('data_referencia').value,
            data_criacao: new Date().toISOString()
        };

        // VALIDAÇÃO
        if (!metrica.users_id) {
            this.showMessage('Selecione um usuário!', 'error');
            document.getElementById('users_id').focus();
            return;
        }
        
        if (!metrica.data_referencia) {
            this.showMessage('Selecione uma data de referência!', 'error');
            document.getElementById('data_referencia').focus();
            return;
        }

        // Converter valores numéricos
        const numericFields = [
            'taxa_resolucao',
            'tempo_medio_atendimento', 
            'percentual_atendimentos_avaliados',
            'chats_atendidos',
            'resolvidos_primeiro_atendimento'
        ];
        
        numericFields.forEach(field => {
            if (metrica[field]) {
                metrica[field] = parseFloat(metrica[field]);
            }
        });

        try {
            // Preparar dados para o Supabase
            const supabaseData = {
                users_id: metrica.users_id,
                taxa_resolucao: metrica.taxa_resolucao || null,
                tempo_medio_atendimento: metrica.tempo_medio_atendimento || null,
                percentual_atendimentos_avaliados: metrica.percentual_atendimentos_avaliados || null,
                chats_atendidos: metrica.chats_atendidos || null,
                resolvidos_primeiro_atendimento: metrica.resolvidos_primeiro_atendimento || null,
                data_referencia: metrica.data_referencia,
                data_criacao: new Date().toISOString()
            };

            let supabaseError = null;
            let result = null;
            
            if (this.currentEditId) {
                const existingMetrica = this.metricas.find(m => m.id === this.currentEditId);
                if (existingMetrica?.supabaseId) {
                    const { data, error } = await this.supabaseClient
                        .from('metricas')
                        .update(supabaseData)
                        .eq('id', existingMetrica.supabaseId)
                        .select();
                    
                    supabaseError = error;
                    result = data;
                } else {
                    // Se não tem supabaseId, criar novo registro
                    const { data, error } = await this.supabaseClient
                        .from('metricas')
                        .insert([supabaseData])
                        .select();
                    
                    supabaseError = error;
                    result = data;
                }
            } else {
                const { data, error } = await this.supabaseClient
                    .from('metricas')
                    .insert([supabaseData])
                    .select();
                
                supabaseError = error;
                result = data;
            }

            if (supabaseError) {
                console.error('Erro ao salvar no Supabase:', supabaseError);
                this.showMessage('Erro ao salvar: ' + supabaseError.message, 'error');
                return;
            }

            // Atualizar a métrica com o supabaseId se disponível
            if (result && result[0]) {
                metrica.supabaseId = result[0].id;
                
                // Se for um novo registro, usar o ID do Supabase como ID principal
                if (!this.currentEditId) {
                    metrica.id = result[0].id;
                }
            }

            // Salvar localmente
            if (this.currentEditId) {
                const index = this.metricas.findIndex(m => m.id === this.currentEditId);
                this.metricas[index] = metrica;
                this.showMessage('Métrica atualizada com sucesso!', 'success');
            } else {
                this.metricas.push(metrica);
                this.showMessage('Métrica cadastrada com sucesso!', 'success');
            }

            this.saveToLocalStorage();
            this.renderStats();
            this.renderMetricas();
            this.clearForm();
            this.currentEditId = null;
            
            await this.loadDataFromSupabase();

        } catch (error) {
            console.error('Erro:', error);
            this.showMessage('Erro ao salvar métrica!', 'error');
        }
    }

    editMetrica(id) {
        const metrica = this.metricas.find(m => m.id === id);
        if (metrica) {
            document.getElementById('users_id').value = metrica.users_id;
            document.getElementById('data_referencia').value = metrica.data_referencia;
            document.getElementById('taxa_resolucao').value = metrica.taxa_resolucao || '';
            document.getElementById('tempo_medio_atendimento').value = metrica.tempo_medio_atendimento || '';
            document.getElementById('percentual_atendimentos_avaliados').value = metrica.percentual_atendimentos_avaliados || '';
            document.getElementById('chats_atendidos').value = metrica.chats_atendidos || '';
            document.getElementById('resolvidos_primeiro_atendimento').value = metrica.resolvidos_primeiro_atendimento || '';
            
            this.currentEditId = id;
            
            document.querySelector('#metricasForm button[type="submit"]').textContent = 'Atualizar Métrica';
            document.getElementById('users_id').focus();
            
            this.showMessage('Editando métrica', 'success');
        }
    }

    async deleteMetrica(id) {
        if (confirm('Tem certeza que deseja excluir esta métrica?')) {
            try {
                const metrica = this.metricas.find(m => m.id === id);
                
                if (metrica?.supabaseId) {
                    const { error } = await this.supabaseClient
                        .from('metricas')
                        .delete()
                        .eq('id', metrica.supabaseId);

                    if (error) {
                        this.showMessage('Erro ao excluir: ' + error.message, 'error');
                        return;
                    }
                }

                this.metricas = this.metricas.filter(m => m.id !== id);
                this.saveToLocalStorage();
                this.renderStats();
                this.renderMetricas();
                this.showMessage('Métrica excluída com sucesso!', 'success');
                
            } catch (error) {
                console.error('Erro:', error);
                this.showMessage('Erro ao excluir métrica!', 'error');
            }
        }
    }

    renderMetricas(search = '') {
        const container = document.getElementById('metricasList');
        if (!container) return;
        
        let filtered = this.metricas;

        // Aplicar filtros
        if (this.currentFilter === 'recentes') {
            filtered = filtered.filter(m => {
                const dataRef = new Date(m.data_referencia);
                const now = new Date();
                const diffTime = Math.abs(now - dataRef);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 30; // Últimos 30 dias
            });
        } else if (this.currentFilter === 'antigas') {
            filtered = filtered.filter(m => {
                const dataRef = new Date(m.data_referencia);
                const now = new Date();
                const diffTime = Math.abs(now - dataRef);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays > 30; // Mais de 30 dias
            });
        }

        if (search) {
            const term = search.toLowerCase();
            filtered = filtered.filter(m => {
                // Buscar pelo nome do usuário
                const user = this.users.find(u => u.id == m.users_id);
                const userName = user ? user.nome.toLowerCase() : '';
                
                return userName.includes(term) ||
                       m.data_referencia.includes(term);
            });
        }

        if (filtered.length === 0) {
            container.innerHTML = '<div class="empty-state"><h3>Nenhuma métrica encontrada</h3><p>' + (search ? 'Tente ajustar sua busca' : 'Adicione métricas usando o formulário ao lado') + '</p></div>';
            return;
        }

        // Ordenar por data de referência (mais recente primeiro)
        filtered.sort((a, b) => new Date(b.data_referencia) - new Date(a.data_referencia));

        container.innerHTML = filtered.map(metrica => {
            // Encontrar o nome do usuário
            const user = this.users.find(u => u.id == metrica.users_id);
            const userName = user ? user.nome : 'Usuário não encontrado';
            
            // Formatar data
            const dataRef = new Date(metrica.data_referencia);
            const dataFormatada = dataRef.toLocaleDateString('pt-BR');
            
            return `
                <div class="metric-card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <h4>${userName}</h4>
                            <small style="color: #636e72;">Data: ${dataFormatada}</small>
                        </div>
                        <small style="color: #636e72;">ID: ${metrica.id}</small>
                    </div>
                    
                    <div class="metric-info">
                        <div>
                            <span>Taxa Resolução:</span>
                            <span>${metrica.taxa_resolucao ? metrica.taxa_resolucao + '%' : 'N/A'}</span>
                        </div>
                        <div>
                            <span>Tempo Médio:</span>
                            <span>${metrica.tempo_medio_atendimento ? metrica.tempo_medio_atendimento + ' min' : 'N/A'}</span>
                        </div>
                        <div>
                            <span>% Avaliados:</span>
                            <span>${metrica.percentual_atendimentos_avaliados ? metrica.percentual_atendimentos_avaliados + '%' : 'N/A'}</span>
                        </div>
                        <div>
                            <span>Chats Atendidos:</span>
                            <span>${metrica.chats_atendidos || 'N/A'}</span>
                        </div>
                        <div>
                            <span>Resolvidos 1º:</span>
                            <span>${metrica.resolvidos_primeiro_atendimento || 'N/A'}</span>
                        </div>
                    </div>
                    
                    <div class="metric-actions">
                        <button onclick="metricasManager.editMetrica('${metrica.id}')" class="btn btn-secondary" style="padding: 8px 16px; font-size: 14px;">
                            Editar
                        </button>
                        <button onclick="metricasManager.deleteMetrica('${metrica.id}')" class="btn btn-danger">
                            Excluir
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderStats() {
        const total = this.metricas.length;
        
        // Calcular média da taxa de resolução
        let mediaResolucao = 0;
        if (this.metricas.length > 0) {
            const metricasComTaxa = this.metricas.filter(m => m.taxa_resolucao);
            if (metricasComTaxa.length > 0) {
                const soma = metricasComTaxa.reduce((acc, m) => acc + m.taxa_resolucao, 0);
                mediaResolucao = soma / metricasComTaxa.length;
            }
        }
        
        const totalEl = document.getElementById('totalMetricasCadastro');
        const mediaEl = document.getElementById('mediaResolucaoCadastro');
        
        if (totalEl) totalEl.textContent = total;
        if (mediaEl) mediaEl.textContent = mediaResolucao.toFixed(1) + '%';
    }

    clearForm() {
        const metricasForm = document.getElementById('metricasForm');
        if (metricasForm) {
            metricasForm.reset();
            document.querySelector('#metricasForm button[type="submit"]').textContent = 'Salvar Métrica';
            this.currentEditId = null;
            
            // Definir data padrão como hoje
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('data_referencia').value = today;
            
            this.showMessage('Formulário limpo!', 'success');
        }
    }

    showMessage(text, type) {
        const messageDiv = document.getElementById('messageMetricas');
        if (!messageDiv) return;
        
        messageDiv.textContent = text;
        messageDiv.className = 'message ' + type;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    saveToLocalStorage() {
        localStorage.setItem('metricas', JSON.stringify(this.metricas));
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    loadFromLocalStorage() {
        const storedMetricas = localStorage.getItem('metricas');
        const storedUsers = localStorage.getItem('users');
        
        if (storedMetricas) {
            this.metricas = JSON.parse(storedMetricas);
        }
        
        if (storedUsers) {
            this.users = JSON.parse(storedUsers);
        }
    }

    async loadDataFromSupabase() {
        try {
            const { data, error } = await this.supabaseClient
                .from('metricas')
                .select('*, users(nome)')
                .order('data_referencia', { ascending: false });

            if (error) {
                console.error('Erro ao carregar métricas:', error);
                this.showMessage('Erro ao carregar métricas do banco!', 'error');
                return;
            }

            if (data && data.length > 0) {
                // Mapear dados do Supabase
                const supabaseMetricas = data.map(item => {
                    return {
                        supabaseId: item.id,
                        id: item.id, // Usar o ID do Supabase como ID principal
                        users_id: item.users_id,
                        taxa_resolucao: item.taxa_resolucao,
                        tempo_medio_atendimento: item.tempo_medio_atendimento,
                        percentual_atendimentos_avaliados: item.percentual_atendimentos_avaliados,
                        chats_atendidos: item.chats_atendidos,
                        resolvidos_primeiro_atendimento: item.resolvidos_primeiro_atendimento,
                        data_referencia: item.data_referencia,
                        data_criacao: item.data_criacao
                    };
                });

                // Criar um mapa das métricas do Supabase por ID
                const supabaseMap = new Map();
                supabaseMetricas.forEach(metrica => {
                    supabaseMap.set(metrica.id, metrica);
                });

                // Manter métricas locais que não estão no Supabase (por precaução)
                const localMetricasNotInSupabase = this.metricas.filter(m => !m.supabaseId && !supabaseMap.has(m.id));
                
                // Para métricas que já temos localmente, mesclar dados
                const mergedMetricas = this.metricas
                    .filter(m => m.supabaseId || supabaseMap.has(m.id))
                    .map(localMetrica => {
                        const supabaseId = localMetrica.supabaseId || localMetrica.id;
                        const supabaseMetrica = supabaseMap.get(supabaseId);
                        
                        if (supabaseMetrica) {
                            supabaseMap.delete(supabaseId); // Remover do mapa para não adicionar duplicado
                            return {
                                ...supabaseMetrica,
                                // Manter quaisquer campos locais extras
                            };
                        }
                        return localMetrica;
                    });

                // Adicionar métricas restantes do Supabase (que não tinham correspondência local)
                const remainingSupabaseMetricas = Array.from(supabaseMap.values());
                this.metricas = [...mergedMetricas, ...remainingSupabaseMetricas, ...localMetricasNotInSupabase];
                
                this.saveToLocalStorage();
                this.renderStats();
                this.renderMetricas();
                this.showMessage('Métricas sincronizadas com o banco!', 'success');
            }
        } catch (error) {
            console.error('Erro ao carregar do Supabase:', error);
        }
    }

    exportToCSV() {
        if (this.metricas.length === 0) {
            this.showMessage('Não há métricas para exportar!', 'error');
            return;
        }

        const headers = ['Usuário', 'Data Referência', 'Taxa Resolução', 'Tempo Médio', '% Avaliados', 'Chats Atendidos', 'Resolvidos 1º'];
        const csvContent = [
            headers.join(','),
            ...this.metricas.map(m => {
                // Encontrar o nome do usuário
                const user = this.users.find(u => u.id == m.users_id);
                const userName = user ? user.nome : 'Usuário não encontrado';
                
                return [
                    '"' + userName + '"',
                    '"' + m.data_referencia + '"',
                    '"' + (m.taxa_resolucao || '') + '"',
                    '"' + (m.tempo_medio_atendimento || '') + '"',
                    '"' + (m.percentual_atendimentos_avaliados || '') + '"',
                    '"' + (m.chats_atendidos || '') + '"',
                    '"' + (m.resolvidos_primeiro_atendimento || '') + '"'
                ].join(',');
            })
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'metricas_' + new Date().toISOString().split('T')[0] + '.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showMessage('Métricas exportadas com sucesso!', 'success');
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar qual módulo está ativo e inicializar o manager correspondente
    const activeModule = document.querySelector('.nav-item.active').dataset.module;
    
    if (activeModule === 'dashboard') {
        window.dashboardManager = new DashboardManager();
    } else if (activeModule === 'cadastro-metricas') {
        window.metricasManager = new MetricasManager();
    } else if (activeModule === 'cadastro-usuario') {
        window.memberManager = new MemberManager();
    }
    
    // Definir data padrão para o formulário de métricas se existir
    const dataReferenciaInput = document.getElementById('data_referencia');
    if (dataReferenciaInput) {
        const today = new Date().toISOString().split('T')[0];
        dataReferenciaInput.value = today;
    }
});