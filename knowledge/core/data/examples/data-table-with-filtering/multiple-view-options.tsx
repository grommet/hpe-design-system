<Data data={users}>
  <Toolbar>
    <DataSearch />
    <DataView>
      <Button icon={<Table />} tip="Table view" />
      <Button icon={<Grid />} tip="Grid view" />
    </DataView>
  </Toolbar>
  
  <DataTable columns={columns} />
  {/* Or alternative: */}
  {/* <Grid columns={{ count: 'fit', size: 'medium' }} gap="small">
    {view === 'grid' && data.map(item => <Card key={item.id}>...</Card>)}
  </Grid> */}
</Data>