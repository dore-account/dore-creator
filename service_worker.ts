import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, getIdToken } from 'firebase/auth'


const CACHE_NAME = 'cache-v1'

// Initialize the Firebase app in the service worker script.
initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
})

const auth = getAuth()

// idTokenを取得
const getIdTokenPromise = (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (user) {
        getIdToken(user).then(
          (idToken) => {
            resolve(idToken)
          },
          (e) => {
            resolve(null)
          }
        )
      } else {
        resolve(null)
      }
    })
  })
}

// URLからルートのURLを取得する処理
const getOriginFromUrl = (url: any) => {
  const pathArray = url.split('/')
  const protocol = pathArray[0]
  const host = pathArray[2]
  return protocol + '//' + host
}

// Service Workderのライフサイクルでfetchしたときの処理
self.addEventListener('fetch', (event: any) => {
  const fetchEvent: FetchEvent = event

  // Get underlying body if available. Works for text and json bodies.
  function getBodyContent(req: Request) {
    return Promise.resolve().then(() => {
      if (req.method !== 'GET') {
        if (req.headers.get('Content-Type').indexOf('json') !== -1) {
          return req.json().then((json) => {
            return JSON.stringify(json)
          })
        } else {
          return req.text()
        }
      }
    })
  }

  // リクエストをラップして、ヘッダにFirebase AuthのIdTokenを追加する処理
  function requestProcessor(idToken: string | null) {
    let req: Request = event.request
    let processRequestPromise = Promise.resolve()
    // URLを取得して、httpsもしくはlocalhostかなどをチェック
    if (
      self.location.origin == getOriginFromUrl(event.request.url) &&
      (self.location.protocol == 'https:' ||
        self.location.hostname == 'localhost') &&
      idToken
    ) {
      // ヘッダ情報をクローンする
      const headers = new Headers()
      req.headers.forEach((val, key) => {
        headers.append(key, val)
      })
      // クローンしたヘッダにFirebase AuthのIdTokenを追加
      headers.append('Authorization', 'Bearer ' + idToken)

      processRequestPromise = getBodyContent(req).then((body) => {
        try {
          req = new Request(req.url, {
            method: req.method,
            headers: headers,
            mode: 'same-origin',
            credentials: req.credentials,
            cache: req.cache,
            redirect: req.redirect,
            referrer: req.referrer,
            body,
          })
        } catch (e) {
          console.log(e)
          // This will fail for CORS requests. We just continue with the
          // fetch caching logic below and do not pass the ID token.
        }
      })
    }
    return processRequestPromise
      .then(() => {
        return fetch(req)
      })
      .then((response) => {
        // レスポンスが正しくない場合はそのまま返却
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        // request を複製する（ストリームは再利用できないので）
        const responseToCache = response.clone()
        // Save response to cache only for GET requests.
        // Cache Storage API does not support using a Request object whose method is
        // not 'GET'.
        if (req.method === 'GET') {
          caches.open(CACHE_NAME).then((cache) => {
            // cache に登録する
            cache.put(fetchEvent.request, responseToCache)
          })
        }

        // After caching, return response.
        return response
      })
      .catch((error) => {
        // For fetch errors, attempt to retrieve the resource from cache.
        return caches.match(fetchEvent.request.clone())
      })
      .catch((error) => {
        // If error getting resource from cache, do nothing.
        console.log(error)
      })
  }

  // 上の関数を使って、全リクエストでIdTokenの取得し、Firebase AuthのIdTokenを追加ようにする
  event.respondWith(
    getIdTokenPromise().then(requestProcessor, requestProcessor)
  )
})

// Service Workderのライフサイクルでactivateしたときの処理
self.addEventListener('activate', (event: any) => {
  const extendebleEvent: ExtendableEvent = event
  // Update this list with all caches that need to remain cached.
  const cacheWhitelist = ['cache-v1']
  extendebleEvent.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // キャッシュが登録されてるか確認
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      ).then(() => self.clients.claim())
    })
  )
})
