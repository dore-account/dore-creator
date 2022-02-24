import { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

const proxy = (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {
    target: process.env.NEXT_PUBLIC_BACKEND_URL,
    changeOrigin: true,
    pathRewrite: [
      {
        patternStr: '^/api/graphql',
        replaceStr: '/graphql',
      },
    ],
    prependPath: true,
  })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default proxy
