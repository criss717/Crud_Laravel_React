import React, { useEffect, useMemo, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchOffIcon from '@mui/icons-material/SearchOffOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { ContentCopy } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/Print';
import { MenuItem, Checkbox, Box, Button, IconButton, Tooltip } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_ToggleDensePaddingButton,
    MRT_ToggleFullScreenButton,
} from "material-react-table";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const data = [
    {
        id: "1",
        codigo_prov: "Informática del fúturo",
        codigo_ag: "7706659-V",
        zona: "0000",
        n_poligono: "Si",
        n_parcela: "No",
        uso_sig: "Si",
        s_sig: "Si",
        asesor: "Cristian"

    },
    {
        id: "2",
        codigo_prov: "Ejemplo",
        nif: "7706659-V",
        zona: "0000",
        n_poligono: "Si",
        n_parcela: "Si",
        uso_sig: "No",
        s_sig: "No",
        asesor: "Cristian"
    }

]
export default function TablePoda({ posts, patch, destroy, setData }) {

    const [edit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showSearch, setShowSearch] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, [3000])
    }, [isLoading])

    const handleEdit = (row) => {
        console.log(row);
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: "n_parcela",
                header: "Nombre parcela",
                grow: false,
                size: 80,
                disableFilters: true,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>, //optional custom cell render                                                                   

            },
            {
                accessorKey: "n_orden",
                header: "Nº orden",
                size: 150,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>, //optional custom cell render

            },
            {
                accessorKey: "fecha_poda",
                header: "Fecha poda",
                size: 120,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span> //optional custom cell render
            },
            {
                accessorKey: "t_poda",
                header: "Tipo de poda",
                size: 120,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span> //optional custom cell render
            },
            {
                accessorKey: "ut_poda",
                header: "Utiles de poda",
                size: 120,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span> //optional custom cell render
            },
            {
                accessorKey: "p_poda",
                header: "Picados de restos poda",
                size: 120,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span> //optional custom cell render
            },
            {
                accessorKey: "f_pic_poda",
                header: "Fecha picado poda",
                size: 120,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span> //optional custom cell render
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
        //editDisplayMode:'row',
        createDisplayMode: 'modal',
        muiTableHeadCellProps: {
            //no useTheme hook needed, just use the `sx` prop with the theme callback
            sx: (theme) => ({
                color: theme.palette.text.primary,
            }),
        },
        muiTableBodyRowProps: ({ row }) => ({
            //conditionally style selected rows
            sx: {
                fontWeight: row.getIsSelected() ? 'bold' : 'normal',
            },
        }),
        positionToolbarAlertBanner: 'bottom', //show selected rows count on bottom toolbar

        renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
                <Button
                    color="success"
                    style={{ fontSize: 'small', padding: '0 1em 0 1em', fontWeight: 'bold' }}
                    onClick={() => {
                        table.setCreatingRow(true)
                    }}
                    variant="contained"
                >
                    Agregar
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

        renderToolbarInternalActions: ({ table }) => (
            <Box>
                {
                    !showSearch ? <SearchIcon style={{ cursor: 'pointer' }} onClick={() => {
                        table.setShowGlobalFilter(true)
                        setShowSearch(true)
                    }} />
                        : <SearchOffIcon style={{ cursor: 'pointer' }} onClick={() => {
                            table.setShowGlobalFilter(false)
                            setShowSearch(false)
                        }} />
                }
                <IconButton
                    onClick={() => {
                        window.print();
                    }}
                >
                    <PrintIcon />
                </IconButton>
                <MRT_ToggleDensePaddingButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />
            </Box>
        ),
        renderRowActions: ({ row, staticRowIndex, table }) => (
            <Box sx={{ display: 'flex', gap: '5px' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>

        ),
        // renderRowActionMenuItems: ({ row, table }) => [
        //     <MenuItem key="edit" onClick={() => {
        //         table.setEditingRow(row) //abrimos vista edit             

        //     }}>
        //         Edit
        //     </MenuItem>,
        //     <MenuItem key="delete" onClick={() => {
        //         const id = row.original.id; //id original de la bd, puesto que la tabla puede modificar posiciones
        //         destroy(route('posts.destroy', id))
        //     }}>
        //         Delete
        //     </MenuItem>,
        // ],
        onEditingRowSave: async ({ row, table }) => { //cuando le damos a guardar el cambio de la fila
            const id = row.original.id; //id original de la bd, puesto que la tabla puede modificar posiciones           
            await setData(row._valuesCache)
            var fetch = () => {
                return patch(route('posts.update', id))
            }
            table.setEditingRow(null) //cerramos la vista de edit
        },
        muiCreateDialogProps: {
            title: 'Nuevo Elemento', // Personaliza el título del diálogo de creación
            // ... otros props del diálogo de creación
        },
        state: { //para renderizar eskeletons
            isLoading,
            // showProgressBars: isLoading,          
        },
        localization: MRT_Localization_ES,
        muiTableBodyCellProps: {
            align: 'center',
            sx: {
                borderRight: '2px solid rgba(224, 224, 224, 1)',
            }
        },
        muiTableHeadCellProps: {
            align: 'center',
            sx: {
                borderRight: '2px solid rgba(224, 224, 224, 1)',
                background: '#DAF7A6',
                maxHeight: '80px',
                fontSize: 'small',
                maxWidth: '100px',
                padding: '5px',
                boxShadow: '4px 0 8px rgba(0, 0, 0, 0.1)',
                whiteSpace: 'nowrap', // Evita que el texto se rompa en varias líneas
                overflow: 'hidden', // Oculta el texto que desborda
                textOverflow: 'ellipsis',
            },
        },
        // muiTableContainerProps:{ //altura tabla
        //     sx: {
        //       maxHeight: '100px',
        //     },
        //   },

        initialState: { density: 'compact' },
        enableColumnActions: false,
        enableColumnFilters: false,
        enableColumnResizing: true, //con esto podemos modificar el ancho y alto de las celdas


    });
    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#81980f',
            },
            secondary: {
                main: '#00bcd4',
            },
        },
    });

    return <ThemeProvider theme={theme}>
        <MaterialReactTable columns={columns} data={data} table={table} />
    </ThemeProvider>
}
