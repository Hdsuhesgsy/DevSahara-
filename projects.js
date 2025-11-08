// DevSahara Advanced Projects System
class AdvancedProjectsSystem {
    constructor() {
        this.projects = [];
        this.featuredProjects = [];
        this.projectCategories = [];
        this.init();
    }

    init() {
        this.loadProjectCategories();
        this.loadProjects();
        this.loadFeaturedProjects();
        this.setupEventListeners();
    }

    loadProjectCategories() {
        this.projectCategories = [
            { id: 1, name: "Web Development", icon: "🌐", count: 45 },
            { id: 2, name: "Mobile Apps", icon: "📱", count: 32 },
            { id: 3, name: "AI & Machine Learning", icon: "🤖", count: 28 },
            { id: 4, name: "Fintech", icon: "💳", count: 19 },
            { id: 5, name: "E-commerce", icon: "🛒", count: 23 },
            { id: 6, name: "Healthcare", icon: "🏥", count: 15 },
            { id: 7, name: "Education", icon: "🎓", count: 27 },
            { id: 8, name: "Agriculture", icon: "🌾", count: 12 }
        ];
    }

    loadProjects() {
        this.projects = [
            { 
                id: 1, 
                name: 'African Payment Gateway', 
                description: 'Unified payment processing system for African mobile money and banking platforms', 
                contributors: 15,
                tech: ['Node.js', 'React', 'MongoDB', 'Docker'],
                region: 'africa',
                difficulty: 'Advanced',
                category: 'Fintech',
                progress: 75,
                lookingFor: ['Backend Developers', 'Security Experts'],
                timeline: '3 months',
                repository: 'https://github.com/devsahara/african-payments'
            },
            { 
                id: 2, 
                name: 'Multi-Language Learning Platform', 
                description: 'Interactive platform for learning programming in local African and Asian languages',
                contributors: 8,
                tech: ['Vue.js', 'Python', 'PostgreSQL', 'AWS'],
                region: 'africa-asia',
                difficulty: 'Intermediate',
                category: 'Education',
                progress: 45,
                lookingFor: ['Frontend Developers', 'Content Creators'],
                timeline: '6 months',
                repository: 'https://github.com/devsahara/learn-local'
            },
            { 
                id: 3, 
                name: 'FarmTech Analytics', 
                description: 'AI-powered crop monitoring and market price prediction for African farmers',
                contributors: 12,
                tech: ['Python', 'TensorFlow', 'React Native', 'Firebase'],
                region: 'africa',
                difficulty: 'Advanced',
                category: 'Agriculture',
                progress: 60,
                lookingFor: ['Data Scientists', 'Mobile Developers'],
                timeline: '4 months',
                repository: 'https://github.com/devsahara/farmtech-ai'
            }
        ];
    }

    loadFeaturedProjects() {
        this.featuredProjects = this.projects.filter(p => p.contributors > 10);
    }

    renderProjectCategories() {
        const categoriesHTML = this.projectCategories.map(category => `
            <div class="feature-card" onclick="advancedProjects.filterByCategory(${category.id})">
                <div style="font-size: 2.5rem; margin-bottom: 1rem;">${category.icon}</div>
                <h3>${category.name}</h3>
                <p>${category.count} projects</p>
            </div>
        `).join('');

        // إضافة هذا في صفحة المشاريع
        const categoriesSection = document.getElementById('project-categories');
        if (categoriesSection) {
            categoriesSection.innerHTML = categoriesHTML;
        }
    }

    renderProjects() {
        const projectsList = document.getElementById('projects-list');
        if (!projectsList) return;

        projectsList.innerHTML = this.projects.map(project => `
            <div class="project-card">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <h3>${project.name}</h3>
                    <span class="badge">${project.category}</span>
                </div>
                
                <p>${project.description}</p>
                
                <div class="project-tech">
                    <strong>Technologies:</strong> ${project.tech.join(', ')}
                </div>
                
                <div class="project-meta">
                    <span>🌍 ${project.region.toUpperCase()}</span>
                    <span>⚡ ${project.difficulty}</span>
                    <span>👥 ${project.contributors} contributors</span>
                </div>

                <!-- شريط التقدم -->
                <div style="margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Project Progress</span>
                        <span>${project.progress}%</span>
                    </div>
                    <div style="background: #e9ecef; border-radius: 10px; height: 8px;">
                        <div style="background: var(--gradient); width: ${project.progress}%; height: 100%; border-radius: 10px;"></div>
                    </div>
                </div>

                <!-- الاحتياجات -->
                <div style="margin: 1rem 0;">
                    <strong>Looking for:</strong>
                    <div style="margin-top: 0.5rem;">
                        ${project.lookingFor.map(role => 
                            `<span class="skill-tag">${role}</span>`
                        ).join('')}
                    </div>
                </div>

                <div class="project-actions">
                    <button onclick="advancedProjects.joinProject(${project.id})" class="btn">
                        <span>Join Project</span>
                    </button>
                    <button onclick="advancedProjects.viewDetails(${project.id})" class="btn btn-secondary">
                        <span>View Details</span>
                    </button>
                    <a href="${project.repository}" target="_blank" class="btn btn-secondary">
                        <span>🔗 Repository</span>
                    </a>
                </div>
            </div>
        `).join('');
    }

    joinProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
            if (auth.currentUser) {
                project.contributors++;
                auth.showNotification(`Welcome to ${project.name}! You're now contributor #${project.contributors}`, 'success');
                
                // إضافة المشروع لملف المستخدم
                if (!auth.currentUser.projects) {
                    auth.currentUser.projects = [];
                }
                auth.currentUser.projects.push({
                    id: project.id,
                    name: project.name,
                    joined: new Date().toISOString()
                });
                auth.updateUser(auth.currentUser);
                
                this.renderProjects();
            } else {
                alert('Please login to join projects!');
            }
        }
    }

    viewDetails(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
            // يمكن فتح نافذة منبثقة أو توجيه لصفحة تفصيلية
            const details = `
                <strong>Timeline:</strong> ${project.timeline}
                ${project.repository ? `<br><strong>Repository:</strong> <a href="${project.repository}" target="_blank">${project.repository}</a>` : ''}
            `;
            alert(`Project Details:\n\n${project.name}\n\n${details}`);
        }
    }

    filterByCategory(categoryId) {
        const category = this.projectCategories.find(c => c.id === categoryId);
        if (category) {
            const filtered = this.projects.filter(p => p.category === category.name);
            this.renderFilteredProjects(filtered, category.name);
        }
    }

    renderFilteredProjects(projects, categoryName) {
        const projectsList = document.getElementById('projects-list');
        if (projectsList) {
            if (projects.length === 0) {
                projectsList.innerHTML = `
                    <div style="text-align: center; padding: 3rem; background: var(--gradient-light); border-radius: 15px;">
                        <h3>No projects in ${categoryName} yet</h3>
                        <p>Be the first to start a project in this category!</p>
                        <button class="btn" onclick="advancedProjects.startNewProject()">
                            <span>Start New Project</span>
                        </button>
                    </div>
                `;
            } else {
                projectsList.innerHTML = projects.map(project => `
                    <div class="project-card">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <!-- ... نفس كود العرض السابق ... -->
                    </div>
                `).join('');
            }
        }
    }

    startNewProject() {
        if (auth.currentUser) {
            // يمكن فتح نموذج إنشاء مشروع جديد
            const projectName = prompt('Enter your project name:');
            if (projectName) {
                auth.showNotification(`Project "${projectName}" created successfully!`, 'success');
                // إضافة المشروع الجديد
            }
        } else {
            alert('Please login to start a new project!');
        }
    }

    generateProjectIdea() {
        const ideas = [
            {
                title: "Smart Agriculture Mobile App",
                description: "Mobile app that helps farmers with crop rotation suggestions, weather predictions, and market prices",
                tech: ["React Native", "Node.js", "MongoDB"],
                target: "African farmers"
            },
            {
                title: "Multi-Currency Expense Tracker",
                description: "Web app that tracks expenses across multiple African currencies with automatic conversion",
                tech: ["Vue.js", "Python", "SQLite"],
                target: "African freelancers and businesses"
            },
            {
                title: "Local Language Coding Tutorials",
                description: "Interactive coding tutorials translated to major African and Asian languages",
                tech: ["React", "Node.js", "MySQL"],
                target: "Beginner developers"
            }
        ];
        
        const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
        const ideaDiv = document.getElementById('ai-project-idea');
        ideaDiv.innerHTML = `
            <h4>🤖 AI Project Suggestion</h4>
            <h3>${randomIdea.title}</h3>
            <p>${randomIdea.description}</p>
            <div class="project-tech">
                <strong>Recommended Tech:</strong> ${randomIdea.tech.join(', ')}
            </div>
            <div style="margin: 1rem 0;">
                <strong>Target Audience:</strong> ${randomIdea.target}
            </div>
            <button class="btn" onclick="advancedProjects.startCustomProject('${randomIdea.title}')">
                <span>Start This Project</span>
            </button>
        `;
        ideaDiv.style.display = 'block';
    }

    startCustomProject(projectName) {
        if (auth.currentUser) {
            auth.showNotification(`Great choice! Starting project: ${projectName}`, 'success');
            // توجيه لنموذج إنشاء المشروع
        } else {
            alert('Please login to start a project!');
        }
    }

    setupEventListeners() {
        // إضافة أي event listeners إضافية
    }
}

// استبدال نظام المشاريع القديم بالنظام المتقدم
const advancedProjects = new AdvancedProjectsSystem();

// جعل الدوال متاحة globally
function loadProjects() {
    advancedProjects.renderProjects();
    advancedProjects.renderProjectCategories();
}

function generateProjectIdea() {
    advancedProjects.generateProjectIdea();
}

function joinProject(projectId) {
    advancedProjects.joinProject(projectId);
}

// التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
});
