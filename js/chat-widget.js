// ============================================
// RAG Chat Widget - JavaScript
// ============================================

class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.isProcessing = false;
        this.apiEndpoint = '/api/chat'; // Vercel serverless function
        
        this.init();
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
        this.showWelcomeMessage();
    }

    createWidget() {
        const widgetHTML = `
            <div class="chat-widget" id="chatWidget">
                <button class="chat-toggle" id="chatToggle" aria-label="Abrir chat">
                    <span class="chat-icon">
                        <i class="fas fa-comments"></i>
                    </span>
                    <span class="close-icon">
                        <i class="fas fa-times"></i>
                    </span>
                </button>
                
                <div class="chat-container">
                    <div class="chat-header">
                        <img src="img/logo2.png" alt="Jorge Zuta" class="chat-header-avatar" onerror="this.style.display='none'">
                        <div class="chat-header-info">
                            <h4>Asistente de Jorge</h4>
                            <div class="chat-header-status">
                                <span class="status-dot"></span>
                                <span>Conectado a GitHub</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="chat-messages" id="chatMessages"></div>
                    
                    <div class="suggested-questions" id="suggestedQuestions">
                        <button class="suggestion-btn" data-message="Muéstrame tus repositorios de GitHub">
                            <i class="fas fa-folder"></i> Ver repositorios
                        </button>
                        <button class="suggestion-btn" data-message="¿Qué tecnologías dominas?">
                            <i class="fas fa-code"></i> Tecnologías
                        </button>
                        <button class="suggestion-btn" data-message="Háblame de tu experiencia">
                            <i class="fas fa-briefcase"></i> Experiencia
                        </button>
                        <button class="suggestion-btn" data-message="¿Cuál es tu proyecto más destacado?">
                            <i class="fas fa-star"></i> Proyectos destacados
                        </button>
                    </div>
                    
                    <div class="chat-input-wrapper">
                        <form class="chat-input-form" id="chatForm">
                            <input 
                                type="text" 
                                class="chat-input" 
                                id="chatInput" 
                                placeholder="Pregunta sobre mis proyectos..."
                                maxlength="500"
                                autocomplete="off"
                            >
                            <button type="submit" class="chat-send-btn" id="sendBtn">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }

    attachEventListeners() {
        const toggle = document.getElementById('chatToggle');
        const form = document.getElementById('chatForm');
        const suggestedBtns = document.querySelectorAll('.suggestion-btn');

        toggle.addEventListener('click', () => this.toggleChat());
        form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        suggestedBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                this.sendMessage(message);
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const widget = document.getElementById('chatWidget');
        widget.classList.toggle('active', this.isOpen);

        if (this.isOpen) {
            document.getElementById('chatInput').focus();
        }
    }

    showWelcomeMessage() {
        const welcomeHTML = `
            <div class="welcome-message">
                <h3>Hola! Soy el asistente de Jorge</h3>
                <p>Puedo contarte sobre sus proyectos en GitHub, tecnologías, experiencia y más. ¿En qué puedo ayudarte?</p>
            </div>
        `;
        document.getElementById('chatMessages').innerHTML = welcomeHTML;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (!message || this.isProcessing) return;

        input.value = '';
        await this.sendMessage(message);
    }

    async sendMessage(message) {
        if (this.isProcessing) return;

        this.isProcessing = true;
        document.getElementById('sendBtn').disabled = true;

        // Agregar mensaje del usuario
        this.addMessage(message, 'user');
        
        // Mostrar indicador de escritura
        this.showTypingIndicator();

        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    conversationHistory: this.conversationHistory
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al procesar tu mensaje');
            }

            const data = await response.json();
            
            // Remover indicador de escritura
            this.removeTypingIndicator();
            
            // Agregar respuesta del bot
            this.addMessage(data.reply, 'bot');

            // Actualizar historial
            this.conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: data.reply }
            );

            // Mantener solo últimos 6 mensajes en historial (3 intercambios)
            if (this.conversationHistory.length > 6) {
                this.conversationHistory = this.conversationHistory.slice(-6);
            }

        } catch (error) {
            console.error('Chat error:', error);
            this.removeTypingIndicator();
            this.addMessage(
                `Lo siento, hubo un error: ${error.message}. Por favor intenta nuevamente o contacta directamente a Jorge en jzuta309@gmail.com`,
                'bot',
                true
            );
        } finally {
            this.isProcessing = false;
            document.getElementById('sendBtn').disabled = false;
            document.getElementById('chatInput').focus();
        }
    }

    addMessage(content, sender, isError = false) {
        const messagesContainer = document.getElementById('chatMessages');
        
        // Remover mensaje de bienvenida si existe
        const welcome = messagesContainer.querySelector('.welcome-message');
        if (welcome) {
            welcome.remove();
        }

        const time = new Date().toLocaleTimeString('es-CL', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        const avatarSrc = sender === 'user' 
            ? 'img/foto_ejecutivo.jpg' 
            : 'img/logo2.png';

        const messageHTML = `
            <div class="message ${sender}">
                <img src="${avatarSrc}" alt="${sender}" class="message-avatar" onerror="this.style.display='none'">
                <div class="message-content">
                    <div class="message-bubble ${isError ? 'error-message' : ''}">
                        ${this.formatMessage(content)}
                    </div>
                    <div class="message-time">${time}</div>
                </div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    formatMessage(content) {
        // Convertir URLs en enlaces
        let formatted = content.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );

        // Convertir negritas
        formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
        // Convertir saltos de línea
        formatted = formatted.replace(/\n/g, '<br>');

        return formatted;
    }

    showTypingIndicator() {
        const indicator = `
            <div class="message bot typing-indicator" id="typingIndicator">
                <img src="img/logo2.png" alt="bot" class="message-avatar" onerror="this.style.display='none'">
                <div class="message-content">
                    <div class="message-bubble">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('chatMessages').insertAdjacentHTML('beforeend', indicator);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }
}

// Inicializar el widget cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ChatWidget();
    });
} else {
    new ChatWidget();
}
