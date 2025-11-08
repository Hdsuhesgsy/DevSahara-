here// DevSahara Profile Management
class ProfileSystem {
    constructor() {
        this.auth = auth;
        this.init();
    }

    init() {
        if (!this.auth.currentUser) {
            this.showGuestView();
            return;
        }
        this.loadProfile();
        this.setupEventListeners();
    }

    loadProfile() {
        const user = this.auth.currentUser;
        const container = document.getElementById('profile-container');
        
        container.innerHTML = `
            <section class="profile-header fade-in-up">
                <div class="profile-avatar">
                    ${user.avatar ? `<img src="${user.avatar}" alt="${user.name}" style="width: 100%; height: 100%; border-radius: 50%;">` : '👤'}
                </div>
                <h2>${user.name}</h2>
                <p>${this.getCountryName(user.country)} • Joined ${new Date(user.joined).toLocaleDateString()}</p>
                <div style="margin-top: 1rem;">
                    <button class="btn btn-secondary" onclick="profile.editProfile()">
                        <span>✏️ Edit Profile</span>
                    </button>
                </div>
            </section>

            <div class="profile-stats fade-in-up">
                <div class="profile-stat">
                    <div style="font-size: 2rem; font-weight: 800; color: var(--primary-color);">${user.projects?.length || 0}</div>
                    <div>Projects</div>
                </div>
                <div class="profile-stat">
                    <div style="font-size: 2rem; font-weight: 800; color: var(--primary-color);">${user.connections?.length || 0}</div>
                    <div>Connections</div>
                </div>
                <div class="profile-stat">
                    <div style="font-size: 2rem; font-weight: 800; color: var(--primary-color);">${this.calculateExperience(user.joined)}</div>
                    <div>Months Active</div>
                </div>
            </div>

            <div class="profile-tabs">
                <div class="profile-tab active" onclick="profile.showTab('about')">About</div>
                <div class="profile-tab" onclick="profile.showTab('skills')">Skills</div>
                <div class="profile-tab" onclick="profile.showTab('projects')">Projects</div>
                <div class="profile-tab" onclick="profile.showTab('activity')">Activity</div>
            </div>

            <div id="about-tab" class="tab-content active">
                <section class="fade-in-up">
                    <h3>About Me</h3>
                    <p>${user.bio || 'No bio yet. <a href="#" onclick="profile.editProfile()">Add your bio</a>'}</p>
                    
                    <h4 style="margin-top: 2rem;">Contact Information</h4>
                    <p>📧 Email: ${user.email}</p>
                    <p>🌍 Country: ${this.getCountryName(user.country)}</p>
                </section>
            </div>

            <div id="skills-tab" class="tab-content">
                <section class="fade-in-up">
                    <h3>My Skills</h3>
                    <div>
                        ${user.skills && user.skills.length > 0 ? 
                            user.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('') :
                            'No skills added yet. <a href="#" onclick="profile.editProfile()">Add your skills</a>'
                        }
                    </div>
                </section>
            </div>

            <div id="projects-tab" class="tab-content">
                <section class="fade-in-up">
                    <h3>My Projects</h3>
                    <div id="user-projects">
                        ${user.projects && user.projects.length > 0 ? 
                            this.renderUserProjects(user.projects) :
                            '<p>No projects yet. <a href="projects.html">Explore projects</a> to get started!</p>'
                        }
                    </div>
                </section>
            </div>

            <div id="activity-tab" class="tab-content">
                <section class="fade-in-up">
                    <h3>Recent Activity</h3>
                    <div id="user-activity">
                        ${this.generateActivityFeed()}
                    </div>
                </section>
            </div>
        `;
    }

    showTab(tabName) {
        // إخفاء جميع المحتويات
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // إخفاء جميع ألسنة التبويب
        document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // إظهار المحتوى المحدد
        document.getElementById(tabName + '-tab').classList.add('active');
        event.target.classList.add('active');
    }

    editProfile() {
        const user = this.auth.currentUser;
        const newBio = prompt('Enter your bio:', user.bio || '');
        if (newBio !== null) {
            user.bio = newBio;
            this.updateUser(user);
            this.auth.showNotification('Profile updated successfully!', 'success');
            this.loadProfile();
        }
    }

    updateUser(updatedUser) {
        const users = JSON.parse(localStorage.getItem('devsahara_users')) || [];
        const index = users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem('devsahara_users', JSON.stringify(users));
            localStorage.setItem('devsahara_current_user', JSON.stringify(updatedUser));
            this.auth.currentUser = updatedUser;
        }
    }

    getCountryName(code) {
        const countries = {
            'ma': 'Morocco 🇲🇦',
            'dz': 'Algeria 🇩🇿',
            'tn': 'Tunisia 🇹🇳',
            'eg': 'Egypt 🇪🇬',
            'ng': 'Nigeria 🇳🇬',
            'ke': 'Kenya 🇰🇪',
            'za': 'South Africa 🇿🇦',
            'sn': 'Senegal 🇸🇳',
            'in': 'India 🇮🇳',
            'pk': 'Pakistan 🇵🇰',
            'cn': 'China 🇨🇳',
            'jp': 'Japan 🇯🇵',
            'kr': 'Korea 🇰🇷',
            'sa': 'Saudi Arabia ',
            'ae': 'UAE 🇦🇪'
        };
        return countries[code] || 'Unknown Country';
    }

    calculateExperience(joinDate) {
        const join = new Date(joinDate);
        const now = new Date();
        return Math.floor((now - join) / (1000 * 60 * 60 * 24 * 30));
    }

    renderUserProjects(projects) {
        return projects.map(project => `
            <div class="project-card">
                <h4>${project.name}</h4>
                <p>${project.description}</p>
                <div class="project-tech">
                    <strong>Technologies:</strong> ${project.tech.join(', ')}
                </div>
            </div>
        `).join('');
    }

    generateActivityFeed() {
        const activities = [
            'Joined a new project: E-commerce Platform',
            'Completed Python course',
            'Connected with 5 new developers',
            'Posted a coding question',
            'Helped solve a bug in Community Project'
        ];
        
        return activities.map(activity => `
            <div style="padding: 1rem; border-bottom: 1px solid #e2e8f0;">
                <div style="font-weight: 600;">${activity}</div>
                <div style="color: var(--text-light); font-size: 0.9rem;">2 hours ago</div>
            </div>
        `).join('');
    }

    showGuestView() {
        document.getElementById('profile-container').style.display = 'none';
        document.getElementById('guest-view').style.display = 'block';
    }

    setupEventListeners() {
        // يمكن إضافة المزيد من event listeners هنا
    }
}

// تهيئة نظام الملفات الشخصية
const profile = new ProfileSystem();
