// Projects system for African & Asian developers
const projects = [
    { 
        id: 1, 
        name: 'DevSahara Platform', 
        description: 'The platform itself that we are building together for African and Asian developers', 
        contributors: 0,
        region: 'africa-asia',
        tech: ['HTML', 'CSS', 'JavaScript', 'Node.js']
    },
    { 
        id: 2, 
        name: 'Open Source Tools Library', 
        description: 'Comprehensive library of programming tools and utilities in multiple languages', 
        contributors: 0,
        region: 'africa-asia',
        tech: ['Python', 'Java', 'JavaScript', 'PHP']
    },
    { 
        id: 3, 
        name: 'E-Learning Platform', 
        description: 'Educational platform dedicated to programming and technology courses', 
        contributors: 0,
        region: 'africa-asia',
        tech: ['React', 'Node.js', 'MongoDB', 'Express']
    },
    { 
        id: 4, 
        name: 'Localization Tools', 
        description: 'Tools for software localization and translation for African and Asian languages', 
        contributors: 0,
        region: 'africa-asia',
        tech: ['Python', 'JavaScript', 'API Development']
    }
];

// Function to show projects section
function showProjects() {
    hideAllSections();
    document.getElementById('projects').style.display = 'block';
    loadProjects();
}

// Function to show about section
function showAbout() {
    hideAllSections();
    document.getElementById('about').style.display = 'block';
}

// Function to show contribute section
function showContribute() {
    hideAllSections();
    document.getElementById('contribute').style.display = 'block';
}

// Function to show home section
function showHome() {
    hideAllSections();
    document.getElementById('home').style.display = 'block';
}

// Function to hide all sections
function hideAllSections() {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

// Function to load and display projects
function loadProjects() {
    const projectsList = document.getElementById('projects-list');
    
    projectsList.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                <strong>Technologies:</strong> ${project.tech.join(', ')}
            </div>
            <div class="project-stats">
                <span>Contributors: ${project.contributors}</span>
                <span>Region: ${project.region}</span>
                <button onclick="joinProject(${project.id})">Join Project</button>
            </div>
        </div>
    `).join('');
}

// Function to join a project
function joinProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        project.contributors++;
        alert(`Successfully joined ${project.name}! You will be notified when new tasks are available.`);
        loadProjects(); // Refresh the projects list
    }
}

// Function to filter projects by technology
function filterProjects(technology) {
    const filteredProjects = technology ? 
        projects.filter(project => project.tech.includes(technology)) : 
        projects;
    
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = filteredProjects.map(project => `
        <div class="project-card">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                <strong>Technologies:</strong> ${project.tech.join(', ')}
            </div>
            <div class="project-stats">
                <span>Contributors: ${project.contributors}</span>
                <span>Region: ${project.region}</span>
                <button onclick="joinProject(${project.id})">Join Project</button>
            </div>
        </div>
    `).join('');
}

// Navigation event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click events to navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            
            if (target === 'home') showHome();
            else if (target === 'projects') showProjects();
            else if (target === 'about') showAbout();
            else if (target === 'contribute') showContribute();
        });
    });
    
    // Show home section by default
    showHome();
});

// Welcome message
console.log('Welcome to DevSahara - African & Asian Developers Platform');
