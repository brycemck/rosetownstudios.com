module.exports = function(eleventyConfig) {

  return {
    templateFormats: ["md", "liquid", "css", "js", "jpg", "png", "svg"],
    passthroughFileCopy: true,
    dir: {
      input: "_src",
      includes: "_templates",
      data: "_data",
      output: "_build"
    }
  }
};