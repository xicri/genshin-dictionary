export default function({ route, redirect }) {
  if (!route.path.endsWith("/")) {
    redirect(301, route.path + "/");
  }
}
