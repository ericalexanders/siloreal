export interface User {
  id: number;
  roleId: 1 | 2 | 3;
  name: string;
  permissionIds: Array<1 | 1 | 3>;
  access_token: string;
  // Agrega más propiedades según sea necesario
}

export interface PrivateRouteProps {
  children: React.ReactNode;
  roles: Array<1 | 2 | 3>;
}