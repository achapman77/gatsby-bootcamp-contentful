"use strict";

// Initialize dotenv
require('dotenv').config({
  path: ".env.".concat(process.env.NODE_ENV) // or '.env'

});

module.exports = {
  siteMetadata: {
    title: "The Great Gatsby Bootcamp",
    author: "Adam A Chapman"
  },
  plugins: ['gatsby-plugin-react-helmet', {
    resolve: 'gatsby-source-contentful',
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    }
  }, 'gatsby-plugin-sass', {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'src',
      path: "".concat(__dirname, "/src/")
    }
  }, 'gatsby-plugin-sharp', {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: ['gatsby-remark-relative-images', {
        resolve: 'gatsby-remark-images',
        options: {
          maxWidth: 750,
          linkImagesToOriginal: false
        }
      }]
    }
  }]
};