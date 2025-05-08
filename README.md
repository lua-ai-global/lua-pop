# LuaPop

LuaPop is an embeddable chat widget for Lua applications, similar to Intercom or Zendesk, that allows your customers to chat with your support team directly from your website.

## Features

- 🚀 Easy integration with just a single script tag
- 💬 Chat with Lua
- 🎨 Customizable position
- 🔒 Authentication via API tokens
- 📱 Mobile-friendly responsive design

## Getting started

### Installation

#### Using the Hosted Script

Add the script to your website:

```html
<script src="https://lua-ai-global.github.io/lua-popup-demo/lua-pop.umd.js"></script>
<script>
  // Initialize the widget with your configuration
  window.LuaPop.init({
    authToken: "YOUR_API_TOKEN",
    position: "bottom-right", // bottom-right, bottom-left, top-right, top-left
    theme: "light", // light or dark
    buttonText: "Chat with us",
    greeting: "Hi there! How can we help you today?"
  });
</script>
```
