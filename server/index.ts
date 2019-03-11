import * as Koa from "koa";
import router from "./src/router";
import * as http2 from "http2";
import * as fs from "fs";

console.log("\nI'm in matrix 😎\n");

const httpsOptions = {
  key: fs.readFileSync("env/server.key"),
  cert: fs.readFileSync("env/server.crt")
};

const app = new Koa();

const idDev = true; // process.env.NODE_ENV === "development";

// error handling

app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.app.emit("error", ctx, {status: 404, message: "u f**ked up"})
    }
  } catch (err) {
    console.log('error', err)
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", ctx, err);
  }
});

app.on("error", (ctx, err) => {
  console.log("🚧　Error!🚨Error!🚨Error!🚨　🚧");
  console.log(`Error: ${err.status} \n\n Message: ${err.message} \n\n`)
  ctx.redirect("/error");
});

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(router.routes());

const server = http2.createSecureServer(httpsOptions, app.callback());

server.listen(3000);
