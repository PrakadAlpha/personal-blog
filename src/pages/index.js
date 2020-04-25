import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Prakad Alpha Blog"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `prakadalpha.me`, `javascript`, `react`, `prakadheshwaran`, `prakadalpha`]}
        />
        <img style={{ margin: 0, borderRadius: '50%' }} src="./images/alpha.jpg" alt="Prakad Alpha" />
        <h1>
          Hey people{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <p>Welcome to my blog.!</p>
        <p>I am Full Stack Javascript Developer with specialized knowledge in NodeJS!</p>
        <p>Checkout below link for some cool articles..!</p>
        <Link to="/blog/" target="_blank">
          <Button marginTop="35px">Go to Blog</Button>
        </Link>
      </Layout>
    )
  }
}

export default IndexPage
