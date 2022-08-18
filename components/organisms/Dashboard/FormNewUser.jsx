import { Divider } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Title from "./Title";
import { handlePost } from "../../../utils/war/adopters";
import { Web3Context } from "../../../contexts/Web3/Web3Context";
import { Users } from "../../../utils/war/UsersSystem";

export const FormNewUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [sendData, setSendData] = useState();

  const regexNum = /^[0-9]+/;
  const regexText = /^[a-zA-Z0-9 ]+$/;
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const onSubmit = (data) => {
    const info = objectUppercase(data);
    setSendData(info);
    console.log(info);

    handlePost(
      info,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjdlY2ZkZWI5ODM2NmY1YzYzMzg2ZTgiLCJpYXQiOjE2NjA3OTI4NDUsImV4cCI6MTY2MDgzNjA0NX0.XxW1861A5aJWkxQqcgJcu7r4dwBZ1qrLwwEAHNkjdqo",
      "POST"
    );
  };

  const objectUppercase = (object, includes = [""]) => {
    Object.keys(object).map((key) => {
      if (
        typeof object[key] === "string" &&
        key != "_id" &&
        key != "user" &&
        !includes.includes(key)
      ) {
        object[key] = String(object[key]).toUpperCase();
      }
    });
    return object;
  };

  const { web3, handleWeb3, handleAccount, handleChainId, handleToken } =
    useContext(Web3Context);

  const [user, setUser] = useState({});

  useEffect(() => {
    web3.account != "" &&
      web3.wallet != null &&
      Users(web3.wallet, web3.account)
        .then((resolve) => {
          !isObjEmpty(resolve) ? setUser(resolve) : setUser({});
        })
        .catch((e) => console.log(e));
  }, [web3.account, web3.wallet, web3.chainId]);

  useEffect(() => {
    if (user?.registeringEntity != "" && user?.registeringEntity != undefined) {
      getResponsibility(web3.wallet, user?.registeringEntity).then(
        (resolve2) => {
          setUserEntity({ idRegisteringEntity: resolve2 });
        }
      );
    }
  }, [user?.registeringEntity, web3.wallet]);
  console.log(handleToken);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>Identificacion</Title>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {/* PAIS */}
          <div className="mb-3">
            <label className="form-label">Pais</label>
            <select className="form-select" {...register("country")}>
              <option value="PE">Peru</option>
            </select>
          </div>

          {/* TIPO-PERSONA */}
          <div className="mb-3">
            <label className="form-label">Tipo Persona</label>
            <select
              className="form-select"
              {...register("person", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            >
              <option value="natural">Natural</option>
            </select>
          </div>

          {/* DOCUMENTO-IDENTIFICACION */}
          <div className="mb-3">
            <label className="form-label">Documento de Identificacion</label>
            <select
              className="form-select"
              {...register("document", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            >
              <option value="d.n.i.">D.N.I.</option>
              <option value="c.i">C.I</option>
              <option value="r.u.c.">RUC</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Numero Documento</label>
            <input
              type="number"
              className="form-control"
              {...register("documentNumber", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                minLength: { value: 8, message: "Formato incorrecto" },
                maxLength: { value: 11, message: "Formato incorrecto" },
                pattern: {
                  value: regexNum,
                  message: "Formato incorrecto",
                },
              })}
            />

            {errors.documentNumber && (
              <small className="text-danger">
                {errors.documentNumber.message}
              </small>
            )}
          </div>

          {/* ADOPTER*/}
          <div className="mb-3">
            <label className="form-label">Tipo</label>
            <select
              className="form-select"
              {...register("type", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            >
              <option value="adopter">Adoptante</option>
            </select>
          </div>

          <div
            className="mb-3"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <button>Crear Address</button>
          </div>
        </section>

        {/* ADDRESS*/}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            placeholder="0x..."
            className="form-control"
            {...register("address", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              minLength: { value: 42, message: "Formato incorrecto" },
              maxLength: { value: 42, message: "Formato incorrecto" },
              pattern: {
                value: regexText,
                message: "Formato incorrecto",
              },
            })}
          />
          {errors.address && (
            <small className="text-danger">{errors.address.message}</small>
          )}
        </div>

        <Divider sx={{ my: 5 }} />

        <Title>Datos Personales</Title>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {/* PRIMER-NOMBRE*/}
          <div className="mb-3">
            <label className="form-label">Primer Nombre</label>
            <input
              type="text"
              className="form-control"
              {...register("name", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                minLength: { value: 3, message: "Nombre muy corto" },
                maxLength: { value: 20, message: "Nombre muy largo" },
                pattern: {
                  value: regexText,
                  message: "Formato incorrecto",
                },
              })}
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>

          {/* SEGUNDO-NOMBRE*/}
          <div className="mb-3">
            <label className="form-label">Segundo Nombre</label>
            <input
              type="text"
              className="form-control"
              {...register("secondName", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                minLength: { value: 3, message: "Apellido muy corto" },
                maxLength: { value: 20, message: "Apellido muy largo" },
                pattern: {
                  value: regexText,
                  message: "Formato incorrecto",
                },
              })}
            />
            {errors.secondName && (
              <small className="text-danger">{errors.secondName.message}</small>
            )}
          </div>

          {/* PRIMER-APELLIDO*/}
          <div className="mb-3">
            <label className="form-label">Primer Apellido</label>
            <input
              type="text"
              className="form-control"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                minLength: { value: 3, message: "Apellido muy corto" },
                maxLength: { value: 20, message: "Apellido muy largo" },
                pattern: {
                  value: regexText,
                  message: "Formato incorrecto",
                },
              })}
            />
            {errors.lastName && (
              <small className="text-danger">{errors.lastName.message}</small>
            )}
          </div>

          {/* SEGUNDO-APELLIDO*/}
          <div className="mb-3">
            <label className="form-label">Segundo Apellido</label>
            <input
              type="text"
              className="form-control"
              {...register("mLastName", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                minLength: { value: 3, message: "Apellido muy corto" },
                maxLength: { value: 20, message: "Apellido muy largo" },
                pattern: {
                  value: regexText,
                  message: "Formato incorrecto",
                },
              })}
            />
            {errors.mLastName && (
              <small className="text-danger">{errors.mLastName.message}</small>
            )}
          </div>

          {/* FECHA-NACIMIENTO*/}
          <div className="mb-3">
            <label className="form-label">Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              {...register("date", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />
            {errors.date && (
              <small className="text-danger">{errors.date.message}</small>
            )}
          </div>

          {/* GENERO*/}
          <div className="mb-3">
            <label className="form-label">Genero</label>
            <select
              className="form-select"
              {...register("gender", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            >
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </select>
          </div>

          {/* CELULAR*/}
          <div className="mb-3">
            <label className="form-label">Celular</label>
            <input
              type="number"
              className="form-control"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                minLength: { value: 9, message: "Formato incorrecto" },
                maxLength: { value: 9, message: "Formato incorrecto" },
                pattern: {
                  value: regexNum,
                  message: "Formato incorrecto",
                },
              })}
            />
            {errors.phone && (
              <small className="text-danger">{errors.phone.message}</small>
            )}
          </div>

          {/* CORREO*/}
          <div className="mb-3">
            <label className="form-label">Correo Electronico</label>
            <input
              type="text"
              className="form-control"
              {...register("email", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                pattern: {
                  value: regexEmail,
                  message: "Formato incorrecto",
                },
              })}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>
        </section>

        <div className="form-check mt-3">
          {/* <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            checked
          /> */}
          <label className="form-check-label">
            Acepto compartir mi informacion personal en las busquedas en la
            Platafora
          </label>
        </div>

        <Divider sx={{ my: 5 }} />

        <Title>Localidad</Title>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            columnGap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {/* DEPARTAMENTO*/}
          <div className="mb-3">
            <label className="form-label">Departamento</label>
            <select
              className="form-select"
              {...register("department", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            >
              <option value=""></option>
              <option value="lima">Lima</option>
            </select>
          </div>

          {/* PROVINCIA*/}
          <div className="mb-3">
            <label className="form-label">Provincia</label>
            <select
              className="form-select"
              {...register("province", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            >
              <option value=""></option>
              <option value="lima">Lima</option>
            </select>
          </div>

          {/* DISTRITO*/}
          <div className="mb-3">
            <label className="form-label">Distrito</label>
            <select
              className="form-select"
              {...register("district", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            >
              <option value=""></option>
              <option value="lima">Lima</option>
            </select>
          </div>
        </section>

        {/* DIRECCION*/}
        <div className="mb-3">
          <label className="form-label">Direccion</label>
          <input
            type="text"
            className="form-control"
            {...register("direction", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              minLength: { value: 5, message: "Direccion muy corta" },
              maxLength: { value: 100, message: "Direccion muy larga" },
              pattern: {
                value: regexText,
                message: "Formato incorrecto",
              },
            })}
          />
          {errors.direction && (
            <small className="text-danger">{errors.direction.message}</small>
          )}
        </div>

        <Divider sx={{ my: 5 }} />

        {/* BUTTON */}
        <div
          className="mb-3 mt-5"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <button
            className="btn btn-dark"
            type="submit"
            style={{ width: "100%" }}
          >
            Guardar
          </button>
        </div>
      </form>

      <div className="alert alert-warning">
        <code>
          Data sent: <br />
          {JSON.stringify(sendData)}
        </code>
      </div>
    </div>
  );
};
