//           <button content='add role' icon='plus' labelPosition='right' onClick={() => append({ Name: null, Count: null, Type: null })} >add role</button>
//           {fields?.map((field, index) =>
//             <form key={index} widths='equal' style={{ width: "93%" }}>
//               <input {...register(`fields.${index}.Name`)} placeholder="name" />
//               <input type="radio" value="0" {...register(`fields.${index}.IsManagment`)}>false</input>
//               <input type="radio" value="1" {...register(`fields.${index}.IsManagment`)}>true</input>
//               <input type='date' {...register(`fields.${index}.startRole`)} placeholder='start role' />
//               <button icon size='large' floated="left" onClick={() => remove(index)}>remove</button>
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HeaderPage from '../Header';
import { editWorker, getWorker } from '../services/WorkerService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    firstName: yup.string().required('This field is required'),
    familyName: yup.string().required('This field is required'),
    identity: yup.number().integer('').positive('').required('This field is required'),
    dateStartWork: yup.date().required('This field is required'),
    birthDate: yup.date().required('This field is required'),
    gender: yup.string().required('This field is required'),
    roles: yup.array().of(
        yup.object().shape({
            Name: yup.string().required('This field is required'),
            IsManagment: yup.string().required('This field is required'),
            startRole: yup.date().required('This field is required'),
        }).required(),
    ),
});

const EditWorker = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!currentWorker.length)
            dispatch(getWorker());
    }, []);
    const currentWorker = useSelector(state => state.currentWorker);
    const navigate = useNavigate();
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const { fields, append, remove } = useFieldArray({
        control, name: "roles"
    });

    const onSubmit = data => {
        dispatch(editWorker(currentWorker?.Id, data));
        navigate('/workers');
    };

    return (
        <>
            <HeaderPage />
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    First Name:
                    <input type="text" {...register("firstName")} defaultValue={currentWorker ? currentWorker.firstName : ''} />
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                </label>
                <label>
                    Last Name:
                    <input type="text" {...register("familyName")} defaultValue={currentWorker ? currentWorker.familyName : ''}/>
                    {errors.familyName && <p>{errors.familyName.message}</p>}
                </label>
                <label>
                    Start work:
                    <input type="date" {...register("dateStartWork")} defaultValue={currentWorker ? currentWorker.dateStartWork : ''} />
                    {errors.dateStartWork && <p>{errors.dateStartWork.message}</p>}
                </label>
                <label>
                    Identity:
                    <input type="text" {...register("identity")} />
                    {errors.identity && <p>{errors.identity.message}</p>}
                </label>
                <label>
                    Birth Date:
                    <input type="date" {...register("birthDate")} />
                    {errors.birthDate && <p>{errors.birthDate.message}</p>}
                </label>
                <label>
                    Gender:
                    <label>
                        <input type="radio" value="male" {...register("gender")} />
                        Male
                    </label>
                    <label>
                        <input type="radio" value="female" {...register("gender")} />
                        Female
                    </label>
                    {errors.gender && <p>{errors.gender.message}</p>}
                </label>
                <label>
                    <button content='add role' icon='plus' labelPosition='right' onClick={() => append({ Name: null, Count: null, Type: null })} >add role</button>
                    {fields?.map((field, index) =>
                        <form key={index} widths='equal' style={{ width: "93%" }}>
                            <input {...register(`fields.${index}.Name`)} placeholder="name" />
                            <label>managment role</label>
                            <label>
                                <input type="radio" value="1" {...register(`fields.${index}.IsManagment`)} />
                                true
                            </label>
                            <label>
                                <input type="radio" value="0" {...register(`fields.${index}.IsManagment`)} />
                                false
                            </label>
                            <input type='date' {...register(`fields.${index}.startRole`)} placeholder='start role' />
                            <button icon size='large' floated="left" onClick={() => remove(index)}>remove</button>
                        </form>
                    )}
                </label>
                <button type="submit">submit</button>
            </form>
        </>
    );
};

export default EditWorker;
