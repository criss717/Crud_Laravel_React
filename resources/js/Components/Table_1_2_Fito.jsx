import React, { useEffect, useMemo, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/Close';
import { ContentCopy } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/Print';
import { MenuItem, Checkbox, Box, Button, IconButton } from '@mui/material'
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_ToggleDensePaddingButton,
    MRT_ToggleFullScreenButton,
    MRT_GlobalFilterTextField
} from "material-react-table";
import { Inertia } from '@inertiajs/inertia'; // Agrega esta línea
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import DatePicker from '@mui/lab/DatePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';



const data = [
    {
        n_orden: "1",
        nombre: "Informática del fúturo",
        nif: "7706659-V",
        n_ropo: "0000",
        basico: "1",
        cualif: "1",
        fumig: "0",
        piloto: "0",
        fecha_act: "01/10/2024"

    },
    {
        n_orden: "2",
        nombre: "Ejemplo",
        nif: "7706659-V",
        n_ropo: "0000",
        basico: "1",
        cualif: "1",
        fumig: "0",
        piloto: "0",
        fecha_act: "1/09/2023"

    }

]
export default function Table_1_2_Fito({ posts, patch, destroy, setData }) {

    const [edit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showSearch, setShowSearch] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null);
    const [openDatePicker, setOpenDatePicker] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, [3000]);
    }, [showSearch]);

    const handleEdit = (row) => {
        console.log(row);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setOpenDatePicker(false);
    };
    const columns = useMemo(
        () => [

            {
                accessorKey: "n_orden",
                header: "Nº orden",
                size: 50,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>,
                 //optional custom cell render                 
                // muiTableHeadCellProps: { sx: { color: "green" } }, //custom props              
            },
            {
                accessorKey: "nombre",
                header: "Nombre y apellidos/Empresas de servicios",
                size: 300,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>, //optional custom cell render
                enableClickToCopy: true,
                muiCopyButtonProps: {
                    fullWidth: false,
                    startIcon: <ContentCopy />,
                    sx: { justifyContent: 'flex-start' },
                },
            },
            {
                accessorKey: "nif",
                header: "NIF",
                size: 50,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span> //optional custom cell render
            },
            {
                accessorKey: "n_ropo",
                header: "Nº inscripción ROPO / nº carné",
                size: 250,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span> //optional custom cell render
            },
            {
                header: "Básico",
                accessorKey: "basico",
                size: 50,
                Cell: ({ value, row, setValue, renderedCellValue }) => (
                    <Checkbox
                        checked={renderedCellValue === "1"}
                        onChange={(e) => setValue(e.target.checked)}
                    />
                ),
            },
            {
                header: "Cualif.",
                accessorKey: "cualif",
                size: 50,
                Cell: ({ value, row, setValue, renderedCellValue }) => (
                    <Checkbox
                        checked={renderedCellValue === "1"}
                        onChange={(e) => setValue(e.target.checked)}
                    />
                ),
            },
            {
                header: "Fumig",
                accessorKey: "fumig",
                size: 50,
                Cell: ({ value, row, setValue, renderedCellValue }) => (
                    <Checkbox
                        checked={renderedCellValue === "1"}
                        onChange={(e) => setValue(e.target.checked)}
                    />
                ),
            },
            {
                header: "Piloto",
                accessorKey: "piloto",
                size: 50,
                Cell: ({ value, row, setValue, renderedCellValue }) => (
                    <Checkbox
                        checked={renderedCellValue === "1"}
                        onChange={(e) => setValue(e.target.checked)}
                    />
                ),
            },
            {
                accessorFn: (row) => new Date(row.fecha_act),
                header: "Fecha Actualización",
                size: 50,
                filterVariant: 'date',
                filterFn: 'lessThan',
                sortingFn: 'datetime',
                Cell: ({ cell }) => <span>{cell.getValue()?.toLocaleDateString()}</span>,               
              
                
            },
        ],
        []
    );


    const table = useMaterialReactTable({
        data,
        columns,
        enableRowActions: true,
        positionActionsColumn: 'last',
        enableRowSelection: true,
        initialState: { showGlobalFilter: false },
        muiTableHeadCellProps: {
            //no useTheme hook needed, just use the `sx` prop with the theme callback
            sx: (theme) => ({
                color: theme.palette.text.success,
            }),
        },
        muiTableBodyRowProps: ({ row }) => ({
            //conditionally style selected rows
            sx: {
                fontWeight: row.getIsSelected() ? 'bold' : 'normal',
            },
        }),

        positionToolbarAlertBanner: 'bottom', //show selected rows count on bottom toolbar

        //add custom action buttons to top-left of top toolbar

        renderTopToolbarCustomActions: ({ table }) => (

            <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>

                <Button
                    color="success"
                    onClick={() => {
                        alert('Create New Account');
                    }}
                    variant="contained"
                >
                    +
                </Button>
                <Button
                    color="error"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={() => {
                        alert('Delete Selected Accounts');
                    }}
                    variant="contained"
                >
                    Eliminar ordenes
                </Button>
            </Box>
        ),

        //customize built-in buttons in the top-right of top toolbar

        renderToolbarInternalActions: ({ table }) => (
            <Box>
                {/* add custom button to print table  */}
                {
                    showSearch ? <SearchOffIcon style={{ cursor: 'pointer' }} onClick={() => {
                        table.setShowGlobalFilter(false);
                        setShowSearch(false)
                    }} />
                        : <SearchIcon style={{ cursor: 'pointer' }} onClick={() => {
                            table.setShowGlobalFilter(true);
                            setShowSearch(true)
                        }} />

                }
                <IconButton
                    onClick={() => {
                        window.print();
                    }}
                >
                    <PrintIcon />
                </IconButton>
                {/* along-side built-in buttons in whatever order you want them */}

                <MRT_ToggleDensePaddingButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />
            </Box>
        ),

        onEditingRowSave: async ({ row, table }) => {

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
                await patch((route('posts.update', { id: row.original.id, title: 'perro' })), { title: 'loco' })
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
            <MenuItem key="delete" onClick={() => {
                try {
                    //Inertia.delete(route('posts.destroy', { id: row.original.id })); // Asegúrate de reemplazar 'id' con la lógica correcta para obtener el ID de la fila
                    destroy(route('posts.destroy', { id: row.original.id }))
                } catch (error) {
                    console.error('Error al borrar:', error);
                    // Manejar errores, por ejemplo, mostrar un mensaje al usuario
                }
            }}>
                Delete
            </MenuItem>,
        ],
        localization: MRT_Localization_ES,
        muiTableBodyCellProps: {
            align: 'center',
            sx:{
                borderRight:'2px solid white',  

            }
        },
        muiTableHeadCellProps:{
            align: 'center',
            sx:{
                borderRight:'2px solid white', 
                background:'#DAF7A6' 

            }
        },
        muiTableProps:{
            sx:{
                background:'#DAF7A6', 
            }
            

        }

    });


    const theme = createTheme({
        palette: {
            mode:'light',             
            primary: {
                main: '#81980f',
            },
            secondary: {
                main: '#00bcd4',
            },
        },
    });


    return (
        <ThemeProvider theme={theme}>
            <MaterialReactTable columns={columns} data={data} table={table}/>
        </ThemeProvider>
    );
}
