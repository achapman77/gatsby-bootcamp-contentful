"use strict";

var path = require('path'); // module.exports.onCreateNode = ({ node, actions }) => {
//     const { createNodeField } = actions
//     if (node.internal.type === 'MarkdownRemark') {
//         const slug = path.basename(node.fileAbsolutePath, '.md')
//         // console.log (JSON.stringify(node, undefined, 4))
//         // console.log('@@@@@@', slug)
//         createNodeField({
//             node,
//             name: 'slug',
//             value: slug
//         })
//     }
// }
// module.exports.createPages = async ({ graphql, actions }) => {
//     const { createPage } = actions
//     const blogTemplate = path.resolve('./src/templates/blog.js')
//     const res = await graphql(`
//         query {
//             allMarkdownRemark {
//                 edges {
//                     node {
//                         fields {
//                             slug
//                         }
//                     }
//                 }
//             }
//         }    
//     `)
//     // console.log(JSON.stringify(res, undefined, 4))
//     res.data.allMarkdownRemark.edges.forEach((edge) => {
//         createPage({
//             component: blogTemplate,
//             path: `/blog/${edge.node.fields.slug}`,
//             context: {
//                 slug: edge.node.fields.slug
//             }
//         })
//     })
// }


module.exports.createPages = function _callee(_ref) {
  var graphql, actions, createPage, blogTemplate, res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          graphql = _ref.graphql, actions = _ref.actions;
          createPage = actions.createPage;
          blogTemplate = path.resolve('./src/templates/blog.js');
          _context.next = 5;
          return regeneratorRuntime.awrap(graphql("\n        query {\n            allContentfulBlogPost {\n                edges {\n                    node {\n                        slug\n                    }\n                }\n            }\n        }    \n    "));

        case 5:
          res = _context.sent;
          // console.log(JSON.stringify(res, undefined, 4))
          res.data.allContentfulBlogPost.edges.forEach(function (edge) {
            createPage({
              component: blogTemplate,
              path: "/blog/".concat(edge.node.slug),
              context: {
                slug: edge.node.slug
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