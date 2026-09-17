<Data data={users}>
  <Toolbar>
    <DataSearch />
    <DataFilters>
      <DataFilter property="role" />
      <DataFilter property="status" />
    </DataFilters>
  </Toolbar>
  <DataTable columns={columns} />
  <Pagination />
</Data>