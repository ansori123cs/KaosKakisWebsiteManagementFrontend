import { type RouteConfig, layout, route } from '@react-router/dev/routes';

export default [
  layout('components/layouts/admin-layout.tsx', [
    route('dashboard', 'routes/admin/dashboard.tsx'),
    route('kaoskaki/new', 'routes/admin/form/form-input-kaos.tsx', {
      id: 'new-kaoskaki',
    }),
    route('kaoskaki/edit/:id', 'routes/admin/form/form-input-kaos.tsx', {
      id: 'edit-kaoskaki',
    }),
    route('all-users', 'routes/admin/all-users.tsx'),
  ]),
] satisfies RouteConfig;
