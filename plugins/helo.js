export default {
  name: "hello",
  description: "Say hello to the user",
  execute(input) {
    if (input.toLowerCase().includes("hello")) {
      return "👋 Hello there! How can I assist you today?";
    }
    return null;
  },
};
