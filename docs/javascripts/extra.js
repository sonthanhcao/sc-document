// Custom JavaScript for SC Documentation

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize custom components
    initializeProgressBars();
    initializeCopyButtons();
    initializeSearchEnhancement();
    initializeScrollToTop();
    initializeCodeHighlighting();
    initializeTableOfContents();
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Progress bar functionality
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.sc-progress__bar');
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-progress') || '0';
        bar.style.width = percentage + '%';
    });
}

// Copy button functionality for code blocks
function initializeCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = '📋';
        button.title = 'Copy to clipboard';
        button.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 4px;
            padding: 4px 8px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.2s ease;
        `;
        
        button.addEventListener('click', function() {
            const text = block.textContent;
            navigator.clipboard.writeText(text).then(() => {
                button.innerHTML = '✅';
                button.style.background = 'rgba(16, 185, 129, 0.2)';
                setTimeout(() => {
                    button.innerHTML = '📋';
                    button.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            });
        });
        
        // Add button to pre element
        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
}

// Enhanced search functionality
function initializeSearchEnhancement() {
    const searchInput = document.querySelector('.md-search__input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 2) {
                highlightSearchTerms(query);
            } else {
                removeSearchHighlights();
            }
        });
    }
}

// Highlight search terms in content
function highlightSearchTerms(query) {
    removeSearchHighlights();
    const content = document.querySelector('.md-content');
    if (content) {
        const walker = document.createTreeWalker(
            content,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            if (text.toLowerCase().includes(query)) {
                const span = document.createElement('span');
                span.innerHTML = text.replace(
                    new RegExp(query, 'gi'),
                    match => `<mark class="search-highlight">${match}</mark>`
                );
                textNode.parentNode.replaceChild(span, textNode);
            }
        });
    }
}

// Remove search highlights
function removeSearchHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceWith(parent.textContent);
    });
}

// Scroll to top button
function initializeScrollToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: var(--sc-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    `;
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
}

// Code highlighting enhancement
function initializeCodeHighlighting() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        // Add line numbers
        const lines = block.textContent.split('\n');
        if (lines.length > 1) {
            const lineNumbers = document.createElement('div');
            lineNumbers.className = 'line-numbers';
            lineNumbers.style.cssText = `
                position: absolute;
                left: 0;
                top: 0;
                width: 40px;
                background: rgba(0, 0, 0, 0.1);
                padding: 1rem 0.5rem;
                font-family: monospace;
                font-size: 0.875em;
                color: #6b7280;
                text-align: right;
                user-select: none;
            `;
            
            lineNumbers.innerHTML = lines.map((_, i) => i + 1).join('\n');
            block.parentElement.style.paddingLeft = '50px';
            block.parentElement.appendChild(lineNumbers);
        }
    });
}

// Enhanced table of contents
function initializeTableOfContents() {
    const toc = document.querySelector('.md-nav--secondary');
    if (toc) {
        // Add sticky positioning
        toc.style.position = 'sticky';
        toc.style.top = '20px';
        toc.style.maxHeight = 'calc(100vh - 40px)';
        toc.style.overflowY = 'auto';
        
        // Highlight current section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const tocLink = toc.querySelector(`a[href="#${id}"]`);
                if (tocLink) {
                    if (entry.isIntersecting) {
                        toc.querySelectorAll('a').forEach(link => link.classList.remove('active'));
                        tocLink.classList.add('active');
                    }
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('h1, h2, h3').forEach(heading => {
            if (heading.getAttribute('id')) {
                observer.observe(heading);
            }
        });
    }
}

// Add CSS for search highlights
const searchHighlightCSS = `
    .search-highlight {
        background-color: #fbbf24;
        color: #1f2937;
        padding: 2px 4px;
        border-radius: 2px;
        font-weight: 600;
    }
    
    .scroll-to-top:hover {
        background: #2563eb !important;
        transform: translateY(-2px);
    }
    
    .copy-button:hover {
        background: rgba(255, 255, 255, 0.2) !important;
    }
    
    .md-nav__link.active {
        color: var(--sc-primary) !important;
        font-weight: 600;
        background-color: rgba(59, 130, 246, 0.1);
        border-radius: 4px;
        padding: 4px 8px;
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = searchHighlightCSS;
document.head.appendChild(style);

// Analytics tracking (if needed)
function trackPageView() {
    // Add your analytics code here
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
}

// Track page views
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackPageView);
} else {
    trackPageView();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.md-search__input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close search
    if (e.key === 'Escape') {
        const searchInput = document.querySelector('.md-search__input');
        if (searchInput && document.activeElement === searchInput) {
            searchInput.blur();
        }
    }
});

// Performance monitoring
function measurePageLoadTime() {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        // Send to analytics if needed
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'load',
                value: loadTime
            });
        }
    });
}

measurePageLoadTime();

// Print styles
const printCSS = `
    @media print {
        .md-header,
        .md-sidebar,
        .scroll-to-top,
        .copy-button {
            display: none !important;
        }
        
        .md-content {
            margin: 0 !important;
            padding: 0 !important;
        }
        
        pre {
            white-space: pre-wrap !important;
            word-wrap: break-word !important;
        }
    }
`;

const printStyle = document.createElement('style');
printStyle.textContent = printCSS;
document.head.appendChild(printStyle); 