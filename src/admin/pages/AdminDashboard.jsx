import { useState, useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AuthAdminContext } from "../hooks/useAuth";
import variablesCSS from "../styles/variablescss";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { TextField } from "@mui/material";

export default function AdminDashboard() {
    const { token } = useContext(AuthAdminContext);
    const [originalData, setOriginalData] = useState();
    const [rows, setRows] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            let res = await fetch("http://localhost:5000/api/admin/user_info", {
                headers: {
                    'x-access-token': token
                }
            });
            let json = await res.json();
            let rows = await json.map(user => {
                return {
                    userId: <a href={"/admin/user/" + user.userId}><AccountCircle /> Ver Perfil</a>,
                    username: user.username,
                    email: user.email,
                    verified: user.verified ? '✅' : '❌'
                }
            })
            setOriginalData(rows)
            setRows(rows)
            setLoading(false)
        }

        getUsers()
    }, [])

    const findUser = (e) => {
        let updatedRows = originalData.filter(el => {
            return el.username.toLowerCase().includes(e.target.value.toLowerCase()) || el.email.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRows(updatedRows)
    }

    return (
        <div style={{backgroundColor: variablesCSS.mainColor, width: '100%', minHeight: '100vh', maxHeight: '100%'}}>
            <div className="header-form" style={{display: 'block', width: '60%', margin: 'auto', marginTop: '2rem'}}>
            <TextField
                id="standard-search"
                label="Buscar por usuario o email"
                type="search"
                variant="standard"
                onChange={findUser}
                sx={{color: 'white', borderBottom: 'thin solid grey', input: {
                    color: 'whitesmoke',
                    padding: '.3rem',
                    fontSize: '.8rem',
                    "&::placeholder": {
                        color: 'white'
                    }
                }, label: { color: 'whitesmoke', fontSize: '.8rem' } }}
            />
            </div>
            <div className="table" style={{width: '60%', margin: 'auto', backgroundColor: variablesCSS.mainColor, paddingBottom: '2rem', paddingTop: '.5rem'}}>
                <DataTable 
                    columns={columns}
                    data={rows}
                    progressPending={loading}
                    noDataComponent={<div style={{backgroundColor: variablesCSS.mainColor, width: '100%', display: 'flex', justifyContent: 'center'}}><p style={{color: 'whitesmoke', paddingTop: '2rem'}}>Ups! no hay usuarios con ese nombre o email...</p></div>}
                    pagination
                    paginationPerPage={5}
                    customStyles={customStyles}
                />
            </div>
        </div>
    )
}

// userId, username, email, password, userType, name, surname, birthdate, verified
const columns = [
    {
        name: "",
        selector: row => row.userId,
        width: '180px'
    },
    {
        name: "Nombre de usuario",
        selector: row => row.username,
        width: '180px',
    },
    {
        name: "Email",
        selector: row => row.email,
        width: '180px'
    },
    {
        name: "Verificado",
        selector: row => row.verified,
        width: '180px'
    }
]

// estilos de la tabla

const customStyles = {
    rows: {
        style: {
            backgroundColor: variablesCSS.formColor,
            color: variablesCSS.fontColor
        }
    },
    headRow: {
        style: {
            backgroundColor: variablesCSS.mainColor,
            color: variablesCSS.fontColor
        }
    },
    pagination: {
        style: {
            backgroundColor: variablesCSS.formColor,
            color: variablesCSS.fontColor
        },
        pageButtonsStyle: {
            backgroundColor: variablesCSS.secondaryColor
        }
    },
    progress: {
        style: {
            backgroundColor: variablesCSS.mainColor,
            color: variablesCSS.fontColor
        }
    }
}