import ability from './ability'

export const canNavigate = to => to.matched.some(route => ability.can(route.meta.action || 'read', route.meta.resource))

export const canNavigateToForm = to =>{ // do not touch, WIP
  // console.log(to.action);
  return ability.can(to.action || 'read', to.resource)
  // const params = to.matched
  // console.log(params);
  // return to.matched.some(route => ability.can(route.params.action || 'read', route.params.resource))
}
export const _ = undefined
