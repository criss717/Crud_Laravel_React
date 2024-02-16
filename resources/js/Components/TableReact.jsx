import React, { useMemo, useState } from "react";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MenuItem,Button ,Box} from '@mui/material'
import {
  MRT_TablePagination,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Inertia } from '@inertiajs/inertia'; // Agrega esta línea
import { useEffect } from "react";
import { router } from "@inertiajs/react";
import { TableHanso } from "./TableHan";
import TotalCalculo from "./TotalCalculo";
import { Height } from "@mui/icons-material";



export default function TableReact({ posts, patch, destroy, setData }) {

  const [edit, setIsEdit] = useState(false)

  const handleEdit = (row) => {
    console.log(row);
  }
  console.log(posts);
  const data = posts
  const columns = useMemo(
    () => [
      {
        accessorKey: "title", //simple recommended way to define a column
        header: "Title",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> //optional custom cell render
      },
      {
        accessorFn: (row) => row.content, //alternate way
        id: "content", //id required if you use accessorFn instead of accessorKey
        header: "Content",
        Header: <i style={{ color: "red" }}>Content</i> //optional custom markup
      },
    ],
    []
  );

  useEffect(() => {
    console.log(data);
  }, [posts])

  const table = useMaterialReactTable({
    data,
    columns,
    enableRowActions: true,
    positionActionsColumn: 'last',
    onEditingRowSave: async ({ row, table }) => {
      try {
        const cambios = row._valuesCache; //en esta propiedad guarda los cambios el row 
        router.visit(route('posts.update',row.original.id ),{
          method:'patch',
          only:['posts','bd'],
          data:cambios,
          preserveState:true,          
        })
        table.setEditingRow(null);
      } catch (error) {
        console.error('Error al guardar:', error);       
      }
    },

    renderRowActionMenuItems: ({ row, table }) => [
      <MenuItem key="edit" onClick={() => {
        table.setEditingRow(row)
        console.log(row);
      }}>
        Edit
      </MenuItem>,
      <MenuItem key="delete" onClick={() => {
        try {          
          router.visit(route('posts.destroy', { id: row.original.id }),{
            method:'delete',
            onBefore:()=>confirm('esta seguri')
          })
        } catch (error) {
          console.error('Error al borrar:', error);         
        }
      }}>
        Delete
      </MenuItem>,
    ],
    enableRowVirtualization:true,
    
    // renderBottomToolbarCustomActions: ({ table }) => (
    //   <TotalCalculo/>       
    // ),
    muiTableContainerProps: { sx: { maxHeight: '300px', height:'300px' } },
    renderBottomToolbar: ({ table }) => (
      <Box>
        <TotalCalculo/>
        <MRT_TablePagination table={table}/>
        
      </Box>
    ),

    initialState: {

      pagination: { pageSize: 5, pageIndex: 0 },

      showGlobalFilter: true,

    },
    muiPaginationProps: {

      rowsPerPageOptions: [5, 10, 15],

      variant: 'outlined',

    },

    paginationDisplayMode: 'pages',
    
  });

  return <MaterialReactTable table={table}  />;
}
