import ChipReact from '@/Components/ChipReact';
import InputError from '@/Components/InputError';
import SelectComponent from '@/Components/SelectComponent';
import { TableHanso } from '@/Components/TableHan';
import TablePoda from '@/Components/TablePoda';
import TableReact from '@/Components/TableReact';
import TotalCalculo from '@/Components/TotalCalculo';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Input } from "@material-tailwind/react";

const Index = ({ auth, posts: po, bd }) => {
    console.log(po);

    const role = auth.roles.map((elem) => elem.name === 'cliente' ? elem : null)
    const { data, setData, post, patch, delete: destroy, processing, reset, errors } = useForm({
        title: '',
        content: '',
    })

    const [select, setSelect] = useState('')

    //const [posts, setPosts] = useState([...po.data])

    const handlerChange = (e) => {
        const { name, value } = e.target
        setData(name, value)
    }

    // useEffect(() => {
    //     if(select.length>0){
    //         router.visit(route('posts.search',select),{
    //             method:'get',
    //             onSuccess:(res)=>console.log(res),
    //             only:['posts'],            

    //         })
    //         // fetch(route('posts.search', select))
    //         //     .then(res =>res.json())
    //         //     .then(data=>setPosts(data.data)) 
    //         //     .catch(error => console.error(error))
    //     }

    // },[select])
    const handlerSubmit = (e) => {
        e.preventDefault();
        post(route('posts.store'), { onSuccess: () => reset() }) // esto lo hace inertia manda una solicitud post a la ruta posts.store
    }

    return (
        <Authenticated user={auth}>
            {role[0] && <div className='flex flex-col-reverse w-full justify-center items-center'>

                <div className="w-2/3">
                    <TableReact posts={po.data} patch={patch} destroy={destroy} setData={setData} />
                </div>
                <div className='w-2/3 mb-10'>
                    <SelectComponent setSelect={setSelect} bd={bd} />
                </div>

            </div>
            }
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create your postsss
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={(e) => handlerSubmit(e)}>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    autoComplete="title"
                                    onChange={handlerChange}
                                    value={data.title}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <InputError message={errors.title} />
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                                    Content
                                </label>
                            </div>
                            <div className="mt-2">
                                <textarea
                                    id="content"
                                    name="content"
                                    autoComplete="current-content"
                                    onChange={handlerChange}
                                    value={data.content}
                                    rows={'10'}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <InputError message={errors.content} />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-fill justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={processing}
                            >
                                Create post
                            </button>
                        </div>
                    </form>

                </div>
                <ChipReact />

                <div className="m-10">
                    <TotalCalculo />
                </div>

                <div className="w-full p-12">
                    <TableHanso posts={po.data} />
                </div>

                <div className="w-3 gap-5 flex flex-col">
                    <Input color="purple" label="Kg total" value={'500'} readOnly={true} className="focus:ring-0" />
                    <Input color="purple" label="Kg total" value={'500'} className="focus:ring-0" />
                </div>

            </div>

        </Authenticated>
    )
}

export default Index
