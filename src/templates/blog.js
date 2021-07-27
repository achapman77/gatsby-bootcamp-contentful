import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Head from '../components/head'

// import { BLOCKS, MARKS } from '@contentful/rich-text-react-renderer/node_modules/@contentful/rich-text-types'
// import { renderRichText } from 'gatsby-source-contentful/rich-text'

// const Bold = ({ children }) => <span className="bold">{children}</span>
// const Text = ({ children }) => <p className="align-center">{children}</p>
// ​
// const options = {
//   renderMark: {
//     [MARKS.BOLD]: text => <Bold>{text}</Bold>,
//   },
//   renderNode: {
//     [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
//     [BLOCKS.EMBEDDED_ASSET]: node => {
//       return (
//         <>
//           <h2>Embedded Asset</h2>
//           <pre>
//             <code>{JSON.stringify(node, null, 2)}</code>
//           </pre>
//         </>
//       )
//     },
//   },
// }

// export const query = graphql`
//     query ( $slug: String!) {
//         markdownRemark (fields: { slug: { eq: $slug } }) {
//             frontmatter {
//                 date(formatString: "YYYY-MM-DD")
//                 title
//                 }
//             html
//         }
//     }
// `

// const Blog = (props) => {
//     return (
//         <Layout>
//             <h1>{props.data.markdownRemark.frontmatter.title}</h1>
//             <p>{props.data.markdownRemark.frontmatter.date}</p>
//             <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html}}></div>
//         </Layout>
//     )
// }

export const query = graphql`
    query( $slug: String! ) {
        contentfulBlogPost(slug: {eq: $slug}) {
            id
            title
            publishedDate(formatString: "MMMM Do, YYYY")
            body {
                raw
                references {
                    ... on ContentfulAsset {
                       contentful_id
                       title
                       file {
                          url
                       }
                    }
                 }
            }
        }

    }
`

const Blog = (props) => {
    
    const richText = JSON.parse(props.data.contentfulBlogPost.body.raw)
    
    console.info({richText})
    const references = (props.data.contentfulBlogPost.body.references)
    console.info({references})
    // See for references
    // https://stackoverflow.com/questions/65829246/gatsby-contentful-embedded-image
   const options = {
       renderNode: {
           "embedded-asset-block": (node) => {
               console.log(node)
               const imageID = node.data.target.sys.id
               const {
                   file: {url},
                   title
               } = props.data.contentfulBlogPost.body.references.find(({contentful_id: id}) => id === imageID)
            //    const alt = ''
            //    const url = ''
               return <img alt={title} src={url}/>
           }
       }
   }
    return (
        <Layout>
            <Head title={props.data.contentfulBlogPost.title}/>
            <h1>{props.data.contentfulBlogPost.title}</h1>
            <p>{props.data.contentfulBlogPost.publishedDate}</p>
            { documentToReactComponents(richText, options)}
        </Layout>
    )
}

export default Blog