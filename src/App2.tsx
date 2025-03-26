//import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import './App.css'
import toast from "react-hot-toast";
import { sleep } from "./utils/sleep";
import { Pencil, Trash, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Transferencia } from "./interface.ts/transferencia";
import { deleteTransferencia, getTranferencia, postTranferencia, updateTransferencia } from "./lib/transferencia/getTranferencia";
import { useAppDispatch, useAppSelector } from "./store/storeRedux";
import { Movimientos } from './components/movimientos';
import { onAddTransferencia, onError, onRemoveTodo, onStartTranferenciaLoading, onTransferenciaLoaded, onUpdateTransferencia } from "./store/movimientos/movimientosSlice";

interface FormValues {
    cuentaDestino: string;
    amount: string;
    description: string;
    cuentaOrigen: string
}


const App2 = () => {

    /*
    !!! NUEVO
    */
    const dispatch = useAppDispatch();
    const { movimientos, loadingMovimiento: loading, errorMessageMovimiento: error } = useAppSelector(state => state.movimientos);

    const [idFinal, setIdFinal] = useState<number>(0);
    /*
    */
    const initialValues: FormValues = {
        cuentaDestino: "",
        amount: "",
        description: "",
        cuentaOrigen: ""
    };
    const validationSchema = Yup.object({
        cuentaDestino: Yup.string().required("El numero de cuenta es obligatorio")
            .min(5, "Debe tener al menos 5 caracteres"),
        amount: Yup.string()
            .required("El monto es obligatorio")
            .matches(/^\d+(\.\d{1,2})?$/, "Ingrese monto valido"),
        description: Yup.string().required("La description es obligatoria"),
        cuentaOrigen: Yup.string().required("Seleccione una cuenta"),
    });


    const [transf, setTransf] = useState<Transferencia>({
        id: idFinal,
        fecha: new Date(), // "23/03/2025
        tipo: "",
        descripcion: "",
        cuenta: "",
        monto: 0.0
    })
    const handleSubmit = (values: FormValues, { resetForm }: { resetForm: () => void }) => {
        console.log("Formulario enviado:", values);

        //setIdFinal(() => Number(movimientos[movimientos.length - 1].id));

        /*dispatch(onAddTransferencia({
            id: Number((movimientos[movimientos.length - 1].id) + 1),
            fecha: new Date(),
            tipo: "enviado",
            descripcion: values.description,
            cuenta: values.cuentaDestino,
            monto: Number(values.amount)
        }))*/
        /*toast.promise(sleep(1500), {
           loading: 'Realizando Transferencia',
           success: () => {
   
               console.log("Enviando servidor")
   
               postTranferencia(nuevaTransferencia).then((response) => {
                   if (!response.ok) {
                       setError(response.message);
                   } else {
                       obtenerTranferencia();
                   }
               })
   
               resetForm();
               return 'Transferencia exitosa'
           },
           error: 'Error when fetching',
       });*/

        const nuevaTransferencia: Transferencia = {
            ...transf,
            tipo: "enviado",
            descripcion: values.description,
            cuenta: values.cuentaDestino,
            monto: Number(values.amount)
        };
        setTransf(nuevaTransferencia);

        toast.promise(sleep(1500), {
            loading: 'Realizando Transferencia',
            success: () => {

                console.log("Enviando servidor")

                postTranferencia(nuevaTransferencia).then((response) => {
                    if (!response.ok) {
                        //setError(response.message);
                    } else {
                        dispatch(onAddTransferencia({
                            id: Number((movimientos[movimientos.length - 1].id) + 1),
                            fecha: new Date(),
                            tipo: "enviado",
                            descripcion: values.description,
                            cuenta: values.cuentaDestino,
                            monto: Number(values.amount)
                        }))
                    }
                })

                resetForm();
                return 'Transferencia exitosa'
            },
            error: 'Error when fetching',
        });
    };
    /* 
     SEGUNDA PARTE
    */
    //const [error, setError] = useState<string | null | undefined>(null);
    //const [data, setData] = useState<Transferencia[]>();
    //const [loading, setLoading] = useState(true);

    const obtenerTranferencia = async () => {
        //setLoading(true);
        dispatch(onStartTranferenciaLoading());



        getTranferencia().then((response) => {
            // setLoading(false);
            if (!response.ok) {
                //setError(response.message);
                dispatch(onError(response.message!))
            } else {
                //setData(response.data as Transferencia[]);
                dispatch(onTransferenciaLoaded(response.data as Transferencia[]))
                console.log(movimientos, loading, error);

                //console.log(data)
            }
        })
    };


    useEffect(() => {
        obtenerTranferencia();

    }, []);

    const [isOpen, setIsOpen] = useState(false);



    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ errors, touched }) => ( // Agregar destructuración aquí

                <div className='flex gap-4'>
                    <Form className=' w-[30%] border-2 bg-white shadow-md rounded px-4 pt-7 pb-8  '>

                        <h1 className='text-left font-bold'>Nueva Transferencia</h1>
                        <div className="mb-2 w-full">
                            <label className="block text-gray-700 text-sm font-bold my-1 text-left" htmlFor="cuentaOrigen">

                            </label>
                            <Field
                                as="select"
                                name="cuentaOrigen"
                                id="cuentaOrigen"
                                className={`w-full p-2 border rounded ${errors.cuentaOrigen && touched.cuentaOrigen ? "border-red-500 bg-red-100" : "border-black-300"}`}>
                                <option value="">Seleccione cuenta</option>
                                <option value="1" >Cuenta Corriente - *** 7890(E5,842.75)</option>
                            </Field>
                            <ErrorMessage name="cuentaOrigen" component="div" className="text-left text-red-500 text-sm" />

                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold my-1 text-left" htmlFor="cuentaDestino">
                                Cuenta de Destino
                            </label>
                            <Field className={`w-full p-2 border rounded ${errors.cuentaDestino && touched.cuentaDestino ? "border-red-500 bg-red-100" : "border-black-300"}`} type='text' name='cuentaDestino' />
                            <ErrorMessage name="cuentaDestino" component="div" className="text-left text-red-500 text-sm" />

                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold my-2 text-left" htmlFor="amount">
                                Monto
                            </label>
                            <Field className={`w-full p-2 border rounded ${errors.amount && touched.amount ? "border-red-500 bg-red-100" : "border-black-300"}`} type='text' name='amount' />
                            <ErrorMessage name="amount" component="div" className="text-left text-red-500 text-sm" />

                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold my-2 text-left" htmlFor="description">
                                Descripcion
                            </label>
                            <Field
                                as="textarea"
                                name="description"
                                id="description"
                                rows={4}
                                className={`w-full p-2 border rounded ${errors.description && touched.description ? "border-red-500 bg-red-100" : "border-black-300"}`}>
                            </Field>
                            <ErrorMessage name="description" component="div" className="text-left text-red-500 text-sm" />

                        </div>
                        <div className="mb-4 flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900" htmlFor='remember'>Guardar como beneficiario frecuente</label>
                        </div>
                        <div className="mb-4">
                            <button onClick={(e) => {

                            }} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Realizar Transferencia</button>

                        </div>


                    </Form>
                    <div className='w-[70%] border border-collapse overflow-hidden ' >
                        <h1 className='text-left font-bold'>Historial de Transferencia</h1>

                        <table className="w-full border-collapse border border-gray-300 mt-4">
                            <thead>
                                <tr className="bg-gray-400 text-white">
                                    <th className="border border-gray-300 px-2">Fecha</th>
                                    <th className="border border-gray-300 px-4">Tipo</th>
                                    <th className="border border-gray-300 px-4">Descripcion</th>
                                    <th className="border border-gray-300 px-4">Cuenta</th>
                                    <th className="border border-gray-300 px-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading &&
                                    <tr>
                                        <td className="" colSpan={5}>Espere un momento, cargando informacion</td>
                                    </tr>
                                }
                                {//data?.map((item) => (
                                    !error && [...movimientos].reverse()?.map((item) => (
                                        <tr key={item.id} className="bg-gray-100 border border-gray-300">
                                            <td className="border border-gray-300 px-4 py-2">
                                                {item.fecha.toLocaleString()}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {item.tipo}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">

                                                {item.descripcion}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {
                                                    item.cuenta
                                                }

                                            </td>
                                            <td className="flex border border-gray-300 px-4 py-2">

                                                <button onClick={() => {
                                                    setIsOpen(true)
                                                    setTransf(item)

                                                }
                                                }
                                                    type="submit" className="overflow-hidden bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1" >
                                                    <Pencil size={11} />
                                                </button>
                                                <button className="overflow-hidden bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1" onClick={() => {
                                                    toast.promise(sleep(1500), {
                                                        loading: 'Eliminando su transferencia',
                                                        success: () => {

                                                            console.log("Enviando servidor")

                                                            deleteTransferencia(item.id).then((response) => {
                                                                if (!response.ok) {
                                                                    //setError(response.message);
                                                                } else {
                                                                    //obtenerTranferencia();
                                                                    dispatch(onRemoveTodo(item.id));
                                                                }
                                                            })
                                                            return 'Success Delete'
                                                        },
                                                        error: 'Error when fetching',
                                                    });
                                                }}>
                                                    <Trash size={11} />
                                                </button>
                                            </td>

                                        </tr>
                                    ))

                                }
                            </tbody>
                        </table>

                    </div>
                    <div className="flex justify-center items-center min-h-screen">

                        {isOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm">
                                <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full relative">
                                    <button
                                        onClick={
                                            () => {
                                                setIsOpen(false)

                                            }
                                        }
                                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                                    >
                                        <X size={20} />
                                    </button>
                                    <h2 className="text-xl font-semibold mb-4">Edita tu Transferencia</h2>
                                    <form className="space-y-4">
                                        <label className="block text-gray-700 text-left">Monto</label>
                                        <input type="text" placeholder="Monto" className="w-full p-1 border rounded-md" value={transf.monto} readOnly />
                                        <label className="block text-gray-700 text-left">Cuenta Destino</label>
                                        <input type="text" placeholder="Cuenta" className="w-full p-2 border rounded-md" value={transf.cuenta} readOnly />
                                        <label className="block text-gray-700 text-left">Fecha</label>
                                        <input type="date" placeholder="fecha" className="w-full p-2 border rounded-md" value={String(transf.fecha)} readOnly />
                                        <label className="block text-gray-700 text-left">Descpricion</label>
                                        <textarea placeholder="descripcion" className="w-full p-2 border rounded-md" value={transf.descripcion} onChange={(value) => {
                                            const editTransferencia: Transferencia = {
                                                ...transf,
                                                descripcion: String(value.target.value),

                                            };
                                            setTransf(editTransferencia);
                                            console.log(value.target.value)
                                        }} />
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            console.log(transf);

                                            toast.promise(sleep(1500), {
                                                loading: 'Editando su transferencia',
                                                success: () => {

                                                    console.log("Enviando servidor")

                                                    updateTransferencia(transf, transf.id).then((response) => {
                                                        if (!response.ok) {
                                                            //setError(response.message);
                                                        } else {
                                                            //obtenerTranferencia();
                                                            dispatch(onUpdateTransferencia(transf))
                                                            setIsOpen(false);
                                                        }
                                                    })
                                                    return 'Success Update'
                                                },
                                                error: 'Error when fetching',
                                            });
                                        }}
                                            className="w-full">Guardar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
            }
        </Formik >

    )
}

export default App2
