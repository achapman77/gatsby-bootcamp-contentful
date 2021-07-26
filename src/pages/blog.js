import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import { postList, postItem } from './blog.module.scss'

const BlogPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark(sort: {fields: frontmatter___date, order: ASC}) {
                edges {
                    node {
                        frontmatter {
                            title
                            date(formatString: "YYYY-MM-DD")
                        }
                        html
                        excerpt(pruneLength: 60)
                        id
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)
    const posts = data.allMarkdownRemark.edges
    // console.info({posts})
    
    return (
        <Layout>
            <ol className={ postList }>
               {posts.map((post) => {
                   let node = post.node
                   let frontmatter = node.frontmatter
                //    console.info(post)
                   return (
                        <li key={node.id} className={ postItem }>
                            <Link to={`/blog/${node.fields.slug}`}>
                                <h2>{frontmatter.title}</h2>
                                <p>{frontmatter.date}</p>
                                <p>{node.excerpt}</p>
                            </Link>
                        </li>
                    )
               })} 
            </ol>
        </Layout>
    )
}

export default BlogPage