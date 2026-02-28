<Data data={users}>
  <Toolbar>
    <DataSearch placeholder="Search users..." />
  </Toolbar>
  <DataTable
    columns={[
      { property: 'name', header: 'Name', primary: true },
      { property: 'email', header: 'Email' },
      { property: 'role', header: 'Role' },
    ]}
  />
</Data>