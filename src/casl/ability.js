import { AbilityBuilder, Ability } from '@casl/ability';

function defineAbilitiesFor(permissions) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  permissions.forEach(permission => {
    can(permission.action, permission.subject);
    // if (permission.action === 'manage' && permission.subject === 'all') {
    //   can('manage', 'all'); // Exemple spécifique pour l'admin
    // } else {
    //   can(permission.action, permission.subject);
    // }
  });

  return build();
}

export default defineAbilitiesFor;