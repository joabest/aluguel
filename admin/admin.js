(() => {
  const STORAGE_KEY = 'auto_rental_admin_v1';
  const cfg = window.AUTO_RENTAL_CONFIG || {};
  const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const dateFmt = new Intl.DateTimeFormat('pt-BR');

  const seed = () => ({
    vehicles: [
      { id: id(), name: 'Toyota Corolla XEi', category: 'Sedan', plate: 'BRA2E19', dailyRate: 189.9, status: 'available' },
      { id: id(), name: 'Jeep Compass Longitude', category: 'SUV', plate: 'GHT8B24', dailyRate: 259.9, status: 'rented' },
      { id: id(), name: 'Chevrolet Onix LT', category: 'Hatch', plate: 'FQR4A11', dailyRate: 129.9, status: 'available' },
      { id: id(), name: 'Volkswagen T-Cross', category: 'SUV', plate: 'RNT7D63', dailyRate: 229.9, status: 'maintenance' },
      { id: id(), name: 'Fiat Pulse Drive', category: 'SUV', plate: 'EZA1J72', dailyRate: 199.9, status: 'available' }
    ],
    users: [
      { id: id(), name: 'Mariana Souza', email: 'mariana@email.com', phone: '(11) 98888-1201', status: 'active' },
      { id: id(), name: 'Carlos Henrique', email: 'carlos@email.com', phone: '(11) 97777-4502', status: 'active' },
      { id: id(), name: 'Ana Paula', email: 'ana@email.com', phone: '(11) 96666-8833', status: 'active' },
      { id: id(), name: 'Rafael Lima', email: 'rafael@email.com', phone: '(11) 95555-2208', status: 'inactive' }
    ],
    reservations: [],
    payments: []
  });

  function id() {
    return (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);
  }

  function isoDate(days = 0) {
    const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10);
  }

  function withDemoRelations(state) {
    if (!state.reservations.length && state.users.length && state.vehicles.length) {
      const r1 = { id: id(), userId: state.users[0].id, vehicleId: state.vehicles[1].id, startDate: isoDate(-1), endDate: isoDate(3), dailyRate: 259.9, total: 1039.6, status: 'active', notes: '' };
      const r2 = { id: id(), userId: state.users[1].id, vehicleId: state.vehicles[0].id, startDate: isoDate(2), endDate: isoDate(5), dailyRate: 189.9, total: 569.7, status: 'confirmed', notes: '' };
      const r3 = { id: id(), userId: state.users[2].id, vehicleId: state.vehicles[2].id, startDate: isoDate(6), endDate: isoDate(8), dailyRate: 129.9, total: 259.8, status: 'pending', notes: '' };
      state.reservations.push(r1, r2, r3);
      state.payments.push(
        { id: id(), reservationId: r1.id, amount: 1039.6, method: 'pix', status: 'paid', date: isoDate(-1), reference: 'PIX-001' },
        { id: id(), reservationId: r2.id, amount: 569.7, method: 'card', status: 'pending', date: isoDate(), reference: 'CARD-002' }
      );
    }
    return state;
  }

  let state = load();
  let currentView = 'dashboard';
  let modalMode = null;
  let editingId = null;

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { console.warn(e); }
    const fresh = withDemoRelations(seed());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderAll();
  }

  function userById(v) { return state.users.find(x => x.id === v); }
  function vehicleById(v) { return state.vehicles.find(x => x.id === v); }
  function reservationById(v) { return state.reservations.find(x => x.id === v); }
  function daysBetween(a, b) {
    const start = new Date(`${a}T12:00:00`), end = new Date(`${b}T12:00:00`);
    return Math.max(1, Math.ceil((end - start) / 86400000));
  }
  function safe(s = '') { return String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

  const labels = {
    pending: 'Pendente', confirmed: 'Confirmada', active: 'Em andamento', completed: 'Concluída', cancelled: 'Cancelada',
    paid: 'Pago', refunded: 'Estornado', failed: 'Falhou', available: 'Disponível', rented: 'Alugado', maintenance: 'Manutenção',
    activeUser: 'Ativo', inactiveUser: 'Inativo', pix: 'PIX', card: 'Cartão', cash: 'Dinheiro', transfer: 'Transferência'
  };

  function status(text, cls) { return `<span class="status ${cls}">${text}</span>`; }
  function reservationStatus(s) { return status(labels[s] || s, s); }
  function paymentStatus(s) { return status(labels[s] || s, s); }
  function vehicleStatus(s) { return status(labels[s] || s, s); }
  function userStatus(s) { return status(s === 'active' ? 'Ativo' : 'Inativo', s === 'active' ? 'active-user' : 'inactive-user'); }

  function showToast(msg) {
    const el = $('#toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(showToast.t); showToast.t = setTimeout(() => el.classList.remove('show'), 2200);
  }

  function switchView(view) {
    currentView = view;
    $$('.view').forEach(v => v.classList.toggle('active', v.id === `view-${view}`));
    $$('.nav-link').forEach(b => b.classList.toggle('active', b.dataset.view === view));
    const meta = {
      dashboard: ['Dashboard', 'Visão geral da locadora'], reservations: ['Reservas', 'Gestão de locações'], vehicles: ['Veículos', 'Frota e disponibilidade'],
      users: ['Usuários', 'Clientes cadastrados'], payments: ['Pagamentos', 'Recebimentos da locadora'], settings: ['Configurações', 'Dados e integração']
    }[view];
    $('#pageTitle').textContent = meta[0]; $('#pageSubtitle').textContent = meta[1];
    $('#sidebar').classList.remove('open');
  }

  function renderDashboard() {
    const active = state.reservations.filter(r => ['active','confirmed'].includes(r.status)).length;
    const confirmed = state.reservations.filter(r => r.status === 'confirmed').length;
    const available = state.vehicles.filter(v => v.status === 'available').length;
    const revenue = state.payments.filter(p => p.status === 'paid').reduce((a,p) => a + Number(p.amount || 0), 0);
    const users = state.users.filter(u => u.status === 'active').length;
    $('#statActiveReservations').textContent = active;
    $('#statReservationsHint').textContent = `${confirmed} confirmada${confirmed === 1 ? '' : 's'}`;
    $('#statAvailableCars').textContent = available;
    $('#statCarsHint').textContent = `${state.vehicles.length} cadastrados`;
    $('#statRevenue').textContent = money.format(revenue);
    $('#statUsers').textContent = users;
    $('#statUsersHint').textContent = `${state.users.length} usuários no total`;

    const upcoming = [...state.reservations].filter(r => r.status !== 'cancelled').sort((a,b) => a.startDate.localeCompare(b.startDate)).slice(0,5);
    $('#dashboardReservations').innerHTML = upcoming.length ? upcoming.map(r => {
      const u = userById(r.userId), v = vehicleById(r.vehicleId);
      return `<tr><td>${safe(u?.name || 'Usuário removido')}</td><td>${safe(v?.name || 'Veículo removido')}</td><td>${fmtDate(r.startDate)}</td><td>${reservationStatus(r.status)}</td></tr>`;
    }).join('') : `<tr><td class="empty" colspan="4">Nenhuma reserva cadastrada.</td></tr>`;

    const counts = ['available','rented','maintenance'].map(s => [s, state.vehicles.filter(v => v.status === s).length]);
    $('#fleetSummary').innerHTML = counts.map(([s,n]) => `<div class="fleet-item"><span>${labels[s]}</span><strong>${n}</strong></div>`).join('');
  }

  function renderReservations() {
    const q = ($('#reservationSearch')?.value || '').trim().toLowerCase();
    const f = $('#reservationStatusFilter')?.value || 'all';
    const rows = state.reservations.filter(r => {
      const u = userById(r.userId), v = vehicleById(r.vehicleId);
      return (f === 'all' || r.status === f) && (!q || `${u?.name||''} ${v?.name||''}`.toLowerCase().includes(q));
    }).sort((a,b) => b.startDate.localeCompare(a.startDate));
    $('#reservationsTable').innerHTML = rows.length ? rows.map((r,i) => {
      const u = userById(r.userId), v = vehicleById(r.vehicleId);
      return `<tr><td>#${String(i+1).padStart(3,'0')}</td><td class="user-cell"><strong>${safe(u?.name || 'Removido')}</strong><small>${safe(u?.phone || '')}</small></td><td class="vehicle-cell"><strong>${safe(v?.name || 'Removido')}</strong><small>${safe(v?.plate || '')}</small></td><td class="nowrap">${fmtDate(r.startDate)} → ${fmtDate(r.endDate)}</td><td class="money">${money.format(r.total || 0)}</td><td>${reservationStatus(r.status)}</td><td><div class="row-actions"><button class="small-btn" data-action="edit-reservation" data-id="${r.id}">Editar</button><button class="small-btn danger" data-action="delete-reservation" data-id="${r.id}">Excluir</button></div></td></tr>`;
    }).join('') : `<tr><td class="empty" colspan="7">Nenhuma reserva encontrada.</td></tr>`;
  }

  function renderVehicles() {
    const q = ($('#vehicleSearch')?.value || '').trim().toLowerCase();
    const rows = state.vehicles.filter(v => !q || `${v.name} ${v.plate} ${v.category}`.toLowerCase().includes(q));
    $('#vehiclesTable').innerHTML = rows.length ? rows.map(v => `<tr><td class="vehicle-cell"><strong>${safe(v.name)}</strong><small>ID ${v.id.slice(0,8)}</small></td><td>${safe(v.category)}</td><td>${safe(v.plate)}</td><td class="money">${money.format(v.dailyRate || 0)}</td><td>${vehicleStatus(v.status)}</td><td><div class="row-actions"><button class="small-btn" data-action="edit-vehicle" data-id="${v.id}">Editar</button><button class="small-btn danger" data-action="delete-vehicle" data-id="${v.id}">Excluir</button></div></td></tr>`).join('') : `<tr><td class="empty" colspan="6">Nenhum veículo encontrado.</td></tr>`;
  }

  function renderUsers() {
    const q = ($('#userSearch')?.value || '').trim().toLowerCase();
    const rows = state.users.filter(u => !q || `${u.name} ${u.email} ${u.phone}`.toLowerCase().includes(q));
    $('#usersTable').innerHTML = rows.length ? rows.map(u => {
      const count = state.reservations.filter(r => r.userId === u.id).length;
      return `<tr><td class="user-cell"><strong>${safe(u.name)}</strong><small>ID ${u.id.slice(0,8)}</small></td><td>${safe(u.email)}</td><td>${safe(u.phone)}</td><td>${userStatus(u.status)}</td><td>${count}</td><td><div class="row-actions"><button class="small-btn" data-action="edit-user" data-id="${u.id}">Editar</button><button class="small-btn danger" data-action="delete-user" data-id="${u.id}">Excluir</button></div></td></tr>`;
    }).join('') : `<tr><td class="empty" colspan="6">Nenhum usuário encontrado.</td></tr>`;
  }

  function renderPayments() {
    const f = $('#paymentStatusFilter')?.value || 'all';
    const rows = state.payments.filter(p => f === 'all' || p.status === f).sort((a,b) => b.date.localeCompare(a.date));
    $('#paymentsTable').innerHTML = rows.length ? rows.map(p => {
      const r = reservationById(p.reservationId), u = r ? userById(r.userId) : null;
      return `<tr><td>${r ? `#${r.id.slice(0,8)}` : 'Sem reserva'}</td><td>${safe(u?.name || '—')}</td><td class="money">${money.format(p.amount || 0)}</td><td>${labels[p.method] || safe(p.method)}</td><td>${paymentStatus(p.status)}</td><td>${fmtDate(p.date)}</td><td><div class="row-actions"><button class="small-btn" data-action="edit-payment" data-id="${p.id}">Editar</button><button class="small-btn danger" data-action="delete-payment" data-id="${p.id}">Excluir</button></div></td></tr>`;
    }).join('') : `<tr><td class="empty" colspan="7">Nenhum pagamento encontrado.</td></tr>`;
  }

  function renderSettings() {
    const remote = Boolean(cfg.supabaseUrl && cfg.supabaseAnonKey);
    $('#storageMode').textContent = remote ? 'Supabase configurado' : 'Armazenamento local';
    $('#backendStatusTitle').textContent = remote ? 'Supabase configurado' : 'Modo local ativo';
    $('#backendStatusText').textContent = remote ? 'Credenciais presentes. O adaptador remoto será ativado na próxima etapa de integração.' : 'Sem credenciais, os dados ficam neste navegador.';
  }

  function renderAll() { renderDashboard(); renderReservations(); renderVehicles(); renderUsers(); renderPayments(); renderSettings(); }
  function fmtDate(s) { if (!s) return '—'; const [y,m,d]=s.split('-').map(Number); return dateFmt.format(new Date(y,m-1,d)); }

  function openModal(type, record = null) {
    modalMode = type; editingId = record?.id || null;
    const title = editingId ? 'Editar' : 'Novo';
    const titles = { reservation: 'reserva', vehicle: 'veículo', user: 'usuário', payment: 'pagamento' };
    $('#modalTitle').textContent = `${title} ${titles[type]}`;
    $('#modalSubtitle').textContent = type === 'reservation' ? 'Defina cliente, carro, período e status.' : '';
    $('#modalFields').innerHTML = fieldsFor(type, record);
    $('#modal').classList.add('open'); $('#modal').setAttribute('aria-hidden','false');
    if (type === 'reservation') bindReservationCalc();
  }

  function closeModal() { $('#modal').classList.remove('open'); $('#modal').setAttribute('aria-hidden','true'); modalMode = null; editingId = null; }
  function opt(value, label, selected) { return `<option value="${safe(value)}" ${String(selected)===String(value)?'selected':''}>${safe(label)}</option>`; }
  function field(name,label,value='',type='text',extra='') { return `<div class="field"><label>${label}</label><input name="${name}" type="${type}" value="${safe(value)}" ${extra}></div>`; }
  function selectField(name,label,options,current='') { return `<div class="field"><label>${label}</label><select name="${name}">${options.map(([v,l])=>opt(v,l,current)).join('')}</select></div>`; }

  function fieldsFor(type, r={}) {
    if (type === 'vehicle') return [
      field('name','Veículo',r.name||'','','required'), field('category','Categoria',r.category||'','','required'), field('plate','Placa',r.plate||'','','required'),
      field('dailyRate','Valor da diária',r.dailyRate||'', 'number','min="0" step="0.01" required'), selectField('status','Status',[['available','Disponível'],['rented','Alugado'],['maintenance','Manutenção']],r.status||'available')
    ].join('');
    if (type === 'user') return [
      field('name','Nome completo',r.name||'','','required'), field('email','E-mail',r.email||'','email','required'), field('phone','Telefone',r.phone||'','','required'),
      selectField('status','Status',[['active','Ativo'],['inactive','Inativo']],r.status||'active')
    ].join('');
    if (type === 'payment') return [
      selectField('reservationId','Reserva',state.reservations.map(x=>[x.id,`${userById(x.userId)?.name||'Cliente'} • ${vehicleById(x.vehicleId)?.name||'Veículo'}`]),r.reservationId||state.reservations[0]?.id||''),
      field('amount','Valor',r.amount||'', 'number','min="0" step="0.01" required'), selectField('method','Método',[['pix','PIX'],['card','Cartão'],['cash','Dinheiro'],['transfer','Transferência']],r.method||'pix'),
      selectField('status','Status',[['pending','Pendente'],['paid','Pago'],['refunded','Estornado'],['failed','Falhou']],r.status||'pending'), field('date','Data',r.date||isoDate(), 'date','required'), field('reference','Referência',r.reference||'')
    ].join('');
    const uOpts = state.users.map(x=>[x.id,x.name]); const vOpts = state.vehicles.map(x=>[x.id,`${x.name} • ${x.plate}`]);
    return [
      selectField('userId','Cliente',uOpts,r.userId||state.users[0]?.id||''), selectField('vehicleId','Veículo',vOpts,r.vehicleId||state.vehicles[0]?.id||''),
      field('startDate','Retirada',r.startDate||isoDate(), 'date','required'), field('endDate','Devolução',r.endDate||isoDate(1), 'date','required'),
      field('dailyRate','Diária',r.dailyRate||vehicleById(r.vehicleId)?.dailyRate||state.vehicles[0]?.dailyRate||0, 'number','min="0" step="0.01" required'), field('total','Total',r.total||0, 'number','min="0" step="0.01" required'),
      selectField('status','Status',[['pending','Pendente'],['confirmed','Confirmada'],['active','Em andamento'],['completed','Concluída'],['cancelled','Cancelada']],r.status||'pending'),
      `<div class="field full"><label>Observações</label><textarea name="notes">${safe(r.notes||'')}</textarea></div>`
    ].join('');
  }

  function bindReservationCalc() {
    const form = $('#modalForm');
    const recalc = () => {
      const fd = new FormData(form), v = vehicleById(fd.get('vehicleId'));
      const daily = Number(fd.get('dailyRate') || v?.dailyRate || 0);
      const days = daysBetween(fd.get('startDate'), fd.get('endDate'));
      const total = Math.max(0, daily * days);
      form.elements.dailyRate.value = daily.toFixed(2);
      form.elements.total.value = total.toFixed(2);
    };
    form.elements.vehicleId?.addEventListener('change', e => { const v = vehicleById(e.target.value); if (v) form.elements.dailyRate.value = v.dailyRate; recalc(); });
    ['startDate','endDate','dailyRate'].forEach(n => form.elements[n]?.addEventListener('input', recalc));
    if (!editingId) recalc();
  }

  function submitModal(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (modalMode === 'vehicle') {
      const item = { id: editingId || id(), name: data.name.trim(), category: data.category.trim(), plate: data.plate.trim().toUpperCase(), dailyRate: Number(data.dailyRate), status: data.status };
      upsert('vehicles', item);
    } else if (modalMode === 'user') {
      const item = { id: editingId || id(), name: data.name.trim(), email: data.email.trim(), phone: data.phone.trim(), status: data.status };
      upsert('users', item);
    } else if (modalMode === 'payment') {
      const item = { id: editingId || id(), reservationId: data.reservationId, amount: Number(data.amount), method: data.method, status: data.status, date: data.date, reference: data.reference.trim() };
      upsert('payments', item);
    } else if (modalMode === 'reservation') {
      if (new Date(data.endDate) < new Date(data.startDate)) return showToast('A devolução não pode ser antes da retirada.');
      const conflict = state.reservations.some(r => r.id !== editingId && r.vehicleId === data.vehicleId && r.status !== 'cancelled' && !(data.endDate < r.startDate || data.startDate > r.endDate));
      if (conflict) return showToast('Esse veículo já possui reserva nesse período.');
      const item = { id: editingId || id(), userId: data.userId, vehicleId: data.vehicleId, startDate: data.startDate, endDate: data.endDate, dailyRate: Number(data.dailyRate), total: Number(data.total), status: data.status, notes: data.notes.trim() };
      upsert('reservations', item);
      syncVehicleStatus(item);
    }
    save(); closeModal(); showToast('Dados salvos com sucesso.');
  }

  function upsert(key,item) { const i = state[key].findIndex(x=>x.id===item.id); i>=0 ? state[key][i]=item : state[key].push(item); }
  function syncVehicleStatus(r) {
    const v = vehicleById(r.vehicleId); if (!v) return;
    if (r.status === 'active') v.status = 'rented';
    else if (v.status === 'rented' && !state.reservations.some(x => x.id !== r.id && x.vehicleId === v.id && x.status === 'active')) v.status = 'available';
  }

  function del(kind, identifier) {
    const map = { reservation:'reservations', vehicle:'vehicles', user:'users', payment:'payments' };
    const key = map[kind];
    if (!confirm('Tem certeza que deseja excluir este registro?')) return;
    if (kind === 'vehicle' && state.reservations.some(r=>r.vehicleId===identifier)) return showToast('Não é possível excluir um veículo com reservas vinculadas.');
    if (kind === 'user' && state.reservations.some(r=>r.userId===identifier)) return showToast('Não é possível excluir um usuário com reservas vinculadas.');
    if (kind === 'reservation') state.payments = state.payments.filter(p=>p.reservationId!==identifier);
    state[key] = state[key].filter(x=>x.id!==identifier); save(); showToast('Registro excluído.');
  }

  function edit(kind, identifier) {
    const key = { reservation:'reservations', vehicle:'vehicles', user:'users', payment:'payments' }[kind];
    openModal(kind, state[key].find(x=>x.id===identifier));
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state,null,2)], {type:'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `auto-rental-backup-${isoDate()}.json`; a.click(); URL.revokeObjectURL(a.href);
  }

  async function importData(file) {
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed || !Array.isArray(parsed.vehicles) || !Array.isArray(parsed.users) || !Array.isArray(parsed.reservations) || !Array.isArray(parsed.payments)) throw new Error();
      state = parsed; save(); showToast('Backup importado com sucesso.');
    } catch { showToast('Arquivo de backup inválido.'); }
  }

  document.addEventListener('click', e => {
    const nav = e.target.closest('[data-view]'); if (nav) switchView(nav.dataset.view);
    const target = e.target.closest('[data-view-target]'); if (target) switchView(target.dataset.viewTarget);
    if (e.target.closest('[data-close-modal]')) closeModal();
    const a = e.target.closest('[data-action]');
    if (a) { const [verb,kind] = a.dataset.action.split('-'); verb === 'edit' ? edit(kind,a.dataset.id) : del(kind,a.dataset.id); }
  });

  $('#menuBtn').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
  $('#quickReservation').addEventListener('click', () => openModal('reservation'));
  $('#newReservationBtn').addEventListener('click', () => openModal('reservation'));
  $('#newVehicleBtn').addEventListener('click', () => openModal('vehicle'));
  $('#newUserBtn').addEventListener('click', () => openModal('user'));
  $('#newPaymentBtn').addEventListener('click', () => openModal('payment'));
  $('#modalForm').addEventListener('submit', submitModal);
  $('#reservationSearch').addEventListener('input', renderReservations);
  $('#reservationStatusFilter').addEventListener('change', renderReservations);
  $('#vehicleSearch').addEventListener('input', renderVehicles);
  $('#userSearch').addEventListener('input', renderUsers);
  $('#paymentStatusFilter').addEventListener('change', renderPayments);
  $('#exportDataBtn').addEventListener('click', exportData);
  $('#importDataInput').addEventListener('change', e => e.target.files[0] && importData(e.target.files[0]));
  $('#resetDataBtn').addEventListener('click', () => { if (confirm('Restaurar dados de exemplo? Seus dados atuais serão substituídos.')) { state = withDemoRelations(seed()); save(); showToast('Dados restaurados.'); } });

  renderAll(); switchView(currentView);
})();
