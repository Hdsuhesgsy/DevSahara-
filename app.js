// نظام المشاريع
const projects = [
    { id: 1, name: '🌐 موقع DevSahara', description: 'المنصة نفسها التي نطورها معاً!', contributors: 0 },
    { id: 2, name: '📚 مكتبة أدوات عربية', description: 'مكتبة برمجية للتعامل مع النصوص العربية', contributors: 0 }
];

// دالة لعرض المشاريع
function showProjects() {
    document.getElementById('projects').style.display = 'block';
    loadProjects();
}

// دالة لجلب وعرض المشاريع
function loadProjects() {
    const projectsList = document.getElementById('projects-list');
    
    projectsList.innerHTML = projects.map(project => `
        <div class="project-card" style="background: rgba(255,255,255,0.1); padding: 1.5rem; margin: 1rem 0; border-radius: 10px;">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div style="margin-top: 1rem;">
                <span>👥 ${project.contributors} مساهم</span>
                <button onclick="joinProject(${project.id})" style="margin-left: 1rem;">انضم للمشروع</button>
            </div>
        </div>
    `).join('');
}

// دالة للانضمام للمشاريع
function joinProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    project.contributors++;
    alert('🎉 تم انضمامك للمشروع! سيصلك إشعار عند وجود مهام جديدة.');
    loadProjects();
}

console.log('🌍 مرحباً بك في DevSahara!');
