import home from "./dist/index.html";

export async function serve() {
  await Bun.$`bun run build`
  const server = Bun.serve({
    routes: {
      "/": home
    }
  })
  console.log(`Server running at http://localhost:${server.port}`);
}

if (import.meta.main) {
  await serve();
}
