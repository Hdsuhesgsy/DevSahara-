// DevSahara AI Assistant - Fixed Version
class DevSaharaAI {
    constructor() {
        this.currentFeature = '';
        this.conversationHistory = [];
    }

    init() {
        console.log('DevSahara AI Assistant initialized');
        this.setupEventListeners();
    }

    setupEventListeners() {
        const userInput = document.getElementById('user-input');
        if (userInput) {
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    openFeature(feature) {
        this.currentFeature = feature;
        const featureContent = document.getElementById('feature-content');
        if (featureContent) {
            featureContent.style.display = 'block';
        }
        this.clearChat();
        
        const welcomeMessages = {
            'code-helper': "Hello! I'm your code assistant. I can help you debug code, explain concepts, or review your projects. What do you need help with?",
            'project-ideas': "Welcome! I can generate project ideas based on your skills and interests. Tell me what technologies you know or want to learn.",
            'learning-path': "Hi! I can create personalized learning paths for you. What's your current skill level and what do you want to achieve?",
            'tech-chat': "Hello! I'm here to chat about any technical topic. What's on your mind?"
        };

        this.addMessage(welcomeMessages[feature] || "Hello! How can I help you today?", 'ai');
    }

    sendMessage() {
        const input = document.getElementById('user-input');
        if (!input) return;
        
        const message = input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        // Show loading
        this.addMessage('Thinking...', 'ai');

        // Simulate AI response after delay
        setTimeout(() => {
            this.removeLastMessage();
            const response = this.generateSmartResponse(message);
            this.addMessage(response, 'ai');
        }, 1000);
    }

    generateSmartResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
            return "For JavaScript projects, I recommend building a web app using React or Vue.js. You could create a task management app, weather dashboard, or e-commerce site. For African/Asian markets, consider adding multi-language support and mobile money payment integration.";
        }
        
        if (lowerMessage.includes('python')) {
            return "Python is great for web development (Django/Flask), data analysis, or automation. Consider building a PDF processor, web scraper for local market data, or an API for mobile applications. Many African startups use Python for fintech solutions.";
        }
        
        if (lowerMessage.includes('project') || lowerMessage.includes('idea')) {
            return "Based on African/Asian market needs: 1) Mobile payment integration app, 2) Multi-language e-commerce platform, 3) Agricultural advisory system, 4) Local job matching platform, 5) Community skill-sharing network, 6) Mobile health information app.";
        }
        
        if (lowerMessage.includes('learn') || lowerMessage.includes('beginner')) {
            return "Start with HTML/CSS/JavaScript fundamentals (2-3 weeks). Then choose: Frontend (React, Vue), Backend (Node.js, Python), or Mobile (React Native). Build small projects weekly. Join African/Asian developer communities for support!";
        }

        if (lowerMessage.includes('error') || lowerMessage.includes('debug')) {
            return "For debugging: 1) Check browser console for errors, 2) Use console.log() to trace values, 3) Test small parts individually, 4) Search Stack Overflow or developer forums. Share your code and I can help identify the issue!";
        }

        if (lowerMessage.includes('salary') || lowerMessage.includes('job')) {
            return "Developer salaries in Africa/Asia vary by country and experience. Junior developers: $500-$1500/month, Mid-level: $1500-$3500, Senior: $3500+. Remote work with international companies often pays more. Focus on building a strong portfolio!";
        }
        
        return "That's an interesting question! For developers in Africa and Asia, I recommend focusing on solutions that solve local challenges - connectivity, payments, education, healthcare, and agriculture. What specific area are you most interested in building for?";
    }

    addMessage(text, sender) {
        const messagesDiv = document.getElementById('chat-messages');
        if (!messagesDiv) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        this.conversationHistory.push({ sender, text });
    }

    removeLastMessage() {
        const messagesDiv = document.getElementById('chat-messages');
        if (!messagesDiv) return;
        
        const lastMessage = messagesDiv.lastElementChild;
        if (lastMessage) {
            messagesDiv.removeChild(lastMessage);
        }
    }

    clearChat() {
        const messagesDiv = document.getElementById('chat-messages');
        if (messagesDiv) {
            messagesDiv.innerHTML = '';
        }
        this.conversationHistory = [];
    }
}

// Global functions for HTML onclick events
let aiAssistant = null;

function openFeature(feature) {
    if (!aiAssistant) {
        aiAssistant = new DevSaharaAI();
        aiAssistant.init();
    }
    aiAssistant.openFeature(feature);
}

function sendMessage() {
    if (aiAssistant) {
        aiAssistant.sendMessage();
    } else {
        // Initialize if not already done
        aiAssistant = new DevSaharaAI();
        aiAssistant.init();
        aiAssistant.sendMessage();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    aiAssistant = new DevSaharaAI();
    aiAssistant.init();
    
    // Check if there's a stored help request from projects page
    const helpRequest = localStorage.getItem('aiHelpRequest');
    if (helpRequest) {
        openFeature('code-helper');
        setTimeout(() => {
            const input = document.getElementById('user-input');
            if (input) {
                input.value = helpRequest;
                sendMessage();
            }
            localStorage.removeItem('aiHelpRequest');
        }, 500);
    }
});
