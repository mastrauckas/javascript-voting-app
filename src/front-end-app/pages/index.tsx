// pages/index.js
import Head from 'next/head'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>JavaScript Framework Voting</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <Layout />
    </>
  )
}
