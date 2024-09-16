export default defineNuxtRouteMiddleware((to) => {
  if (to.path.endsWith("/") && to.path !== "/") {
    return navigateTo(to.path.replace(/\/+$/, ""), { redirectCode: 301 });
  }
});
