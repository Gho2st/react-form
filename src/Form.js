import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";





const MyForm = () => {
  const { handleSubmit, control, register, watch, setValue, setError, formState: { errors } } = useForm();
  const selectedContinent = watch("continent");
  const birthdate = watch("birthdate");

  const onSubmit = (data) => {
    
    if (selectedContinent === "Europa" && data.lastname.length < 2) {
      setError("continent", { type: "manual", message: "Nie spełnione kryteria" });

      return;
    }

    if (!data.firstname) {
      setError("firstname", { type: "required", message: "To pole jest wymagane" });
      return;
    }
   
    if (!data.birthdate) {
        setError("birthdate", {message: "To pole jest wymagane" });
        return;
    }

    if (new Date(birthdate) > new Date()) {
      setError("birthdate", { type: "manual", message: "Data urodzenia nie może być w przyszłości" });
      return;
    }

    if (calculateAge(birthdate) > 60) {
      document.body.style.fontSize = "2em";
    }

    alert("Sukces");
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "400px", margin: "0 auto", marginTop: "100px" }}>
      <FormControl fullWidth>
        <InputLabel id="continent-label">Kontynent</InputLabel>
        <Controller
        
          name="continent"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
            
              labelId="continent-label"
              label="Kontynent"
              {...field}
              
              
            >
              <MenuItem value="Afryka">Afryka</MenuItem>
              <MenuItem value="Ameryka Południowa">Ameryka Południowa</MenuItem>
              <MenuItem value="Ameryka Północna">Ameryka Północna</MenuItem>
              <MenuItem value="Antarktyda">Antarktyda</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
              <MenuItem value="Azja">Azja</MenuItem>
              <MenuItem value="Europa">Europa</MenuItem>
            </Select>
          )}
          

        />
        {errors.continent && <p style={{ color: "red" }}>{errors.continent.message}</p>}
      </FormControl>

      <TextField
        style={{marginTop: "10px" }}
        fullWidth
        label="Imię"
        {...register("firstname")}
        error={!!errors.firstname}
        helperText={errors.firstname && errors.firstname.message}
        
      />
    
      <TextField
        style={{marginTop: "10px" }}
        fullWidth
        label="Nazwisko"
        {...register("lastname")}
        error={!!errors.lastname}
        helperText={errors.lastname && errors.lastname.message}
        
      />

    <TextField
        style={{marginTop: "10px" }}
        fullWidth
        type="date"
        label="Data urodzenia"
        {...register("birthdate", { required: true })}
        InputLabelProps={{
            shrink: true,
        }}
        error={!!errors.birthdate}
        helperText={errors.birthdate && errors.birthdate.message}
        
    />


      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={selectedContinent === "Europa" && errors.lastname}
        style={{ marginTop: "1rem" }}
      >
        Wyślij
      </Button>
    </form>
  );
};

export default MyForm;
