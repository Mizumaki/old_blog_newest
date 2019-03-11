import * as KoaRouter from "koa-router";

const router = new KoaRouter();

router.get('/', (ctx, next) => {
  ctx.body = "hello world"
})

router.get('/page', (ctx, next) => {
  // 最高の速度でhtmlを返す
  // 読み込まれた後は、記事データを張り替えるだけ
})

router.get('/img', (ctx, next) => {
  // cacheされているなら、それを
  // されていなければ、普通にpublicのパスから
})

router.get('/article-data', (ctx, next) => {
  // pageで表示したhtml内で非同期に
  // 此奴を呼ぶ。そして、protocol bufferで記事データを返す
  // そいつをバックグラウンドでhtml化する
  // さらにそれを、リンククリックで表示するようにする。つまり、すでにデータはscript上にあり、それを再構築して
  // oclickのイベントで、DOMにマウントする。
  // これならば、無駄にキャッシュを持たせる必要もない！
})

router.get('/error', (ctx, next) => {
  ctx.body = "You were the chosen one!!"
})

router

export default router;
