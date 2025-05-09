/**
 * LuaPop - Embeddable Chat Widget for Lua Applications
 */
(function() {
  // LuaPop Widget Embedder Script
  window.LuaPop = window.LuaPop || {};
  
  // Default configuration
  window.LuaPop.config = window.LuaPop.config || {
    authToken: "",
    position: "bottom-right",
    theme: "light",
    buttonText: "Chat with us"
  };
  
  // Initialize the support widget
  window.LuaPop.init = function(config) {
    // Update the configuration
    window.LuaPop.config = {
      ...window.LuaPop.config,
      ...config
    };
    
    // Create iframe for the widget if it doesn't exist
    if (!window.LuaPop.iframe) {
      // Create the iframe
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.border = 'none';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.zIndex = '2147483647'; // Max z-index
      iframe.allow = 'microphone; camera';
      iframe.title = 'LuaPop Chat';
      
      // Set the iframe position based on config
      switch (window.LuaPop.config.position) {
        case 'bottom-left':
          iframe.style.left = '20px';
          iframe.style.bottom = '20px';
          break;
        case 'top-right':
          iframe.style.right = '20px';
          iframe.style.top = '20px';
          break;
        case 'top-left':
          iframe.style.left = '20px';
          iframe.style.top = '20px';
          break;
        case 'bottom-right':
        default:
          iframe.style.right = '20px';
          iframe.style.bottom = '20px';
      }
      
      // Construct the URL with query parameters
      const params = new URLSearchParams();
      Object.entries(window.LuaPop.config).forEach(([key, value]) => {
        params.append(key, String(value));
      });
      
      // Set iframe source - load from CDN in production, localhost in development
      const host = location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://cdn.lualang.org';
      iframe.src = `${host}?${params.toString()}`;

      // Add the iframe to the DOM
      document.body.appendChild(iframe);
      window.LuaPop.iframe = iframe;

      // Handle message events from the iframe
      window.addEventListener('message', function(event) {
        // Handle resize events
        if (event.data && event.data.type === 'LUA_POP_RESIZE') {
          // Resize the iframe when the widget opens/closes
          iframe.style.width = event.data.width || '0';
          iframe.style.height = event.data.height || '0';
        }

        // Forward events to the parent page
        if (event.data && event.data.type === 'LUA_POP_EVENT') {
          // Create a custom event that can be listened to
          const customEvent = new CustomEvent('luapop', { detail: event.data });
          window.dispatchEvent(customEvent);
        }
      });
    } else {
      // Update existing iframe with new config
      const params = new URLSearchParams();
      Object.entries(window.LuaPop.config).forEach(([key, value]) => {
        params.append(key, String(value));
      });

      const host = location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://cdn.lualang.org';
      window.LuaPop.iframe.src = `${host}?${params.toString()}`;
    }
  };
  
  // Expose helper methods
  window.LuaPop.open = function() {
    if (window.LuaPop.iframe) {
      window.LuaPop.iframe.contentWindow.postMessage({ type: 'LUA_POP_COMMAND', command: 'open' }, '*');
    }
  };
  
  window.LuaPop.close = function() {
    if (window.LuaPop.iframe) {
      window.LuaPop.iframe.contentWindow.postMessage({ type: 'LUA_POP_COMMAND', command: 'close' }, '*');
    }
  };
  
  // Auto-initialize if token is already set
  if (window.LuaPop.config.authToken) {
    window.LuaPop.init(window.LuaPop.config);
  }
  
  // Log a friendly message
  console.log('LuaPop widget script loaded. Initialize with window.LuaPop.init({ authToken: "YOUR_TOKEN" })');
})(); 