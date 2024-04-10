import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HeaderPage from "../Header";
import { addWorker } from "../services/WorkerService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRoles } from "../services/RoleService";
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//readonly select
{/* <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-readonly-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-readonly-label"
          id="demo-simple-select-readonly"
          value={age}
          label="Age"
          onChange={handleChange}
          inputProps={{ readOnly: true }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Read only</FormHelperText>
      </FormControl> */}
const schema = yup.object().shape({
  firstName: yup.string().required("This field is required"),
  familyName: yup.string().required("This field is required"),
  identity: yup
    .number()
    .integer("")
    .positive("")
    .required("This field is required"),
  dateStartWork: yup.date().required("This field is required"),
  birthDate: yup.date().required("This field is required"),
  gender: yup.string().required("This field is required"),
  roles: yup.array().of(
    yup
      .object()
      .shape({
        Name: yup.string().required("This field is required"),
        IsManagment: yup.string().required("This field is required"),
        startRole: yup.date().required("This field is required"),
      })
      .required()
  ),
});

const AddWorker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!roles.length) dispatch(getRoles());
  }, []);
  const roles = useSelector((state) => state.roles);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "roles",
  });

  const onSubmit = (data) => {
    const { ...rest } = data;
    const employee = {
      ...rest,
      IsManagment: true,
    };
    dispatch(addWorker(employee));
    navigate("/workers");
  };

  return (
    <div>
      <HeaderPage />
      <FormControl /*fullWidth*/ onSubmit={handleSubmit(onSubmit)}>
        <TextField id="outlined-basic" label="first name" variant="outlined" {...register("firstName")} />
        <TextField id="outlined-basic" label="last name" variant="outlined" {...register("familyName")} />
        <TextField id="outlined-basic" label="identity" variant="outlined" {...register("identity")} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="birth date" {...register("birthDate")} />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="date start work" {...register("dateStartWork")} />
          </DemoContainer>
        </LocalizationProvider>
        <FormControl>
          <InputLabel id="demo-simple-select-label">gender</InputLabel>
          <Select {...register("gender")}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Gender"
          >
            <MenuItem value="male">male</MenuItem>
            <MenuItem value="female">female</MenuItem>
          </Select>
          {errors.gender && <p>{errors.gender.message}</p>}
        </FormControl>
        <Button variant="outlined"
          content="add role"
          icon="plus"
          labelPosition="right"
          onClick={() => append({ Name: null, Count: null, Type: null })}>
          add role
        </Button>
        {fields?.map((field, index) => (
          <FormControl key={index} widths="equal" style={{ width: "93%" }}>
            <InputLabel id="demo-simple-select-label">role name</InputLabel>
            <Select {...register(`fields.${index}.Name`)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="name">
              {roles?.map((r, i) => (
                <MenuItem key={i}>{r?.name}</MenuItem>
              ))}
            </Select>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">managment role</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="1" control={<Radio />} label="true" {...register(`fields.${index}.IsManagment`)}/>
                <FormControlLabel value="0" control={<Radio />} label="false" {...register(`fields.${index}.IsManagment`)}/>
              </RadioGroup>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="start role" {...register(`fields.${index}.startRole`)} />
              </DemoContainer>
            </LocalizationProvider>
            <Button variant="outlined"
              icon
              size="large"
              floated="left"
              onClick={() => remove(index)}
            >
              remove
            </Button>
          </FormControl>
        ))}
        <Button variant="outlined" color="success" type="submit">submit</Button>
      </FormControl>
    </div>
  );
};

export default AddWorker;
