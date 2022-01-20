import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const LeadDetail = () => {
    const { id } = useParams()
    const [lead, setLead] = useState("")
    useEffect(() => {
        axios.get("/api/lead/" + id).then((response) => {
            setLead(response.data)
        })
    }, [])
    return <div className="main-content">
        <div className="page-content">
            <pre style={{ color: "white" }}>{JSON.stringify(lead, null, 2)}</pre>
        </div>
    </div>
}

export default LeadDetail