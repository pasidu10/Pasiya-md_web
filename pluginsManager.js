const plugins = [];

async function loadPlugins() {
  const pluginFiles = ["hello.js", "weather.js"]; // add plugin files here
  for (const file of pluginFiles) {
    const plugin = await import(`./plugins/${file}`);
    plugins.push(plugin.default);
  }
}

function handleInput(input) {
  for (const plugin of plugins) {
    const response = plugin.execute(input);
    if (response) return response;
  }
  return "🤖 Sorry, I didn’t understand that.";
}

export { loadPlugins, handleInput };
