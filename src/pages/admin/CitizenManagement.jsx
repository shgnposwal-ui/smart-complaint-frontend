import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CitizenManagementService from "../../services/CitizenManagementService";

function CitizenManagement() {

    const [citizens, setCitizens] = useState([]);

    useEffect(() => {
        loadCitizens();
    }, []);

    const loadCitizens = async () => {

        try {

            const response = await CitizenManagementService.getAllCitizens();

            setCitizens(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <DashboardLayout>

            <div className="container-fluid">

                <h3 className="mb-4">

                    Citizen Management

                </h3>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Status</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        citizens.map((citizen) => (

                            <tr key={citizen.id}>

                                <td>{citizen.fullName}</td>

                                <td>{citizen.email}</td>

                                <td>{citizen.phoneNumber}</td>

                                <td>{citizen.city}</td>

                                <td>{citizen.state}</td>

                                <td>

                                    {

                                        citizen.isActive

                                            ?

                                            <span className="badge bg-success">

                                                Active

                                            </span>

                                            :

                                            <span className="badge bg-danger">

                                                Inactive

                                            </span>

                                    }

                                </td>

                            </tr>

                        ))

                    }

                    </tbody>

                </table>

            </div>

        </DashboardLayout>

    );

}

export default CitizenManagement;