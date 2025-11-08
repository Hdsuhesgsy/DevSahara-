// DevSahara AI Assistant - Complete AI Integration
class DevSaharaAI {
    constructor() {
        this.apiKey = 'sk-your-free-deepseek-api-key'; // I'll handle this
        this.currentFeature = '';
        this.conversationHistory = [];
    }

    // Initialize AI features
    init() {
        console.log('DevSahara AI Assistant initialized');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Enter key support
        document.getElementById('user-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    // Open different AI features
    openFeature(feature) {
        this.currentFeature = feature;
        document.getElementById('feature-content').style.display = 'block';
        this.clearChat();
        
        const welcomeMessages = {
            'code-helper': "Hello! I'm your code assistant. I can help you debug code, explain concepts, or review your projects. What do you need help with?",
            'project-ideas': "Welcome! I can generate project ideas based on your skills and interests. Tell me what technologies you know or want to learn.",
            'learning-path': "Hi! I can create personalized learning paths for you. What's your current skill level and what do you want to achieve?",
            'tech-chat': "Hello! I'm here to chat about any technical topic. What's on your mind?"
        };

        this.addMessage(welcomeMessages[feature], 'ai');
    }

    // Send message to AI
    async sendMessage() {
        const input = document.getElementById('user-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        // Show loading
        this.addMessage('Thinking...', 'ai');

        try {
            // For now, using mock responses - I'll integrate real API
            const response = await this.getAIResponse(message);
            this.removeLastMessage(); // Remove "Thinking..."
            this.addMessage(response, 'ai');
        } catch (error) {
            this.removeLastMessage();
            this.addMessage("I'm having trouble connecting right now. Here's a sample response based on your question: " + this.generateSmartResponse(message), 'ai');
        }
    }

    // Smart response generator (fallback when API is unavailable)
    generateSmartResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
            return "For JavaScript projects, I recommend building a web app using modern frameworks like React or Vue.js. Consider creating a task management app or a weather dashboard that uses APIs.";
        }
        
        if (lowerMessage.includes('python')) {
            return "Great choice! Python is perfect for web development with Django/Flask, data analysis with Pandas, or automation scripts. You could build a PDF processor or a web scraper.";
        }
        
        if (lowerMessage.includes('project') || lowerMessage.includes('idea')) {
            return "Based on African/Asian market needs, consider building: 1) Local payment integration system, 2) Multi-language e-commerce platform, 3) Mobile agriculture advisory app, 4) Community skill-sharing platform.";
        }
        
        if (lowerMessage.includes('learn') || lowerMessage.includes('beginner')) {
            return "Start with HTML/CSS/JavaScript fundamentals. Then choose a path: Frontend (React), Backend (Node.js/Python), or Mobile (React Native). Practice with small projects and gradually increase complexity.";
        }
        
        return "That's an interesting question! For developers in Africa and Asia, I recommend focusing on solutions that address local challenges like connectivity, payments, and multi-language support. What specific area are you most interested in?";
    }

    // Mock API response (I'll replace with real DeepSeek API)
    async getAIResponse(message) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return this.generateSmartResponse(message);
    }

    // Chat management
    addMessage(text, sender) {
        const messagesDiv = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        this.conversationHistory.push({ sender, text });
    }

    removeLastMessage() {
        const messagesDiv = document.getElementById('chat-messages');
        const lastMessage = messagesDiv.lastElementChild;
        if (lastMessage) {
            messagesDiv.removeChild(lastMessage);
        }
    }

    clearChat() {
        const messagesDiv = document.getElementById('chat-messages');
        messagesDiv.innerHTML = '';
        this.conversationHistory = [];
    }
}

// Global functions for HTML onclick events
let aiAssistant;

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
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    aiAssistant = new DevSaharaAI();
    aiAssistant.init();
});
