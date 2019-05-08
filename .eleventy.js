module.exports = function(eleventyConfig) {

  return {
    templateFormats: ["md", "liquid", "css", "js", "jpg", "png", "svg", "map", "ts", "scss"],
    passthroughFileCopy: true,
    dir: {
      input: "_src",
      includes: "_templates",
      data: "_data",
      output: "_build"
    }
  }
};