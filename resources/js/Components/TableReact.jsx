import React, { useMemo, useState } from "react";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MenuItem } from '@mui/material'
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Inertia } from '@inertiajs/inertia'; // Agrega esta línea



export default function TableReact({ posts, patch,destroy,setData }) {

  const [edit, setIsEdit] = useState(false)

  const handleEdit = (row) => {
    console.log(row);
  }
  const data = posts.data
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


  const table = useMaterialReactTable({
    data,
    columns,
    enableRowActions: true,
    positionActionsColumn: 'last',
    onEditingRowSave:async({ row, table }) => {
      
      try {
        const cambios = row._valuesCache; //en esta propiedad guarda los cambios el row  
        console.log(cambios)
        //Inertia.patch(route('posts.update', { id: row.original.id }), cambios); // Asegúrate de reemplazar 'id' con la lógica correcta para obtener el ID de la fila
        const setDataPromise = new Promise((resolve) => {
          setData({ ...cambios });
          resolve();
        });
    
        // Espera a que setDataPromise se resuelva
        await setDataPromise;
        await patch((route('posts.update', {id:row.original.id,title:'perro'})),{title:'loco'})
        table.setEditingRow(null);
      } catch (error) {
        console.error('Error al guardar:', error);
        // Manejar errores, por ejemplo, mostrar un mensaje al usuario
      }
    },

    renderRowActionMenuItems: ({ row, table }) => [
      <MenuItem key="edit" onClick={() => {
        table.setEditingRow(row)
      }}>
        Edit
      </MenuItem>,
      <MenuItem key="delete" onClick={ () => {
        try {
          //Inertia.delete(route('posts.destroy', { id: row.original.id })); // Asegúrate de reemplazar 'id' con la lógica correcta para obtener el ID de la fila
          destroy(route('posts.destroy',{ id: row.original.id }))
        } catch (error) {
          console.error('Error al borrar:', error);
          // Manejar errores, por ejemplo, mostrar un mensaje al usuario
        }
      }}>
        Delete
      </MenuItem>,
    ],

  });

  return <MaterialReactTable table={table} />;
}
