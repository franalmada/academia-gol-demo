// Selector de perfiles para demostración; no sustituye la autenticación.
let demoRole = 'admin';
const paths = {
 home:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
 users:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5"/>',
 shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-14 4h3m4 0h3"/>',
 bell:'<path d="M5 17h14l-2-4V9a5 5 0 0 0-10 0v4Zm5 3h4"/>',
 chart:'<path d="M4 4v16h17M8 15l4-5 4 2 5-7"/>',
 arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2"/>'
};
const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.shield}</svg>`;
const nav = [['home','Inicio'],['users','Alumnos'],['users','Padres y tutores'],['shield','Profesionales'],['shield','Categorías']];
document.querySelector('#app').innerHTML = `
<div class="mobile-shade" id="shade"></div>
<aside class="sidebar" id="sidebar"><a class="brand" href="#inicio"><img src="/favicon.svg" alt=""><span>ACADEMIA <b>GOL</b><small>ESCUELA DE FÚTBOL</small></span></a><div class="workspace"><span class="workspace-dot"></span>Administración<span class="tiny-label">DEMO</span></div><p class="nav-label">PRINCIPAL</p><nav aria-label="Menú principal">${nav.map(([i,n],idx)=>`<button class="nav-item ${idx===0?'active':''}" ${idx===0?'aria-current="page"':''} data-nav="${n}">${icon(i)}<span>${n}</span>${idx===0?'<span class="nav-dot"></span>':''}</button>`).join('')}</nav><div class="sidebar-bottom"><div class="review-card">${icon('shield')}<strong>El próximo gran paso<br>empieza acá.</strong><p>Formamos jugadores.<br>Acompañamos personas.</p></div><div class="account"><span class="avatar">AG</span><span><strong>Administrador</strong><small>Academia Gol</small></span><span class="online" aria-label="Perfil de demostración"></span></div></div></aside>
<div class="main-shell"><header class="topbar"><div class="breadcrumb"><button class="icon-button mobile-menu" id="menu" aria-label="Abrir menú" aria-expanded="false">${icon('menu')}</button><span>Mi academia</span><span class="slash">/</span><strong>Resumen general</strong></div><div class="top-actions"><span class="demo-pill"><span></span>Prototipo visual</span><span class="avatar small">AG</span></div></header>
<main id="inicio"><div class="page-heading"><div><div class="eyebrow">PANEL DEL ADMINISTRADOR</div><h1>Todo listo para una gran semana.</h1><p>Tu academia, tus equipos y cada pequeño avance, en un solo lugar.</p></div><button class="primary-button" data-action="student">${icon('plus')}Nuevo alumno</button></div>
<section class="stats" aria-label="Indicadores de ejemplo">${[
 ['users','128','Alumnos activos','+8 este mes','green'],['shield','6','Categorías','De Sub-6 a Sub-16',''],['check','92%','Asistencia semanal','+4 puntos vs. semana anterior','green'],['chart','34','Informes del mes','Seguimiento de los profesionales','']
].map(([i,v,l,d,c])=>`<article class="stat-card"><div class="stat-top"><span>${l}</span><span class="stat-icon">${icon(i)}</span></div><strong>${v}</strong><small class="${c}">${d}</small></article>`).join('')}</section>
<footer class="page-footer"><span>ACADEMIA GOL <span class="footer-sep">/</span> Creciendo juntos, dentro y fuera de la cancha.</span><span>Datos ficticios · Inicio, alumnos y responsables</span></footer></main></div>
<dialog id="dialog" aria-labelledby="dialog-title"><div class="dialog-heading"><span class="eyebrow">ACADEMIA GOL · DEMOSTRACIÓN</span><button class="icon-button" id="close-dialog" aria-label="Cerrar">✕</button></div><div id="dialog-content"></div><div class="dialog-footer">Demostración · Los cambios se pierden al recargar. No se envían datos.</div></dialog>`;

const dialog=document.querySelector('#dialog');
function openDialog(title,body){document.querySelector('#dialog-content').innerHTML=`<h2 id="dialog-title">${title}</h2>${body}`;if (!dialog.open) dialog.showModal()}
document.querySelector('#close-dialog').onclick=()=>dialog.close();
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
const moduleDescriptions={
'Alumnos':['Listado de alumnos con búsqueda y filtros.','Ficha con datos básicos, categoría y responsables.','Alta, edición y baja de alumnos.'],
'Padres y tutores':['Directorio de responsables y datos de contacto.','Vinculación de cada tutor con sus hijos.'],
'Profesionales':['Listado de entrenadores, psicólogos y fisioterapeutas.','Asignación de alumnos y áreas de trabajo.'],
'Categorías':['Organización de alumnos por edad y equipo.','Profesionales asignados a cada categoría.'],
};
function closeMenu(){document.body.classList.remove('menu-open');document.querySelector('#menu').setAttribute('aria-expanded','false')}
document.querySelector('#menu').onclick=()=>{const open=document.body.classList.toggle('menu-open');document.querySelector('#menu').setAttribute('aria-expanded',String(open))};
document.querySelector('#shade').onclick=closeMenu;
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

// Alumnos de demostración. Solo se modifican en la memoria de esta pestaña.
const categories = ['Sub-6', 'Sub-8', 'Sub-10', 'Sub-12', 'Sub-14', 'Sub-16'];
let students = [
  {id:1, name:'Mateo Benítez', birth:'2017-05-14', category:'Sub-10', guardian:'Carolina Benítez', relation:'Madre', status:'Activo'},
  {id:2, name:'Lucía González', birth:'2019-03-08', category:'Sub-8', guardian:'Diego González', relation:'Padre', status:'Activo'},
  {id:3, name:'Thiago López', birth:'2013-08-21', category:'Sub-14', guardian:'Ana López', relation:'Madre', status:'Activo'},
  {id:4, name:'Sofía Martínez', birth:'2015-01-11', category:'Sub-12', guardian:'Elena Martínez', relation:'Tutora', status:'Activo'},
  {id:5, name:'Lucas Fernández', birth:'2011-09-04', category:'Sub-16', guardian:'Carlos Fernández', relation:'Padre', status:'Inactivo'},
  {id:6, name:'Valentina Rojas', birth:'2021-02-17', category:'Sub-6', guardian:'María Rojas', relation:'Madre', status:'Activo'},
  {id:7, name:'Gabriel Duarte', birth:'2017-06-25', category:'Sub-10', guardian:'Andrés Duarte', relation:'Tutor', status:'Activo'},
  {id:8, name:'Emma Acosta', birth:'2015-11-09', category:'Sub-12', guardian:'Laura Acosta', relation:'Madre', status:'Activo'}
];
let nextStudentId = 9;
let currentPage = 'Inicio';
let filters = {query:'', category:''};
let editingId = null;
const main = document.querySelector('main');
const homeMarkup = main.innerHTML;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const initials = name => name.trim().split(/\s+/).slice(0,2).map(word=>word[0]).join('');
const activeCount = () => students.filter(student=>student.status==='Activo').length;

// Mensajes breves accesibles después de agregar o editar.
const toast = document.createElement('div');
toast.className = 'toast';
toast.setAttribute('role', 'status');
toast.setAttribute('aria-live', 'polite');
document.body.append(toast);
let toastTimer;
function announce(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(()=>toast.classList.remove('visible'), 5000);
}
function updateHomeCount() {
  const card = main.querySelector('.stat-card');
  if (!card) return;
  card.querySelector('strong').textContent = activeCount();
  card.querySelector('small').textContent = 'En el listado de demostración';
  const categoryCard=main.querySelectorAll('.stat-card')[1];
  categoryCard.querySelector('strong').textContent=categories.length;
  categoryCard.querySelector('small').textContent='Categorías de la academia';
}
updateHomeCount();

function navigate(page, focus = true) {
  if (demoRole !== 'admin') return;
  currentPage = page;
  closeMenu();
  document.querySelectorAll('.nav-item').forEach(button=>{
    const active = button.dataset.nav === page;
    button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
    button.querySelector('.nav-dot')?.remove();
    if (active) button.insertAdjacentHTML('beforeend','<span class="nav-dot"></span>');
  });
  document.querySelector('.breadcrumb strong').textContent = page === 'Inicio' ? 'Resumen general' : page;
  document.title = `Academia Gol · ${page}`;
  if (page === 'Inicio') {
    main.innerHTML = homeMarkup;
    updateHomeCount();
  } else if (page === 'Alumnos') renderStudentsPage();
  else if (page === 'Padres y tutores') renderGuardiansPage();
  else if (page === 'Profesionales') renderProfessionalsPage();
  else if (page === 'Categorías') renderCategoriesPage();
  window.scrollTo({top:0, behavior:'instant'});
  if (focus) {
    const title = main.querySelector('h1');
    title.setAttribute('tabindex','-1');
    title.focus({preventScroll:true});
  }
}

function renderStudentsPage() {
  main.innerHTML = `
    <div class="page-heading">
      <div><div class="eyebrow">ADMINISTRACIÓN / ALUMNOS</div><h1>Cada jugador, un nuevo camino.</h1><p>Consultá los alumnos y su información en un solo lugar.</p></div>
      <button class="primary-button" data-action="student">${icon('plus')}Nuevo alumno</button>
    </div>
    <div class="student-demo-note">${icon('shield')}<span><strong>Listado de demostración.</strong> Usá datos ficticios. Los cambios se mantienen hasta recargar esta página.</span></div>
    <section class="student-stats" aria-label="Resumen del listado">
      <article><span>Total de alumnos</span><strong id="student-total"></strong></article>
      <article><span>Activos</span><strong id="student-active"></strong></article>
      <article><span>Inactivos</span><strong id="student-inactive"></strong></article>
    </section>
    <section class="panel student-panel" aria-label="Listado de alumnos">
      <div class="section-heading"><div><h2>Alumnos de la academia</h2><p>Buscá por nombre o responsable y filtrá por categoría.</p></div></div>
      <div class="student-toolbar">
        <label class="search-field">Buscar alumno o responsable<input type="search" id="student-search" placeholder="Ej.: Mateo o Carolina" value="${escapeHTML(filters.query)}" autocomplete="off"></label>
        <label>Categoría<select id="student-category"><option value="">Todas las categorías</option>${categories.map(c=>`<option ${filters.category===c?'selected':''}>${escapeHTML(c)}</option>`).join('')}</select></label>
        <button class="secondary-button" data-action="clear-filters">Limpiar filtros</button>
      </div>
      <p class="result-count" id="student-results" role="status" aria-live="polite"></p>
      <div id="student-list"></div>
    </section>
    <footer class="page-footer"><span>ACADEMIA GOL · Administración</span><span>Datos ficticios · Inicio, alumnos y responsables</span></footer>`;
  renderStudentRows();
}
function renderStudentRows() {
  const query = normalize(filters.query);
  const filtered = students.filter(s=>(!filters.category || s.category===filters.category) && normalize(`${s.name} ${s.guardian}`).includes(query));
  document.querySelector('#student-total').textContent = students.length;
  document.querySelector('#student-active').textContent = activeCount();
  document.querySelector('#student-inactive').textContent = students.length-activeCount();
  document.querySelector('#student-results').textContent = `${filtered.length} de ${students.length} alumnos`;
  document.querySelector('#student-list').innerHTML = filtered.length ? `
    <table class="student-table"><caption class="sr-only">Alumnos, categorías, responsables y acciones</caption>
      <thead><tr><th scope="col">Alumno</th><th scope="col">Categoría</th><th scope="col">Responsable</th><th scope="col">Estado</th><th scope="col">Acciones</th></tr></thead>
      <tbody>${filtered.map(s=>`<tr>
        <td data-label="Alumno"><div class="student-identity"><span class="avatar" aria-hidden="true">${escapeHTML(initials(s.name))}</span><span><strong>${escapeHTML(s.name)}</strong><small>AG-${String(s.id).padStart(3,'0')}</small></span></div></td>
        <td data-label="Categoría"><span class="category-chip">${escapeHTML(s.category)}</span></td>
        <td data-label="Responsable"><span>${escapeHTML(s.guardian)}</span><small>${escapeHTML(s.relation)}</small></td>
        <td data-label="Estado"><span class="student-status ${s.status==='Activo'?'is-active':'is-inactive'}">${s.status}</span></td>
        <td data-label="Acciones"><div class="row-actions"><button data-view-student="${s.id}" aria-label="Ver ficha de ${escapeHTML(s.name)}">Ver ficha</button><button data-edit-student="${s.id}" aria-label="Editar a ${escapeHTML(s.name)}">Editar</button></div></td>
      </tr>`).join('')}</tbody></table>` : `<div class="empty-state">${icon('users')}<h3>No encontramos alumnos</h3><p>Probá con otro nombre o quitá el filtro de categoría.</p><button class="secondary-button" data-action="clear-filters">Limpiar filtros</button></div>`;
}
function openStudentProfile(id) {
  const s = students.find(student=>student.id===id);
  if (!s) return;
  const birth = s.birth ? s.birth.split('-').reverse().join('/') : 'Sin indicar';
  openDialog(escapeHTML(s.name), `
    <p class="dialog-intro">Ficha del alumno · AG-${String(s.id).padStart(3,'0')}</p>
    <dl class="student-details">
      <div><dt>Categoría</dt><dd>${escapeHTML(s.category)}</dd></div><div><dt>Estado</dt><dd>${s.status}</dd></div>
      <div><dt>Fecha de nacimiento</dt><dd>${birth}</dd></div><div><dt>Responsable</dt><dd>${escapeHTML(s.guardian)}</dd></div>
      <div><dt>Vínculo</dt><dd>${escapeHTML(s.relation)}</dd></div>${s.guardianId?`<div><dt>Contacto</dt><dd><button class="text-button" data-view-guardian="${s.guardianId}">Ver responsable ${icon('arrow')}</button></dd></div>`:''}
    </dl>
    ${studentProfessionalsMarkup(s.id)}<p class="sample-note">La asistencia, los informes y la evolución se incorporarán en etapas posteriores.</p>
    <div class="form-actions"><button class="secondary-button" data-action="cancel-dialog">Cerrar</button><button class="primary-button" data-edit-student="${s.id}">Editar alumno</button></div>`);
}
function openStudentForm(id = null) {
  editingId = id;
  const s = students.find(student=>student.id===id) || {name:'',birth:'',category:'',guardian:'',relation:'Madre',status:'Activo'};
  const today = new Date();
  const maxDate = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  openDialog(id ? 'Editar alumno' : 'Nuevo alumno', `
    <p class="dialog-intro">Completá la ficha con datos ficticios. Los campos con * son obligatorios.</p>
    <form id="student-form" class="student-form">
      <label class="full-field">Nombre completo *<input name="name" value="${escapeHTML(s.name)}" required maxlength="80" autocomplete="off"></label>
      <label>Fecha de nacimiento<input type="date" name="birth" value="${s.birth}" max="${maxDate}"></label>
      <label>Categoría *<select name="category" required><option value="">Seleccioná una categoría</option>${categories.map(c=>`<option ${c===s.category?'selected':''}>${escapeHTML(c)}</option>`).join('')}</select></label>
      <label class="full-field">Responsable *<select name="guardianId" required><option value="">Seleccioná un responsable</option>${guardians.map(g=>`<option value="${g.id}" ${g.id===s.guardianId?'selected':''}>${escapeHTML(g.name)} · RT-${String(g.id).padStart(3,'0')}</option>`).join('')}</select></label><p class="sample-note full-field">Para crear un responsable, usá Padres y tutores. Podés vincularlo con varios alumnos.</p>
      <label>Vínculo<select name="relation">${['Madre','Padre','Tutora','Tutor','Otro responsable'].map(r=>`<option ${r===s.relation?'selected':''}>${r}</option>`).join('')}</select></label>
      <label>Estado<select name="status">${['Activo','Inactivo'].map(st=>`<option ${st===s.status?'selected':''}>${st}</option>`).join('')}</select></label>
      <p class="form-error full-field" id="form-error" role="alert"></p>
      <div class="form-actions full-field"><button type="button" class="secondary-button" data-action="cancel-dialog">Cancelar</button><button type="submit" class="primary-button">${id?'Aplicar cambios de prueba':'Agregar a la demo'}</button></div>
    </form>`);
  document.querySelector('[name="name"]').focus();
}

// El diálogo también sirve para pasar de la ficha a la edición.

document.addEventListener('input', e=>{
  if(e.target.id==='student-search') { filters.query=e.target.value; renderStudentRows(); }
});
document.addEventListener('change', e=>{
  if(e.target.id==='student-category') { filters.category=e.target.value; renderStudentRows(); }
});
document.addEventListener('submit', e=>{
  if(e.target.id!=='student-form') return;
  e.preventDefault();
  const form=e.target;
  if(!form.reportValidity()) return;
  const data=Object.fromEntries(new FormData(form));
  data.name=data.name.trim();
  data.guardianId=Number(data.guardianId);
  const selectedGuardian=guardians.find(g=>g.id===data.guardianId);
  if(!data.name || !selectedGuardian) {
    document.querySelector('#form-error').textContent='Escribí un nombre válido y seleccioná un responsable.';
    form.elements[!data.name?'name':'guardianId'].focus();
    return;
  }
  data.guardian=selectedGuardian.name;
  if(!categories.includes(data.category) || !['Activo','Inactivo'].includes(data.status)) return;
  const wasEditing=editingId!==null;
  if(wasEditing) students=students.map(s=>s.id===editingId?{...s,...data}:s);
  else students.push({id:nextStudentId++,...data});
  dialog.close();
  filters={query:'',category:''};
  navigate('Alumnos');
  announce(wasEditing?'Alumno actualizado en la demo. Se restablecerá al recargar.':'Alumno agregado a la demo. Se perderá al recargar.');
});
document.addEventListener('click', e=>{
  const navButton=e.target.closest('[data-nav]');
  if(navButton) {
    const name=navButton.dataset.nav;
    if(name==='Inicio'||name==='Alumnos'||name==='Padres y tutores'||name==='Profesionales'||name==='Categorías') navigate(name);
    else {closeMenu();openDialog(name,`<p class="dialog-intro">Esta sección se diseñará en la siguiente etapa. Contenido previsto para revisar con el cliente:</p><ul class="feature-list">${moduleDescriptions[name].map(t=>`<li>${t}</li>`).join('')}</ul>`);}
    return;
  }
  if(e.target.closest('.brand')) {e.preventDefault();navigate('Inicio');return;}
  const view=e.target.closest('[data-view-student]');
  if(view) {openStudentProfile(Number(view.dataset.viewStudent));return;}
  const edit=e.target.closest('[data-edit-student]');
  if(edit) {openStudentForm(Number(edit.dataset.editStudent));return;}
  const action=e.target.closest('[data-action]')?.dataset.action;
  if(action==='student') openStudentForm();
  if(action==='cancel-dialog') dialog.close();
  if(action==='clear-filters') {
    filters={query:'',category:''};
    document.querySelector('#student-search').value='';
    document.querySelector('#student-category').value='';
    renderStudentRows();
    document.querySelector('#student-search').focus();
  }
});

// Responsables compartidos por ambas pantallas. Un responsable principal por
// alumno en esta demo; cada responsable puede tener varios alumnos vinculados.
let guardians = students.map((student,index)=>({
  id:index+1,
  name:student.guardian,
  phone:'+595 9XX XXX XXX',
  email:`responsable${index+1}@academia.example`
}));
students.forEach((student,index)=>{student.guardianId=index+1;});
let nextGuardianId=guardians.length+1;
let editingGuardianId=null;
let guardianQuery='';
const childrenOf=id=>students.filter(s=>s.guardianId===id);
function syncGuardianNames() {
  students.forEach(s=>{s.guardian=guardians.find(g=>g.id===s.guardianId)?.name || 'Sin responsable asignado';});
}
function renderGuardiansPage() {
  main.innerHTML=`
    <div class="page-heading"><div><div class="eyebrow">ADMINISTRACIÓN / PADRES Y TUTORES</div><h1>Familias que acompañan.</h1><p>Consultá los responsables y los alumnos a su cargo.</p></div><button class="primary-button" data-action="new-guardian">${icon('plus')}Nuevo responsable</button></div>
    <div class="student-demo-note">${icon('shield')}<span><strong>Datos de demostración.</strong> Los contactos son ficticios. Los cambios se pierden al recargar.</span></div>
    <section class="student-stats" aria-label="Resumen de responsables">
      <article><span>Responsables</span><strong>${guardians.length}</strong></article>
      <article><span>Alumnos vinculados</span><strong>${students.filter(s=>s.guardianId!==null).length}</strong></article>
      <article><span>Sin responsable</span><strong>${students.filter(s=>s.guardianId===null).length}</strong></article>
    </section>
    <section class="panel student-panel"><div class="section-heading"><div><h2>Directorio de responsables</h2><p>Buscá por nombre del responsable o del alumno.</p></div></div>
      <div class="student-toolbar"><label class="search-field">Buscar responsable o alumno<input id="guardian-search" type="search" value="${escapeHTML(guardianQuery)}" placeholder="Ej.: Carolina o Mateo" autocomplete="off"></label><button class="secondary-button" data-action="clear-guardians">Limpiar búsqueda</button></div>
      <p class="result-count" id="guardian-results" role="status" aria-live="polite"></p><div id="guardian-list"></div>
    </section>
    <footer class="page-footer"><span>ACADEMIA GOL · Administración</span><span>Datos ficticios · Padres y tutores</span></footer>`;
  renderGuardianRows();
}
function renderGuardianRows() {
  const query=normalize(guardianQuery);
  const rows=guardians.filter(g=>normalize(`${g.name} ${childrenOf(g.id).map(s=>s.name).join(' ')}`).includes(query));
  document.querySelector('#guardian-results').textContent=`${rows.length} de ${guardians.length} responsables`;
  document.querySelector('#guardian-list').innerHTML=rows.length?`
    <table class="student-table guardian-table"><caption class="sr-only">Responsables, contactos y alumnos vinculados</caption><thead><tr><th scope="col">Responsable</th><th scope="col">Contacto</th><th scope="col">Alumnos vinculados</th><th scope="col">Acciones</th></tr></thead><tbody>
      ${rows.map(g=>`<tr><td data-label="Responsable"><div class="student-identity"><span class="avatar" aria-hidden="true">${escapeHTML(initials(g.name))}</span><span><strong>${escapeHTML(g.name)}</strong><small>RT-${String(g.id).padStart(3,'0')}</small></span></div></td>
        <td data-label="Contacto"><div class="guardian-contact"><span>${escapeHTML(g.phone)||'Sin teléfono'}</span><small>${escapeHTML(g.email)||'Sin correo'}</small></div></td>
        <td data-label="Alumnos"><div class="linked-students">${childrenOf(g.id).length?childrenOf(g.id).map(s=>`<button data-view-student="${s.id}">${escapeHTML(s.name)} <span>· ${escapeHTML(s.category)}</span></button>`).join(''):'<span class="unassigned">Sin alumnos vinculados</span>'}</div></td>
        <td data-label="Acciones"><div class="row-actions"><button data-view-guardian="${g.id}" aria-label="Ver ficha de ${escapeHTML(g.name)}">Ver ficha</button><button data-edit-guardian="${g.id}" aria-label="Editar a ${escapeHTML(g.name)}">Editar</button></div></td></tr>`).join('')}
    </tbody></table>`:`<div class="empty-state">${icon('users')}<h3>No encontramos responsables</h3><p>Probá con otro nombre o limpiá la búsqueda.</p><button class="secondary-button" data-action="clear-guardians">Limpiar búsqueda</button></div>`;
}
function openGuardianProfile(id) {
  const g=guardians.find(item=>item.id===id);if(!g)return;
  const children=childrenOf(id);
  openDialog(escapeHTML(g.name),`<p class="dialog-intro">Ficha del responsable · RT-${String(id).padStart(3,'0')}</p>
    <dl class="student-details"><div><dt>Teléfono</dt><dd>${escapeHTML(g.phone)||'Sin indicar'}</dd></div><div><dt>Correo</dt><dd>${escapeHTML(g.email)||'Sin indicar'}</dd></div></dl>
    <h3 class="linked-heading">Alumnos vinculados (${children.length})</h3><div class="guardian-children">${children.length?children.map(s=>`<button class="linked-child" data-view-student="${s.id}"><span><strong>${escapeHTML(s.name)}</strong><small>${escapeHTML(s.category)} · ${escapeHTML(s.relation)} · ${s.status}</small></span>${icon('arrow')}</button>`).join(''):'<p class="dialog-intro">Este responsable todavía no tiene alumnos vinculados.</p>'}</div>
    <div class="form-actions"><button class="secondary-button" data-action="cancel-dialog">Cerrar</button><button class="primary-button" data-edit-guardian="${id}">Editar responsable</button></div>`);
}
function openGuardianForm(id=null) {
  editingGuardianId=id;
  const g=guardians.find(item=>item.id===id)||{name:'',phone:'',email:''};
  const available=students.filter(s=>s.guardianId===null || (id!==null && s.guardianId===id));
  openDialog(id?'Editar responsable':'Nuevo responsable',`
    <p class="dialog-intro">Completá con datos ficticios. El nombre es obligatorio.</p>
    <form id="guardian-form" class="student-form">
      <label class="full-field">Nombre completo *<input name="name" required maxlength="80" value="${escapeHTML(g.name)}" autocomplete="off"></label>
      <label>Teléfono<input name="phone" type="tel" maxlength="40" value="${escapeHTML(g.phone)}" placeholder="+595 9XX XXX XXX" autocomplete="off"></label>
      <label>Correo electrónico<input name="email" type="email" maxlength="120" value="${escapeHTML(g.email)}" placeholder="nombre@academia.example" autocomplete="off"></label>
      <fieldset class="link-picker full-field"><legend>Alumnos vinculados</legend><p>Marcá los alumnos que estarán a cargo de este responsable. Al desmarcar uno, quedará sin responsable asignado.</p>
        ${available.length?available.map(s=>`<label class="link-option"><input type="checkbox" name="studentIds" value="${s.id}" ${s.guardianId===id&&id!==null?'checked':''}><span>${escapeHTML(s.name)}<small>${escapeHTML(s.category)}</small></span></label>`).join(''):'<p class="link-empty">No hay alumnos sin responsable. Podés crear este responsable y asignarlo desde la edición de un alumno.</p>'}
      </fieldset>
      <p class="sample-note full-field">Cada alumno tiene un responsable principal en esta demo. Para cambiar uno ya asignado, usá Editar en Alumnos. El vínculo (madre, padre o tutor) se define en esa ficha.</p>
      <p class="form-error full-field" id="guardian-error" role="alert"></p>
      <div class="form-actions full-field"><button type="button" class="secondary-button" data-action="cancel-dialog">Cancelar</button><button class="primary-button" type="submit">${id?'Aplicar cambios de prueba':'Agregar a la demo'}</button></div>
    </form>`);
  document.querySelector('#guardian-form [name="name"]').focus();
}
document.addEventListener('input',e=>{
  if(e.target.id==='guardian-search'){guardianQuery=e.target.value;renderGuardianRows();}
});
document.addEventListener('click',e=>{
  const view=e.target.closest('[data-view-guardian]');if(view){openGuardianProfile(Number(view.dataset.viewGuardian));return;}
  const edit=e.target.closest('[data-edit-guardian]');if(edit){openGuardianForm(Number(edit.dataset.editGuardian));return;}
  const action=e.target.closest('[data-action]')?.dataset.action;
  if(action==='new-guardian')openGuardianForm();
  if(action==='clear-guardians'){guardianQuery='';document.querySelector('#guardian-search').value='';renderGuardianRows();document.querySelector('#guardian-search').focus();}
});
document.addEventListener('submit',e=>{
  if(e.target.id!=='guardian-form')return;
  e.preventDefault();const form=e.target;if(!form.reportValidity())return;
  const values=new FormData(form);
  const name=String(values.get('name')).trim();
  if(!name){document.querySelector('#guardian-error').textContent='El nombre no puede contener solo espacios.';form.elements.name.focus();return;}
  const wasEditing=editingGuardianId!==null;
  const id=wasEditing?editingGuardianId:nextGuardianId++;
  const entry={id,name,phone:String(values.get('phone')).trim(),email:String(values.get('email')).trim()};
  if(wasEditing)guardians=guardians.map(g=>g.id===id?entry:g);else guardians.push(entry);
  const linked=new Set(values.getAll('studentIds').map(Number));
  students.forEach(s=>{
    if(s.guardianId===id&&!linked.has(s.id)){s.guardianId=null;s.relation='Sin indicar';}
    else if(linked.has(s.id)&&s.guardianId===null){s.guardianId=id;s.relation='Otro responsable';}
  });
  syncGuardianNames();dialog.close();guardianQuery='';navigate('Padres y tutores');
  announce(wasEditing?'Responsable actualizado y vínculos sincronizados en la demo.':'Responsable agregado a la demo. Podés asignarlo desde Alumnos.');
});

// Gestión administrativa de profesionales: asignaciones múltiples por alumno.
const professionalAreas = ['Entrenamiento', 'Psicología', 'Fisioterapia', 'Nutrición'];
let professionals = [
  {id:1,name:'Diego Vera',area:'Entrenamiento',phone:'+595 9XX XXX XXX',email:'entrenador1@academia.example',studentIds:[1,2,6,7]},
  {id:2,name:'Camila Núñez',area:'Entrenamiento',phone:'+595 9XX XXX XXX',email:'entrenadora2@academia.example',studentIds:[3,4,5,8]},
  {id:3,name:'Andrea Torres',area:'Psicología',phone:'+595 9XX XXX XXX',email:'psicologia@academia.example',studentIds:[1,3,4]},
  {id:4,name:'Rodrigo Giménez',area:'Fisioterapia',phone:'+595 9XX XXX XXX',email:'fisioterapia@academia.example',studentIds:[3,7]}
];
let nextProfessionalId = 5;
let editingProfessionalId = null;
let professionalFilters = {query:'',area:''};
const assignedStudents = professional => students.filter(s=>professional.studentIds.includes(s.id));
function studentProfessionalsMarkup(id) {
  const assigned=professionals.filter(p=>p.studentIds.includes(id));
  return `<h3 class="linked-heading">Profesionales asignados (${assigned.length})</h3>
    <div class="guardian-children">${assigned.length?assigned.map(p=>`
      <button class="linked-child" data-view-professional="${p.id}"><span><strong>${escapeHTML(p.name)}</strong><small>${escapeHTML(p.area)}</small></span>${icon('arrow')}</button>`).join(''):
      '<p class="dialog-intro">Sin profesionales asignados. Podés asignarlos desde Profesionales.</p>'}</div>`;
}
function renderProfessionalsPage() {
  const assignedIds=new Set(professionals.flatMap(p=>p.studentIds));
  main.innerHTML=`
    <div class="page-heading"><div><div class="eyebrow">ADMINISTRACIÓN / PROFESIONALES</div><h1>Un equipo para acompañar.</h1><p>Organizá a los profesionales y los alumnos que tienen a su cargo.</p></div><button class="primary-button" data-action="new-professional">${icon('plus')}Nuevo profesional</button></div>
    <div class="student-demo-note">${icon('shield')}<span><strong>Vista del administrador.</strong> Datos ficticios y asignaciones de prueba. Los cambios se pierden al recargar.</span></div>
    <section class="student-stats" aria-label="Resumen de profesionales">
      <article><span>Profesionales</span><strong>${professionals.length}</strong></article>
      <article><span>Áreas representadas</span><strong>${new Set(professionals.map(p=>p.area)).size}</strong></article>
      <article><span>Alumnos con profesional</span><strong>${students.filter(s=>assignedIds.has(s.id)).length}</strong></article>
    </section>
    <section class="panel student-panel"><div class="section-heading"><div><h2>Equipo de profesionales</h2><p>Consultá sus datos de contacto y las asignaciones.</p></div></div>
      <div class="student-toolbar">
        <label class="search-field">Buscar profesional<input type="search" id="professional-search" placeholder="Ej.: Camila o Andrea" value="${escapeHTML(professionalFilters.query)}" autocomplete="off"></label>
        <label>Área<select id="professional-area"><option value="">Todas las áreas</option>${professionalAreas.map(area=>`<option ${professionalFilters.area===area?'selected':''}>${area}</option>`).join('')}</select></label>
        <button class="secondary-button" data-action="clear-professionals">Limpiar filtros</button>
      </div>
      <p class="result-count" id="professional-results" role="status" aria-live="polite"></p><div id="professional-list"></div>
    </section>
    <footer class="page-footer"><span>ACADEMIA GOL · Administración</span><span>Datos ficticios · Profesionales</span></footer>`;
  renderProfessionalRows();
}
function renderProfessionalRows() {
  const query=normalize(professionalFilters.query);
  const rows=professionals.filter(p=>normalize(p.name).includes(query)&&(!professionalFilters.area||p.area===professionalFilters.area));
  document.querySelector('#professional-results').textContent=`${rows.length} de ${professionals.length} profesionales`;
  document.querySelector('#professional-list').innerHTML=rows.length?`
    <table class="student-table professional-table"><caption class="sr-only">Profesionales, áreas, contactos y alumnos asignados</caption>
      <thead><tr><th scope="col">Profesional</th><th scope="col">Área</th><th scope="col">Contacto</th><th scope="col">Alumnos</th><th scope="col">Acciones</th></tr></thead>
      <tbody>${rows.map(p=>`<tr>
        <td data-label="Profesional"><div class="student-identity"><span class="avatar" aria-hidden="true">${escapeHTML(initials(p.name))}</span><span><strong>${escapeHTML(p.name)}</strong><small>PR-${String(p.id).padStart(3,'0')}</small></span></div></td>
        <td data-label="Área"><span class="professional-area-chip">${escapeHTML(p.area)}</span></td>
        <td data-label="Contacto"><div class="guardian-contact"><span>${escapeHTML(p.phone)||'Sin teléfono'}</span><small>${escapeHTML(p.email)||'Sin correo'}</small></div></td>
        <td data-label="Alumnos"><span class="assignment-count">${assignedStudents(p).length}</span></td>
        <td data-label="Acciones"><div class="row-actions"><button data-view-professional="${p.id}" aria-label="Ver ficha de ${escapeHTML(p.name)}">Ver ficha</button><button data-edit-professional="${p.id}" aria-label="Editar a ${escapeHTML(p.name)}">Editar</button><button data-assign-professional="${p.id}" aria-label="Asignar alumnos a ${escapeHTML(p.name)}">Asignar</button></div></td>
      </tr>`).join('')}</tbody>
    </table>`:`<div class="empty-state">${icon('users')}<h3>No encontramos profesionales</h3><p>Probá con otro nombre o cambiá el área.</p><button class="secondary-button" data-action="clear-professionals">Limpiar filtros</button></div>`;
}
function openProfessionalProfile(id) {
  const p=professionals.find(item=>item.id===id);if(!p)return;
  const assigned=assignedStudents(p);
  openDialog(escapeHTML(p.name),`
    <p class="dialog-intro">Ficha del profesional · PR-${String(id).padStart(3,'0')}</p>
    <span class="professional-area-chip">${escapeHTML(p.area)}</span>
    <dl class="student-details"><div><dt>Teléfono</dt><dd>${escapeHTML(p.phone)||'Sin indicar'}</dd></div><div><dt>Correo</dt><dd>${escapeHTML(p.email)||'Sin indicar'}</dd></div></dl>
    <h3 class="linked-heading">Alumnos asignados (${assigned.length})</h3>
    <div class="guardian-children">${assigned.length?assigned.map(s=>`<button class="linked-child" data-view-student="${s.id}"><span><strong>${escapeHTML(s.name)}</strong><small>${escapeHTML(s.category)} · ${s.status}</small></span>${icon('arrow')}</button>`).join(''):'<p class="dialog-intro">Todavía no tiene alumnos asignados.</p>'}</div>
    <p class="sample-note">Esta vista organiza datos y asignaciones. La agenda, asistencia y evaluaciones del profesional se diseñarán más adelante.</p>
    <div class="form-actions"><button class="secondary-button" data-edit-professional="${id}">Editar datos</button><button class="primary-button" data-assign-professional="${id}">Asignar alumnos</button></div>`);
}
function openProfessionalForm(id=null) {
  editingProfessionalId=id;
  const p=professionals.find(item=>item.id===id)||{name:'',area:'',phone:'',email:''};
  openDialog(id?'Editar profesional':'Nuevo profesional',`
    <p class="dialog-intro">Usá datos ficticios. Nombre y área son obligatorios.</p>
    <form id="professional-form" class="student-form">
      <label class="full-field">Nombre completo *<input name="name" value="${escapeHTML(p.name)}" required maxlength="80" autocomplete="off"></label>
      <label class="full-field">Área *<select name="area" required><option value="">Seleccioná un área</option>${professionalAreas.map(area=>`<option ${p.area===area?'selected':''}>${area}</option>`).join('')}</select></label>
      <label>Teléfono<input type="tel" name="phone" value="${escapeHTML(p.phone)}" maxlength="40" placeholder="+595 9XX XXX XXX" autocomplete="off"></label>
      <label>Correo electrónico<input type="email" name="email" value="${escapeHTML(p.email)}" maxlength="120" placeholder="nombre@academia.example" autocomplete="off"></label>
      <p class="sample-note full-field">Los alumnos se asignan con el botón Asignar. Editar los datos conserva las asignaciones existentes.</p>
      <p class="form-error full-field" id="professional-error" role="alert"></p>
      <div class="form-actions full-field"><button type="button" class="secondary-button" data-action="cancel-dialog">Cancelar</button><button type="submit" class="primary-button">${id?'Aplicar cambios de prueba':'Agregar a la demo'}</button></div>
    </form>`);
  document.querySelector('#professional-form [name="name"]').focus();
}
function openProfessionalAssignments(id) {
  const p=professionals.find(item=>item.id===id);if(!p)return;
  openDialog('Asignar alumnos',`
    <p class="dialog-intro"><strong>${escapeHTML(p.name)}</strong> · ${escapeHTML(p.area)}<br>Un alumno puede estar asignado a varios profesionales.</p>
    <form id="assignment-form" data-professional-id="${id}">
      <div class="assignment-filters"><label>Buscar alumno<input id="assignment-search" type="search" placeholder="Nombre del alumno" autocomplete="off"></label><label>Categoría<select id="assignment-category"><option value="">Todas las categorías</option>${categories.map(c=>`<option>${escapeHTML(c)}</option>`).join('')}</select></label></div>
      <p class="result-count" id="assignment-summary" role="status" aria-live="polite"></p>
      <fieldset class="link-picker assignment-picker"><legend>Seleccioná los alumnos</legend><div class="assignment-options">${students.map(s=>`<label class="link-option" data-assignment-option data-student-id="${s.id}"><input type="checkbox" name="studentIds" value="${s.id}" ${p.studentIds.includes(s.id)?'checked':''}><span>${escapeHTML(s.name)}<small>${escapeHTML(s.category)} · ${s.status}</small></span></label>`).join('')}</div><p id="assignment-empty" hidden>No hay alumnos que coincidan con la búsqueda.</p></fieldset>
      <p class="sample-note">Los filtros no cambian la selección. Desmarcar un alumno lo desvincula solo de este profesional. Incluye alumnos activos e inactivos.</p>
      <div class="form-actions"><button type="button" class="secondary-button" data-action="cancel-dialog">Cancelar</button><button type="submit" class="primary-button">Aplicar asignaciones</button></div>
    </form>`);
  filterAssignmentOptions();
  document.querySelector('#assignment-search').focus();
}
function filterAssignmentOptions() {
  const form=document.querySelector('#assignment-form');if(!form)return;
  const query=normalize(document.querySelector('#assignment-search').value);
  const category=document.querySelector('#assignment-category').value;
  let visible=0;
  form.querySelectorAll('[data-assignment-option]').forEach(row=>{
    const student=students.find(s=>s.id===Number(row.dataset.studentId));
    row.hidden=!(normalize(student.name).includes(query)&&(!category||student.category===category));
    if(!row.hidden)visible++;
  });
  const selected=form.querySelectorAll('[name="studentIds"]:checked').length;
  document.querySelector('#assignment-summary').textContent=`${selected} seleccionados en total · ${visible} alumnos visibles`;
  document.querySelector('#assignment-empty').hidden=visible!==0;
}
document.addEventListener('input',e=>{
  if(e.target.id==='professional-search'){professionalFilters.query=e.target.value;renderProfessionalRows();}
  if(e.target.id==='assignment-search')filterAssignmentOptions();
});
document.addEventListener('change',e=>{
  if(e.target.id==='professional-area'){professionalFilters.area=e.target.value;renderProfessionalRows();}
  if(e.target.closest('#assignment-form'))filterAssignmentOptions();
});
document.addEventListener('click',e=>{
  const view=e.target.closest('[data-view-professional]');if(view){openProfessionalProfile(Number(view.dataset.viewProfessional));return;}
  const edit=e.target.closest('[data-edit-professional]');if(edit){openProfessionalForm(Number(edit.dataset.editProfessional));return;}
  const assign=e.target.closest('[data-assign-professional]');if(assign){openProfessionalAssignments(Number(assign.dataset.assignProfessional));return;}
  const action=e.target.closest('[data-action]')?.dataset.action;
  if(action==='new-professional')openProfessionalForm();
  if(action==='clear-professionals'){
    professionalFilters={query:'',area:''};document.querySelector('#professional-search').value='';document.querySelector('#professional-area').value='';renderProfessionalRows();document.querySelector('#professional-search').focus();
  }
});
document.addEventListener('submit',e=>{
  if(e.target.id==='professional-form') {
    e.preventDefault();const form=e.target;if(!form.reportValidity())return;
    const data=Object.fromEntries(new FormData(form));data.name=data.name.trim();data.phone=data.phone.trim();data.email=data.email.trim();
    if(!data.name){document.querySelector('#professional-error').textContent='El nombre no puede contener solo espacios.';form.elements.name.focus();return;}
    if(!professionalAreas.includes(data.area))return;
    const wasEditing=editingProfessionalId!==null;
    if(wasEditing)professionals=professionals.map(p=>p.id===editingProfessionalId?{...p,...data}:p);
    else professionals.push({id:nextProfessionalId++,...data,studentIds:[]});
    dialog.close();professionalFilters={query:'',area:''};navigate('Profesionales');
    announce(wasEditing?'Profesional actualizado. Se conservaron sus alumnos asignados.':'Profesional agregado a la demo. Ya podés asignarle alumnos.');
  }
  if(e.target.id==='assignment-form') {
    e.preventDefault();const form=e.target;
    const id=Number(form.dataset.professionalId);
    const ids=[...new Set(new FormData(form).getAll('studentIds').map(Number))].filter(id=>students.some(s=>s.id===id));
    professionals=professionals.map(p=>p.id===id?{...p,studentIds:ids}:p);
    dialog.close();navigate('Profesionales');announce('Asignaciones actualizadas en la demo. Se perderán al recargar.');
  }
});

// Categorías compartidas por todas las pantallas. El índice permanece estable:
// esta demo permite crear y editar, pero no eliminar categorías.
const categoryDescriptions = categories.map(()=> '');
let editingCategoryIndex = null;
let categoryQuery = '';
const studentsInCategory = name => students.filter(s=>s.category===name);
function renderCategoriesPage() {
  main.innerHTML=`
    <div class="page-heading"><div><div class="eyebrow">ADMINISTRACIÓN / CATEGORÍAS</div><h1>Un lugar para cada alumno.</h1><p>Organizá las categorías que utiliza tu escuela.</p></div><button class="primary-button" data-action="new-category">${icon('plus')}Nueva categoría</button></div>
    <div class="student-demo-note">${icon('shield')}<span><strong>Categorías de ejemplo.</strong> Podés adaptarlas a la escuela. La asignación del alumno es manual; no se calcula por edad.</span></div>
    <section class="student-stats" aria-label="Resumen de categorías">
      <article><span>Categorías</span><strong>${categories.length}</strong></article>
      <article><span>Con alumnos</span><strong>${categories.filter(c=>studentsInCategory(c).length).length}</strong></article>
      <article><span>Alumnos asignados</span><strong>${students.filter(s=>categories.includes(s.category)).length}</strong></article>
    </section>
    <section class="panel student-panel"><div class="section-heading"><div><h2>Categorías de la academia</h2><p>Consultá los alumnos y ajustá el nombre de cada categoría.</p></div></div>
      <div class="student-toolbar"><label class="search-field">Buscar categoría<input type="search" id="category-search" value="${escapeHTML(categoryQuery)}" placeholder="Ej.: Sub-10" autocomplete="off"></label><button class="secondary-button" data-action="clear-categories">Limpiar búsqueda</button></div>
      <p class="result-count" id="category-results" role="status" aria-live="polite"></p><div id="category-list"></div>
    </section><footer class="page-footer"><span>ACADEMIA GOL · Administración</span><span>Datos ficticios · Categorías</span></footer>`;
  renderCategoryCards();
}
function renderCategoryCards() {
  const query=normalize(categoryQuery);
  const rows=categories.map((name,id)=>({name,id})).filter(c=>normalize(c.name).includes(query));
  document.querySelector('#category-results').textContent=`${rows.length} de ${categories.length} categorías`;
  document.querySelector('#category-list').innerHTML=rows.length?`<div class="category-grid">${rows.map(({name,id})=>{
    const assigned=studentsInCategory(name);const active=assigned.filter(s=>s.status==='Activo').length;
    return `<article class="category-card"><div class="category-card-heading"><span class="category-symbol">${icon('shield')}</span><h3>${escapeHTML(name)}</h3></div>
      <p class="category-description">${escapeHTML(categoryDescriptions[id])||'Sin descripción adicional.'}</p>
      <div class="category-totals"><strong>${assigned.length}<span> alumnos</span></strong><small>${active} activos · ${assigned.length-active} inactivos</small></div>
      <div class="row-actions"><button data-view-category="${id}" aria-label="Ver alumnos de ${escapeHTML(name)}">Ver alumnos ${icon('arrow')}</button><button data-edit-category="${id}" aria-label="Editar categoría ${escapeHTML(name)}">Editar</button></div></article>`;
  }).join('')}</div>`:`<div class="empty-state">${icon('shield')}<h3>No encontramos categorías</h3><p>Probá con otro nombre o limpiá la búsqueda.</p><button class="secondary-button" data-action="clear-categories">Limpiar búsqueda</button></div>`;
}
function openCategoryProfile(index) {
  const name=categories[index];if(name===undefined)return;
  const assigned=studentsInCategory(name);
  openDialog(escapeHTML(name),`
    <p class="dialog-intro">${escapeHTML(categoryDescriptions[index])||'Categoría de la academia.'}</p>
    <h3 class="linked-heading">Alumnos asignados (${assigned.length})</h3>
    <div class="guardian-children">${assigned.length?assigned.map(s=>`<button class="linked-child" data-view-student="${s.id}"><span><strong>${escapeHTML(s.name)}</strong><small>${s.status} · ${escapeHTML(s.guardian)}</small></span>${icon('arrow')}</button>`).join(''):'<p class="dialog-intro">Todavía no hay alumnos en esta categoría. Podés seleccionarla al crear o editar un alumno.</p>'}</div>
    <div class="form-actions"><button class="secondary-button" data-edit-category="${index}">Editar categoría</button><button class="primary-button" data-category-students="${index}">Abrir listado de alumnos</button></div>`);
}
function openCategoryForm(index=null) {
  editingCategoryIndex=index;
  const editing=index!==null;
  const name=editing?categories[index]:'';
  openDialog(editing?'Editar categoría':'Nueva categoría',`
    <p class="dialog-intro">Definí el nombre que usa tu escuela. El nombre es obligatorio.</p>
    <form id="category-form" class="student-form">
      <label class="full-field">Nombre de la categoría *<input name="name" value="${escapeHTML(name)}" required maxlength="40" placeholder="Ej.: Sub-10 o Iniciación" autocomplete="off"></label>
      <label class="full-field">Descripción (opcional)<textarea name="description" rows="3" maxlength="240" placeholder="Una breve descripción para identificar la categoría">${escapeHTML(editing?categoryDescriptions[index]:'')}</textarea></label>
      <p class="sample-note full-field">${editing?'Al cambiar el nombre, se actualizará también en los alumnos y filtros. Los alumnos conservarán su asignación.':'La categoría aparecerá en los formularios y filtros de alumnos, y en la asignación a profesionales.'}</p>
      <p class="form-error full-field" id="category-error" role="alert"></p>
      <div class="form-actions full-field"><button type="button" class="secondary-button" data-action="cancel-dialog">Cancelar</button><button class="primary-button" type="submit">${editing?'Aplicar cambios de prueba':'Agregar a la demo'}</button></div>
    </form>`);
  document.querySelector('#category-form [name="name"]').focus();
}
document.addEventListener('input',e=>{
  if(e.target.id==='category-search'){categoryQuery=e.target.value;renderCategoryCards();}
});
document.addEventListener('click',e=>{
  const view=e.target.closest('[data-view-category]');if(view){openCategoryProfile(Number(view.dataset.viewCategory));return;}
  const edit=e.target.closest('[data-edit-category]');if(edit){openCategoryForm(Number(edit.dataset.editCategory));return;}
  const list=e.target.closest('[data-category-students]');if(list){filters={query:'',category:categories[Number(list.dataset.categoryStudents)]};dialog.close();navigate('Alumnos');return;}
  const action=e.target.closest('[data-action]')?.dataset.action;
  if(action==='new-category')openCategoryForm();
  if(action==='clear-categories'){categoryQuery='';document.querySelector('#category-search').value='';renderCategoryCards();document.querySelector('#category-search').focus();}
});
document.addEventListener('submit',e=>{
  if(e.target.id!=='category-form')return;
  e.preventDefault();const form=e.target;if(!form.reportValidity())return;
  const values=new FormData(form);
  const name=String(values.get('name')).trim().replace(/\s+/g,' ');
  const description=String(values.get('description')).trim();
  const error=document.querySelector('#category-error');
  if(!name){error.textContent='El nombre no puede contener solo espacios.';form.elements.name.focus();return;}
  if(categories.some((c,index)=>index!==editingCategoryIndex && normalize(c)===normalize(name))){error.textContent='Ya existe una categoría con ese nombre. Elegí otro.';form.elements.name.focus();return;}
  const wasEditing=editingCategoryIndex!==null;
  if(wasEditing){
    const oldName=categories[editingCategoryIndex];
    categories[editingCategoryIndex]=name;categoryDescriptions[editingCategoryIndex]=description;
    students.forEach(s=>{if(s.category===oldName)s.category=name;});
    if(filters.category===oldName)filters.category=name;
  }else{categories.push(name);categoryDescriptions.push(description);}
  dialog.close();categoryQuery='';navigate('Categorías');
  announce(wasEditing?'Categoría actualizada. Sus alumnos conservaron la asignación.':'Categoría agregada. Ya podés seleccionarla en Alumnos.');
});

// VISTA DE PADRES Y TUTORES — solo consulta de sus alumnos vinculados.
// Estos filtros son parte de la demo local: no son permisos de un backend.
let familyGuardianId = guardians[0]?.id ?? null;
let familyPage = 'Mis hijos';
let familyReportFilters = {student:'', area:''};
const familyReadNotices = new Map();
const reportExamples = {
  Entrenamiento: {
    title:'Participación en las actividades deportivas',
    objective:'Acompañar la participación en ejercicios con balón y actividades de equipo.',
    observation:'En este ejemplo, el alumno participa con interés y sigue las consignas de los ejercicios. Continúa practicando el control del balón y la colaboración con sus compañeros.',
    recommendation:'Continuar con actividades lúdicas de coordinación y pases, respetando sus tiempos de aprendizaje.'
  },
  Psicología: {
    title:'Acompañamiento en actividades grupales',
    objective:'Observar la participación y la comunicación durante las actividades del grupo.',
    observation:'En este ejemplo, el alumno se incorpora a las propuestas grupales y expresa sus ideas con acompañamiento. Se trabajan la escucha y el respeto de turnos.',
    recommendation:'Promover conversaciones sencillas sobre cómo se sintió en la actividad y reconocer sus esfuerzos. Este texto ficticio no representa una evaluación clínica.'
  },
  Fisioterapia: {
    title:'Participación en ejercicios de movilidad',
    objective:'Acompañar los ejercicios de movilidad y coordinación de la actividad deportiva.',
    observation:'En este ejemplo, el alumno participa en los ejercicios guiados y practica movimientos de coordinación. El contenido ilustra el formato del informe y no describe una condición médica real.',
    recommendation:'Seguir las indicaciones del profesional durante las actividades. Este informe ficticio no constituye una indicación de tratamiento.'
  }
};
// Informes publicados de ejemplo. Cada uno conserva los datos de su emisión.
const familyReports = professionals.flatMap(p=>p.studentIds.flatMap(studentId=>{
  const student=students.find(s=>s.id===studentId), example=reportExamples[p.area];
  if(!student || !example) return [];
  return [{id:`INF-${p.id}-${studentId}`,studentId,studentName:student.name,category:student.category,
    professionalId:p.id,status:'published',professionalName:p.name,area:p.area,date:'2026-09-25',...example}];
}));
const schoolNotices = [
  {id:'escuela-1',type:'Comunicado',date:'2026-09-27',title:'Bienvenidas, familias',body:'Este espacio de demostración permite consultar los datos de sus hijos y los informes compartidos por los profesionales. Todos los datos y avisos son ficticios.'},
  {id:'escuela-2',type:'Comunicado',date:'2026-09-24',title:'Datos de contacto actualizados',body:'Si cambian sus datos de contacto, comuníquenlo a la administración de la escuela. Este aviso es un ejemplo; la publicación de comunicados todavía no está implementada.'}
];
const familyChildren = () => students.filter(s=>s.guardianId===familyGuardianId);
const familyOwnsStudent = id => familyChildren().some(s=>s.id===Number(id));
const visibleFamilyReports = () => familyReports.filter(r=>r.status==='published'&&familyOwnsStudent(r.studentId));
function readableDate(date){return date.split('-').reverse().join('/');}
function getFamilyNotices(){
  return [...schoolNotices,...visibleFamilyReports().map(r=>({id:`aviso-${r.id}`,type:'Nuevo informe',date:r.publishedDate||r.date,title:`Informe de ${r.area}`,body:`${r.studentName}: ${r.title}.`,reportId:r.id}))].sort((a,b)=>b.date.localeCompare(a.date));
}
function familyReadSet(){if(!familyReadNotices.has(familyGuardianId)) familyReadNotices.set(familyGuardianId,new Set());return familyReadNotices.get(familyGuardianId);}
function unreadFamilyCount(){return getFamilyNotices().filter(n=>!familyReadSet().has(n.id)).length;}
const adminNavMarkup = document.querySelector('nav').innerHTML;
const adminAccountMarkup = document.querySelector('.account').innerHTML;
const adminWorkspaceMarkup = document.querySelector('.workspace').innerHTML;
const adminTopActions = document.querySelector('.top-actions').innerHTML;
document.querySelector('.workspace').insertAdjacentHTML('afterend',`
  <div class="demo-switcher">
    <label for="demo-role">Perfil de demostración</label>
    <select id="demo-role"><option value="admin">Administrador</option><option value="family">Padre / tutor</option><option value="professional">Profesional</option></select>
    <div id="family-identity" hidden><label for="demo-guardian">Responsable de ejemplo</label><select id="demo-guardian"></select></div>
    <div id="professional-identity" hidden><label for="demo-professional">Profesional de ejemplo</label><select id="demo-professional"></select></div>
  </div>`);
function refreshGuardianSelector(){
  if(!guardians.some(g=>g.id===familyGuardianId))familyGuardianId=guardians[0]?.id??null;
  document.querySelector('#demo-guardian').innerHTML=guardians.map(g=>`<option value="${g.id}" ${g.id===familyGuardianId?'selected':''}>${escapeHTML(g.name)}</option>`).join('');
}
function switchDemoRole(role){
  dialog.close();closeMenu();demoRole=role;document.querySelector('#demo-role').value=role;
  document.querySelector('#family-identity').hidden=role!=='family';
  document.querySelector('#professional-identity').hidden=role!=='professional';
  if(role==='family'){
    refreshGuardianSelector();familyReportFilters={student:'',area:''};renderFamilyPage('Mis hijos');
  } else if(role==='professional') {
    refreshProfessionalSelector();proFilters={query:'',category:''};proReportFilters={student:'',status:''};renderProPage('Mis alumnos');
  } else {
    document.querySelector('nav').innerHTML=adminNavMarkup;
    document.querySelector('.account').innerHTML=adminAccountMarkup;
    document.querySelector('.workspace').innerHTML=adminWorkspaceMarkup;
    document.querySelector('.top-actions').innerHTML=adminTopActions;
    document.querySelector('.nav-label').textContent='PRINCIPAL';
    navigate('Inicio');
  }
}
function refreshFamilyChrome(){
  const guardian=guardians.find(g=>g.id===familyGuardianId);
  const unread=unreadFamilyCount();
  document.querySelector('.workspace').innerHTML='<span class="workspace-dot"></span>Espacio de familias<span class="tiny-label">DEMO</span>';
  document.querySelector('.nav-label').textContent='MI FAMILIA';
  document.querySelector('nav').innerHTML=[['users','Mis hijos'],['chart','Informes'],['bell','Avisos']].map(([i,name])=>`<button class="nav-item ${name===familyPage?'active':''}" data-family-page="${name}" ${name===familyPage?'aria-current="page"':''}>${icon(i)}<span>${name}</span>${name==='Avisos'&&unread?`<span class="family-count">${unread}</span>`:''}</button>`).join('');
  document.querySelector('.account').innerHTML=`<span class="avatar">${escapeHTML(initials(guardian?.name||'Familia'))}</span><span><strong>${escapeHTML(guardian?.name||'Sin responsable')}</strong><small>Padre / tutor · Demostración</small></span>`;
  document.querySelector('.top-actions').innerHTML=`<span class="demo-pill"><span></span>Vista de padres</span><button class="icon-button" data-family-page="Avisos" aria-label="Ver avisos, ${unread} sin leer">${icon('bell')}${unread?'<i></i>':''}</button>`;
  document.querySelector('.breadcrumb strong').textContent=familyPage;
  document.title=`Academia Gol · ${familyPage}`;
}
function renderFamilyPage(page){
  if(demoRole!=='family')return;
  familyPage=page;closeMenu();refreshFamilyChrome();
  const intro={
    'Mis hijos':['Cerca de cada paso.','Consultá los datos de tus hijos y los informes compartidos por la escuela.'],
    Informes:['Información para acompañar.','Leé los informes por área y descargá una copia en PDF.'],
    Avisos:['Las novedades de tu familia.','Comunicados de la escuela y notificaciones de informes publicados.']
  }[page];
  main.innerHTML=`<div class="page-heading"><div><div class="eyebrow">ESPACIO DE FAMILIAS / ${page.toUpperCase()}</div><h1>${intro[0]}</h1><p>${intro[1]}</p></div></div>
    <div class="student-demo-note">${icon('shield')}<span>Vista de consulta con datos ficticios. El selector permite probar distintos responsables; no es un inicio de sesión real.</span></div>
    <div id="family-content"></div><footer class="page-footer"><span>ACADEMIA GOL · Familias</span><span>Demostración · Sin envíos reales</span></footer>`;
  if(page==='Mis hijos')renderFamilyChildren();
  if(page==='Informes')renderFamilyReports();
  if(page==='Avisos')renderFamilyNotices();
  const title=main.querySelector('h1');title.tabIndex=-1;title.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});
}
function renderFamilyChildren(){
  const children=familyChildren();
  document.querySelector('#family-content').innerHTML=children.length?`
    <div class="family-summary"><span><strong>${children.length}</strong> ${children.length===1?'hijo vinculado':'hijos vinculados'}</span><span><strong>${visibleFamilyReports().length}</strong> informes disponibles</span><span><strong>${unreadFamilyCount()}</strong> avisos sin leer</span></div>
    <div class="family-child-grid">${children.map(s=>{
      const reports=visibleFamilyReports().filter(r=>r.studentId===s.id);
      return `<article class="family-child-card"><div class="family-child-header"><span class="family-avatar">${escapeHTML(initials(s.name))}</span><span class="category-chip">${escapeHTML(s.category)}</span></div>
        <h2>${escapeHTML(s.name)}</h2><p>Alumno · AG-${String(s.id).padStart(3,'0')}</p>
        <dl class="student-details"><div><dt>Nacimiento</dt><dd>${s.birth?readableDate(s.birth):'Sin indicar'}</dd></div><div><dt>Estado</dt><dd>${s.status}</dd></div></dl>
        <div class="family-report-total">${icon('chart')}<span>${reports.length} informes disponibles</span></div>
        <div class="form-actions"><button class="secondary-button" data-family-child="${s.id}">Ver perfil</button><button class="primary-button" data-family-reports="${s.id}">Ver informes</button></div></article>`;
    }).join('')}</div>`:`<div class="panel empty-state">${icon('users')}<h2>Todavía no hay alumnos vinculados</h2><p>La administración podrá vincular a tus hijos con tu perfil. En la demo, podés hacerlo desde Padres y tutores o Alumnos.</p></div>`;
}
function openFamilyChild(id){
  const s=familyChildren().find(s=>s.id===id);if(!s)return;
  openDialog(escapeHTML(s.name),`<p class="dialog-intro">Perfil de tu hijo · AG-${String(s.id).padStart(3,'0')}</p>
    <dl class="student-details"><div><dt>Categoría</dt><dd>${escapeHTML(s.category)}</dd></div><div><dt>Nacimiento</dt><dd>${s.birth?readableDate(s.birth):'Sin indicar'}</dd></div><div><dt>Estado</dt><dd>${s.status}</dd></div><div><dt>Responsable</dt><dd>${escapeHTML(s.guardian)}</dd></div></dl>
    <p class="sample-note">Para corregir los datos del alumno, contactá con la administración.</p>
    <div class="form-actions"><button class="secondary-button" data-action="cancel-dialog">Cerrar</button><button class="primary-button" data-family-reports="${id}">Ver informes</button></div>`);
}
function renderFamilyReports(){
  const children=familyChildren();
  if(!children.some(s=>String(s.id)===familyReportFilters.student))familyReportFilters.student='';
  document.querySelector('#family-content').innerHTML=`<section class="panel student-panel"><div class="section-heading"><div><h2>Informes publicados</h2><p>Solo se muestran informes compartidos de tus hijos.</p></div></div>
    <div class="student-toolbar"><label class="search-field">Hijo<select id="family-report-student"><option value="">Todos mis hijos</option>${children.map(s=>`<option value="${s.id}" ${String(s.id)===familyReportFilters.student?'selected':''}>${escapeHTML(s.name)}</option>`).join('')}</select></label>
    <label>Área<select id="family-report-area"><option value="">Todas las áreas</option>${[...new Set([...Object.keys(reportExamples),...visibleFamilyReports().map(r=>r.area)])].map(a=>`<option ${a===familyReportFilters.area?'selected':''}>${a}</option>`).join('')}</select></label><button class="secondary-button" data-family-action="reset-reports">Limpiar filtros</button></div>
    <p id="family-report-count" class="result-count" role="status" aria-live="polite"></p><div id="family-report-list"></div></section>`;
  renderFamilyReportRows();
}
function renderFamilyReportRows(){
  const rows=visibleFamilyReports().filter(r=>(!familyReportFilters.student||String(r.studentId)===familyReportFilters.student)&&(!familyReportFilters.area||r.area===familyReportFilters.area));
  document.querySelector('#family-report-count').textContent=`${rows.length} informes disponibles`;
  document.querySelector('#family-report-list').innerHTML=rows.length?`<div class="family-report-grid">${rows.map(r=>`<article class="family-report-card"><div class="notice-meta"><span class="professional-area-chip">${r.area}</span><small>${readableDate(r.date)}</small></div><h3>${escapeHTML(r.title)}</h3><strong class="report-student">${escapeHTML(r.studentName)}</strong><p>${escapeHTML(r.professionalName)} · ${escapeHTML(r.category)}</p><div class="row-actions"><button data-family-report="${r.id}">Leer informe</button><button data-family-pdf="${r.id}" aria-label="Descargar PDF de ${escapeHTML(r.studentName)}, ${r.area}">Descargar PDF</button></div></article>`).join('')}</div>`:`<div class="empty-state">${icon('chart')}<h3>No hay informes disponibles</h3><p>Probá otra área o esperá a que se publique un informe para tu hijo.</p></div>`;
}
function accessibleFamilyReport(id){return visibleFamilyReports().find(r=>r.id===id);}
function openFamilyReport(id){
  const r=accessibleFamilyReport(id);if(!r)return;
  familyReadSet().add(`aviso-${r.id}`);refreshFamilyChrome();
  if(familyPage==='Avisos')renderFamilyNotices();
  openDialog(escapeHTML(r.title),`<span class="professional-area-chip">${r.area}</span><p class="dialog-intro"><strong>${escapeHTML(r.studentName)}</strong> · ${escapeHTML(r.category)}<br>${escapeHTML(r.professionalName)} · ${readableDate(r.date)}</p>
    <div class="family-report-body"><h3>Objetivo</h3><p>${escapeHTML(r.objective)}</p><h3>Observaciones</h3><p>${escapeHTML(r.observation)}</p><h3>Orientaciones para la familia</h3><p>${escapeHTML(r.recommendation)}</p></div>
    <p class="sample-note">Informe ficticio de demostración. Datos y categoría corresponden a la emisión del ejemplo; no es una evaluación real.</p><div class="form-actions"><button class="secondary-button" data-action="cancel-dialog">Cerrar</button><button class="primary-button" data-family-pdf="${r.id}">Descargar PDF</button></div>`);
}
function renderFamilyNotices(){
  const notices=getFamilyNotices();
  document.querySelector('#family-content').innerHTML=`<section class="panel student-panel"><div class="section-heading"><div><h2>Avisos para tu familia</h2><p>${unreadFamilyCount()} sin leer · Los comunicados son ejemplos de la escuela.</p></div><button class="secondary-button" data-family-action="read-all" ${unreadFamilyCount()?'':'disabled'}>Marcar todos como leídos</button></div>
    <div class="family-notice-list">${notices.map(n=>{const read=familyReadSet().has(n.id);return `<button class="family-notice ${read?'is-read':''}" data-family-notice="${n.id}"><span class="family-notice-icon">${icon(n.reportId?'chart':'bell')}</span><span class="family-notice-copy"><span class="notice-meta"><span class="tag">${n.type}</span><small>${readableDate(n.date)} · ${read?'Leído':'Sin leer'}</small></span><strong>${escapeHTML(n.title)}</strong><span>${escapeHTML(n.body)}</span></span>${icon('arrow')}</button>`;}).join('')}</div></section>`;
}
function openFamilyNotice(id){
  const n=getFamilyNotices().find(n=>n.id===id);if(!n)return;
  familyReadSet().add(id);refreshFamilyChrome();renderFamilyNotices();
  if(n.reportId)openFamilyReport(n.reportId);
  else openDialog(escapeHTML(n.title),`<span class="tag">Comunicado de ejemplo</span><p class="dialog-intro">${escapeHTML(n.body)}</p><small>${readableDate(n.date)}</small><div class="form-actions"><button class="secondary-button" data-action="cancel-dialog">Cerrar</button></div>`);
}
async function downloadFamilyReport(id,button){
  const report=accessibleFamilyReport(id);if(!report)return;
  const guardianIdAtStart=familyGuardianId;
  const originalText=button.textContent;button.disabled=true;button.textContent='Preparando PDF…';
  try{
    const {createReportPDF}=await import('./pdf.js');
    if(demoRole!=='family'||familyGuardianId!==guardianIdAtStart||!accessibleFamilyReport(id))return;
    const bytes=createReportPDF(report);
    const url=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));
    const link=document.createElement('a');link.href=url;link.download=`Academia-Gol-${report.id}.pdf`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
    announce('PDF preparado. Revisá las descargas de tu navegador.');
  }catch(error){console.error('No se pudo crear el PDF',error);announce('No se pudo descargar el PDF. Verificá que src/pdf.js esté incluido y volvé a intentar.');}
  finally{button.disabled=false;button.textContent=originalText;}
}
document.addEventListener('change',e=>{
  if(e.target.id==='demo-role'){switchDemoRole(e.target.value);return;}
  if(e.target.id==='demo-guardian'){familyGuardianId=Number(e.target.value);dialog.close();familyReportFilters={student:'',area:''};renderFamilyPage('Mis hijos');return;}
  if(demoRole!=='family')return;
  if(e.target.id==='family-report-student'){familyReportFilters.student=e.target.value;renderFamilyReportRows();}
  if(e.target.id==='family-report-area'){familyReportFilters.area=e.target.value;renderFamilyReportRows();}
});
// Captura los controles de familias antes de los manejadores administrativos.
document.addEventListener('click',e=>{
  if(demoRole!=='family')return;
  const button=e.target.closest('button,a');if(!button)return;
  if(button.id==='menu'||button.id==='close-dialog'||button.dataset.action==='cancel-dialog')return;
  e.stopImmediatePropagation();
  if(button.closest('.brand')){e.preventDefault();renderFamilyPage('Mis hijos');return;}
  if(button.dataset.familyPage){dialog.close();renderFamilyPage(button.dataset.familyPage);return;}
  if(button.dataset.familyChild){openFamilyChild(Number(button.dataset.familyChild));return;}
  if(button.dataset.familyReports){familyReportFilters={student:button.dataset.familyReports,area:''};dialog.close();renderFamilyPage('Informes');return;}
  if(button.dataset.familyReport){openFamilyReport(button.dataset.familyReport);return;}
  if(button.dataset.familyPdf){downloadFamilyReport(button.dataset.familyPdf,button);return;}
  if(button.dataset.familyNotice){openFamilyNotice(button.dataset.familyNotice);return;}
  if(button.dataset.familyAction==='reset-reports'){familyReportFilters={student:'',area:''};renderFamilyReports();}
  if(button.dataset.familyAction==='read-all'){getFamilyNotices().forEach(n=>familyReadSet().add(n.id));refreshFamilyChrome();renderFamilyNotices();}
},true);

// VISTA DEL PROFESIONAL. Los borradores y publicaciones viven solo en memoria.
let activeProfessionalId = professionals[0]?.id ?? null;
let proPage = 'Mis alumnos';
let proFilters = {query:'',category:''};
let proReportFilters = {student:'',status:''};
let editingProReportId = null;
let nextReportNumber = 1;
const currentProfessional = () => professionals.find(p=>p.id===activeProfessionalId);
const proStudents = () => {const p=currentProfessional();return p?assignedStudents(p):[];};
const professionalOwnsStudent = id => proStudents().some(s=>s.id===Number(id));
const proReports = () => familyReports.filter(r=>r.professionalId===activeProfessionalId&&professionalOwnsStudent(r.studentId));
const proReportById = id => demoRole==='professional'?proReports().find(r=>r.id===id):undefined;
function localReportDate(){const date=new Date();return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
function refreshProfessionalSelector(){
  if(!professionals.some(p=>p.id===activeProfessionalId))activeProfessionalId=professionals[0]?.id??null;
  document.querySelector('#demo-professional').innerHTML=professionals.map(p=>`<option value="${p.id}" ${p.id===activeProfessionalId?'selected':''}>${escapeHTML(p.name)} · ${escapeHTML(p.area)}</option>`).join('');
}
function renderProPage(page){
  if(demoRole!=='professional')return;
  proPage=page;closeMenu();const p=currentProfessional();
  document.querySelector('.workspace').innerHTML='<span class="workspace-dot"></span>Espacio profesional<span class="tiny-label">DEMO</span>';
  document.querySelector('.nav-label').textContent='MI TRABAJO';
  document.querySelector('nav').innerHTML=[['users','Mis alumnos'],['chart','Mis informes']].map(([i,name])=>`<button class="nav-item ${page===name?'active':''}" data-pro-page="${name}" ${page===name?'aria-current="page"':''}>${icon(i)}<span>${name}</span>${page===name?'<span class="nav-dot"></span>':''}</button>`).join('');
  document.querySelector('.account').innerHTML=`<span class="avatar">${escapeHTML(initials(p?.name||'Profesional'))}</span><span><strong>${escapeHTML(p?.name||'Sin profesional')}</strong><small>${escapeHTML(p?.area||'Demostración')}</small></span>`;
  document.querySelector('.top-actions').innerHTML='<span class="demo-pill"><span></span>Vista del profesional</span>';
  document.querySelector('.breadcrumb strong').textContent=page;document.title=`Academia Gol · ${page}`;
  const reports=proReports(),children=proStudents();
  main.innerHTML=`<div class="page-heading"><div><div class="eyebrow">ESPACIO PROFESIONAL / ${escapeHTML(p?.area||'MI TRABAJO').toUpperCase()}</div><h1>${page==='Mis alumnos'?'Acompañá a cada alumno.':'Tu mirada, en cada informe.'}</h1><p>${page==='Mis alumnos'?'Consultá los alumnos que la administración te asignó.':'Prepará borradores y compartí informes de tu área con las familias.'}</p></div><button class="primary-button" data-pro-new="" ${children.length?'':'disabled'}>${icon('plus')}Nuevo informe</button></div>
    <div class="student-demo-note">${icon('shield')}<span><strong>Demostración.</strong> Los borradores son privados en esta vista. Los publicados aparecen en Padres y tutores. Todo se pierde al recargar.</span></div>
    <section class="student-stats" aria-label="Resumen del profesional"><article><span>Alumnos asignados</span><strong>${children.length}</strong></article><article><span>Borradores</span><strong>${reports.filter(r=>r.status==='draft').length}</strong></article><article><span>Publicados</span><strong>${reports.filter(r=>r.status==='published').length}</strong></article></section>
    <div id="pro-content"></div><footer class="page-footer"><span>ACADEMIA GOL · Profesional</span><span>Datos ficticios · Sin envíos externos</span></footer>`;
  if(page==='Mis alumnos')renderProStudents();else renderProReports();
  const title=main.querySelector('h1');title.tabIndex=-1;title.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});
}
function renderProStudents(){
  document.querySelector('#pro-content').innerHTML=`<section class="panel student-panel"><div class="section-heading"><div><h2>Mis alumnos</h2><p>Datos básicos y acceso a los informes que preparaste.</p></div></div><div class="student-toolbar"><label class="search-field">Buscar alumno<input type="search" id="pro-student-search" value="${escapeHTML(proFilters.query)}" placeholder="Nombre del alumno" autocomplete="off"></label><label>Categoría<select id="pro-student-category"><option value="">Todas las categorías</option>${categories.map(c=>`<option ${proFilters.category===c?'selected':''}>${escapeHTML(c)}</option>`).join('')}</select></label><button class="secondary-button" data-pro-action="clear-students">Limpiar filtros</button></div><p class="result-count" id="pro-student-count" role="status" aria-live="polite"></p><div id="pro-student-list"></div></section>`;
  renderProStudentRows();
}
function renderProStudentRows(){
  const assigned=proStudents();
  const rows=assigned.filter(s=>normalize(s.name).includes(normalize(proFilters.query))&&(!proFilters.category||s.category===proFilters.category));
  document.querySelector('#pro-student-count').textContent=`${rows.length} de ${assigned.length} alumnos asignados`;
  document.querySelector('#pro-student-list').innerHTML=rows.length?`<table class="student-table"><caption class="sr-only">Alumnos asignados al profesional</caption><thead><tr><th scope="col">Alumno</th><th scope="col">Categoría</th><th scope="col">Estado</th><th scope="col">Mis informes</th><th scope="col">Acciones</th></tr></thead><tbody>${rows.map(s=>`<tr><td data-label="Alumno"><div class="student-identity"><span class="avatar">${escapeHTML(initials(s.name))}</span><span><strong>${escapeHTML(s.name)}</strong><small>AG-${String(s.id).padStart(3,'0')}</small></span></div></td><td data-label="Categoría">${escapeHTML(s.category)}</td><td data-label="Estado"><span class="student-status ${s.status==='Activo'?'is-active':'is-inactive'}">${s.status}</span></td><td data-label="Mis informes">${proReports().filter(r=>r.studentId===s.id).length}</td><td data-label="Acciones"><div class="row-actions"><button data-pro-student="${s.id}">Ver ficha</button><button data-pro-new="${s.id}">Crear informe</button></div></td></tr>`).join('')}</tbody></table>`:`<div class="empty-state">${icon('users')}<h3>${assigned.length?'No encontramos alumnos':'Todavía no tenés alumnos asignados'}</h3><p>${assigned.length?'Probá con otro nombre o categoría.':'La administración puede asignarlos desde Profesionales.'}</p></div>`;
}
function openProStudent(id){
  if(demoRole!=='professional')return;
  const s=proStudents().find(s=>s.id===id);if(!s)return;
  const reports=proReports().filter(r=>r.studentId===id);
  openDialog(escapeHTML(s.name),`<p class="dialog-intro">Ficha del alumno · AG-${String(s.id).padStart(3,'0')}</p><dl class="student-details"><div><dt>Categoría</dt><dd>${escapeHTML(s.category)}</dd></div><div><dt>Nacimiento</dt><dd>${s.birth?readableDate(s.birth):'Sin indicar'}</dd></div><div><dt>Estado</dt><dd>${s.status}</dd></div></dl>
    <h3 class="linked-heading">Mis informes para este alumno (${reports.length})</h3><div class="guardian-children">${reports.length?reports.map(r=>`<button class="linked-child" data-pro-report="${r.id}"><span><strong>${escapeHTML(r.title)}</strong><small>${r.status==='draft'?'Borrador':'Publicado'} · ${readableDate(r.date)}</small></span>${icon('arrow')}</button>`).join(''):'<p class="dialog-intro">Todavía no preparaste informes para este alumno.</p>'}</div><div class="form-actions"><button class="secondary-button" data-action="cancel-dialog">Cerrar</button><button class="primary-button" data-pro-new="${id}">Crear informe</button></div>`);
}
function renderProReports(){
  if(!proStudents().some(s=>String(s.id)===proReportFilters.student))proReportFilters.student='';
  document.querySelector('#pro-content').innerHTML=`<section class="panel student-panel"><div class="section-heading"><div><h2>Mis informes</h2><p>Los publicados quedan en modo de consulta. Podés crear uno nuevo para agregar información.</p></div></div><div class="student-toolbar"><label class="search-field">Alumno<select id="pro-report-student"><option value="">Todos mis alumnos</option>${proStudents().map(s=>`<option value="${s.id}" ${proReportFilters.student===String(s.id)?'selected':''}>${escapeHTML(s.name)}</option>`).join('')}</select></label><label>Estado<select id="pro-report-status"><option value="">Todos</option><option value="draft" ${proReportFilters.status==='draft'?'selected':''}>Borradores</option><option value="published" ${proReportFilters.status==='published'?'selected':''}>Publicados</option></select></label><button class="secondary-button" data-pro-action="clear-reports">Limpiar filtros</button></div><p id="pro-report-count" class="result-count" role="status" aria-live="polite"></p><div id="pro-report-list"></div></section>`;
  renderProReportRows();
}
function renderProReportRows(){
  const rows=proReports().filter(r=>(!proReportFilters.student||String(r.studentId)===proReportFilters.student)&&(!proReportFilters.status||r.status===proReportFilters.status)).slice().sort((a,b)=>b.date.localeCompare(a.date));
  document.querySelector('#pro-report-count').textContent=`${rows.length} informes`;
  document.querySelector('#pro-report-list').innerHTML=rows.length?`<div class="family-report-grid">${rows.map(r=>`<article class="family-report-card"><div class="notice-meta"><span class="report-status ${r.status}">${r.status==='draft'?'Borrador':'Publicado'}</span><small>${readableDate(r.date)}</small></div><h3>${escapeHTML(r.title)}</h3><strong class="report-student">${escapeHTML(r.studentName)}</strong><p>${escapeHTML(r.area)} · ${escapeHTML(r.category)}</p><div class="row-actions"><button data-pro-report="${r.id}">Ver informe</button>${r.status==='draft'?`<button data-pro-edit="${r.id}">Continuar / publicar</button>`:''}</div></article>`).join('')}</div>`:`<div class="empty-state">${icon('chart')}<h3>No hay informes para esta selección</h3><p>Limpiá los filtros o prepará un nuevo informe para uno de tus alumnos.</p></div>`;
}
function openProReport(id){
  const r=proReportById(id);if(!r)return;
  openDialog(escapeHTML(r.title),`<span class="report-status ${r.status}">${r.status==='draft'?'Borrador · No visible para la familia':'Publicado · Visible para la familia'}</span><p class="dialog-intro"><strong>${escapeHTML(r.studentName)}</strong> · ${escapeHTML(r.category)}<br>${escapeHTML(r.professionalName)} · ${escapeHTML(r.area)} · ${readableDate(r.date)}</p><div class="family-report-body"><h3>Objetivo</h3><p>${escapeHTML(r.objective)||'Pendiente de completar.'}</p><h3>Observaciones</h3><p>${escapeHTML(r.observation)||'Pendiente de completar.'}</p><h3>Orientaciones para la familia</h3><p>${escapeHTML(r.recommendation)||'Pendiente de completar.'}</p></div><p class="sample-note">Informe ficticio de demostración. ${r.status==='published'?'Los datos corresponden al momento de publicación.':''}</p><div class="form-actions"><button class="secondary-button" data-action="cancel-dialog">Cerrar</button>${r.status==='draft'?`<button class="primary-button" data-pro-edit="${r.id}">Continuar / publicar</button>`:''}</div>`);
}
function openProReportForm(id=null,studentId=null){
  if(demoRole!=='professional')return;
  const p=currentProfessional(),assigned=proStudents();
  if(!p||!assigned.length)return;
  const report=id?proReportById(id):null;
  if(id&&(!report||report.status!=='draft'))return;
  if(studentId!==null&&!professionalOwnsStudent(studentId))return;
  editingProReportId=id;
  const r=report||{studentId:studentId??'',date:localReportDate(),title:'',objective:'',observation:'',recommendation:''};
  dialog.classList.add('report-editor-dialog');
  openDialog(id?'Continuar borrador':'Nuevo informe',`
    <p class="dialog-intro"><strong>${escapeHTML(p.name)}</strong> · ${escapeHTML(p.area)}<br>Guardá el borrador para continuar después o publicalo para que lo consulte la familia.</p>
    <form id="pro-report-form" class="student-form" data-professional-id="${p.id}" novalidate>
      <label>Alumno *<select name="studentId" required><option value="">Seleccioná un alumno</option>${assigned.map(s=>`<option value="${s.id}" ${r.studentId===s.id?'selected':''}>${escapeHTML(s.name)} · ${escapeHTML(s.category)}</option>`).join('')}</select></label>
      <label>Fecha del informe *<input type="date" name="date" value="${r.date}" max="${localReportDate()}" required></label>
      <label class="full-field">Título *<input name="title" value="${escapeHTML(r.title)}" maxlength="120" required placeholder="Ej.: Participación en actividades de equipo" autocomplete="off"></label>
      <label class="full-field">Objetivo<textarea name="objective" rows="3" maxlength="2000" placeholder="¿Qué se trabajó con el alumno?">${escapeHTML(r.objective)}</textarea></label>
      <label class="full-field">Observaciones<textarea name="observation" rows="4" maxlength="4000" placeholder="Describí las observaciones del área con datos ficticios.">${escapeHTML(r.observation)}</textarea></label>
      <label class="full-field">Orientaciones para la familia<textarea name="recommendation" rows="3" maxlength="2000" placeholder="¿Qué orientación querés compartir?">${escapeHTML(r.recommendation)}</textarea></label>
      <p class="sample-note full-field">* Obligatorio para guardar. Para publicar, completá también los tres textos. Publicar genera un aviso dentro de la demo; no envía mensajes externos. Los informes publicados no se editan.</p>
      <p class="form-error full-field" id="pro-report-error" role="alert"></p>
      <div class="form-actions full-field"><button type="button" class="secondary-button" data-action="cancel-dialog">Cancelar</button><button type="submit" class="secondary-button" name="intent" value="draft">Guardar borrador</button><button type="submit" class="primary-button" name="intent" value="published">Publicar para la familia</button></div>
    </form>`);
  document.querySelector('#pro-report-form [name="studentId"]').focus();
}
// Evita conservar el tamaño grande al abrir después una ficha normal.
dialog.addEventListener('close',()=>dialog.classList.remove('report-editor-dialog'));
document.addEventListener('input',e=>{
  if(demoRole!=='professional')return;
  if(e.target.id==='pro-student-search'){proFilters.query=e.target.value;renderProStudentRows();}
});
document.addEventListener('change',e=>{
  if(e.target.id==='demo-professional'){
    activeProfessionalId=Number(e.target.value);dialog.close();proFilters={query:'',category:''};proReportFilters={student:'',status:''};renderProPage('Mis alumnos');return;
  }
  if(demoRole!=='professional')return;
  if(e.target.id==='pro-student-category'){proFilters.category=e.target.value;renderProStudentRows();}
  if(e.target.id==='pro-report-student'){proReportFilters.student=e.target.value;renderProReportRows();}
  if(e.target.id==='pro-report-status'){proReportFilters.status=e.target.value;renderProReportRows();}
});
document.addEventListener('click',e=>{
  if(demoRole!=='professional')return;
  const button=e.target.closest('button,a');if(!button)return;
  if(button.id==='menu'||button.id==='close-dialog'||button.dataset.action==='cancel-dialog')return;
  if(button.type==='submit'&&button.closest('#pro-report-form'))return;
  e.stopImmediatePropagation();
  if(button.closest('.brand')){e.preventDefault();renderProPage('Mis alumnos');return;}
  if(button.dataset.proPage){dialog.close();renderProPage(button.dataset.proPage);return;}
  if(button.hasAttribute('data-pro-new')){openProReportForm(null,button.dataset.proNew?Number(button.dataset.proNew):null);return;}
  if(button.dataset.proStudent){openProStudent(Number(button.dataset.proStudent));return;}
  if(button.dataset.proReport){openProReport(button.dataset.proReport);return;}
  if(button.dataset.proEdit){openProReportForm(button.dataset.proEdit);return;}
  if(button.dataset.proAction==='clear-students'){proFilters={query:'',category:''};renderProStudents();}
  if(button.dataset.proAction==='clear-reports'){proReportFilters={student:'',status:''};renderProReports();}
},true);
document.addEventListener('submit',e=>{
  if(e.target.id!=='pro-report-form')return;
  e.preventDefault();if(demoRole!=='professional')return;
  const form=e.target,p=currentProfessional();
  if(!p||Number(form.dataset.professionalId)!==p.id)return;
  const old=editingProReportId?proReportById(editingProReportId):null;
  if(editingProReportId&&(!old||old.status!=='draft'))return;
  const publishing=e.submitter?.value==='published';
  const error=document.querySelector('#pro-report-error');error.textContent='';
  ['objective','observation','recommendation'].forEach(name=>{form.elements[name].required=publishing;});
  if(!form.reportValidity())return;
  const values=Object.fromEntries(new FormData(form));
  const student=proStudents().find(s=>s.id===Number(values.studentId));if(!student)return;
  for(const key of ['title','objective','observation','recommendation'])values[key]=String(values[key]||'').trim();
  const missing=['title',...(publishing?['objective','observation','recommendation']:[])].find(key=>!values[key]);
  if(missing){error.textContent='Completá los campos requeridos con texto; no pueden contener solo espacios.';form.elements[missing].focus();return;}
  if(!values.date||values.date>localReportDate()){error.textContent='Seleccioná una fecha válida que no sea futura.';return;}
  if(publishing&&!guardians.some(g=>g.id===student.guardianId)){error.textContent='Este alumno no tiene responsable vinculado. Podés guardar el borrador y pedir a la administración que lo vincule antes de publicar.';return;}
  const report={id:old?.id||`REP-${nextReportNumber++}`,professionalId:p.id,professionalName:p.name,area:p.area,studentId:student.id,studentName:student.name,category:student.category,date:values.date,title:values.title,objective:values.objective,observation:values.observation,recommendation:values.recommendation,status:publishing?'published':'draft',...(publishing?{publishedDate:localReportDate()}:{} )};
  if(old)familyReports[familyReports.findIndex(r=>r.id===old.id)]=report;else familyReports.push(report);
  dialog.close();proReportFilters={student:String(student.id),status:publishing?'published':'draft'};renderProPage('Mis informes');
  announce(publishing?'Informe publicado en la demo. La familia ya puede leerlo y descargarlo.':'Borrador guardado durante esta sesión. La familia todavía no puede verlo.');
});
