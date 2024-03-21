const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  const roles = [
    { name: 'basic' },
    { name: 'editor' },
    { name: 'admin' },
  ]
  const createdRoles = await prisma.role.createMany({
    data: roles,
    skipDuplicates: true
  })

  console.log("Created Roles: ", createdRoles)

  const permissions = [
    { name: 'create' },
    { name: 'edit' },
    { name: 'view' },
    { name: 'delete' }
  ];

  const createdPermissions = await prisma.permission.createMany({
    data: permissions
  })

  console.log("Created Permissions: ", createdPermissions)

  const movies = [
    { title: 'X-Men 97 (2024)', img: 'https://www.themoviedb.org/t/p/w1280/oudLzoZ9vqcH7BQAOAeHeC7bcjT.jpg' },
    { title: 'Bob Marley: One Love (2024)', img: 'https://www.themoviedb.org/t/p/w1280/ayaApnFGwc6hHJHry59GjfWuTSK.jpg' },
    { title: 'Madame Web (2024)', img: 'https://www.themoviedb.org/t/p/w1280/blq050GHBt0Fzx1j9FvohaEuknJ.jpg' },
    { title: 'Dune: Parte dos (2024)', img: 'https://www.themoviedb.org/t/p/w1280/v2NN1TMK3ifuiEyawa3ukkcSOUQ.jpg' },
  ]

  const createdMovies = await prisma.movie.createMany({
    data: movies
  })

  console.log("Created Movies: ", createdMovies)

  const basicRole = await prisma.role.findUnique({ where: { name: 'basic' } })
  const editorRole = await prisma.role.findUnique({ where: { name: 'editor' } })
  const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } })

  const permissionAll = await prisma.permission.findMany()

  // basic:   [create, view]
  // editor:  [create, view, edit]
  // admin:   [create, view, edit, delete]

  for (let i=0; i < permissionAll.length; i++) {
    const permission = permissionAll[i]
    if (permission.name === 'create') {
      console.log("Crete Permission")
      const data = [
        { roleId: basicRole.id, permissionId: permission.id },
        { roleId: editorRole.id, permissionId: permission.id },
        { roleId: adminRole.id, permissionId: permission.id }
      ]
      await prisma.rolePermission.createMany({ data })
      console.log("Completed, Crete Permission \n")
    }

    if (permission.name === 'view') {
      console.log("View Permission")
      const data = [
        { roleId: basicRole.id, permissionId: permission.id },
        { roleId: editorRole.id, permissionId: permission.id },
        { roleId: adminRole.id, permissionId: permission.id }
      ]
      await prisma.rolePermission.createMany({ data })
      console.log("Completed, View Permission \n")
    }

    if (permission.name === 'edit') {
      console.log("Edit Permission")
      const data = [
        { roleId: editorRole.id, permissionId: permission.id },
        { roleId: adminRole.id, permissionId: permission.id }
      ]
      await prisma.rolePermission.createMany({ data })
      console.log("Completed, Edit Permission\n")
    }

    if (permission.name === 'delete') {
      console.log("Delete Permission")
      const data = [
        { roleId: adminRole.id, permissionId: permission.id }
      ]
      await prisma.rolePermission.createMany({ data })
      console.log("Completed, delete Permission \n")
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });