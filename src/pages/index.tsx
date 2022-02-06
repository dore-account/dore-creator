import Head from 'next/head'
import Link from 'next/link'
import { GetServerSidePropsContext } from 'next/types'
import { ReactElement } from 'react'
import { AuthButton } from 'src/components/common/authButton'
import { Layout } from 'src/components/layout/layout'
import styles from '../styles/Home.module.css'

interface Props {
  stars?: string
}

function Home({ stars }: Props) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <Link href="/profile" >
            <a className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>
          </Link>

          <Link href="/login">
            <a className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      headerProps={{
        title: 'home',
        rightComponent: <AuthButton />,
        leftComponent: <></>,
      }}
    >
      {page}
    </Layout>
  )
}

Home.getInitialProps = async (ctx: GetServerSidePropsContext) => {
  return { stars: ctx.req.headers.authorization }
}

export default Home
