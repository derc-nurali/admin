export const createMainRoute = ({ parent_path = '' }: any) => {
  const prefix = parent_path ? parent_path : '';
  return {
    path: `${prefix}/`,
    re_path: `/`,
    child: {
      // user: createUserRoute(),
    },
  };
};

export const mainRoute = createMainRoute('');
