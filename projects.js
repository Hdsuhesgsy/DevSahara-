// Enhanced projects with AI features
const projects = [
    { 
        id: 1, 
        name: 'DevSahara Platform', 
        description: 'The platform itself that we are building together for African and Asian developers', 
        contributors: 0,
        tech: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
        region: 'africa-asia',
        difficulty: 'Beginner'
    },
    { 
        id: 2, 
        name: 'AI-Powered Code Review Tool', 
        description: 'Automated code review system using AI to help developers improve code quality', 
        contributors: 0,
        tech: ['Python', 'FastAPI', 'React', 'DeepSeek AI'],
        region: 'africa-asia', 
        difficulty: 'Intermediate'
    },
    { 
        id: 3, 
        name: 'Multi-Language E-Commerce Platform',
        description: 'E-commerce solution supporting multiple African and Asian languages and payment methods',
        contributors: 0,
        tech: ['JavaScript', 'Node.js', 'MongoDB', 'Stripe API'],
        region: 'africa-asia',
        difficulty: 'Advanced'
    }
];

function loadProjects() {
    const projectsList = document.getElementById('projects-list');
    
    projectsList.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                <strong>Technologies:</strong> ${project.tech.join(', ')}
            </div>
            <div class="project-meta">
                <span>Difficulty: ${project.difficulty}</span>
                <span>Contributors: ${project.contributors}</span>
                <span>Region: ${project.region}</span>
            </div>
            <div class="project-actions">
                <button onclick="joinProject(${project.id})">Join Project</button>
                <button onclick="getProjectHelp(${project.id})">🤖 Get AI Help</button>
            </div>
        </div>
    `).join('');
}

function joinProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    project.contributors++;
    alert(`Welcome to ${project.name}! You're now contributor #${project.contributors}`);
    loadProjects();
}

function generateProjectIdea() {
    const ideas = [
        "Build a mobile app that helps farmers track crop prices across different African markets",
        "Create a platform for African developers to find remote work with local companies",
        "Develop a multi-language educational platform for coding tutorials in local languages",
        "Build a payment integration system that works across multiple African mobile money platforms",
        "Create a AI-powered code translation tool between different programming languages",
        "Develop a community platform for Asian developers to share resources and collaborate"
    ];
    
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    const ideaDiv = document.getElementById('ai-project-idea');
    ideaDiv.innerHTML = `<h4>🤖 AI Project Suggestion:</h4><p>${randomIdea}</p>`;
    ideaDiv.style.display = 'block';
}

function getProjectHelp(projectId) {
    const project = projects.find(p => p.id === projectId);
    const helpMessage = `I need help with the ${project.name} project. It uses ${project.tech.join(', ')}. Can you suggest some resources or approaches?`;
    
    // Redirect to AI assistant with pre-filled message
    localStorage.setItem('aiHelpRequest', helpMessage);
    window.location.href = 'ai-assistant.html';
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', loadProjects);
