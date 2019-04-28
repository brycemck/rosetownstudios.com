module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_src/_assets");

  return {
    templateFormats: ["md", "liquid"],
    passthroughFileCopy: true,
    dir: {
      input: "_src",
      includes: "_templates",
      data: "_data",
      output: "_build"
    }
  }
};