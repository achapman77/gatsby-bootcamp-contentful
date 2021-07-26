"use strict";

var path = require('path');

module.exports.onCreateNode = function (_ref) {
  var node = _ref.node,
      actions = _ref.actions;
  var createNodeField = actions.createNodeField;

  if (node.internal.type === 'MarkdownRemark') {
    var slug = path.basename(node.fileAbsolutePath, '.md'); // console.log (JSON.stringify(node, undefined, 4))
    // console.log('@@@@@@', slug)

    createNodeField({
      node: node,
      name: 'slug',
      value: slug
    });
  }
};

module.exports.createPages = function _callee(_ref2) {
  var graphql, actions, createPage, blogTemplate, res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          graphql = _ref2.graphql, actions = _ref2.actions;
          createPage = actions.createPage;
          blogTemplate = path.resolve('./src/templates/blog.js');
          _context.next = 5;
          return regeneratorRuntime.awrap(graphql("\n        query {\n            allMarkdownRemark {\n                edges {\n                    node {\n                        fields {\n                            slug\n                        }\n                    }\n                }\n            }\n        }    \n    "));

        case 5:
          res = _context.sent;
          // console.log(JSON.stringify(res, undefined, 4))
          res.data.allMarkdownRemark.edges.forEach(function (edge) {
            createPage({
              component: blogTemplate,
              path: "/blog/".concat(edge.node.fields.slug),
              context: {
                slug: edge.node.fields.slug
              }
            });
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};