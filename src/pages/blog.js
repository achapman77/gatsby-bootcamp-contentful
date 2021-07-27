import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import { postList, postItem } from './blog.module.scss'
import Head from '../components/head'

const BlogPage = () => {
    // const data = useStaticQuery(graphql`
    //     query {
    //         allMarkdownRemark(sort: {fields: frontmatter___date, order: ASC}) {
    //             edges {
    //                 node {
    //                     frontmatter {
    //                         title
    //                         date(formatString: "YYYY-MM-DD")
    //                     }
    //                     html
    //                     excerpt(pruneLength: 60)
    //                     id
    //                     fields {
    //                         slug
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // `)
    // const posts = data.allMarkdownRemark.edges

    const data = useStaticQuery(graphql`
        query {
            allContentfulBlogPost(sort: {fields: publishedDate, order: DESC}) {
                edges {
                    node {
                        title
                        slug
                        publishedDate(formatString: "MMMM Do, YYYY")
                        id
                    }
                }
            }
        }
    `)
    
    
    const posts = data.allContentfulBlogPost.edges
    console.info({posts})
    return (
        <Layout>
            <Head title="Blog"/>
            <ol className={ postList }>
               {posts.map((post) => {
                   let node = post.node
                //    let frontmatter = node.frontmatter
                //    console.info(post)
                   return (
                        <li key={node.id} className={ postItem }>
                            <Link to={`/blog/${node.slug}`}>
                                <h2>{node.title}</h2>
                                <p>{node.publishedDate}</p>
                            </Link>
                        </li>
                    )
               })} 
            </ol>
        </Layout>
    )
}

export default BlogPage