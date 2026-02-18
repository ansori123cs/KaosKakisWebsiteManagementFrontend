import { useMemo } from 'react';

export type Role = 'super admin' | 'admin order' | 'admin stok' | 'admin mesin';

export type OrderStatus = 'belum' | 'proses' | 'selesai';

type PermissionContext = {
  statusOrder?: OrderStatus;
};

type Action = 'finishOrder' | 'editOrder' | 'deleteOrder' | 'manageStock';

type PermissionRule = {
  roles: Role[];
  condition?: (ctx?: PermissionContext) => boolean;
};

const permissionMap: Record<Action, PermissionRule> = {
  finishOrder: {
    roles: ['admin mesin'],
    condition: (ctx) => ctx?.statusOrder === 'proses',
  },
  editOrder: {
    roles: ['admin order'],
  },
  deleteOrder: {
    roles: ['admin order'],
  },
  manageStock: {
    roles: ['admin stok'],
  },
};

export const usePermission = (userRoles: Role[]) => {
  const hasPermission = useMemo(() => {
    return (action: Action, context?: PermissionContext) => {
      // Super Admin Bypass
      if (userRoles.includes('super admin')) {
        return true;
      }

      const rule = permissionMap[action];
      if (!rule) return false;

      const roleMatch = rule.roles.some((role) => userRoles.includes(role));

      if (!roleMatch) return false;

      if (rule.condition) {
        return rule.condition(context);
      }

      return true;
    };
  }, [userRoles]);

  return { hasPermission };
};
