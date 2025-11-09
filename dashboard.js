// DevSahara Advanced Dashboard System
class DashboardSystem {
    constructor() {
        this.charts = {};
        this.userStats = {};
        this.init();
    }

    async init() {
        await this.loadUserStats();
        this.initializeCharts();
        this.setupEventListeners();
        this.updateDashboard();
        this.setupRealTimeUpdates();
    }

    async loadUserStats() {
        this.userStats = JSON.parse(localStorage.getItem('devsahara_user_stats')) || {
            progress: 0,
            streak: 0,
            points: 0,
            level: 'beginner',
            timeSpent: 0,
            completedLessons: 0,
            achievements: []
        };

        this.learningData = JSON.parse(localStorage.getItem('devsahara_learning_data')) || {
            dailyProgress: [],
            skillDistribution: {},
            weeklyGoals: {}
        };
    }

    initializeCharts() {
        this.initTimeChart();
        this.initSkillsChart();
        this.initProgressChart();
    }

    initTimeChart() {
        const ctx = document.getElementById('time-chart').getContext('2d');
        this.charts.timeChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Minutes Learned',
                    data: [45, 60, 30, 75, 90, 45, 60],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    initSkillsChart() {
        const ctx = document.getElementById('skills-chart').getContext('2d');
        this.charts.skillsChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Python'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'
                    ]
                }]
            },
            options: {
                responsive: true,
                cutout: '70%'
            }
        });
    }

    initProgressChart() {
        const ctx = document.getElementById('progress-chart').getContext('2d');
        this.charts.progressChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Progress %',
                    data: [20, 45, 60, 85],
                    backgroundColor: '#667eea'
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    setupEventListeners() {
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('devsahara_theme', isDark ? 'dark' : 'light');
        
        // تحديث الألوان في Charts
        this.updateChartThemes();
    }

    updateChartThemes() {
        const isDark = document.body.classList.contains('dark-mode');
        const textColor = isDark ? 'white' : 'black';
        
        Object.values(this.charts).forEach(chart => {
            chart.options.plugins.legend.labels.color = textColor;
            chart.update();
        });
    }

    updateDashboard() {
        this.updateProgressCircle();
        this.updateStreakDisplay();
        this.updatePointsDisplay();
        this.updateRecentActivity();
        this.updateRecommendations();
        this.updateAchievements();
    }

    updateProgressCircle() {
        const progress = this.userStats.progress;
        const circle = document.querySelector('.progress-circle');
        const circumference = 2 * Math.PI * 54;
        const offset = circumference - (progress / 100) * circumference;
        
        circle.style.strokeDashoffset = offset;
        document.getElementById('progress-percent').textContent = `${progress}%`;
    }

    updateStreakDisplay() {
        document.getElementById('current-streak').textContent = this.userStats.streak;
        this.renderStreakCalendar();
    }

    updatePointsDisplay() {
        document.getElementById('total-points').textContent = this.userStats.points;
        document.getElementById('skill-level').textContent = this.userStats.level;
        
        // تحديث شريط تقدم المستوى
        const levelProgress = this.calculateLevelProgress();
        document.getElementById('level-progress-bar').style.width = `${levelProgress}%`;
    }

    calculateLevelProgress() {
        const points = this.userStats.points;
        const levelThresholds = {
            beginner: 0,
            intermediate: 200,
            advanced: 500,
            expert: 1000
        };

        const currentLevel = this.userStats.level;
        const nextLevel = this.getNextLevel(currentLevel);
        const currentThreshold = levelThresholds[currentLevel];
        const nextThreshold = levelThresholds[nextLevel];

        return ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    }

    getNextLevel(currentLevel) {
        const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
        const currentIndex = levels.indexOf(currentLevel);
        return levels[Math.min(currentIndex + 1, levels.length - 1)];
    }

    renderStreakCalendar() {
        const calendar = document.getElementById('streak-calendar');
        const today = new Date();
        
        let calendarHTML = '<div class="streak-days">';
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            
            const isActive = i >= (7 - Math.min(this.userStats.streak, 7));
            calendarHTML += `
                <div class="streak-day ${isActive ? 'active' : ''}">
                    ${date.getDate()}
                </div>
            `;
        }
        
        calendarHTML += '</div>';
        calendar.innerHTML = calendarHTML;
    }

    updateRecentActivity() {
        const activities = this.getRecentActivities();
        const container = document.getElementById('recent-activity');
        
        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-content">
                    <strong>${activity.action}</strong>
                    <p>${activity.details}</p>
                    <small>${this.formatTime(activity.timestamp)}</small>
                </div>
            </div>
        `).join('');
    }

    getRecentActivities() {
        return [
            {
                action: 'Completed Lesson',
                details: 'JavaScript Functions and Scope',
                timestamp: new Date(Date.now() - 3600000)
            },
            {
                action: 'Earned Achievement',
                details: 'First Code Run 🎉',
                timestamp: new Date(Date.now() - 7200000)
            },
            {
                action: 'Joined Study Group',
                details: 'React Masters',
                timestamp: new Date(Date.now() - 86400000)
            }
        ];
    }

    updateRecommendations() {
        const recommendations = adaptiveLearning.getNextRecommendation();
        const container = document.getElementById('recommended-next');
        
        if (recommendations) {
            container.innerHTML = `
                <div class="recommendation-card">
                    <h4>${recommendations.title || 'Continue Learning'}</h4>
                    <p>${recommendations.description || 'Based on your progress, we recommend continuing with your current learning path.'}</p>
                    <button class="btn" onclick="learningSystem.startLesson('${recommendations.id}')">
                        Start Learning
                    </button>
                </div>
            `;
        }
    }

    updateAchievements() {
        const achievements = this.userStats.achievements.slice(-3); // آخر 3 إنجازات
        const container = document.getElementById('recent-achievements');
        
        container.innerHTML = achievements.map(achievement => `
            <div class="achievement-badge">
                <span class="achievement-icon">${achievement.icon}</span>
                <div>
                    <strong>${achievement.name}</strong>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `).join('');
    }

    setupRealTimeUpdates() {
        // تحديث البيانات في الوقت الحقيقي
        setInterval(() => {
            this.updateLiveStats();
        }, 30000); // كل 30 ثانية
    }

    updateLiveStats() {
        // محاكاة تحديث الإحصائيات
        this.userStats.points += Math.floor(Math.random() * 5);
        this.userStats.progress = Math.min(100, this.userStats.progress + 1);
        
        this.saveUserStats();
        this.updateDashboard();
    }

    saveUserStats() {
        localStorage.setItem('devsahara_user_stats', JSON.stringify(this.userStats));
    }

    formatTime(timestamp) {
        const now = new Date();
        const diff = now - new Date(timestamp);
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return `${Math.floor(diff / 86400000)}d ago`;
    }

    // دوال الإجراءات السريعة
    startDailyChallenge() {
        auth.showNotification('Starting Daily Challenge!', 'success');
        window.location.href = 'learning.html#challenges';
    }

    continueLearning() {
        const nextLesson = adaptiveLearning.getNextRecommendation();
        if (nextLesson) {
            learningSystem.startLesson(nextLesson.id);
        }
    }

    joinCommunity() {
        window.location.href = 'community.html';
    }

    askAI() {
        window.location.href = 'ai-assistant.html';
    }
}

const dashboard = new DashboardSystem();
