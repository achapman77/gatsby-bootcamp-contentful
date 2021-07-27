import React from "react"
import {Link} from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'


const IndexPage = () => {
  return (
    <Layout>
      <Head title="Home"/>
      <h1>Hello</h1>
      <h2>Adam Chapman</h2>
      <Link to="/contact">Contact Me</Link>
    </Layout>
  )
}

export default IndexPage