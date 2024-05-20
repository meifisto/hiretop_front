import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import { canNavigate, canNavigateToForm } from '../casl/routeProtection'

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  // users routes --------------------------------------
  {
    path: '/users/login',
    name: 'users-login',
    component: () => import('@/views/users/Login.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  {
    path: '/users/register',
    name: 'users-register',
    component: () => import('@/views/users/Register.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  // businesses routes --------------------------------------
  {
    path: '/businesses/list',
    name: 'businesses-list',
    component: () => import('@/views/businesses/List.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  {
    path: '/business/impact',
    name: 'business-impact',
    component: () => import('@/views/businesses/Impact.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  {
    path: '/businesses/details/:id?',
    name: 'businesses-details',
    component: () => import('@/views/businesses/Details.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  // talents routes --------------------------------------
  // {
  //   path: '/talents/list',
  //   name: 'talents-list',
  //   component: () => import('@/views/talents/List.vue'),
  //   meta: {
  //     // action: 'read',
  //     // resource: 'commissaire',
  //   },
  // },
  {
    path: '/talents/details/:id?',
    name: 'talents-details',
    component: () => import('@/views/talents/Details.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  // offers routes --------------------------------------
  {
    path: '/offers/list/talent',
    name: 'offers-list-talent',
    component: () => import('@/views/offers/ListTalent.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  {
    path: '/offers/list/business',
    name: 'offers-list-business',
    component: () => import('@/views/offers/ListBusiness.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  {
    path: '/offers/create',
    name: 'offers-create',
    component: () => import('@/views/offers/Create.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  {
    path: '/offers/details/:id?',
    name: 'offers-details',
    component: () => import('@/views/offers/Details.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  {
    path: '/offers/details/business/:id?',
    name: 'offers-details-business',
    component: () => import('@/views/offers/DetailsBusiness.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  // candidacies routes --------------------------------------
  {
    path: '/candidacies/list',
    name: 'candidacies-list',
    component: () => import('@/views/candidacies/ListTalent.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  {
    path: '/candidacies/list/business',
    name: 'candidacies-list-business',
    component: () => import('@/views/candidacies/ListBusiness.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  {
    path: '/candidacies/create/:offer_id?',
    name: 'candidacies-create',
    component: () => import('@/views/candidacies/Create.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  {
    path: '/candidacies/details/:candidacy_id?',
    name: 'candidacies-details',
    component: () => import('@/views/candidacies/DetailsBusiness.vue'),
    meta: {
      // action: 'read',
      // resource: 'commissaire',
    },
  },
  // ---------------------------------------------------
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
import utilsService from '@/services/utils/utils.service'
const { isAuthenticated } = utilsService.currentUserUtils();

router.beforeEach((to, _, next) => {
  // console.log('to::: ', to);
  // localstorageService.getRoutesCode()
  // const isLoggedIn = isUserLoggedIn();
  // const isLicenceSet = licenceSet();

  // if (!canNavigate(to)) {
  if (true) {
    // Redirect to login if not logged in
    // if (isAuthenticated === false) return next({ name: "users-login" });
    return next();
  }

  // return next({ name: "admin-home" });

  return next();
});

export default router;
