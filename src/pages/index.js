import React from "react"
import {Link} from 'gatsby'
import Layout from '../components/layout'

const IndexPage = () => {
  return (
    <Layout>
      <h1>Hello</h1>
      <h2>Adam Chapman</h2>
      <Link to="/contact">Contact Me</Link>
    </Layout>
  )
}

export default IndexPage